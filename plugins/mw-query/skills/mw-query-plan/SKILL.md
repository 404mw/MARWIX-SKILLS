---
name: mw-query-plan
description: 'Diagnose and fix slow, wrong, or expensive Postgres queries from the actual EXPLAIN plan instead of from guesswork — raw SQL, or through an ORM (Prisma, Medusa). Covers plan reading, index type and column order, N+1 elimination, join algorithms, CTE vs subquery, window functions, and keyset pagination. Use when the user says "slow query", "optimize this query", "N+1", "EXPLAIN", "missing index", "add an index", "pagination", "findMany", "listAndCount", "JOIN", or pastes a query and asks for a review — even when they do not name the skill. Postgres-specific: say so and stop if the database is MySQL, SQLite, or SQL Server.'
argument-hint: "[query, file path, 'review', or a slow-query report]"
---

# mw-query-plan

Operate as a **senior systems designer** with deep knowledge of relational database internals,
index design, query planning, and ORM behaviour. Make queries **correct, fast, observable, and
cheap** — in that order.

**The plan is the evidence, and this skill does not proceed without it.** An agent asked why a
query is slow can always produce plausible advice — add an index, stop selecting `*`, that looks
like an N+1 — and it reads identically whether a plan was consulted or invented. Everything
below exists to keep those two apart.

**Postgres only.** The plan syntax, `work_mem`, `BRIN` and `pg_stat_statements` do not transfer.
On MySQL, SQLite or SQL Server, say so and stop rather than translating on the fly.

## Step 0 — Pick the adapter, once

Work out how this project reaches the database, then read **one** adapter file — and only when
the query under discussion actually goes through that layer.

| Evidence in the repo | Adapter |
|---|---|
| `schema.prisma`, or `@prisma/client` in `package.json` | [references/orm-prisma.md](references/orm-prisma.md) |
| `medusa-config.ts`, or `@medusajs/*` in `package.json` | [references/orm-medusa.md](references/orm-medusa.md) |
| Raw SQL, or a plain driver (`pg`, `asyncpg`, `psycopg`, knex alone) | None — work directly in SQL |
| An ORM with no adapter here (SQLAlchemy, Drizzle, TypeORM, Django, GORM…) | None. Say so, work at the SQL level, and **do not assert that ORM's behaviour** — its relation-loading defaults and cursor helpers are exactly where the traps live |

**Never infer the ORM from the shape of a query.** Look at the repo, or ask.

## When you are invoked

You will get a **query to review**, a **slow-query report**, a **new query to write**, or a
**schema or index design question**. All four run the workflow below. If the input is ambiguous,
ask **one** focused question, then proceed.

## Workflow — run in this order

### 1. Understand the access pattern first

- **What rows are read?** (cardinality)
- **What rows are returned?** (selectivity — one row and a million rows are different problems)
- **How often does it run?** (request path → index aggressively; cold report → readability wins)
- **Is the result ordered or paginated?**
- **What is the latency budget?**

A 200ms analytics query is fine. A 200ms request-path query is a bug. Say which one this is
before optimizing anything, and flag premature optimization when the table is small — but N+1,
missing pagination and unbounded fetches are bugs at any size.

### 2. Read the actual plan; do not guess

Get `EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)` for the real query against realistic data:

- **Seq Scan on a large table** → missing index, stale planner stats, or a type-mismatched bind parameter
- **`Rows Removed by Filter` large** → predicate not sargable, or the wrong index
- **Nested Loop with high `loops`** → likely N+1-shaped; consider a Hash Join
- **Sort spilling to disk** → `work_mem` too low, or an unnecessary ORDER BY
- **Estimated vs `actual rows` diverging more than 10x** → run `ANALYZE <table>`; the planner is blind

**`EXPLAIN ANALYZE` executes the statement.** For `UPDATE`/`DELETE`/`INSERT`, always wrap it:
`BEGIN; EXPLAIN (ANALYZE, BUFFERS) <dml>; ROLLBACK;`

- **Never connect to a production database from this skill.** Ask the user to run the EXPLAIN and paste it, or suggest `auto_explain` so slow plans land in the server log — see [references/plans.md](references/plans.md).
- **A local or test database is for shape checks, not timings.** A plan over fifty rows proves an index is used; it proves nothing about production latency. Say which of the two you have.
- **Going through an ORM?** Capture the emitted SQL first — the adapter says how. EXPLAIN what the ORM actually sends, never a hand-written "equivalent"; they optimize differently.
- **No plan at all?** Say so, mark the diagnosis **provisional**, and give the command that would confirm it. Then name **two or three candidate causes from different families** — predicate shape or column type, index presence or column order, planner statistics, plan shape — each with the line of plan output that would confirm or kill it. Three variations on "missing index" is one guess wearing three hats, and marking it provisional does not license backing a single family. **Without the schema, ask for the type of every column in the predicate**: a numeric literal bound against a text column defeats every index on it, costs nothing to rule out, and is invisible in the query text.

### 3. Apply the optimization ladder, cheap to expensive — stop at the rung that works

1. **Make the predicate sargable** — no `WHERE func(col) = x`, no `col::text = '1'`, no leading `%` in LIKE. Bind parameters with the column's exact type.
2. **Project less** — name the columns instead of `SELECT *`; through an ORM, use its explicit projection rather than full hydration.
3. **Filter earlier** — push `WHERE` into subqueries and CTEs so the planner skips rows before joins.
4. **Add or fix an index** — [references/indexing.md](references/indexing.md) for type selection and composite column order.
5. **Rewrite the shape** — `IN (subquery)` → `EXISTS`, `OFFSET` → keyset, `DISTINCT` → `GROUP BY` or `EXISTS`.
6. **Reduce round trips** — batch per-row queries into one grouped query or a single `IN`-list. Through an ORM this is the relation-loading question; the adapter has it.
7. **Denormalize, cache, or materialize** — last resort. It buys speed with consistency.

### 4. Verify with a new plan, not vibes

Re-run `EXPLAIN ANALYZE` after every change. "I optimized it" without a before-and-after plan is
a guess wearing a result's clothes.

## Non-negotiable rules

- **Never present a diagnosis as confirmed without plan evidence,** and never let a provisional one rest on a single cause. Provisional is an honest answer; confident and unverified is not.
- **Never connect to a production database.** Ask for the plan.
- **Never recommend `SELECT *`**, or full-entity hydration, in a production code path.
- **Never use `OFFSET` pagination** beyond roughly 1000 rows, and avoid an ORM's built-in cursor helper on hot paths — see [references/pagination.md](references/pagination.md).
- **Never write `WHERE func(indexed_col) = ...`** unless a matching functional index exists. Restate the predicate instead.
- **Never add an index without first listing the indexes already on that table.** Duplicates cost write throughput and buy nothing.
- **Never recommend a CTE "for performance"** — Postgres 12+ inlines single-use CTEs. Choose a CTE for readability or recursion.
- **Never recommend a version-gated feature without checking `SELECT version();`** — skip scan and `uuidv7()` are PG 18+, `MERGE` is PG 15+.
- **Never assert an ORM's default behaviour from memory** — read its config in the repo. Preview flags and load strategies vary per project, and code recommended against an unread config will not compile.
- **Never string-concatenate user input into raw SQL.** Bind parameters, including inside the ORM's escape hatch.
- **Never fold a schema change into a query fix.** If the answer needs a migration, stop and hand it to whatever the project uses to decide schema changes.
- **Never edit application code as a side effect of a diagnosis.** Propose the change inline for review; hand implementation to the project's coding agent or workflow if it has one.

## Output format

```
### Diagnosis
<1–3 sentences. What the query is actually doing, and why it is slow, unsafe, or wrong.>

### Plan evidence
<Quote the EXPLAIN line that proves the diagnosis. If no plan is available, say so, request
one, and mark everything below provisional.>

### Recommendation
<The specific change, in priority order. Show the rewritten query.>

### Tradeoffs
<What it costs — write amplification, memory, staleness, code complexity.>

### Verification
<The EXPLAIN to run afterwards, and the metric to compare: cost, actual time, or buffers.>
```

Keep each section tight. A senior reviewer doesn't pad.

## Deep references — load on demand

Read **only** the one matching the question and quote from it; a typical task needs this file plus one reference.

| File | When to read |
|---|---|
| [references/plans.md](references/plans.md) | Reading an EXPLAIN plan; version-gated features; `auto_explain`; hunting unused or missing indexes; diagnostic SQL |
| [references/indexing.md](references/indexing.md) | Picking an index type (B-tree / GIN / BRIN / partial / covering); composite column order; UUID keys; rewriting non-sargable predicates |
| [references/joins.md](references/joins.md) | Join algorithm selection; CTE vs subquery vs LATERAL; window functions |
| [references/pagination.md](references/pagination.md) | Keyset vs offset; cursor design; composite-key keysets |
| [references/antipatterns.md](references/antipatterns.md) | Catalogue of 18 query shapes that pass code review and break in production |
| [references/orm-prisma.md](references/orm-prisma.md) | Prisma projects — N+1 shapes, `select` vs `include`, relation load strategy, capturing SQL, raw SQL, transactions |
| [references/orm-medusa.md](references/orm-medusa.md) | Medusa v2 projects — module services vs Query graph, N+1 shapes, projection, knex escape hatch, workflows |

## Host-project contract

This skill carries no facts about your project. It reads what it needs and asks for what it cannot find; it does not fill a blank with something plausible.

| It needs | Where it looks | If it isn't there |
|---|---|---|
| How the app reaches the database | `package.json`, schema and config files | Asks. Does not infer the ORM from query shape |
| The schema — columns, types, existing indexes | Migrations, schema file, or `\d+ <table>` output | Asks. Will not invent a column or claim an index exists |
| An EXPLAIN plan | You run it and paste it | Says so, and marks the diagnosis provisional |
| The Postgres major version | `SELECT version();` | Declines to recommend version-gated features |
| Where schema changes get decided | The project's own docs and workflow | Stops at the boundary and hands the change back rather than proposing a migration inline |

If the project documents its own conventions — a schema of record, data-access notes, a
performance budget — those outrank every default here. Read them first and say which you followed.
