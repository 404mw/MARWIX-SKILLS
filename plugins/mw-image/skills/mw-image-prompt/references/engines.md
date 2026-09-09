# mw-image-prompt — Engine routing, settings, and cost

> **The prices below are indicative, for routing only — never quote them to a user as
> current.** They were read off each model's own fal page on 2026-09-09 — every roster
> row carries its source link — and have decayed from that date onward. They stay
> useful for comparing engines *against each other*, since tiers drift together; they
> are not a quote, and no deliverable should present them as one.
>
> **If the user wants an actual cost breakdown, offer it and let them decline.** Real
> numbers mean fetching each candidate model's own page — several web lookups, costing
> real time and tokens. Say roughly how many before running them. This file cannot
> stay accurate forever; the provider's page always can, so route people there rather
> than maintaining a copy that quietly goes wrong.
>
> Any limit not listed here: confirm on the fal model page before locking the asset's
> generation size.

Per-engine mechanics for the current generation of image models. **Engine facts date
fast**: when engines change, update this file — the doctrine in SKILL.md and the mode
references doesn't change with them. The roster below is fal-hosted: billed per output
image or per megapixel (queue wait and failed requests are free), executed by the
`mw-image-gen` skill against the pinned endpoint IDs. The mw-image-prompt deliverable names
the engine per asset; the executor never chooses.

## Contents

- Model roster (read off the fal model pages, 2026-09-09)
- Routing
- Cached price lookups — filesystem only
- Negative constraints — phrasing is engine-specific
- Nano Banana 2 specifics
- GPT-Image-2.5 specifics — Flare and Sunburst
- The cost ladder — draft cheap, finalize once

## Model roster (read off the fal model pages, 2026-09-09)

| Model | fal ID | Price | Niche | Source |
|---|---|---|---|---|
| FLUX.2 klein 4B | `fal-ai/flux-2/klein/4b` | $0.005/MP | drafts, simple graphics, gray-box comps (9b + `/base` variants exist) | [fal](https://fal.ai/models/fal-ai/flux-2/klein/4b) |
| FLUX.1 schnell | `fal-ai/flux/schnell` | $0.003/MP | throwaway composition drafts | [fal](https://fal.ai/models/fal-ai/flux/schnell) |
| FLUX.2 dev / turbo | `fal-ai/flux-2-dev` · `fal-ai/flux-2/turbo` | check page | open-weights / speed mid-tier | not re-checked 2026-09 |
| FLUX.2 pro | `fal-ai/flux-2-pro` (+`/edit`) | $0.03 first MP, then $0.015/MP | **balanced default for text-free photoreal/atmospheric production art**; up to 9 reference images | [fal](https://fal.ai/models/fal-ai/flux-2-pro) |
| FLUX.2 flex | `fal-ai/flux-2-flex` (+`/edit`) | $0.05/MP, charged on input **and** output | step and guidance control; the flux line's typography variant, up to 10 refs | [fal](https://fal.ai/models/fal-ai/flux-2-flex) |
| Nano Banana 2 | `fal-ai/nano-banana-2` (+`/edit`) | $0.08/img at 1K (0.5K ×0.75, 2K ×1.5, 4K ×2; web search +$0.015, high thinking +$0.002) | reasoning-guided composition, character consistency, up to 14 refs, grounded data, localization | [fal](https://fal.ai/models/fal-ai/nano-banana-2) |
| Nano Banana Pro | `fal-ai/nano-banana-pro` (+`/edit`) | $0.15/img at 1K–2K, $0.30 at 4K | top-end final render, native 4K, legible multilingual in-image text | [fal](https://fal.ai/models/fal-ai/nano-banana-pro) |
| GPT-Image-2.5 Flare | `openai/gpt-image-2.5/flare/text-to-image` (+`/flare/edit`) | per image, size × quality: $0.004 low → $0.036 high → $0.144 max at 1024×768; $0.011 → $0.100 → $0.400 at 3840×2160 | speed-first mode, OpenAI's default: dense text + precise layout at everyday cost | [fal](https://fal.ai/models/openai/gpt-image-2.5/flare/text-to-image) |
| GPT-Image-2.5 Sunburst | `openai/gpt-image-2.5/sunburst/text-to-image` (+`/sunburst/edit`) | same published table as Flare | precision mode: fine detail, closest reference adherence, slower renders | [fal](https://fal.ai/models/openai/gpt-image-2.5/sunburst/text-to-image) |
| GPT-Image-2 | `fal-ai/gpt-image-2` (+`/edit`) | $0.005 low → $0.145 high at 1024×768 | **superseded by 2.5** — still live, not marked deprecated; no reason to route new work here | [fal](https://fal.ai/models/openai/gpt-image-2) |
| Qwen Image 2.0 | `fal-ai/qwen-image-2/text-to-image` · `/pro/text-to-image` (+`/edit`, `/pro/edit`) | $0.035/img · $0.075 pro | dense in-image text plus a real `negative_prompt`, cheap. **A deprecation banner sat on the model page on 2026-09-09 while the product page still sold it — confirm before routing.** v1 `fal-ai/qwen-image` (+`-edit`) is $0.02/MP and still live | [fal](https://fal.ai/qwen-image-2.0) |
| Ideogram 4 | `ideogram/v4` | $0.03/MP turbo · $0.06 balanced · $0.10 quality (+$0.03 when prompt expansion runs) | typography-first: posters, logos, headlines; native 2K, native transparency. **Supersedes `fal-ai/ideogram/v3`** | [fal](https://fal.ai/ideogram-4) |
| Recraft V4 | `fal-ai/recraft/v4/text-to-image` | $0.04 raster · $0.25 raster pro · $0.08 vector · $0.30 vector pro | the vector-output option. **Supersedes Recraft V3** | [fal](https://fal.ai/models/fal-ai/recraft/v4/text-to-image) |
| Seedream 5.0 | `bytedance/seedream/v5/pro/text-to-image` · `/v5/lite/text-to-image` | pro $0.0675/img ≤1536×1536, $0.135 up to 2048×2048 · lite $0.035/img up to 3072×3072 | dense structured layouts, native text in 14 languages; V4.5 (`bytedance/seedream/v4.5`, $0.04) is still the cheap photoreal option | [fal](https://fal.ai/models/bytedance/seedream/v5/pro/text-to-image) |

Prices marked "check page" and any max-resolution limit not listed here: confirm on
the fal model page before locking the asset's generation size.

## Routing

**The resolution gate comes first.** Lock the target generation size (from the
project's asset contract or the platform ratio) before weighing quality: an engine
that cannot hit the size is disqualified no matter how good it is — GPT-2.5 refuses an
aspect ratio past 3:1, so a 21:9 banner is out however good its text is, and Seedream
5.0 Pro stops at 2048×2048. Megapixel-priced models get their cost estimated from
these exact dimensions, and the deliverable records both the size and the engine it
forced. (The old ~1536×1024 GPT-Image cap is **gone**: both 2.5 modes and GPT-Image-2
now take a 3840px max edge and ~0.66–8.29 MP, with custom dimensions in multiples of
16.)

**Production assets (text-free scene art, backgrounds, parallax layers):**

| Job | Engine | Why |
|---|---|---|
| Composition drafts, gray-box comps, simple graphics | **FLUX.2 klein 4B** | $0.005/MP with intact quality fundamentals; schnell at $0.003/MP if even cheaper is fine |
| Photoreal / atmospheric final layers (the default) | **FLUX.2 pro** | production-grade without tuning; fal's own roundup names it for studio-grade photorealism, $0.03 first MP then $0.015/MP |
| Deep low-key / near-black fields (dark fog, void layers) | **NB2** | flux-class normalizes exposure and gray-lifts near-black scenes even through /edit darkening passes (observed 2026-07-10, 2 assets x 2 attempts each); NB2 holds ink-level darkness and constraint lists. NB2 4K may letterbox 16:9 with hard seam bands ~12% from frame edges - plan to crop inside them |
| Complex composition or a recurring character in-scene | **NB2** | plans composition, holds character consistency |
| Top-end final render (large format, or contains a face) | **NB Pro** | native 4K, one render only per the cost ladder |
| Photoreal final where prompt adherence matters more than tuning | **Seedream 5.0 Pro** | fal rates the Seedream line level with FLUX.2 pro on photorealism; stops at 2048×2048 |

**Promotional imagery:**

| Job | Engine | Why |
|---|---|---|
| Single-subject covers, character scenes | **NB2** | Fast, excellent at single-scene briefs and character consistency |
| Edits, variations, expression swaps | **NB2** | Editing mode preserves everything unnamed; upload + describe only the change |
| Data-grounded infographics (real stats, real dates) | **NB2** | Pulls live data from search during generation instead of hallucinating |
| Text localization (same image, translated in-image text) | **NB2** | Translates and swaps in-image text natively |
| Dense text: carousels, multi-label diagrams | **GPT-2.5 Flare** | an independent 14-call test got four text blocks at three type sizes back correctly spelled at every quality tier, down to an 8px line; OpenAI still says `quality=high` for small type |
| Multi-element compositions (3+ elements, precise layout) | **GPT-2.5 Flare** | fal's own line for it: complex layouts, natural lighting, rich textures |
| Multi-reference composites (character + logo + product) | **GPT-2.5** `/edit` | up to **16** images in `image_urls`, referenced by index; OpenAI: "assign roles to references… subject, style, clothing, or background" |
| Identity-critical character work | **GPT-2.5 Sunburst** | OpenAI routes here when "small visual details matter, reference images must be followed closely". **`input_fidelity` no longer exists on 2.5** — image inputs are always processed at high fidelity |

For text-heavy promotional work, check the cheaper typography specialists before
reaching for GPT-2.5: **Ideogram 4** (posters, logos, big headlines, $0.03/MP turbo),
**Recraft V4** (typography and vector), and **Qwen Image 2.0** ($0.035/img, and it has
a real negative channel) often match or beat it. GPT-2.5 earns its cost when dense
text and precise multi-element layout are needed *in the same image* — though at
`quality=low` (~$0.004/img at 1024×768) it now undercuts all of them, so the old
"GPT is the expensive one" reflex is worth re-testing per job.

One line: *production art → flux-class (klein drafts, pro finals), NB2/NB Pro when
composition or characters demand it · character scenes / edits / grounded data /
localization → NB2 · typography-first → Ideogram 4 / Recraft V4 / Qwen 2.0 · dense
text + precise layout together / multi-reference composites → GPT-2.5 Flare ·
identity-critical or fine-detail finals → GPT-2.5 Sunburst (`high` only when text is
small or faces matter).*

## Cached price lookups — filesystem only

A live lookup costs the user time and tokens, so it is worth doing once instead of
every session. **This whole section applies only where files can be read and written.**
In a chat UI there is no filesystem: skip it silently and never mention a cache the
user has no way to keep.

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

Write the fetch date, one row per model, and the source URL for each — a cached number
without its source cannot be re-checked, only re-trusted.

**A cache ages exactly like this file does.** It is a saved lookup, not a source of
truth, and it decays from its own fetch date onward. Two rules keep that honest:

- Always state the age with the number. Never present a cached figure bare.
- **Re-offer a lookup before any final-tier spend.** Draft and iteration tiers are
  cheap enough that a stale estimate costs little; a final render is where a wrong
  number becomes a wrong decision, so that is where a refresh earns its cost.

If the host project's docs name a different location for generated artifacts, put the
cache there instead — the host contract wins over the default path.

## Negative constraints — phrasing is engine-specific

**Scope: this section governs *banned content* only** - things that must not appear in
the frame (watermark, signature, extra text, extra logos, the project's banned list).
Process instructions - "change only X", "do not redraw the logo", "do not import the
reference's background" - name no absent object and stay literal on every engine. The
two buckets and the test between them: brief.md.

For banned content, the list never changes; **how it is phrased depends on the engine
family, and getting it backwards summons the thing you excluded.**

| Engine family | Negative channel | How to phrase an exclusion |
|---|---|---|
| Diffusion / flux-class | a real negative-prompt input the sampler steers away from | State the negation directly: "no lens flare, no text" |
| Reasoning / multimodal (NB2, NB Pro, GPT-2) | **none — there is no subtractable reverse vector** | Restate each exclusion as the positive state that excludes it |

For a reasoning engine, write the world you want rather than the one you don't:

| Instead of | Write |
|---|---|
| "no watermark, no signature" | "a clean, unmarked lower-right corner" |
| "no logos on the wall" | "a bare plaster wall" |
| "no people in the street" | "an empty street at dawn" |
| "no text anywhere" | "unlabelled surfaces throughout" |

Google's own Nano Banana guidance is explicit — *describe what you want, not what you
don't want* — and the failure is the familiar one: naming the unwanted thing puts it
in the model's context, and a model with no way to subtract it may render it. When a
positive restatement is genuinely impossible, keep the negation short and place it
last, where it carries least weight.

## Nano Banana 2 specifics

- A reasoning model: it **plans the composition before rendering**. Give it the *why*
  of the image — it uses intent.
- **Two modes; mode confusion is the top failure.** *Generation* (from scratch — full
  creative direction) vs *editing* (upload image, describe **only what changes**, and
  explicitly name what must stay: "keep the character, lighting, and background
  exactly as they are").
- **Name your references.** Upload anchors/logos and assign names ("the character
  'X' from Image 1"). Named references hold consistency across iterations.
- Put **ratio and resolution at the end of the prompt** ("4:5 vertical, 2K output")
  even when set in the UI.
- For grounded infographics, describe the *organization*, not just the topic: "a
  timeline", "a flowchart with 4 stages", "a comparison table" — it structures real
  data into that shape.

## GPT-Image-2.5 specifics — Flare and Sunburst

- **Two modes, one price table.** *Flare* is the small, speed-optimised model —
  OpenAI's default, quality comparable to GPT-Image-2. *Sunburst* is the base model,
  optimised for quality and for edits that must follow a reference closely, at the
  cost of longer renders. fal publishes the **same per-image price** for both, so the
  choice is latency and fidelity, not budget. Four endpoints: `flare/text-to-image`,
  `flare/edit`, `sunburst/text-to-image`, `sunburst/edit`.
- **The quality enum grew:** `auto | low | medium | high | xhigh | max`, defaulting to
  `high`. `xhigh` and `max` run roughly 2× and 4× the `high` price — spend there only
  when a print-size crop demands it.
- **No `seed`, no `negative_prompt`, no `input_fidelity`.** Each call varies on its
  own; exclusions must be written as positive states (above); reference images are
  always processed at high fidelity now, so there is no fidelity dial to reach for.
- **Sizes:** presets `square_hd, square, portrait_4_3, portrait_16_9, landscape_4_3,
  landscape_16_9, auto`, or custom dimensions in multiples of 16 — max edge 3840px,
  aspect ≤3:1, total pixels 655,360–8,294,400. `background` takes
  `auto | transparent | opaque`.
- **Editing:** `/edit` takes `image_urls` (up to **16** images) plus an optional
  `mask_url` for true inpainting — the mask is the only way to scope an edit to an
  exact region.
- **Word order is visual weight.** Early words dominate; focal subject in the first
  sentence, constraints last.
- **Quality tiers cost real money — route deliberately:** `low` for ideation and
  drafts, `medium` as the production default, `high` **only** for dense/small text,
  detailed infographics, and identity-sensitive character work; `xhigh`/`max` only
  when the output is going to print size.
- **Text discipline:** exact copy in quotes or ALL CAPS; for tricky words and brand
  names, spell them out letter-by-letter ("the word 'ANTHROPIC': A-N-T-H-R-O-P-I-C");
  close with a hard stop: "Render this text verbatim. No extra characters. No
  duplicate text."
- **The preserve list is the whole editing game.** Every edit prompt: "Change only
  [X]. Preserve [face, pose, proportions, palette, background, lighting, all text]
  exactly as in the input image." **Repeat the full list on every iteration** —
  preservation instructions don't carry over, and un-restated details drift.
- Multi-image composites: reference by index and describe the interaction explicitly
  ("apply Image 2's style to the subject of Image 1").
- Ask for `n=4` variants when exploring; pick and edit rather than re-prompting from
  zero.

## The cost ladder — draft cheap, finalize once

Never iterate at final quality or final size:

1. **Explore at the bottom:** production art drafts on klein ($0.005/MP) or schnell,
   several variants per prompt; promotional on GPT-2.5 Flare `quality=low` (~$0.004 an
   image at 1024×768) with `n=4`, or NB2 at standard 1K. This rung is for composition,
   idea, and pose — nothing else is judgeable yet. (Exception: dense text is
   illegible at `low` — judge text-heavy slides at `medium` from the start.)
2. **Iterate in the middle:** pick the winner, surgical preserve-list edits at
   `medium`/1K until the image is *right*.
3. **Finalize exactly once at the top:** one render at `quality=high`/2K of the
   approved composition — and only if the image contains small text or a face.
   Everything else ships at medium; the feed cannot tell the difference at thumbnail
   size.

**Stop-loss:** if five edits haven't landed the image, the prompt is wrong, not the
model. Rewrite from the nearest known-good template instead of paying for edit six.

---

### Sources consulted

- [Google DeepMind — Nano Banana prompt guide](https://deepmind.google/models/gemini-image/prompt-guide/)
- [Google Cloud — Ultimate prompting guide for Nano Banana](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-nano-banana)
- [Google — Nano Banana Pro prompting tips](https://blog.google/products-and-platforms/products/gemini/prompting-tips-nano-banana-pro/)
- [OpenAI Cookbook — GPT Image models prompting guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)
- [fal — Prompting GPT Image 2](https://fal.ai/learn/tools/prompting-gpt-image-2)
- [fal — FLUX.2 klein user guide](https://fal.ai/learn/devs/flux-2-klein-user-guide)
- [fal — 10 best AI image generators in 2026](https://fal.ai/learn/tools/ai-image-generators)
- [Artificial Analysis — image model leaderboard](https://artificialanalysis.ai/image/models)
- Endpoint IDs verified live against `fal.run` (empty-body 422 probe), 2026-07-09

**2026-09-09 refresh** — the prices, sizes and parameters above were read off these
pages on that date:

- [OpenAI — Image prompting guide](https://developers.openai.com/api/docs/guides/image-prompting)
  (Flare vs Sunburst, reference roles, `quality=high` for small text, no `input_fidelity` on 2.5)
- [fal — GPT Image 2.5 Flare](https://fal.ai/models/openai/gpt-image-2.5/flare/text-to-image)
  · [its schema](https://fal.ai/models/openai/gpt-image-2.5/flare/text-to-image/api)
  · [Flare edit schema](https://fal.ai/models/openai/gpt-image-2.5/flare/edit/api) (16 `image_urls`, `mask_url`)
- [fal — GPT Image 2.5 Sunburst](https://fal.ai/models/openai/gpt-image-2.5/sunburst/text-to-image)
  · [Sunburst edit](https://fal.ai/models/openai/gpt-image-2.5/sunburst/edit)
- [fal — GPT Image 2](https://fal.ai/models/openai/gpt-image-2) (3840px max edge; the old 1536×1024 cap is gone)
- [fal — Nano Banana 2](https://fal.ai/models/fal-ai/nano-banana-2) · [Nano Banana Pro](https://fal.ai/models/fal-ai/nano-banana-pro)
- [fal — FLUX.2 pro](https://fal.ai/models/fal-ai/flux-2-pro) · [FLUX.2 flex](https://fal.ai/models/fal-ai/flux-2-flex) · [klein 4B](https://fal.ai/models/fal-ai/flux-2/klein/4b) · [schnell](https://fal.ai/models/fal-ai/flux/schnell)
- [fal — Seedream 5.0 Pro](https://fal.ai/models/bytedance/seedream/v5/pro/text-to-image) · [Seedream 5.0 Lite](https://fal.ai/models/bytedance/seedream/v5/lite/text-to-image)
- [fal — Ideogram 4](https://fal.ai/ideogram-4) · [Recraft V4](https://fal.ai/models/fal-ai/recraft/v4/text-to-image) · [Qwen Image 2.0](https://fal.ai/qwen-image-2.0)
- [fal — best image-to-image APIs, 2026](https://fal.ai/learn/tools/best-image-to-image-apis-2026) (per-model reference-image ceilings)
- [Segmind — GPT Image 2.5 Flare and Sunburst, tested](https://blog.segmind.com/gpt-image-2-5-api-the-ultimate-guide-to-flare-and-sunburst/) (the 14-call small-text test)
