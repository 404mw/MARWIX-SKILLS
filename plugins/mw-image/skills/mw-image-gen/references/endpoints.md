# mw-image-gen — fal endpoint facts

> **Prices verified 2026-07-09.** When in doubt, the fal model page wins — check it
> before relying on any price below.

Endpoint IDs, prices, and request-parameter shapes. **These facts date fast**; each
entry below was verified against the live API on 2026-07-09 (IDs by empty-body probe,
schemas from fal's per-endpoint OpenAPI). Prices are for cost statements before the
user approves a batch; when in doubt, the fal model page wins.

## Verified endpoints

| Endpoint ID | Price | Size params | Notes |
|---|---|---|---|
| `fal-ai/flux-2/klein/4b` | ~$0.01/img | `image_size` {w,h} | drafts; `/base` and `/9b` variants exist; supports `num_inference_steps` |
| `fal-ai/flux/schnell` | $0.003/MP | `image_size` {w,h} | cheapest drafts; `negative_prompt` not supported |
| `fal-ai/flux-2-dev`, `fal-ai/flux-2/turbo` | check page | `image_size` {w,h} | mid-tier |
| `fal-ai/flux-2-pro` | $0.03/MP | `image_size` {w,h} | **no `num_images`** (script loops anyway); no seed variance controls beyond `seed`; **clamps output to ~4.1 MP** (observed 2026-07-10: 3072x1920 request returned 2352x1760, aspect not preserved) — request ≤4.1 MP sizes, e.g. 2560x1600 for 16:10 |
| `fal-ai/flux-2-pro/edit` | $0.03/MP | `image_size` {w,h} | edit; `image_urls` (array) required |
| `fal-ai/nano-banana-2` | ~$0.06/img | `aspect_ratio` + `resolution` enum `0.5K\|1K\|2K\|4K` | **no pixel `image_size`**; extras: `enable_web_search`, `thinking_level`, `system_prompt` |
| `fal-ai/nano-banana-2/edit` | ~$0.06/img | `aspect_ratio` + `resolution` | edit; `image_urls` (array); also accepts `pdf_url`/`video_url`/`audio_url` refs |
| `fal-ai/nano-banana-pro` | $0.15/img (1K/2K), $0.30/img (4K) | `aspect_ratio` + `resolution` (4K native) | final-render tier, text-to-image only |
| `fal-ai/nano-banana-pro/edit` | $0.15/img (1K/2K), $0.30/img (4K) | `aspect_ratio` + `resolution`; `image_urls` (array, required, up to ~14 refs) | edit/identity-lock at final-render tier |
| `fal-ai/gpt-image-2` | tiered by `quality` `auto\|low\|medium\|high` | `image_size` {w,h}, **capped ~1536×1024** | **no `seed` param**; each call varies on its own |
| `fal-ai/qwen-image` | ~$0.02/MP | `image_size` {w,h} | `negative_prompt` supported; LoRA support |
| `fal-ai/qwen-image-edit` | ~$0.02/MP | `image_size` {w,h} optional | edit; **singular `image_url`**, exactly one input |
| `fal-ai/ideogram/v3` | $0.03–0.09/img (`rendering_speed` `TURBO\|BALANCED\|QUALITY`) | `image_size` {w,h} | typography; `negative_prompt`, `style_codes`, `color_palette` |
| `fal-ai/recraft/v3/text-to-image` | $0.04 raster / $0.08 vector | `image_size` {w,h} | `style` enum incl. `vector_illustration`; **no seed** |
| `fal-ai/bytedance/seedream/v4/text-to-image` | ~$0.03–0.04/img | `image_size` {w,h} | `enhance_prompt_mode`; v5 was preview as of verification |

Family rules the generate script applies automatically:

- id contains `nano-banana` → `--aspect W:H --resolution 0.5K|1K|2K|4K`, never `--size`.
- id contains `gpt-image` → no seed is sent; `--quality` maps to the quality tier.
- `fal-ai/qwen-image-edit` → exactly one `--image`, sent as singular `image_url`.
- everything else → `--size WxH` becomes `image_size: {width, height}`.
- edit inputs: local files become base64 data URIs; http(s) URLs pass through.

Dimension snapping: flux-family endpoints round requested dimensions to multiples of
32 (observed live: 1280×720 requested → 1280×736 returned). The sidecar records the
actual output size; when an asset contract needs exact pixels, generate at the
snapped-safe size or crop in the conversion step (`--resize`).

## Billing model (verified 2026-07)

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
