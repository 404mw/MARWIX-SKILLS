# Reference: Anti-patterns Catalog

Load when reviewing a query for shapes that pass code review but break in production.

---

1. **`SELECT *`** — ships columns you don't need, breaks index-only scans, breaks when schema changes.
2. **`COUNT(*)` on a huge table for pagination UI** — use `EXISTS` for "is there more?", or maintain an estimate.
3. **`DISTINCT` to dedupe a join blowup** — fix the join cardinality instead; `DISTINCT` masks the bug and is expensive.
4. **`OR` across columns** — often defeats indexes. Rewrite as `UNION ALL` of two indexable queries.
5. **`NOT IN (subquery)` with nullable subquery column** — returns wrong results when nulls are present. Use `NOT EXISTS`.
6. **`IN (subquery)` for big subqueries** — `EXISTS` is usually planned better and short-circuits.
7. **Functional predicates on indexed columns** — `WHERE DATE(ts) = ...` — see [indexing.md → Sargable predicates](indexing.md#sargable-predicates).
8. **`ORDER BY RANDOM() LIMIT 1`** — sorts the whole table. Use `TABLESAMPLE` or sample by index.
9. **Polling with `SELECT ... FOR UPDATE SKIP LOCKED`** without LIMIT — locks more than needed.
10. **Computing the same expression twice** — `WHERE expensive(x) > 0 AND expensive(x) < 10`. Hoist into a CTE or LATERAL.
11. **String concatenation in SQL** for keys/lookups — usually means the schema should have stored the concat'd value normalized.
12. **`UPDATE` without `WHERE`** — yes, it happens. Production-only fix: `BEGIN; UPDATE ...; SELECT count; ROLLBACK;` first, every time.
13. **Updating a row to its current value** — Postgres still writes a new tuple and bloats the table. Add `WHERE col IS DISTINCT FROM $new` guards.
14. **Wide `IN (a, b, c, ..., 50000 items)`** — slow parse, slow plan. Use `= ANY($1::int[])` with array bind, or a temp table for >1000 items.
15. **JSONB as a "schemaless" escape hatch** — fine for sparse attrs, but querying `data->>'x' = '...'` without a GIN expression index is a full scan every time.
16. **Type-mismatched bind parameter** — binding a number against a text column (or vice versa) moves an implicit cast onto the *column* and defeats the index. The usual victim is an ID that looks numeric but is stored as text — external platform IDs, snowflakes, account numbers, zero-padded codes. Bind them as **strings**, never as JS numbers or Python ints. Symptom: Seq Scan on a table with a perfectly good unique index. This one is invisible in code review and obvious in the plan.
17. **An ORM's built-in cursor helper on a hot path** — several emit SQL without a `LIMIT`, or break when the cursor row is deleted. Express keyset as an explicit predicate instead; see [pagination.md → Expressing keyset through an ORM](pagination.md#expressing-keyset-through-an-orm) and your ORM adapter.
18. **String-concatenating user input into raw SQL** — injection. Bind parameters, always, including inside the escape hatch your ORM provides for "just this one query".
