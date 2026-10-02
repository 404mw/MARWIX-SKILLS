# mw-image-gen — endpoint facts (fal and OpenAI)

> **Prices re-read 2026-09-09; the GPT-Image rows and the OpenAI-direct section
> re-verified 2026-09-20.** When in doubt, the provider's own model page wins — check
> it before relying on any price below.
>
> **Every row above the OpenAI-direct section describes fal's hosted copy.** The same
> model reached through OpenAI's own API has a different id, a different billing
> model and a different default quality. Never state a price without knowing which
> path it was read from.

Endpoint IDs, prices, and request-parameter shapes. **These facts date fast.** The
2026-07-09 pass verified IDs by empty-body probe and schemas from fal's per-endpoint
OpenAPI; the 2026-09-09 pass re-read prices, size limits and parameters off each
model's own fal page (`https://fal.ai/models/<id>`, and its `/api` tab for schemas)
without re-probing. Prices are for cost statements before the user approves a batch;
when in doubt, the fal model page wins.

## Verified endpoints

| Endpoint ID | Price | Size params | Notes |
|---|---|---|---|
| `fal-ai/flux-2/klein/4b` | $0.005/MP | `image_size` {w,h} | drafts; `/base` and `/9b` variants exist; supports `num_inference_steps` |
| `fal-ai/flux/schnell` | $0.003/MP | `image_size` {w,h} | cheapest drafts; `negative_prompt` not supported |
| `fal-ai/flux-2-dev`, `fal-ai/flux-2/turbo` | check page | `image_size` {w,h} | mid-tier; not re-checked 2026-09 |
| `fal-ai/flux-2-pro` | $0.03 first MP, then $0.015/MP (rounded up) | `image_size` {w,h} | **no `num_images`** (script loops anyway); no seed variance controls beyond `seed`; **clamps output to ~4.1 MP** (observed 2026-07-10: 3072x1920 request returned 2352x1760, aspect not preserved) — request ≤4.1 MP sizes, e.g. 2560x1600 for 16:10 |
| `fal-ai/flux-2-pro/edit` | $0.03 first MP, then $0.015/MP | `image_size` {w,h} | edit; `image_urls` (array) required, up to 9 refs |
| `fal-ai/flux-2-flex`, `fal-ai/flux-2-flex/edit` | $0.05/MP on input **and** output | `image_size` {w,h} | step and guidance control; the typography-strongest flux variant; edit takes up to 10 refs |
| `fal-ai/nano-banana-2` | $0.08/img at 1K; 0.5K ×0.75, 2K ×1.5, 4K ×2; `enable_web_search` +$0.015, high thinking +$0.002 | `aspect_ratio` + `resolution` enum `0.5K\|1K\|2K\|4K` | **no pixel `image_size`**; extras: `enable_web_search`, `thinking_level`, `system_prompt`; ratios `auto,21:9,16:9,3:2,4:3,5:4,1:1,4:5,3:4,2:3,9:16` |
| `fal-ai/nano-banana-2/edit` | same as above | `aspect_ratio` + `resolution` | edit; `image_urls` (array, up to 14 refs); also accepts `pdf_url`/`video_url`/`audio_url` refs |
| `fal-ai/nano-banana-pro` | $0.15/img (1K/2K), $0.30/img (4K) | `aspect_ratio` + `resolution` (4K native) | final-render tier, text-to-image only |
| `fal-ai/nano-banana-pro/edit` | $0.15/img (1K/2K), $0.30/img (4K) | `aspect_ratio` + `resolution`; `image_urls` (array, required, up to ~14 refs) | edit/identity-lock at final-render tier |
| `openai/gpt-image-2.5/flare/text-to-image` | per image, size × `quality`: 1024×768 $0.00402 / $0.00903 / $0.03612 / $0.06420 / $0.14445 (low/medium/high/xhigh/max); 1920×1080 $0.00441 / $0.01029 / $0.03960 / $0.07041 / $0.15840; 3840×2160 $0.01113 / $0.02595 / $0.10008 / $0.17790 / $0.40026 | `image_size`: preset (`square_hd, square, portrait_4_3, portrait_16_9, landscape_4_3, landscape_16_9, auto`) or {w,h} — **multiples of 16, max edge 3840, aspect ≤3:1, 655,360–8,294,400 px** | speed-first mode. **No `seed`, no `negative_prompt`, no `input_fidelity`**; `quality` `auto\|low\|medium\|high\|xhigh\|max` (default `high`); `background` `auto\|transparent\|opaque`; `num_images`; `output_format` `jpeg\|png\|webp` |
| `openai/gpt-image-2.5/flare/edit` | **not the same table — edit adds ~$0.0082 per reference image** on top of the text-to-image price at every size (1024×768 $0.0445 vs $0.0362 at `high`; 1024×1024 $0.0610 vs $0.0528; 3840×2160 $0.1084 vs $0.1002). Re-read 2026-09-20 | `image_size` as above (default `auto`) | edit; `image_urls` (array, **max 16**); optional `mask_url` for true inpainting |
| `openai/gpt-image-2.5/sunburst/text-to-image` | same published table as flare | as flare | precision mode: finer detail, closer reference adherence, slower |
| `openai/gpt-image-2.5/sunburst/edit` | same published table as flare's **edit** row, including the per-reference surcharge | as flare | edit scoped tightly to the instruction across many revision rounds |
| `fal-ai/gpt-image-2` (+`/edit`) | 1024×768 $0.005 / $0.037 / $0.145 (low/medium/high), 3840×2160 $0.012 / $0.101 / $0.401 | `image_size` {w,h}, max edge 3840 | **superseded by gpt-image-2.5**, still live. **No `seed` param**; page header shows `openai/gpt-image-2`, the queue sample still shows `fal-ai/gpt-image-2` — the old id was the one probed live in 2026-07 |
| `fal-ai/qwen-image-2/text-to-image`, `/pro/text-to-image`, `/edit`, `/pro/edit` | $0.035/img · $0.075 pro | `image_size` preset or {w,h}, native up to 2048×2048 | `negative_prompt` supported. **A deprecation banner was on the model page on 2026-09-09 while the product page still listed all four — confirm before routing** |
| `fal-ai/qwen-image` | $0.02/MP | `image_size` {w,h} | v1, still live; `negative_prompt` supported; LoRA support |
| `fal-ai/qwen-image-edit` | $0.02/MP | `image_size` {w,h} optional | edit; **singular `image_url`**, exactly one input |
| `ideogram/v4` | $0.03/MP turbo · $0.06 balanced · $0.10 quality; +$0.03 when prompt expansion runs | native 2K | **supersedes `fal-ai/ideogram/v3`**; typography-first, native transparency |
| `fal-ai/recraft/v4/text-to-image` | $0.04 raster · $0.25 raster pro · $0.08 vector · $0.30 vector pro | `image_size` {w,h} | **supersedes `fal-ai/recraft/v3/text-to-image`**; `style` enum incl. vector output |
| `bytedance/seedream/v5/pro/text-to-image` | $0.0675/img up to 1536×1536, $0.135/img up to 2048×2048 | `image_size` {w,h}, max 2048×2048 | **supersedes the v4 endpoint**; native text in 14 languages, dense structured layouts |
| `bytedance/seedream/v5/lite/text-to-image` | $0.035/img | `image_size` {w,h}, up to 3072×3072 | cheaper Seedream tier; `.../v5/lite/edit` is the edit id (up to 10 refs) |

## The OpenAI path (`--provider openai`) — verified 2026-09-20

The GPT-Image models are reachable two ways, and **everything above describes fal's
hosted copy.** The table below is the direct API. Route deliberately: fal keeps one
key, one bill and one parameter shape across the whole roster; OpenAI direct gives
per-token billing you can audit, `/v1/images/edits` semantics, and no middleman.

| | fal | OpenAI direct |
|---|---|---|
| Model id | `openai/gpt-image-2.5/flare/text-to-image` | `gpt-image-2.5-flare` (dated snapshot: `gpt-image-2.5-flare-2026-09-08`) |
| Key | `FAL_KEY`, `Authorization: Key …` | `OPENAI_API_KEY`, `Authorization: Bearer …` |
| Endpoint | `POST https://fal.run/<id>` | `POST https://api.openai.com/v1/images/generations` · `/edits` |
| Billing | per image, size × quality | **per token**: $30/M image output, $8/M image input ($2 cached), $5/M text input ($1.25 cached) |
| `quality` default | `high` | **`auto`** — re-picks the tier per request |
| Size | `image_size` preset or `{w,h}` | `size: "WxH"` string |
| Size limits | multiples of 16, max edge 3840, aspect ≤3:1, 655,360–8,294,400 px | **identical** |
| Edit shape | JSON, `image_urls` array of data URIs | `multipart/form-data`, repeated `image[]` parts |
| Response | `images[].url` | `data[].b64_json` + a `usage` block |
| Seed / negative prompt | neither | neither |

**Custom sizes work on both, including on `/v1/images/edits`.** `1024x1280` (4:5) was
verified live on the direct API on 2026-09-20 and returned exactly 1024×1280. Do not
assume the three recommended sizes (`1024x1024`, `1536x1024`, `1024x1536`) are the only
ones accepted — they are recommendations, not an enum. Resolutions above 2560×1440 are
documented as experimental.

**Always send `quality` explicitly on this path.** The `auto` default picks a tier per
request, and output tokens track the tier — roughly 160 at `low`, ~340 at `medium`,
~1,370 at `high` for a portrait render. That is an 8× spread on requests that are
otherwise identical, and it is the whole reason a per-batch cost estimate on this path
is a range rather than a number. The generate script refuses to run without `--quality`.

The `usage` block, verified live:

```json
"usage": {
  "input_tokens": 9,
  "input_tokens_details": { "text_tokens": 9, "image_tokens": 0 },
  "output_tokens": 173,
  "output_tokens_details": { "text_tokens": 0, "image_tokens": 173 },
  "total_tokens": 182
}
```

The sidecar stores this verbatim alongside a computed `estimated_cost_usd`. Keep the
raw block: the rates decay like every other price here, and a run priced only as a
dollar figure cannot be re-checked once the numbers move.

Family rules the generate script applies automatically:

- id contains `nano-banana` → `--aspect W:H --resolution 0.5K|1K|2K|4K`, never `--size`.
- id contains `gpt-image` → no seed is sent; `--quality` maps to the quality tier
  (`auto|low|medium|high` on gpt-image-2, plus `xhigh|max` on gpt-image-2.5). The
  published size window is validated locally before the call, so an out-of-range
  size fails free instead of being silently substituted.
- `--provider openai` → hyphenated model id, `OPENAI_API_KEY`, `size` as a string,
  edits as multipart. A slash-path id passed here (or a hyphenated id passed to fal)
  is rejected before the request, since it would otherwise return a 404 that reads
  like an outage.
- `fal-ai/qwen-image-edit` → exactly one `--image`, sent as singular `image_url`.
- everything else → `--size WxH` becomes `image_size: {width, height}`.
- edit inputs: local files become base64 data URIs; http(s) URLs pass through.

Dimension snapping: flux-family endpoints round requested dimensions to multiples of
32 (observed live: 1280×720 requested → 1280×736 returned). The sidecar records the
actual output size; when an asset contract needs exact pixels, generate at the
snapped-safe size or crop in the conversion step (`--resize`).

## Cached price lookups — filesystem only

A live price lookup costs the user time and tokens, so it is worth doing once instead
of every session.

**Before any lookup, check for a cache.** Look for `.mw-image/engine-prices.md` in the
host project. If it exists, read it and use it — and **state its fetch date out loud
every time**, in the same breath as the numbers: "$0.03/MP, from a lookup on
2026-08-14." A price whose age is not stated is a price presented as current.

**After a lookup, offer to write one.** Creating a file in someone's repository is a
change they did not ask for, so propose it and take a no for an answer:

```
Fetched current prices for 3 models. Save them to .mw-image/engine-prices.md so
the next session doesn't have to look them up again?
```

Write the fetch date, one row per endpoint, and the source URL for each — a cached
number without its source cannot be re-checked, only re-trusted.

**A cache ages exactly like this file does.** It is a saved lookup, not a source of
truth, and it decays from its own fetch date onward:

- Always state the age with the number. Never present a cached figure bare.
- **Re-offer a lookup before any final-tier batch.** Draft and iteration tiers are
  cheap enough that a stale estimate costs little; a final render is where a wrong
  number becomes a wrong decision.

If the host project's docs name a different location for generated artifacts, put the
cache there instead — the host contract wins over the default path.

## Billing model (verified 2026-07, not re-checked 2026-09)

Billed per output image or per megapixel of output. Queue wait time is free; failed
requests are not billed. There is no batch discount: N images cost N × the unit
price, so batching is a workflow choice, not a savings. Sync `fal.run` is fine at
interactive scale; the queue API (`queue.fal.run` + webhooks) exists for volume
reliability, not price.

## Adding or re-verifying an endpoint

1. **Existence probe (free):** empty-body POST to `https://fal.run/<id>` with the
   key. `422` = valid endpoint (validation error), `404` = wrong id, `401` = bad key.
2. **Schema:** `https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=<id>` —
   read the `*Input` schema for required fields and size-param shape.
3. **Price:** the fal model page for the id.
4. Add the row above with a fresh verification date; if the size-param shape is a new
   family, extend the family rules in `scripts/generate.mjs` too.

The 2026-09-09 pass used step 3 only (fal model and `/api` pages). Anything it marks
"not re-checked" still carries its 2026-07-09 value.
