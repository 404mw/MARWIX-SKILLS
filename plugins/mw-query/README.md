# MW Query Skills

**An agent asked why a query is slow will answer without looking.**

It pattern-matches to plausible advice — add an index on `user_id`, stop selecting `*`, that
looks like an N+1 — and it is right often enough to be trusted. The problem is not the hit rate.
It is that **the answer reads identically whether a plan was consulted or invented.** There is
no tell. You add the index, write throughput drops, and the query is still slow because the
predicate was never sargable.

`mw-query-plan` makes the guess impossible to pass off as a diagnosis. Used on my own Postgres
work before release.

Install and requirements: [repository README](../../README.md).

## Contents

- [`mw-query-plan`](#mw-query-plan) — what it does, and the four refusals that make it work
- [What changes in practice](#what-changes-in-practice) — the same question, with and without the skill
- [ORM adapters](#orm-adapters) — Prisma, Medusa, and what happens on everything else
- [Scope — Postgres only](#scope--postgres-only) — read this before installing
- [Host-project contract](#host-project-contract) — what it needs from your repo
- [Layout](#layout)


## `mw-query-plan`

*Diagnoses a query from its EXPLAIN plan, and says so when it hasn't got one.*

Give it a slow query, a query to review, a query to write, or an index design question. It
works the access pattern first — how many rows are read, how many come back, how often it runs,
what the latency budget is — because a 200ms analytics query is fine and a 200ms request-path
query is a bug, and the same SQL can be either.

Then it reads the plan. Then it walks an **optimization ladder from cheap to expensive** —
sargable predicate, narrower projection, earlier filter, index, rewritten shape, fewer round
trips, and only then denormalization — and stops at the first rung that solves it. Most query
advice starts three rungs too far down.

Every answer comes back in the same five parts: **Diagnosis, Plan evidence, Recommendation,
Tradeoffs, Verification.**

The second one is the product. It is where the EXPLAIN line that proves the diagnosis has to go,
and it cannot be filled with prose.

**Four refusals do the real work:**

- **No plan, no confirmed diagnosis.** Without one it says so, marks the finding *provisional*, and names the single command that would settle it. Provisional is an honest answer. Confident and unverified is not.
- **It will not connect to your production database.** It asks you to run the EXPLAIN, or suggests `auto_explain` so slow plans land in the server log by themselves.
- **It will not assert your ORM's behaviour from memory.** Relation-loading defaults and preview flags vary per project, so it reads your config. Code recommended against an unread config does not compile.
- **It will not fold a schema change into a query fix.** If the answer needs a migration, that is a schema decision, and it stops and hands it back to however your project decides those.

It also won't edit your application code as a side effect of a diagnosis. It proposes the change
inline for review.

## What changes in practice

**"This endpoint got slow. Why?"**

Without the skill, you get a confident, well-formatted answer immediately: add a composite index
on `(tenant_id, created_at)`, switch `include` to `select`, consider caching. Some of it is
probably right. None of it is evidence, and you cannot tell which part is which.

With it, the first move is to ask what you have. If you can produce a plan, the answer arrives
anchored to a line of it:

```
### Diagnosis
The tenant filter is not being used as an index seek — the bind parameter is a
number and the column is VarChar, so the cast lands on the column and the index is
skipped.

### Plan evidence
  Seq Scan on events  (cost=0.00..184232.11 rows=1 width=88)
                      (actual time=0.05..1284.66 rows=1 loops=1)
    Filter: ((tenant_id)::text = '4471'::text)
    Rows Removed by Filter: 2841903
```

That is a different kind of sentence. It names a cause, and the proof is quotable.

If you cannot produce a plan, it says so and gives you the command — rather than picking the
most likely-sounding of five possible causes and presenting it as the answer.

## ORM adapters

The skill picks one adapter from what is in your repo — a `schema.prisma`, a `medusa-config.ts`,
a dependency in `package.json` — and reads only that file. It never infers the ORM from the shape
of a query.

| Your stack | What happens |
|---|---|
| **Prisma** | [`orm-prisma.md`](skills/mw-query-plan/references/orm-prisma.md) — the four N+1 shapes and their fixes, `select` vs `include`, what `include` actually emits, why the `cursor:` helper is a hot-path trap, capturing the emitted SQL for EXPLAIN, `$transaction` |
| **Medusa v2** | [`orm-medusa.md`](skills/mw-query-plan/references/orm-medusa.md) — module services vs the Query graph, N+1 shapes, projection with `select`/`fields`, keyset through the service layer, the knex escape hatch, workflows over hand-rolled transactions |
| **Raw SQL or a plain driver** (`pg`, `asyncpg`, `psycopg`) | No adapter needed. This is the skill's native mode |
| **Any other ORM** — SQLAlchemy, Drizzle, TypeORM, Django, GORM | It says it has no adapter, works at the SQL level, and **declines to assert that ORM's behaviour**. Relation-loading defaults and cursor helpers are exactly where the traps live, and a confident guess about one is worse than nothing |

Everything above the adapter layer — plan reading, index selection, join algorithms, pagination,
the anti-pattern catalogue — is ORM-independent. That is roughly three quarters of the skill.

## Scope — Postgres only

`work_mem`, `BRIN`, `pg_stat_statements`, `auto_explain`, and the `EXPLAIN (ANALYZE, BUFFERS)`
syntax the whole method rests on are Postgres. On MySQL, SQLite or SQL Server the skill says so
and stops, rather than translating on the fly.

That refusal is deliberate. A skill built to stop guessing should not quietly start guessing at
the engine boundary.

## Host-project contract

The skill carries no facts about your project. It reads what it needs and asks for what it
cannot find.

| It needs | Where it looks | If it isn't there |
|---|---|---|
| How the app reaches the database | `package.json`, schema and config files | Asks |
| The schema — columns, types, existing indexes | Migrations, schema file, `\d+` output | Asks. Will not invent a column or claim an index exists |
| An EXPLAIN plan | You run it and paste it | Says so; marks the diagnosis provisional |
| The Postgres major version | `SELECT version();` | Declines version-gated advice — skip scan and `uuidv7()` are PG 18+, `MERGE` is PG 15+ |
| Where schema changes get decided | Your own docs and workflow | Stops at the boundary and hands the change back |

If your project documents its own conventions — a schema of record, data-access notes, a
performance budget — those outrank every default in the skill, and it tells you which one it
followed.

## Layout

```
skills/mw-query-plan/
  SKILL.md                    workflow, ladder, refusals, output format
  references/
    plans.md                  reading EXPLAIN; diagnostic SQL; auto_explain; version gates
    indexing.md               index types; composite column order; UUID keys; sargability
    joins.md                  join algorithms; CTE vs subquery vs LATERAL; window functions
    pagination.md             keyset vs offset; composite cursors
    antipatterns.md           18 shapes that pass review and break in production
    orm-prisma.md             Prisma adapter
    orm-medusa.md             Medusa v2 adapter
```

One task loads `SKILL.md` plus at most one reference.
