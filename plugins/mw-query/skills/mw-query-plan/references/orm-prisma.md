# Adapter: Prisma

Load when the project uses Prisma — reviewing Prisma queries, hunting N+1, deciding `select`
vs `include`, or expressing keyset pagination through the client.

**Before recommending anything version-gated here, read the project's `package.json` for the
Prisma major version and its `schema.prisma` for enabled `previewFeatures`.** The notes below
describe Prisma 7 as of mid-2026. Say when a claim rests on that, and offer to verify rather
than asserting a stale fact.

---

## Prisma 7 facts

- **Query compiler:** TypeScript/WASM module on the JS main thread — no Rust engine binary. Performance is on par with Prisma 6 after warm-up (the "3x faster" figure from early preview marketing does not apply to steady-state queries).
- **Query plan caching (7.4+):** Prisma caches the *compiled query plan* per query shape — repeat queries with different params skip recompilation. It does **not** cache results. Free win, no config.
- **Driver adapters required:** the client connects through a JS driver adapter (e.g. `PrismaPg` wrapping `pg`). The connection string lives in `prisma.config.ts`, not the schema.

---

## N+1 patterns — the four canonical shapes

### 1. Loop-fetch-relation
```ts
// ❌
const users = await prisma.user.findMany();
for (const u of users) {
  u.posts = await prisma.post.findMany({ where: { userId: u.id } });
}
```
**Fix:** `include: { posts: true }` or `select: { ..., posts: { select: { ... } } }`.

### 2. Lazy field access in a render loop
Common when a function returns `User` and a caller does `user.organization.name`, triggering a separate query per user. Prisma doesn't do implicit lazy loading — but custom wrappers sometimes do. Audit any "smart" wrapper around the client.

### 3. Aggregate-per-row
```ts
// ❌
for (const u of users) {
  const count = await prisma.post.count({ where: { userId: u.id } });
}
```
**Fix:** single `groupBy`:
```ts
const counts = await prisma.post.groupBy({
  by: ['userId'],
  _count: { _all: true },
  where: { userId: { in: users.map(u => u.id) } },
});
```

### 4. Reverse relation walk
Fetching parents from children one at a time. Fix: collect parent IDs, single `findMany({ where: { id: { in: ids } } })`. Prisma's dataloader handles this automatically *only* for `findUnique` calls in the same tick — not for `findFirst` or `findMany`.

### Detection
- Log query counts per request — if a single request emits > 10 similar queries, that's the smell.
- Use the query event hook (see SQL capture below), or DB-side `pg_stat_statements` with the `calls` column exploding on one query shape.

---

## `select` vs `include`

- **`select`** — return only the listed fields. Smaller payload, faster serialization, narrower SQL projection.
- **`include`** — return *all* scalar fields plus the listed relations. Convenient, but ships every column.

**Rule:** prefer `select` in production code paths. Reach for `include` in prototypes or admin views.

Nest `select` inside `include` to limit relation payload:
```ts
prisma.user.findMany({
  include: { posts: { select: { id: true, title: true } } },
});
```

---

## Relation loading: what actually happens

**Default:** Prisma uses the **query strategy** — one SQL query per relation level, joined in the app. `include: { posts: true }` is two queries, not one JOIN. This is *not* an N+1 (it is O(depth), not O(rows)) but it does mean per-relation round trips.

**`relationLoadStrategy: "join"` is a Preview feature.** It requires `previewFeatures = ["relationJoins"]` in the generator block. **Read the project's `schema.prisma` before mentioning it** — with the flag off, per-query `relationLoadStrategy` options do not exist in the generated client, and recommending them produces code that will not compile.

If profiling shows the round trips hurt and enabling it is genuinely on the table, the caveats come first:

- `join` emits LATERAL plus JSON-aggregation SQL on Postgres — heavier DB CPU per query. Profile it; don't assume it wins.
- Any `cursor` argument silently falls back to the `query` strategy.
- Open concurrency bug with parallel `join` queries (prisma/prisma #28058).
- Enabling a preview flag edits the schema file. That is a schema decision, not a query fix — stop and route it the way the host project routes schema changes.

---

## Batching (`findUnique` only)

Prisma's dataloader batches `findUnique` calls fired in the same event-loop tick into one `IN (...)` query, automatically. `findFirst` and `findMany` do **not** batch.

---

## Keyset pagination — use an explicit `where`, not the `cursor:` helper

```ts
prisma.item.findMany({
  where: { tenantId, ...(cursor && { id: { lt: cursor } }) },
  orderBy: { id: 'desc' },
  take: 20,
});
```

Avoid Prisma's `cursor:` plus `skip: 1` helper on hot paths. Documented failure modes, verified
against prisma/prisma issues and still open as of mid-2026:

- **Missing LIMIT** — with `cursor` + `orderBy` + `take`, Prisma can emit SQL with **no `LIMIT` clause at all**, fetching a huge slice and pruning it in memory. Latency spikes, and OOM on big tables (issues #15710, #27094).
- **A deleted cursor row breaks the page** — the helper looks up the cursor row to learn its sort values; if that row was hard-deleted, pagination fails instead of continuing past it (issue #19159). An explicit `where` on the sort values has no such problem.
- **Falls out of the join strategy** — with the `relationJoins` preview enabled, any `cursor` forces a silent fallback to `relationLoadStrategy: "query"`.

For a composite sort key, encode **every sort column value** in the cursor token (e.g.
`{createdAt, id}`) and translate it to the tuple comparison in
[pagination.md](pagination.md) via raw SQL — Prisma's `where` API cannot express
`(a, b) < (x, y)` directly. Chained `OR`/`AND` conditions work but plan worse.

---

## Connection pool

One global `PrismaClient` per process. Multiple instances mean multiple pools mean exhausted DB connections. In Next.js dev mode, use the `globalThis` singleton pattern.

---

## Getting the SQL for EXPLAIN

To read the plan of a Prisma query you first need the SQL it actually emits:

```ts
const prisma = new PrismaClient({ log: [{ emit: 'event', level: 'query' }] });
prisma.$on('query', (e) => console.log(e.query, e.params));
```

- Substitute the logged params into the query, then run `EXPLAIN (ANALYZE, BUFFERS)` on it.
- The default strategy emits **several simple queries** for `include` or nested `select`. EXPLAIN the one that is actually slow — not a hand-written "equivalent" JOIN, which optimizes differently and will mislead you.
- **If the query event fires nothing** (reported intermittently under Prisma 7 driver adapters), capture on the DB side instead: `SET log_min_duration_statement = 0;` in a session and read the Postgres log, or find the query shape in `pg_stat_statements`.

---

## Raw SQL escape hatch

When the ORM gets in the way, use the **tagged-template** form of `$queryRaw`:

```ts
const rows = await prisma.$queryRaw<MyRow[]>`
  SELECT id, name FROM users WHERE tenant_id = ${tenantId} AND active
  ORDER BY id DESC LIMIT 20
`;
```

- The tagged template binds parameters safely. **Never** use `$queryRawUnsafe` with user input — that is SQL injection.
- Type the result row explicitly (`<MyRow[]>`); Prisma cannot infer it.
- Mind bind-parameter **types**: passing a JS number for a `VarChar` column forces an implicit cast that defeats the index. See [antipatterns.md](antipatterns.md) #16. Pass strings for string columns.

---

## `$transaction`

- **Interactive** — `prisma.$transaction(async (tx) => { ... })` supports control flow and holds row locks for the duration. It costs an open connection, so keep the block short.
- **Batched** — `prisma.$transaction([q1, q2, q3])` runs an array of queries in one transaction, sequentially. Cheaper, but no app-side logic in between.
- Nested savepoints are supported since 7.5.
