# Reference: Joins, CTEs, Window Functions

Load when picking a join algorithm, deciding CTE vs subquery, or considering a window function.

---

## Join Algorithms

The planner picks; you can only nudge it via statistics, indexes, and predicate shape.

| Algorithm | Best when | Cost shape |
|---|---|---|
| **Nested Loop** | Outer side is small (< few thousand), inner side has an index on join key | O(outer × log(inner)) with index |
| **Hash Join** | Both sides large, equality join, one side fits in `work_mem` | O(outer + inner), needs RAM |
| **Merge Join** | Both inputs already sorted on join key (or indexes provide order) | O(outer + inner), no extra memory |

### Nudging the planner
- If it picks Nested Loop and you see millions of loops → likely **stale stats**, run `ANALYZE`.
- If it picks Hash Join and spills → raise `work_mem` for that session, or filter earlier.
- If you have an index that *should* enable Merge Join and it isn't → check that the planner's row estimate is realistic.
- Join columns must be the **same type** — an `int = bigint` or `text = varchar` join is fine, but `int = text` forces casts and blocks index use on one side.

### Join order
Postgres explores join orders for up to `join_collapse_limit` (default 8) tables. Beyond that, plans degrade. For 10+ table joins, consider breaking into CTEs or splitting the query.

---

## CTE vs Subquery vs Derived Table

**Postgres 12+** inlines single-use non-recursive CTEs by default — performance parity with subqueries. The choice is now about **clarity and intent**.

| Use | Reason |
|---|---|
| **CTE (`WITH ...`)** | Multi-step logic, readability, recursion (`WITH RECURSIVE`), or *forced* materialization (`WITH x AS MATERIALIZED (...)`). |
| **Subquery in `WHERE`** | `EXISTS`, `IN`, `NOT EXISTS` — semantically clearer than a CTE-then-join. |
| **Scalar subquery in `SELECT`** | Adding one derived column without a join. CTE for this is ceremonial. |
| **Derived table (`FROM (SELECT ...) t`)** | When you need to reference the result in `FROM` but don't want a separate name binding. |
| **LATERAL join** | Per-row subquery results — e.g. "top 3 orders per customer". |

### `MATERIALIZED` keyword (Postgres 12+)
- `WITH x AS MATERIALIZED (...)` — force materialization (old behavior). Use when the CTE is expensive *and* referenced multiple times.
- `WITH x AS NOT MATERIALIZED (...)` — force inlining even if referenced multiple times.
- Default: inlined if referenced ≤ 1 time, materialized if > 1.

### Anti-pattern
```sql
-- ❌ CTE used once, no recursion, no MATERIALIZED — pure ceremony
WITH active_users AS (SELECT * FROM users WHERE active)
SELECT count(*) FROM active_users;

-- ✓ Just write the predicate
SELECT count(*) FROM users WHERE active;
```

---

## Window Functions

Window functions compute over a **partition** without collapsing rows — GROUP BY collapses, window doesn't.

### When window beats alternatives
- **Running totals / moving averages** — `SUM(x) OVER (ORDER BY t ROWS BETWEEN ...)` vs self-join: window is 10–100x faster.
- **Top-N per group** — `ROW_NUMBER() OVER (PARTITION BY g ORDER BY x DESC)` + outer filter `WHERE rn <= N`. Often beats `LATERAL` for medium N.
- **Gap detection** — `LAG()` / `LEAD()` instead of self-joins on offset IDs.

### Cost shape
- A window needs the partition sorted. If no index provides the order, the planner inserts a `Sort` → spills if big.
- Multiple windows with the **same** `PARTITION BY ... ORDER BY ...` share one sort. Group identical frames together in the SELECT.
- Postgres 15+ improved `WindowAgg` performance significantly.

### Top-N per group: window vs LATERAL
- **Window (ROW_NUMBER)** — single scan, good when N is small and group count is large.
- **LATERAL** — better when you have an index supporting `ORDER BY x DESC LIMIT N` per group key.

Test both. The right answer depends on data shape.
