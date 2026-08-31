# Reference: Plan Reading & Diagnostic Commands

Load when reading an EXPLAIN output, or hunting for unused/missing indexes and slow queries.

---

## Plan Reading Checklist

Run with `EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)`. `BUFFERS` is the secret weapon — it shows cache vs disk reads.

> **Postgres 18+:** `EXPLAIN ANALYZE` includes buffer stats by default — plain `EXPLAIN ANALYZE` is enough. Writing `BUFFERS` explicitly is harmless and keeps the command portable to older servers, so keep it in shared snippets.

### Top-down scan order
1. **Look at the bottom first.** Plans execute leaf-up; the deepest node is the first thing the DB does.
2. **Compare `rows` (estimated) vs `actual rows`.** Divergence > 10x means stats are stale — run `ANALYZE <table>;`. If stats are fresh and the estimate is still wrong, the columns are probably correlated — consider `CREATE STATISTICS` on the column pair.
3. **`loops=` matters.** A node with `actual time=0.1 loops=100000` cost 10 seconds, not 0.1ms. Multiply.
4. **`Rows Removed by Filter`** — large number = predicate not pushed into index. Either add an index covering the predicate or rewrite to be sargable.
5. **`shared read=`** (BUFFERS) — cache miss count. High reads on a hot query = working set doesn't fit RAM, or the plan is scanning more than it should.
6. **`Sort Method: external merge Disk: NNNkB`** — sort spilled. Either reduce the sorted set, add a matching index (sort by index), or raise `work_mem`.
7. **`Index Searches: N`** (Postgres 18+, on index scan nodes) — how many separate descents into the index this node made. A big number on a skip scan or `IN`-list scan explains why an "index scan" is still slow.

### Red flags by node type

| Node | Red flag | Likely fix |
|---|---|---|
| `Seq Scan` on large table | Filter selectivity < 5% | Add B-tree or partial index |
| `Index Scan` returning most of table | Predicate too broad | Sometimes Seq Scan is correct — don't force the index |
| `Nested Loop` with `loops` in thousands | Inner side not indexed | Add index on inner-side join column, or switch to Hash Join |
| `Hash Join` with `Batches: > 1` | Hash spilled to disk | Raise `work_mem` or filter earlier |
| `Materialize` over big input | Repeated scan in NL | Often resolves itself once outer side shrinks |
| `BitmapHeapScan` with `Recheck Cond` doing work | Heap visibility check expensive | Consider VACUUM, or covering index with INCLUDE |
| `JIT: ... Timing: Generation + Inlining + Optimization` dominating | JIT overhead on a short query | `SET jit = off` for the session, or raise `jit_above_cost` |

### One-liner to capture a plan
```sql
EXPLAIN (ANALYZE, BUFFERS, SETTINGS, FORMAT TEXT)
<your query>;
```
For JSON (machine-readable, paste into https://explain.dalibo.com): `FORMAT JSON`.

**`ANALYZE` executes the statement.** For DML, always sandbox it:
```sql
BEGIN;
EXPLAIN (ANALYZE, BUFFERS) UPDATE ...;
ROLLBACK;
```

### Version-gated features
Before recommending anything version-specific, check the server: `SELECT version();`
- **PG 15+** — `MERGE`
- **PG 16+** — better anti-join planning, `pg_stat_io`
- **PG 17+** — faster `IN (...)` B-tree scans, streaming sequential reads
- **PG 18+** — BUFFERS by default, B-tree skip scan, `uuidv7()`, async I/O (`io_method`), `Index Searches: N` in plans

---

## Quick command snippets

```sql
-- Find unused indexes
SELECT schemaname, relname, indexrelname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0 AND schemaname NOT IN ('pg_catalog')
ORDER BY pg_relation_size(indexrelid) DESC;

-- Find missing indexes (high seq_scan on big tables)
SELECT relname, seq_scan, seq_tup_read, idx_scan, n_live_tup
FROM pg_stat_user_tables
WHERE seq_scan > idx_scan AND n_live_tup > 10000
ORDER BY seq_tup_read DESC LIMIT 20;

-- Table & index sizes
SELECT relname,
  pg_size_pretty(pg_total_relation_size(oid)) AS total,
  pg_size_pretty(pg_relation_size(oid)) AS heap,
  pg_size_pretty(pg_indexes_size(oid)) AS indexes
FROM pg_class WHERE relkind = 'r'
ORDER BY pg_total_relation_size(oid) DESC LIMIT 20;

-- Slow query log (set in session)
SET log_min_duration_statement = 100;  -- log queries > 100ms

-- Refresh planner stats
ANALYZE <table_name>;

-- Top 10 queries by total execution time (requires pg_stat_statements)
SELECT calls,
  round(total_exec_time::numeric, 1) AS total_ms,
  round(mean_exec_time::numeric, 2) AS mean_ms,
  rows, left(query, 120) AS query
FROM pg_stat_statements
ORDER BY total_exec_time DESC LIMIT 10;

-- Reset query stats
SELECT pg_stat_statements_reset();
```

### auto_explain — plans from production without asking

When a query is only slow in production, `auto_explain` logs the real plan automatically:

```sql
-- Session-level (superuser); for permanent use add to shared_preload_libraries
LOAD 'auto_explain';
SET auto_explain.log_min_duration = 200;   -- ms; plans of anything slower get logged
SET auto_explain.log_analyze = true;       -- include actual rows/times
SET auto_explain.log_buffers = true;
```

Then read the plan from the Postgres log. This is the answer when "run EXPLAIN and paste it" isn't practical for the user.
