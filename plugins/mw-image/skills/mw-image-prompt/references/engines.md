# mw-image-prompt — Encoding the prompt per model family

SKILL.md's shared craft holds on every model. **This is the layer that does not.** A
working prompt is a brief plus a family-specific encoding of it; moving it to another
family keeps the brief and rewrites the encoding. OpenAI says this of its own models —
do not assume *"older prompt patterns transfer unchanged"* — and it holds in every
direction. Which model to use, its limits and its cost: [roster.md](roster.md).

## Contents

- The families
- Prompt construction per family
- Ordering
- Lighting transfers as a measurement, not a mood
- Words that summon what you did not ask for
- Negative constraints — phrasing is family-specific
- Chat apps vs APIs — what moves into the prompt
- Nano Banana specifics
- GPT-Image-2.5 specifics — Flare and Sunburst
- Midjourney specifics
- A model not listed here
- The cost ladder — draft cheap, finalize once

## The families

| Family | Models | What defines it |
|---|---|---|
| **Diffusion / flux-class** | FLUX.2, FLUX.1, Qwen Image | phrase weighting works; a negative-prompt field where the model exposes one (Qwen does; several FLUX endpoints do not — check) |
| **Reasoning** | Nano Banana 2, Nano Banana Pro | plans the composition before rendering; full sentences; no negative channel |
| **GPT-Image** | GPT-Image-2.5 Flare, Sunburst | format-agnostic; roles assignable to references; no negative field, but stated exclusions are sanctioned |
| **Midjourney** | V8.2, V7, Niji | natural-language description plus a parameter string; a real `--no` channel; its own reference syntax |
| **Typography-first** | Ideogram 4, Recraft V4 | built for text and layout; use the app's negative field if it shows one, otherwise the safe defaults |
| **Not characterized** | Seedream and anything not listed | the safe defaults under *A model not listed here* |

## Prompt construction per family

| | Diffusion / flux-class | Nano Banana 2 / Pro | GPT-Image-2.5 | Midjourney V8.2 |
|---|---|---|---|---|
| **Format** | keyword-and-phrase weighting still works | **full sentences; keyword soup degrades results** | **format-agnostic** — paragraphs, labeled sections, tags, JSON-like structures. For complex briefs OpenAI recommends labeled sections: *scene, subject, details, constraints* | descriptive sentences, subject first; **~50–150 tokens** beats 300+; parameters last |
| **Exclusions** | the negative field, where there is one — state the negation | positive restatement only | direct exclusions supported (*"state exclusions such as unwanted text"*), but positive restatement works better for invented objects | `--no a, b` — bare nouns, no "no" inside the prompt text |
| **Reference roles** | style/structure conditioning | identity anchors; name each reference | roles beyond identity: *"identify each input by number and purpose: subject, style, clothing, or background"*, then say how they combine | `--sref` = style only; image URLs at the start = content, weighted by `--iw`; the Edit model = up to four subject references |
| **Lighting** | responds to adjectives and film-stock shorthand | responds to described intent | **mood words alone are unreliable** — OpenAI: for wide, cinematic, low-light, rainy or neon scenes, *"specify scale, atmosphere, and color instead of relying on mood words alone"* | responds to adjectives strongly — pair them with a measurement when the look must hold |
| **Camera** | lens/aperture shorthand reads as style | composition planned before render | camera specs are *"cues for appearance, not a guarantee of exact physical simulation"* — state the resulting framing too | lens shorthand reads as style; state framing in words |
| **Photorealism** | implied by style tokens | implied by description | **ask for it explicitly** — *"request 'photorealistic' or 'real photograph' when that is the goal"* | `--raw` plus a photograph described with camera and lens |

## Ordering

Reasoning, diffusion and Midjourney prompts weight early words heavier, so the pieces
run front-loaded in one flowing block:

> style/medium → subject (+ expression) → the one action → setting → composition
> (camera height and angle, subject distance or lens feel, framing, focal point,
> reserved negative space) → exact text in quotes → constraints → ratio and resolution

Midjourney then appends its parameter string. GPT-Image-2.5 takes the same pieces but
does not need that order: for anything complex, labeled sections — **scene, subject,
details, constraints** — help more than ordering does. Either way the *content* is the
brief's decision set, unchanged; only the packaging moves.

## Lighting transfers as a measurement, not a mood

**The failure this section exists to prevent.** A night scene tuned on Nano Banana 2 —
dark, cold, warm light contained to one shelter — was carried word-for-word to
GPT-Image-2.5 and came back nearly gold: every source blown out, the cold gone, the
whole frame warm. Both Flare and Sunburst did it, so it is a family trait, not a
variant's quirk. The words describing light had not changed; only the family had.
Recovering it took three passes in opposite directions, the first overshooting into a
frame too dark to read a face in.

What finally transferred was not an adjective but a measurement: *"the exposure is set
a little above the night sky, so about half the picture sits in soft shadow"*, with the
light strips described as *"a clean bright line with a defined edge"* and the warm pool
extended to a named distance. **Write lighting that way from the start whenever the
model might change** — name what the exposure is set for, what share of the frame sits
in shadow, the scale, the level and the color — and treat three recovery passes as the
cost of switching if it was not.

## Words that summon what you did not ask for

- **`halation`, `glowing` and `neon` bring bloom** on every family; on a brief that
  wants restraint they undo it. "A clean bright line with a defined edge" holds.
- **In-scene content escapes its frame.** Art on a screen, poster or sign inside the
  scene spills past its edges and floats on whatever is beside it — observed across
  three passes and two providers. Name the surface and say the content stops at its
  border.
- **Quality padding is noise everywhere.** "8k, masterpiece, trending" degrades
  reasoning models and Midjourney alike.

## Negative constraints — phrasing is family-specific

**Scope: banned content only** — things that must not appear in the frame (watermark,
signature, extra text, extra logos, any documented banned list). Process instructions —
"change only X", "do not redraw the logo", "do not import the reference's background" —
name no absent object and stay literal on every model. The two buckets: brief.md.

For banned content the list never changes; **how it is phrased depends on the family,
and getting it backwards summons the thing you excluded.**

| Family | Negative channel | How to phrase an exclusion |
|---|---|---|
| Diffusion / flux-class | a negative-prompt field the sampler steers away from, where the model has one | state the negation directly in that field: "lens flare, text" |
| Reasoning (Nano Banana) | **none — there is no subtractable reverse vector** | restate each exclusion as the positive state that excludes it |
| GPT-Image-2.5 | no field, but OpenAI's guidance allows stated exclusions in the prompt | either works; **prefer the positive restatement** — see below |
| Midjourney | `--no` | bare nouns after `--no`; never "no X" or "without X" in the prompt text, which can summon X |
| Chat apps, any model | none exposed | positive restatement in the prompt |

**On GPT-Image-2.5 the two approaches are not equally reliable.** Direct exclusions work
for text. For *objects the model invented on its own*, positive restatement is what
removes them: a real sportswear logo kept appearing on shoes nobody had described, and
"plain unbranded white sneakers" cleared it where naming the brand to exclude it would
have put the brand back in context. Default to the positive state; reach for a direct
exclusion only when no positive phrasing exists, and keep it short and last.

For a model with no negative channel, write the world you want rather than the one you
don't:

| Instead of | Write |
|---|---|
| "no watermark, no signature" | "a clean, unmarked lower-right corner" |
| "no logos on the wall" | "a bare plaster wall" |
| "no people in the street" | "an empty street at dawn" |
| "no text anywhere" | "unlabelled surfaces throughout" |

Google's own Nano Banana guidance is explicit — *describe what you want, not what you
don't want*. Naming the unwanted thing puts it in the model's context, and a model with
no way to subtract it may render it. When a positive restatement is genuinely
impossible, keep the negation short and place it last.

## Chat apps vs APIs — what moves into the prompt

In ChatGPT and the Gemini app most settings an API exposes do not exist. Whatever the
surface cannot set goes into the prompt text:

- **Ratio and size intent** — "a 4:5 vertical image", in the prompt, every time.
- **Exclusions** — positive restatement; there is no negative field.
- **References** — attach them and name them in order: "the first image is the person —
  identity only; the second is the product — place it as-is."
- **Edits** — in the same conversation, with the image to change attached or selected;
  a new chat loses the image as context. Mechanics: iterate.md.
- **Paste the prompt whole and ask for it to be used as written.** A chat assistant may
  rephrase a prompt before generating; if locked details come back changed, say so in
  the next turn and restate them.

## Nano Banana specifics

- A reasoning model: it **plans the composition before rendering**. Give it the *why*
  of the image — it uses intent.
- **Two modes; mode confusion is the top failure.** *Generation* (from scratch — full
  creative direction) vs *editing* (upload, describe **only what changes**, and name
  what must stay: "keep the character, lighting, and background exactly as they are").
- **Name your references.** Assign names ("the character 'X' from Image 1"); named
  references hold consistency across iterations.
- Put **ratio and resolution at the end of the prompt** ("4:5 vertical, 2K output")
  even when they are also set elsewhere.
- For grounded infographics, describe the *organization*, not just the topic: "a
  timeline", "a flowchart with 4 stages", "a comparison table".

## GPT-Image-2.5 specifics — Flare and Sunburst

- **Two modes.** *Flare* is the speed-optimised model and OpenAI's default; *Sunburst*
  is optimised for quality and for edits that must follow a reference closely, at the
  cost of longer renders. Published API prices are the same for both, so the choice is
  latency and fidelity, not budget.
- **Quality tiers:** `low | medium | high | xhigh | max | auto`. On an API, **always
  name a tier** — `auto` re-picks it per request, and the bill with it. `low` for
  ideation, `medium` as the production default, `high` only for dense or small text,
  detailed infographics and identity-sensitive work, `xhigh`/`max` only for print-size
  output. In ChatGPT there is no tier to set; ask for the detail in words.
- **No seed, no negative field, no fidelity dial.** Each call varies on its own;
  reference images are always processed at high fidelity.
- **Sizes:** custom `WxH` in multiples of 16, max edge 3840, aspect between 1:3 and
  3:1. `1024x1024`, `1536x1024` and `1024x1536` are recommendations, not an enum —
  4:5 and other custom ratios work. Transparent output needs `background: transparent`
  with PNG or WebP.
- **Editing** takes many reference images, referenced by index, plus an optional mask —
  the only way to scope an edit to an exact region.
- **Word order is visual weight.** Focal subject in the first sentence, constraints
  last.
- **Text discipline:** exact copy in quotes or ALL CAPS; spell tricky words and brand
  names letter by letter ("the word 'ANTHROPIC': A-N-T-H-R-O-P-I-C"); close with a
  hard stop: "Render this text verbatim. No extra characters. No duplicate text."
- **Multi-image composites:** reference by index and describe the interaction
  ("apply Image 2's style to the subject of Image 1").
- On an API, ask for **four variants** when exploring; pick and edit rather than
  re-prompting from zero.

## Midjourney specifics

Facts as of V8.2, the default since 2026-07-24 (V8.0 retired the same day).

- **Prompt shape:** describe it like a photograph to a skilled cinematographer —
  subject first, then details, context, style and technique, parameters last. Around
  50–150 tokens; past that you are over-specifying.
- **Parameters** (append after the description):

  | Parameter | Range / default | Use |
  |---|---|---|
  | `--ar W:H` | integers; ≤14:1, ≤4:1 with `--hd`; default 1:1 | always set it |
  | `--raw` | off | literal control; the default for photoreal and brand work (V7 spelled it `--style raw`) |
  | `--s` | 0–1000, default 100 | lower = closer to the prompt, higher = more Midjourney taste |
  | `--c` | 0–100, default 0 | spread across the four results; raise it when exploring |
  | `--w` | 0–3000, default 0 | unconventional aesthetics; rarely on brand work |
  | `--exp` | 0–100, default 0 | extra detail and tone-mapping; 10–25 is the useful band |
  | `--no` | — | the negative channel: bare nouns, comma-separated |
  | `--sref` + `--sw` | `--sw` 0–1000, default 100 | style reference by image or code; the series lock |
  | `--p` | — | the user's personalization profile or a named moodboard |
  | `--iw` | 0–2, default 1 | weight of image prompts placed at the start |
  | `--hd` | off | native 2048px; inpaint or outpaint on an HD image drops it to SD |
  | `--seed` | — | near-identical on V8, not exact |
  | `--v` | 8.2 | pin it, so a default change cannot change a series |

  `--q` and `--tile` are not supported on V8.2; `--tile` still works on V7.
- **References.** Image URLs at the start of the prompt are content references,
  weighted by `--iw`. `--sref` carries style only. Since 2026-08-27 the **Edit model**
  takes up to four references and written edit instructions, plus inpainting and
  outpainting, on V8.1/V8.2 (`--edit` on Discord); it replaced Omni Reference
  (`--oref`), Character Reference (`--cref`) and Retexture. Midjourney is not
  character-consistent by design — identity-critical work routes elsewhere (roster.md).
- **Text:** a single word or a 2–4 word phrase in quotes. Long or small text fails;
  composite it in an editor instead.
- **Series consistency:** the verbal anchor block *and* a fixed parameter string —
  `--v`, `--raw`, `--s`, `--sref`, `--sw` — stamped together. Either alone drifts.
- **Exploration:** every job returns four images; raise `--c` for spread. Draft mode on
  the web app is the cheap rung where it is available.

## A model not listed here

Identify the family from the model's own documentation, then encode for it:

1. **Does it expose a negative-prompt field?** Phrase banned content there, diffusion
   style.
2. **Does its maker say to describe scenes in natural language and edit
   conversationally?** Encode it reasoning-style: full sentences, positive restatement.
3. **Does it take a parameter syntax?** Learn the syntax for ratio, style reference and
   exclusions before writing anything.

When the docs do not say, use the **safe defaults**, which hold on every family: full
sentences, focal subject first, exact text in quotes, exclusions as positive states,
ratio in the prompt and in the settings, lighting as a measurement. Check the model's
size, ratio and reference limits before locking the size, and tell the user the model
is uncharacterized — the first pass is a calibration pass, and the brief should budget
for it.

## The cost ladder — draft cheap, finalize once

Never iterate at final quality or final size:

1. **Explore at the bottom.** For composition, idea and pose — nothing else is
   judgeable yet.
   - APIs: production drafts on FLUX.2 klein or schnell, several per prompt;
     promotional on GPT-Image-2.5 Flare at `low` with four variants, or Nano Banana 2
     at 1K.
   - Midjourney: standard (SD) renders with `--c` raised; Draft mode where available.
   - Chat apps: every generation spends plan quota — explore with short L1 prompts and
     ask for variations before writing the L2 prompt.
   - Exception: dense text is illegible at the bottom tier — judge text-heavy slides at
     `medium` from the start.
2. **Iterate in the middle.** Pick the winner; surgical preserve-list edits at
   `medium` / 1K / SD until the image is *right* (iterate.md).
3. **Finalize exactly once at the top.** One render at `high` / 2K / `--hd` of the
   approved composition — only if the image contains small text or a face, or is going
   to print — and only on the user's yes. Everything else ships at the middle tier; a
   feed cannot tell the difference at thumbnail size.

**A model switch reopens the ladder.** "Finalize once" assumes one model start to
finish; moving a tuned prompt to another family costs a fresh round of exposure and
framing passes. Budget them, or do not switch mid-series.

**Stop-loss:** five edits without landing it means the prompt is wrong, not the model
(iterate.md).

---

### Sources consulted

- [Google DeepMind — Nano Banana prompt guide](https://deepmind.google/models/gemini-image/prompt-guide/)
- [Google Cloud — Ultimate prompting guide for Nano Banana](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-nano-banana)
- [Google — Nano Banana Pro prompting tips](https://blog.google/products-and-platforms/products/gemini/prompting-tips-nano-banana-pro/)
- [OpenAI — Image prompting guide](https://developers.openai.com/api/docs/guides/image-prompting)
  (Flare vs Sunburst, reference roles, `quality=high` for small text)
- [OpenAI — Image generation guide](https://developers.openai.com/api/docs/guides/image-generation)
  (sizes, quality tiers, transparency; read 2026-10-02)
- [OpenAI Cookbook — GPT Image models prompting guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)
- [Axios — ChatGPT Images 2.5, 2026-09-08](https://www.axios.com/2026/09/08/exclusive-hands-on-with-chatgpts-new-image-editor)
  (rollout to every ChatGPT tier)
- [Midjourney — Parameter list](https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List)
  (refused automated reads on 2026-10-02; the Midjourney facts above come from the two
  guides below — confirm in-app)
- [Blake Crosley — Midjourney 8.2 guide](https://blakecrosley.com/guides/midjourney)
  (V8.1/V8.2 dates, Edit model, parameter ranges, read 2026-10-02)
- [gradually.ai — Midjourney parameters](https://www.gradually.ai/en/midjourney-parameters/)
- [fal — Prompting GPT Image 2](https://fal.ai/learn/tools/prompting-gpt-image-2)
- [fal — FLUX.2 klein user guide](https://fal.ai/learn/devs/flux-2-klein-user-guide)
- [Segmind — GPT Image 2.5 Flare and Sunburst, tested](https://blog.segmind.com/gpt-image-2-5-api-the-ultimate-guide-to-flare-and-sunburst/)
  (the 14-call small-text test)
- [Artificial Analysis — image model leaderboard](https://artificialanalysis.ai/image/models)
