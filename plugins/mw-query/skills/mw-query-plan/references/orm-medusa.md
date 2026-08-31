# Adapter: Medusa v2

Load when the project is a Medusa v2 backend — reviewing a module-service query or a Query
graph fetch, hunting N+1, deciding what to `select` or load as `relations`, or dropping to raw
SQL.

Medusa v2 sits on Postgres via MikroORM and a knex connection. Everything here maps back to
the SQL the service emits, so **capture that SQL before you EXPLAIN** — see
[plans.md](plans.md). You optimize the SQL, not the method call.

---

## The two ways to read data

1. **Module service methods** — `list*`, `listAndCount*`, `retrieve*`, generated per data model
   (e.g. `productModuleService.listProducts(filters, config)`). Best for data owned by one
   module.
2. **Query graph** — `query.graph({ entity, fields, filters, pagination })` resolves fields
   **across module links** in one call. Use it when the data spans modules, instead of fetching
   from each module separately and stitching in app code.

Both accept a **`fields`/`select`** projection and **`relations`**. Use them. The default —
hydrate the whole entity and every relation — is the usual source of slow, wide queries.

---

## N+1 — the canonical shapes and their Medusa fixes

### 1. Loop-fetch-relation
```ts
// ❌ one query for the list, then one per row
const requests = await customRequestService.listCustomRequests({ customer_id })
for (const r of requests) {
  r.images = await customRequestService.listImages({ request_id: r.id })
}
```
**Fix:** load the relation with the list —
`listCustomRequests({ customer_id }, { relations: ["images"] })` — or use `query.graph` with
`fields: ["id", "images.*"]`.

### 2. Aggregate-per-row
```ts
// ❌ a count query per parent
for (const c of customers) {
  c.orderCount = await orderService.listAndCountOrders({ customer_id: c.id })[1]
}
```
**Fix:** one grouped query. If the service cannot express `GROUP BY`, drop to raw SQL —
`SELECT customer_id, count(*) ... WHERE customer_id = ANY($1) GROUP BY customer_id` — and map
the result back in app code.

### 3. Reverse relation walk
Fetching parents from children one at a time. **Fix:** collect the parent ids, issue one
`list({ id: parentIds })` so it becomes `WHERE id = ANY($1)`, then join in memory.

### 4. Hidden lazy access in a wrapper
A "smart" service or helper that fetches a relation on property access fires a query per access
inside a render or loop. Audit any custom wrapper around a module service.

### Detection
- Enable query logging and **count queries per request**. A single request emitting more than
  about ten similar statements is the smell.
- `pg_stat_statements` shows the repeated statement with a high `calls` count.

---

## Projection: `select`/`fields` versus the full entity

- Pass an explicit **`select`** (service) or **`fields`** (Query graph) listing only the columns
  the caller actually uses. A smaller projection means narrower SQL, less serialization, and a
  smaller payload to the client.
- Loading a **relation** pulls that relation's rows. On hot paths, list only the relation fields
  you use — `"images.url"`, not `"images.*"`.
- **Rule:** explicit projection on request paths. Full hydration is acceptable only for admin
  views and prototypes.

---

## Load strategy: join versus separate queries

Loading `relations` typically emits a join, or a follow-up `IN (...)` per relation. Most of the
time that is correct. Split into **separate queries merged in app code** only when both hold:

- the join produces a large intermediate result that hurts DB CPU, **and**
- profiling shows N small indexed lookups beat the one wide join.

Decide from the plan, not from intuition, and do not override the default without one.

---

## Keyset pagination

Express the cursor as an explicit filter on the indexed sort column rather than `skip`:

```ts
// First page: no cursor. Next page: pass the last id seen as `cursor`.
const items = await itemService.listItems(
  { ...(cursor && { id: { $lt: cursor } }) },   // keyset predicate
  { order: { id: "DESC" }, take: 20, select: ["id" /* + needed fields */] }
)
const nextCursor = items.at(-1)?.id
```

Needs an index on the sort column — `(created_at DESC, id DESC)` for a composite key; see
[pagination.md](pagination.md).

Do **not** reach for `skip`-based paging on hot or large lists: `take`/`skip` maps to
`OFFSET`/`LIMIT` and dies on deep pages. `listAndCount*` with `skip` is fine for small admin
tables with page numbers; keyset is for infinite scroll and anything large. If the data layer
cannot express the keyset predicate, drop to raw knex with the row-constructor comparison
`(created_at, id) < (?, ?)`.

---

## Raw SQL escape hatch (knex)

When the service or Query graph cannot express it — complex aggregates, window functions:

```ts
const knex = container.resolve("__pg_connection__") // Medusa's knex instance
const rows = await knex.raw(
  `SELECT customer_id, count(*) AS n
     FROM "order"
    WHERE customer_id = ANY(?)
    GROUP BY customer_id`,
  [customerIds]            // BOUND parameter — never string-concatenate user input
)
```

- **Always bind parameters** (`?`, `= ANY(?)`). String-concatenated SQL is an injection
  vulnerability, not merely a style problem.
- Keep raw SQL in the module's service rather than in API routes, so it stays testable and
  reusable.
- Raw reads bypass module-link resolution — you own correctness across module boundaries.

---

## Transactions and atomicity

- Use a **transactional context** (`@InjectTransactionManager`, or the service's transaction
  wrapper) for multi-write operations — order plus inventory plus payment record — so they are
  all-or-nothing.
- For multi-step business operations spanning modules, prefer a **Medusa workflow** with
  compensation steps over a hand-rolled transaction. The workflow rolls back cleanly on failure.
- Keep transactions **short**. They hold a connection, and long work inside one starves the pool.

---

## Connection pool

Medusa manages one Postgres connection pool per process. Don't open ad-hoc clients or pools in
module or route code — resolve the shared knex connection from the container. Extra pools
exhaust Postgres connections under load.

---

## Migrations

Migrations go through the Medusa CLI (`npx medusa db:*`). Never hand-edit an applied migration.
A fix that needs a data-model change is a schema decision, not a query fix — stop and route it
the way the host project routes schema changes.
