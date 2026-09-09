# mw-image-gen — fal endpoint facts

> **Prices re-read 2026-09-09.** When in doubt, the fal model page wins — check it
> before relying on any price below.

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
| `openai/gpt-image-2.5/flare/edit` | same table as above | `image_size` as above (default `auto`) | edit; `image_urls` (array, **max 16**); optional `mask_url` for true inpainting |
| `openai/gpt-image-2.5/sunburst/text-to-image` | same published table as flare | as flare | precision mode: finer detail, closer reference adherence, slower |
| `openai/gpt-image-2.5/sunburst/edit` | same published table as flare | as flare | edit scoped tightly to the instruction across many revision rounds |
| `fal-ai/gpt-image-2` (+`/edit`) | 1024×768 $0.005 / $0.037 / $0.145 (low/medium/high), 3840×2160 $0.012 / $0.101 / $0.401 | `image_size` {w,h}, max edge 3840 | **superseded by gpt-image-2.5**, still live. **No `seed` param**; page header shows `openai/gpt-image-2`, the queue sample still shows `fal-ai/gpt-image-2` — the old id was the one probed live in 2026-07 |
| `fal-ai/qwen-image-2/text-to-image`, `/pro/text-to-image`, `/edit`, `/pro/edit` | $0.035/img · $0.075 pro | `image_size` preset or {w,h}, native up to 2048×2048 | `negative_prompt` supported. **A deprecation banner was on the model page on 2026-09-09 while the product page still listed all four — confirm before routing** |
| `fal-ai/qwen-image` | $0.02/MP | `image_size` {w,h} | v1, still live; `negative_prompt` supported; LoRA support |
| `fal-ai/qwen-image-edit` | $0.02/MP | `image_size` {w,h} optional | edit; **singular `image_url`**, exactly one input |
| `ideogram/v4` | $0.03/MP turbo · $0.06 balanced · $0.10 quality; +$0.03 when prompt expansion runs | native 2K | **supersedes `fal-ai/ideogram/v3`**; typography-first, native transparency |
| `fal-ai/recraft/v4/text-to-image` | $0.04 raster · $0.25 raster pro · $0.08 vector · $0.30 vector pro | `image_size` {w,h} | **supersedes `fal-ai/recraft/v3/text-to-image`**; `style` enum incl. vector output |
| `bytedance/seedream/v5/pro/text-to-image` | $0.0675/img up to 1536×1536, $0.135/img up to 2048×2048 | `image_size` {w,h}, max 2048×2048 | **supersedes the v4 endpoint**; native text in 14 languages, dense structured layouts |
| `bytedance/seedream/v5/lite/text-to-image` | $0.035/img | `image_size` {w,h}, up to 3072×3072 | cheaper Seedream tier; `.../v5/lite/edit` is the edit id (up to 10 refs) |

Family rules the generate script applies automatically:

- id contains `nano-banana` → `--aspect W:H --resolution 0.5K|1K|2K|4K`, never `--size`.
- id contains `gpt-image` → no seed is sent; `--quality` maps to the quality tier
  (`auto|low|medium|high` on gpt-image-2, plus `xhigh|max` on gpt-image-2.5).
- `fal-ai/qwen-image-edit` → exactly one `--image`, sent as singular `image_url`.
- everything else → `--size WxH` becomes `image_size: {width, height}`.
- edit inputs: local files become base64 data URIs; http(s) URLs pass through.

Dimension snapping: flux-family endpoints round requested dimensions to multiples of
32 (observed live: 1280×720 requested → 1280×736 returned). The sidecar records the
actual output size; when an asset contract needs exact pixels, generate at the
snapped-safe size or crop in the conversion step (`--resize`).

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
