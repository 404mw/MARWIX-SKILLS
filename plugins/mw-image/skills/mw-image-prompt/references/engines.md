# mw-image-prompt — Engine routing, settings, and cost

> **The prices below are indicative, for routing only — never quote them to a user as
> current.** They were verified against the live fal.ai API on 2026-07-09 and have
> decayed from that date onward. They stay useful for comparing engines *against each
> other*, since tiers drift together; they are not a quote, and no deliverable should
> present them as one.
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

- Model roster (fal endpoint IDs verified live, 2026-07)
- Routing
- Cached price lookups — filesystem only
- Negative constraints — phrasing is engine-specific
- Nano Banana 2 specifics
- GPT-Image-2 specifics
- The cost ladder — draft cheap, finalize once

## Model roster (fal endpoint IDs verified live, 2026-07)

| Model | fal ID | Price | Niche |
|---|---|---|---|
| FLUX.2 klein 4B | `fal-ai/flux-2/klein/4b` | ~$0.01/img | drafts, simple graphics, gray-box comps (9b + `/base` variants exist) |
| FLUX.1 schnell | `fal-ai/flux/schnell` | $0.003/MP | throwaway composition drafts |
| FLUX.2 dev / turbo | `fal-ai/flux-2-dev` · `fal-ai/flux-2/turbo` | check page | open-weights / speed mid-tier |
| FLUX.2 pro | `fal-ai/flux-2-pro` (+`/edit`) | $0.03/MP | **balanced default for text-free photoreal/atmospheric production art** |
| Nano Banana 2 | `fal-ai/nano-banana-2` (+`/edit`) | ~$0.06/img | reasoning-guided composition, 5-character consistency, grounded data, localization |
| Nano Banana Pro | `fal-ai/nano-banana-pro` | $0.14–0.24/img | top-end final render, native 4K |
| GPT-Image-2 | `fal-ai/gpt-image-2` | tiered (low/med/high) | dense text + precise spatial layout together; **capped ~1536×1024** |
| Qwen Image | `fal-ai/qwen-image` (+`fal-ai/qwen-image-edit`) | ~$0.02/MP | best-in-class in-image text at budget price |
| Ideogram V3 | `fal-ai/ideogram/v3` | $0.03–0.09/img | typography-first: posters, logos, headlines |
| Recraft V3 | `fal-ai/recraft/v3/text-to-image` | $0.04 raster / $0.08 vector | the vector-output option |
| Seedream V4 | `fal-ai/bytedance/seedream/v4/text-to-image` | ~$0.03–0.04/img | prompt-adherence wildcard (newer 5.x releases exist — check the model page for the current endpoint before routing) |

Prices marked "check page" and any max-resolution limit not listed here: confirm on
the fal model page before locking the asset's generation size.

## Routing

**The resolution gate comes first.** Lock the target generation size (from the
project's asset contract or the platform ratio) before weighing quality: an engine
that cannot hit the size is disqualified no matter how good it is — GPT-2's
~1536×1024 cap rules it out for large scene layers regardless of its text accuracy.
Megapixel-priced models get their cost estimated from these exact dimensions, and the
deliverable records both the size and the engine it forced.

**Production assets (text-free scene art, backgrounds, parallax layers):**

| Job | Engine | Why |
|---|---|---|
| Composition drafts, gray-box comps, simple graphics | **FLUX.2 klein 4B** | ~$0.01 flat with intact quality fundamentals; schnell if even cheaper is fine |
| Photoreal / atmospheric final layers (the default) | **FLUX.2 pro** | production-grade without tuning, $0.03/MP |
| Deep low-key / near-black fields (dark fog, void layers) | **NB2** | flux-class normalizes exposure and gray-lifts near-black scenes even through /edit darkening passes (observed 2026-07-10, 2 assets x 2 attempts each); NB2 holds ink-level darkness and constraint lists. NB2 4K may letterbox 16:9 with hard seam bands ~12% from frame edges - plan to crop inside them |
| Complex composition or a recurring character in-scene | **NB2** | plans composition, holds character consistency |
| Top-end final render (large format, or contains a face) | **NB Pro** | native 4K, one render only per the cost ladder |

**Promotional imagery:**

| Job | Engine | Why |
|---|---|---|
| Single-subject covers, character scenes | **NB2** | Fast, excellent at single-scene briefs and character consistency |
| Edits, variations, expression swaps | **NB2** | Editing mode preserves everything unnamed; upload + describe only the change |
| Data-grounded infographics (real stats, real dates) | **NB2** | Pulls live data from search during generation instead of hallucinating |
| Text localization (same image, translated in-image text) | **NB2** | Translates and swaps in-image text natively |
| Dense text: carousels, multi-label diagrams | **GPT-2** | ~95% text accuracy on long headlines and small labels — at `quality=high` |
| Multi-element compositions (3+ elements, precise layout) | **GPT-2** | Sequential prompt processing gives finer layout control |
| Multi-reference composites (character + logo + product) | **GPT-2** | Reference images by index: "place Image 2's logo on the laptop in Image 1" |
| Identity-critical character work | **GPT-2** with `input_fidelity=high` | Locks likeness during larger scene edits |

For text-heavy promotional work, check the cheaper typography specialists before
reaching for GPT-2: **Ideogram V3** (posters, logos, big headlines) and **Qwen Image**
(long text at ~$0.02/MP) often match or beat it; GPT-2 earns its cost only when dense
text and precise multi-element layout are needed *in the same image*.

One line: *production art → flux-class (klein drafts, pro finals), NB2/NB Pro when
composition or characters demand it · character scenes / edits / grounded data /
localization → NB2 · typography-first → Ideogram/Qwen · dense text + precise layout
together / multi-reference composites / identity-critical → GPT-2 (`high` only when
text is small or faces matter).*

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

## GPT-Image-2 specifics

- **Word order is visual weight.** Early words dominate; focal subject in the first
  sentence, constraints last.
- **Quality tiers cost real money — route deliberately:** `low` for ideation and
  drafts, `medium` as the production default, `high` **only** for dense/small text,
  detailed infographics, and identity-sensitive character work.
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

1. **Explore at the bottom:** production art drafts on klein (~$0.01) or schnell,
   several variants per prompt; promotional on GPT-2 `quality=low` at ~1024px with
   `n=4` or NB2 at standard 1K. This rung is for composition, idea, and pose —
   nothing else is judgeable yet. (Exception: dense text is illegible at `low` —
   judge text-heavy slides at `medium` from the start.)
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
