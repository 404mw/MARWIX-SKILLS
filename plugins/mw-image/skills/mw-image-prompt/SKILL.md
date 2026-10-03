---
name: mw-image-prompt
description: Plan an image with the user and write the prompts for it — site scene art, backgrounds, parallax layers, social covers, concept illustrations, carousels, infographics, recurring-character scenes, thumbnails. Use whenever the user wants an image, artwork, scene art, brand imagery, or a post image planned or prompted, even if they don't name this skill and even when the idea is rough or one line ("make it pop", "something for the launch"). It reasons about the ask, asks one batch of questions carrying its own suggestions, locks a brief, then writes prompts encoded for the model the user will generate with — GPT-Image-2.5 (ChatGPT), Nano Banana (Gemini), Midjourney, FLUX, Seedream, Ideogram, Recraft, Qwen or any other. Plans and writes prompts; does not generate images. Not for SVG, icon or CSS code, charts, or diagrams drawn in code.
argument-hint: "[the rough idea, or what the image is for]"
---

Turn a rough idea into a ready-to-run image prompt, planned together with the user.
People arrive with a feeling, a placement, or three words; a finished image needs a
dozen decisions. This skill closes that gap: it reasons about what the user said,
proposes the rest, asks only what the user alone can answer — then writes the prompt.

It carries prompt craft, never taste. The look comes from the user, from a direction
chosen with `mw-image-direction`, or from the project's documented rules when there are
some. Generating the image is out of scope:
the user runs the prompt in their own tool — a web app such as ChatGPT, Gemini or
Midjourney, an API, or whatever generation tool the environment provides.

## Rules nothing overrides

Everything else in this skill is a default that the project's documented rules may
override. These are not — no doc, brief or instruction relaxes them.

- **Rights.** A reference the user does not own or have permission to use never goes
  to a model. A found image — someone's photograph, a film frame, an artist's work —
  may be *described in words*; it is not uploaded, mood references included.
- **Real people.** Before writing anything that generates an identifiable real person,
  ask how their likeness may be used. Never depict a real person saying, endorsing or
  doing something they did not, in a way that could pass as real. Public figures get
  clearly illustrative commentary, never photoreal fabrication.
- **Minors.** An identifiable real child is generated only from references their parent
  or guardian supplied, for a benign use the guardian asked for.
- **Honest evidence.** A screenshot, receipt, log, chart, test result or testimonial
  presented as real must be real. So must a real business's own products, premises,
  staff and events shown as theirs — an about page, a team photo, "our shop", a menu:
  recommend their own photos (a chosen direction becomes the shot list and light plan),
  or keep the generated image generic and illustrative, with no claim. Generated
  imagery may illustrate; it never fabricates evidence, and never invents the user's
  material.
- **Real products are placed, never redrawn.** A real product, label, screen or
  packaging comes from the user's photo, by edit or composite; the prompt builds the
  set, light and contact around it.
- **Spend.** Recommend a cost tier; the user decides any final-tier spend.

## Procedure

### 1. Gather context — documented rules only when they exist

Where files can be read, look for documented visual rules: `CLAUDE.md`, `AGENTS.md`,
`README`, and docs named for brand, art direction, style or assets — and follow their
pointers. Extract what the job needs: palette, lighting, mood, banned elements, style
blocks, recurring characters, and for shipped assets the asset contract (layer scheme,
naming, formats, sizes).

No files, or nothing documented: skip this step silently. The user is the source, and
the batch in step 3 asks whether there is a look to match.

A UI design system — tokens, Tailwind/shadcn config, component specs — is interface
law, not art direction. It governs only the graphic and background color of assets
that ship inside the interface, never photographic subjects.

Where documented rules exist they win over this skill's defaults. Name the rule you
followed and where it came from. A doc that conflicts with what the user just said is
raised as a question, never silently resolved.

**A chosen direction outranks the docs on look.** When the user picked a direction with
`mw-image-direction` — in this conversation, or saved to `docs/art-direction.md` — it
rules style, palette, lighting, texture, camera, pose and composition — and, when it
staged the shot, the scene itself: objects and their real sizes, light geometry,
contact, materials and the emphasis order. Its `[direction]` lines count as confirmed.
Take the staging into the prompt by its budget (`mw-image-direction` staging.md,
"Prompt budget"; caps per family in brief.md): the priority order, the family's clause
and word caps, each attribute bound inside the same clause as its object. Write it as
visible results (relations, frame shares, shadow directions, what is brightest and
sharpest), never as bare centimeters. Everything else stays on the scene sheet, to
check the render against. The style block names light by quality only; the side,
height and shadows come from each image's staging. The docs then keep only hard
technical limits (sizes, formats, layer and naming scheme, text-safe zones), content
bans and brand identity (mandated colors, typefaces, logo use).

### 2. Reason about the ask

Before asking anything, work out what the user's words already settle and what they
imply. Placement alone usually implies most of a brief: "docs hero" means a shipped
asset, live text over the top, a reserved quiet zone, no baked-in words.

Classify the mode first — the two have opposite defaults:

| | **Production asset** | **Promotional imagery** |
|---|---|---|
| What | Art that ships inside the product/site: scene art, backgrounds, parallax layers, textures | Art that sells or announces: social covers, concept illustrations, carousels, character posts, thumbnails |
| Rules from | The project's art-direction / asset-contract docs, or the user | The project's brand docs, or the user |
| Text in image | Never, unless the contract says otherwise | A core tool: exact headlines, labels |
| Faces/characters | Not by default | Recurring characters are a standing asset |
| Output shape | Built for post-processing: layer splits, grading, format exports | Built for the feed: platform ratios, thumbnail legibility |

Then draft every row of the decision set ([references/brief.md](references/brief.md))
from four sources, in order: the user's words `[user]`, a chosen direction
`[direction]`, documented rules `[doc]`, and your own inference from context and the
defaults `[proposed]`. Note what is genuinely
open. If the subject — what the image is *of* — is open because the ask names a
message rather than a thing, prepare directions from
[references/concept.md](references/concept.md).

### 3. One batch — understanding, suggestions, questions

Reply once, with three parts:

1. **What I understand** — two or three plain sentences: what the image is for, where
   it lives, what it shows. This is where a wrong reading gets caught for free.
2. **The draft brief** — one line per decision, tagged `[user]`, `[direction]`,
   `[doc]` or `[proposed]`.
3. **Questions** — only for what is genuinely open, each carrying your recommendation
   and two or three concrete options to react to. A rough idea gets directions, not an
   interrogation: offer "the old 3-day checklist beside a 20-minute timer", not "what
   should the subject be?"

Always ask — even with a strong recommendation — about the decisions that change the
whole job, unless the user's words, the docs or a `[direction]` line already settled
them: mode, destiny (whole-frame / cutout / layered / text overlay), where the user
will generate (which tool or model they have), how a real person's likeness may be
used, and final-tier spend. A `[direction]`
line counts as confirmed — destiny, the generator ("model-neutral" when the user
didn't know: the safe defaults in engines.md), the image list and the text zone
included — so the batch asks only what is still open. Never drip questions one at a
time; a second batch only when the answers opened something new.

**No look to follow.** When no direction was chosen, the docs describe no style, and the
user has no look in mind, suggest `mw-image-direction` in the batch if it is installed —
one question: "Pick a look first with mw-image-direction? It shortlists three
contrasting directions and two or three shots." Switch only on a yes. Without it, or on
a no, offer two or three concrete directions as `[proposed]` options (brief.md).

**Fast lane.** When no work-changing line is `[proposed]`, or the user says to go
ahead, show the brief and continue straight to prompts in the same reply. A confirmed
direction readback usually leaves nothing open: then there is no batch, only the
brief and the prompts.

Format and the vague-ask playbook: [references/brief.md](references/brief.md). A
worked batch and deliverable: [references/examples.md](references/examples.md).

### 4. Write the prompts

Load what the job needs:

- Production asset → [references/scenes.md](references/scenes.md)
- Promotional imagery → [references/social.md](references/social.md)
- A real person, a recurring character, or any person photo attached →
  [references/identity.md](references/identity.md), alongside the mode file
- Which model, its limits, where it runs, rough cost →
  [references/roster.md](references/roster.md)
- How to encode the prompt for that model's family →
  [references/engines.md](references/engines.md) — every prompt, every time
- Identity-critical work, 1:1 recreations, print, expensive finals → the full-lock
  template in [references/brief.md](references/brief.md#the-full-lock-template-l3)

### 5. After generation — iterate

When the user comes back with a result, diagnose it before touching the prompt —
against the scene sheet when a direction staged it — then write one edit, or
regenerate when the scale, camera or hero is wrong:
[references/iterate.md](references/iterate.md).

## Shared craft (every model)

Each rule has one home; the link is where its detail lives.

- **State everything the model would otherwise guess.** Camera height and angle,
  subject distance, framing, what is in focus, where the light comes from, what share
  of the frame the subject fills. The model fills every blank with its own habits.
- **The brief's content is fixed; its encoding is per family.** Ordering, labels,
  parameters, exclusion phrasing and reference syntax differ by model family. Moving a
  prompt to another family is a rewrite, never a re-run.
  [engines.md](references/engines.md)
- **Ratio in the prompt *and* in the tool's settings.** On surfaces with no setting —
  most chat apps — the prompt is the only place it can go.
- **Quantify anything that came back wrong once.** "Their head alone fills about one
  seventh of the frame height" beats "closer". Fractions, distances and counts beat
  adjectives.
- **One scene, one focal subject, and the *why*** — what the viewer should take from
  it. Reasoning models use intent.
- **The style anchor block.** Series consistency comes from one fixed style block
  pasted verbatim into every prompt; paraphrase is drift. It holds only within the
  model family it was tuned on — stamp it with that family. It names light by quality
  (hard or soft, color under a stated white balance, contrast, shadow share), never by
  a side or height relative to the camera: those change per shot and live in each
  image's own prompt.
- **Lighting by measurement when the model may change.** Name what the exposure is set
  for and how much of the frame sits in shadow; mood words do not survive a family
  switch. [engines.md](references/engines.md#lighting-transfers-as-a-measurement-not-a-mood)
- **References carry identity by default.** Any other role — style, clothing,
  background — is named explicitly, and only where the model supports it.
  [identity.md](references/identity.md)
- **Atmosphere belongs to whole frames.** Cutout-destined assets get subject-contained
  light and the flat-backdrop clause. [scenes.md](references/scenes.md#cutout-destined-assets-subjects-that-will-be-background-removed)
- **Exact text in quotes**, with typography and placement named, whenever the mode
  allows text.
- **Constraints come in two buckets.** Banned content is phrased per family; process
  instructions ("change only X") stay literal everywhere.
  [brief.md](references/brief.md#constraints--the-exclusion-list)
- **Edit, don't re-roll — one change per pass, preserve list restated every pass.**
  [iterate.md](references/iterate.md)
- **Draft cheap, finalize once.** A model switch reopens the ladder.
  [engines.md](references/engines.md#the-cost-ladder--draft-cheap-finalize-once)
- **Audit before ship** — the mode's checklist, at 100% zoom and then thumbnail size,
  including brand marks nobody asked for. The prompt is not evidence; the output is.

## Deliverable

Open with the **confirmed brief**, every line tagged. Then, per asset:

1. **File name or placement.**
2. **Where to generate** — model and surface: "GPT-Image-2.5 in ChatGPT",
   "Midjourney V8.2 on the web app", "FLUX.2 pro via API".
3. **The prompt**, in one copyable code block, encoded for that family: anchor block
   plus scene clause; parameters inline where the model takes them (Midjourney).
4. **Settings outside the prompt** — ratio or size, quality tier, count, each
   reference with its role — only the ones that surface actually has.
5. **Constraints**, as phrased for that family.
6. **One or two labeled variations** — composition or camera only, never style. With
   a staging block, vary the placement inside the frame or the instant; a camera
   variation re-derives the staging lines it moves (frame shares, focus, shadow side).
7. **The mode's checklist**, instantiated.

Close with any doc ambiguity you interpreted, flagged for review, and the anchor block
to reuse next — stamped with the model family it was tuned on.

Where files can be written, offer to save the prompts (where the project's docs say,
or beside the asset); never create files unasked.
