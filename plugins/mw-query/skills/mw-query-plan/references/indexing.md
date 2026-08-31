# Reference: Indexing

Load when picking an index type, ordering composite columns, or rewriting a non-sargable predicate.

---

## Pick the right type

| Type | Use for | Don't use for |
|---|---|---|
| **B-tree** (default) | Equality, range, sort, prefix LIKE (`'abc%'`) | Arrays, JSONB containment, full-text |
| **Hash** | Equality only, very rarely worth it over B-tree | Anything with ORDER BY or range |
| **GIN** | JSONB `@>`, array containment, full-text (`tsvector`), trigram (`pg_trgm`) | Numeric ranges |
| **GiST** | Geometry, range types, exclusion constraints | Plain equality (B-tree wins) |
| **BRIN** | Huge naturally-ordered tables (time-series, append-only logs) | Random-order tables |
| **Partial** (`WHERE ...`) | Hot subset of rows queried often (e.g. `WHERE deleted_at IS NULL`) | When most rows match |
| **Covering** (`INCLUDE (...)`) | Index-only scans — return extra columns without heap fetch | Wide payloads (bloats index) |
| **Expression** (`(lower(email))`) | Forced functional predicates | If you can rewrite the query instead |

---

## Composite index column order

**Rule:** order columns by **equality first, then range, then ORDER BY**. Mismatch wastes the index.

```sql
-- Query: WHERE tenant_id = ? AND created_at > ? ORDER BY created_at DESC
CREATE INDEX ON logs (tenant_id, created_at DESC);  -- ✓ eq, then range/sort

-- Wrong:
CREATE INDEX ON logs (created_at DESC, tenant_id);  -- ✗ tenant_id can't be used to seek
```

**Postgres 18 skip scan caveat:** PG 18 can use a composite index even when the *leading* column has no predicate, by "skipping" across its distinct values — but only efficiently when the leading column is **low-cardinality** (a status flag, a small enum). Treat skip scan as a safety net that rescues an existing index, not as a design target: still order columns for your actual predicates. If the plan shows a skip scan with a high `Index Searches:` count, the index order is wrong for that query.

---

## Cost of an index

Every index is **read-amplifying** (sometimes) and always **write-amplifying** — INSERT/UPDATE/DELETE must update every index. Rules of thumb:
- < 5 indexes per table for OLTP write-heavy tables.
- Drop unused indexes — check `pg_stat_user_indexes.idx_scan = 0`.
- Index size > table size is a smell on transactional tables (fine on append-only analytics).
- **HOT updates:** an UPDATE that touches only non-indexed columns can reuse the heap page and skip all index maintenance ("heap-only tuple"). Indexing a frequently-updated column (e.g. a counter, `updated_at`) disables that shortcut for every update of the row — index hot-write columns only when a query genuinely needs it.

---

## UUID primary keys

Random UUIDs (v4) insert at random B-tree positions → constant page splits, bloated index, cold cache. If the schema uses UUID PKs:
- **PG 18+:** use `uuidv7()` — timestamp-prefixed, so new rows cluster at the right edge of the index like a serial.
- **Older PG:** generate UUIDv7 in the application, or keep `bigint identity` for hot tables.
- Never `ORDER BY` a v4 UUID expecting insertion order — it isn't.

---

## Sargable predicates

A predicate is **sargable** ("Search ARGument ABLE") if the planner can use an index on it.

| Not sargable | Sargable rewrite |
|---|---|
| `WHERE DATE(created_at) = '2026-05-17'` | `WHERE created_at >= '2026-05-17' AND created_at < '2026-05-18'` |
| `WHERE LOWER(email) = $1` | `WHERE email = $1` (and store lowercase), or add expression index |
| `WHERE id::text = '42'` | `WHERE id = 42` |
| `WHERE name LIKE '%foo%'` | full-text (`tsvector` + GIN), or trigram (`pg_trgm`) |
| `WHERE col + 1 > $1` | `WHERE col > $1 - 1` |
| `WHERE varchar_col = 42` (numeric bind against text column) | Bind the correct type: `WHERE varchar_col = '42'` — implicit casts move the cast to the *column* side and defeat the index |
