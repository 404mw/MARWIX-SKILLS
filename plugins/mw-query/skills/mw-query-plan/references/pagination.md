# Reference: Pagination

Load when designing list endpoints, cursors, or anywhere `OFFSET`/`LIMIT` shows up.

---

## Strategy selection

| Strategy | Use when | Don't use when |
|---|---|---|
| **Keyset (cursor on indexed column)** | Infinite scroll, APIs, sync pipelines, anything sequential | User needs to jump to page 47 of 200 |
| **Offset/Limit** | Small total result (< 1000 rows), admin pages with page numbers | Hot paths, large tables, public APIs |
| **Approximate count + keyset** | Need page count *and* deep pagination | You need exact counts on huge tables |

---

## Why OFFSET dies

`OFFSET 100000 LIMIT 20` makes Postgres scan and discard 100,000 rows. With a million rows, it's ~100x slower than keyset. It also has a **correctness** bug: if a row gets deleted between page fetches, the next page silently skips one.

---

## Keyset pattern (simple, single-column sort key)

```sql
-- First page
SELECT id, ... FROM items
WHERE tenant_id = $1
ORDER BY id DESC
LIMIT 20;

-- Next page: pass the last id from previous page as $cursor
SELECT id, ... FROM items
WHERE tenant_id = $1 AND id < $cursor
ORDER BY id DESC
LIMIT 20;
```
Needs index: `(tenant_id, id DESC)`.

---

## Keyset pattern (composite sort, e.g. created_at + id tiebreaker)

```sql
SELECT id, ... FROM items
WHERE tenant_id = $1
  AND (created_at, id) < ($cursor_ts, $cursor_id)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```
Row constructor `(a, b) < (x, y)` is **lexicographic** and uses a composite index `(tenant_id, created_at DESC, id DESC)`.

---

## Expressing keyset through an ORM

Every ORM has a cursor or pagination helper, and they differ in whether they emit the
predicate above or something worse. Two rules hold everywhere:

1. **Express the cursor as an explicit filter on the indexed sort column** (`WHERE id < ?`),
   not as a `skip`/`offset` count.
2. **Encode every sort column in the cursor token.** A cursor carrying only `id` cannot
   resume a `created_at DESC, id DESC` sort correctly.

The helper-specific traps — and which helpers to avoid on hot paths — are in the ORM adapter:
[orm-prisma.md](orm-prisma.md), [orm-medusa.md](orm-medusa.md).

If the data layer cannot express the tuple comparison `(a, b) < (x, y)`, drop to raw
parameterised SQL for that one query rather than chaining `OR`/`AND` conditions, which plan
worse.
