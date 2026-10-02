# mw-image-prompt — Model roster, routing and cost

> **These facts date fast.** Capabilities and limits were read between 2026-09-09 and
> 2026-10-02 off each model's own page or its maker's docs; Midjourney's were read from
> third-party guides, since its own docs refuse automated reads — confirm anything
> load-bearing in the app. When a model changes, update this file; the doctrine in
> SKILL.md and engines.md does not change with it.
>
> **Prices are indicative API rates, for comparing models against each other — never a
> quote.** They were read on 2026-09-09 and decay from that date. Web apps bill by
> subscription or plan quota, not per image. If the user wants real numbers, send them
> to the provider's pricing page, or offer a live lookup where web access exists — and
> say how many lookups it will take before running them.

## Contents

- Where people generate
- The roster
- Routing
- One line

## Where people generate

Ask which of these the user already has before recommending anything else: the best
model is usually the one they already pay for, encoded well.

| Surface | Models | Set outside the prompt | Goes into the prompt instead |
|---|---|---|---|
| **ChatGPT** — web, desktop, mobile; every plan, Free included, since 2026-09-08 ("ChatGPT Images 2.5") | GPT-Image-2.5 | attached images; select-area edits | ratio, size intent, quality intent, exclusions — there is no quality, seed or negative field |
| **Gemini app** — web, mobile | Nano Banana 2, Nano Banana Pro | attached images | ratio and resolution intent, exclusions |
| **Midjourney** — web app, Discord | V8.2 (default), V7, Niji | parameters in the prompt (`--ar`, `--raw`, `--s`, `--hd`, `--no`, `--sref`…), web toggles | — parameters *are* the settings. No public API |
| **Model makers' own apps** — ideogram.ai, recraft.ai and similar | Ideogram 4, Recraft V4 | whatever the app exposes: ratio, style, often a negative field | anything it doesn't expose |
| **APIs** — OpenAI, Google AI Studio / Vertex, Black Forest Labs, and hosted model APIs such as fal or Replicate | every model below except Midjourney | size, quality tier, count, seed, negative prompt and mask where the model has them | the rest |

## The roster

Families are defined in [engines.md](engines.md); the family decides the encoding.

| Model | Family | Reach it via | Niche | Limits that gate routing | Indicative API price |
|---|---|---|---|---|---|
| FLUX.2 klein 4B | diffusion | APIs | drafts, gray-box comps, simple graphics | — | ~$0.005/MP |
| FLUX.1 schnell | diffusion | APIs | throwaway composition drafts | no negative field | ~$0.003/MP |
| FLUX.2 pro | diffusion | APIs | **default for text-free photoreal / atmospheric production art**; up to 9 references | clamps output near 4.1 MP (observed) | ~$0.03 first MP, then $0.015/MP |
| FLUX.2 flex | diffusion | APIs | step and guidance control; the flux line's typography variant; up to 10 references | — | ~$0.05/MP, input and output |
| Nano Banana 2 (`gemini-3.1-flash-image`) | reasoning | Gemini app, Google AI Studio / Vertex, hosted APIs | composition planning, character consistency, up to 14 references, search-grounded data, localization | ratios `21:9` … `9:16`; 0.5K–4K; 4K may letterbox 16:9 with seam bands ~12% from the edges | ~$0.08 an image at 1K |
| Nano Banana Pro (`gemini-3-pro-image`) | reasoning | Gemini app, Google AI Studio / Vertex, hosted APIs | top-end final render, native 4K, legible multilingual text | — | ~$0.15 at 1K–2K, $0.30 at 4K |
| GPT-Image-2.5 Flare | GPT-Image | ChatGPT, OpenAI API, hosted APIs | speed-first: dense text and precise layout at everyday cost | aspect ≤3:1; max edge 3840; multiples of 16; 0.66–8.29 MP; above 2560×1440 experimental | ~$0.004 `low` → ~$0.036 `high` at 1024×768 |
| GPT-Image-2.5 Sunburst | GPT-Image | OpenAI API, hosted APIs (which mode ChatGPT uses per request is not documented) | precision: fine detail, closest reference adherence, slower | as Flare | same table as Flare |
| Midjourney V8.2 | Midjourney | web app, Discord — **no API** | aesthetic range, look exploration, style references, personalization | `--ar` ≤14:1, ≤4:1 with `--hd`; `--hd` gives native 2048px; short text only; not character-consistent | subscription GPU time; `--hd` costs ~1.6× SD |
| Seedream 5.0 Pro / Lite | not characterized | hosted APIs | dense structured layouts, native text in 14 languages | Pro ≤2048×2048; Lite ≤3072×3072 | Pro ~$0.07–0.14, Lite ~$0.035 an image |
| Seedream 4.5 | not characterized | hosted APIs | cheap photoreal | — | ~$0.04 an image |
| Ideogram 4 | typography-first | ideogram.ai, its API, hosted APIs | posters, logos, big headlines; native 2K; native transparency | — | ~$0.03/MP turbo · $0.06 balanced · $0.10 quality |
| Recraft V4 | typography-first | recraft.ai, its API, hosted APIs | **the vector-output option**; typography | — | ~$0.04 raster · $0.08 vector; pro tiers higher |
| Qwen Image 2.0 / Pro | diffusion | hosted APIs | dense in-image text plus a real negative field, cheap | a deprecation banner sat on its page on 2026-09-09 — confirm it is live | ~$0.035 · $0.075 pro |

## Routing

**First, the user's surfaces.** Route within what they already have — ChatGPT means
GPT-Image-2.5, Gemini means Nano Banana, Midjourney means V8.2. Recommend something
outside their tools only when the job needs it (vector output, exact pixel sizes for a
layered asset, a negative field the brief depends on) — and say why, and what it costs.

**Then the resolution gate.** Lock the target size (from the asset contract or the
platform ratio) before weighing quality: a model that cannot hit it is out however good
it is. GPT-Image-2.5 refuses past 3:1, so a 21:9 banner is out; Seedream 5.0 Pro stops
at 2048×2048; Midjourney HD stops at 4:1. Megapixel-priced models get their cost
estimated from the exact dimensions, and the deliverable records the size and the model
it forced.

**Production assets (text-free scene art, backgrounds, parallax layers):**

| Job | Model | Why |
|---|---|---|
| Composition drafts, gray-box comps | **FLUX.2 klein 4B** (schnell if cheaper is fine) | intact fundamentals at the bottom of the price range |
| Photoreal / atmospheric final layers — the default | **FLUX.2 pro** | production-grade without tuning |
| Deep low-key / near-black fields (dark fog, void layers) | **Nano Banana 2** | flux-class lifts near-black scenes toward gray even through darkening edits (observed 2026-07-10, 2 assets × 2 attempts); NB2 holds ink-level darkness |
| Complex composition, or a recurring character in-scene | **Nano Banana 2** | plans composition, holds character consistency |
| Top-end final render (large format, or contains a face) | **Nano Banana Pro** | native 4K, one render only per the cost ladder |
| Photoreal final where prompt adherence matters more than tuning | **Seedream 5.0 Pro** | rated level with FLUX.2 pro on photorealism; stops at 2048×2048 |
| A look nobody has pinned down yet; stylized key art | **Midjourney V8.2** | widest aesthetic range; `--sref` locks a found look into a series |
| Seamless tiling textures | **Midjourney V7** with `--tile` | `--tile` is not supported on V8.2 |

**Promotional imagery:**

| Job | Model | Why |
|---|---|---|
| Single-subject covers, character scenes | **Nano Banana 2** | fast, strong on single-scene briefs and character consistency |
| Edits, variations, expression swaps | **Nano Banana 2** | editing preserves everything unnamed; describe only the change |
| Data-grounded infographics (real stats, real dates) | **Nano Banana 2** | pulls live data from search instead of inventing it — still verify every figure |
| Text localization | **Nano Banana 2** | translates and swaps in-image text natively |
| Dense text: carousels, multi-label diagrams | **GPT-Image-2.5 Flare** | an independent 14-call test returned four text blocks at three sizes correctly spelled at every tier, down to an 8px line |
| Multi-element layouts (3+ elements placed precisely) | **GPT-Image-2.5 Flare** | complex layouts, natural lighting, rich textures |
| Multi-reference composites (character + logo + product) | **GPT-Image-2.5** edit | many references, each assignable a role — subject, style, clothing, background |
| Identity-critical character work | **GPT-Image-2.5 Sunburst** | OpenAI routes here when "reference images must be followed closely" |
| Editorial / mood-led covers where look beats text | **Midjourney V8.2** | aesthetic strength; keep in-image text to a word or two, or composite it |
| Posters, logos, big headlines | **Ideogram 4** · **Recraft V4** (vector) · **Qwen Image 2.0** | typography specialists, often cheaper than GPT-Image-2.5 for text alone |

GPT-Image-2.5 earns its cost when dense text and precise multi-element layout are needed
*in the same image* — though at `low` it now undercuts the typography specialists, so
the old "GPT is the expensive one" reflex is worth re-testing per job.

## One line

*Use what the user has · production art → flux-class (klein drafts, pro finals), Nano
Banana when composition, darkness or characters demand it · character scenes, edits,
grounded data, localization → Nano Banana 2 · dense text plus precise layout,
multi-reference composites → GPT-Image-2.5 Flare · identity-critical finals →
GPT-Image-2.5 Sunburst · look exploration and stylized art → Midjourney V8.2 ·
typography-first → Ideogram 4 / Recraft V4 / Qwen 2.0.*

---

### Sources consulted

Prices, limits and reference counts were read on 2026-09-09 off each model's page on
fal, a hosted API that lists most of this roster in one place:
[FLUX.2 klein 4B](https://fal.ai/models/fal-ai/flux-2/klein/4b) ·
[FLUX.1 schnell](https://fal.ai/models/fal-ai/flux/schnell) ·
[FLUX.2 pro](https://fal.ai/models/fal-ai/flux-2-pro) ·
[FLUX.2 flex](https://fal.ai/models/fal-ai/flux-2-flex) ·
[Nano Banana 2](https://fal.ai/models/fal-ai/nano-banana-2) ·
[Nano Banana Pro](https://fal.ai/models/fal-ai/nano-banana-pro) ·
[GPT-Image-2.5 Flare](https://fal.ai/models/openai/gpt-image-2.5/flare/text-to-image) ·
[GPT-Image-2.5 Sunburst](https://fal.ai/models/openai/gpt-image-2.5/sunburst/text-to-image) ·
[Seedream 5.0 Pro](https://fal.ai/models/bytedance/seedream/v5/pro/text-to-image) ·
[Seedream 5.0 Lite](https://fal.ai/models/bytedance/seedream/v5/lite/text-to-image) ·
[Ideogram 4](https://fal.ai/ideogram-4) ·
[Recraft V4](https://fal.ai/models/fal-ai/recraft/v4/text-to-image) ·
[Qwen Image 2.0](https://fal.ai/qwen-image-2.0)

- [OpenAI — Image generation guide](https://developers.openai.com/api/docs/guides/image-generation) — GPT-Image-2.5 sizes and tiers, read 2026-10-02
- [Axios — ChatGPT Images 2.5, 2026-09-08](https://www.axios.com/2026/09/08/exclusive-hands-on-with-chatgpts-new-image-editor) — rollout to every ChatGPT tier
- [Blake Crosley — Midjourney 8.2 guide](https://blakecrosley.com/guides/midjourney) — Midjourney limits and GPU cost, read 2026-10-02
- [fal — best image-to-image APIs, 2026](https://fal.ai/learn/tools/best-image-to-image-apis-2026) — per-model reference-image ceilings
