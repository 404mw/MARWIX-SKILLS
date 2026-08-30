---
name: mw-image-prompt
description: Write AI image-generation prompts and edit instructions for any visual asset - site scene art, backgrounds, parallax layers, social covers, concept illustrations, carousels, infographics, recurring-character scenes, thumbnails - from the host project's documented art direction or brand kit, plus engine routing, cost discipline, and the pre-ship audit. Use whenever the user wants prompts, artwork, scene art, brand imagery, or a post image produced, even if they don't name this skill, and even when the ask is vague or one-line ("make it pop", "something for the launch") - the skill decides what the image should be of, then locks the full brief before any prompt is written. This skill writes the prompts and workflow; it does not generate the images.
argument-hint: "[scene/section or post/asset]"
---

Produce ready-to-use image-generation prompts, edit instructions, and the processing
and verification steps that make the results ship-ready - from a full art-direction
brief or from a three-word ask. This skill is portable: it carries prompt craft only.
Every stylistic constraint - palette, mood, style blocks, characters, banned
elements - comes from the host project's docs at runtime.

**Precedence: the host project's documented rules dictate; this skill directs.** Where
a project's docs and anything written here disagree, the project wins - the project
supplies the law, this skill supplies the method. Name which rule you followed and
where it came from.

## Procedure

1. **Assemble the brief - the user's words are the start, never the whole.** Every
   image is generated from the same locked decision set, whether the user supplied
   it or not: purpose and placement · mode · destiny (whole-frame / cutout / layered /
   editor-composite) · subject and the one action · style source · camera · lighting ·
   palette and grade · in-image text · ratio, size, engine · references and their
   roles · verification checklist. For each decision, take the answer from the
   user's explicit words or the host project's docs; where both are silent, form a
   recommendation from the mode's documented defaults - but never assume silently.

   **The concept gate.** If *subject and the one action* cannot be filled from either
   source and the mode is promotional, it is a concept job first: ask what material
   the user already has (a screenshot, two versions, a number, a broken output). If
   that answers it, continue; if not → [references/concept.md](references/concept.md).
   Production assets take their subject from the asset contract; the gate never fires.

2. **Confirm the brief before any prompt exists - never jump to a result.** First
   break down what you actually gathered and where each piece came from: what the user
   said, what the project documented, and what is still missing. Then present the
   assembled brief as a readback: one line per decision, tagged [user], [doc], or
   [proposed], plus explicit clarifying questions (each with a recommended answer) for
   everything genuinely open - mode, destiny (cutout vs composed), how a real person's
   likeness may be used, final-tier spend, and any [proposed] line you are not sure
   of. Prompts are written only against a user-confirmed brief: a correction costs
   one word here and a paid re-roll later. Playbook for vague asks, the decision
   table, and the readback format → [references/brief.md](references/brief.md).

3. **Classify the job.** Two modes with opposite defaults; the brief's mode row:

   | | **Production asset** | **Promotional imagery** |
   |---|---|---|
   | What | Art that ships inside the product/site: scene art, backgrounds, parallax layers, textures | Art that sells or announces: social covers, concept illustrations, carousels, character posts, thumbnails |
   | Law | The project's art-direction / asset-contract docs | The project's brand docs |
   | Text in image | Never, unless the contract says otherwise | A core tool: exact headlines, labels |
   | Faces/characters | Banned unless documented | Recurring characters are a standing asset |
   | Output shape | Built for post-processing: layer splits, grading, format exports | Built for the feed: platform ratios, thumbnail legibility |

   If the target is ambiguous, ask. Applying the wrong mode's text rule ruins the asset.

4. **Load the law. Two ways in, and only two.**

   - **A documented repo.** Try the repo's `CLAUDE.md` first and follow its
     source-of-truth pointers. Extract what the mode needs: art direction (palette,
     lighting, mood, banned elements) and the asset contract (layer scheme, naming,
     formats, sizes) for production work; the brand kit (style blocks, palette,
     recurring props/characters, voice rules) for promotional work.
   - **A blank one.** No filesystem to read, or nothing documented for this mode: the
     user is the source. Ask for those decisions directly and proceed once they answer.

   A UI design system - component specs, design tokens, Tailwind/shadcn config - is
   interface law, not art direction. It applies when the asset ships inside the
   interface, and only to graphic and background colour; it never governs photographic
   subjects. If a repo documents nothing but a design system and the job is promotional
   or photographic, treat the project as blank and ask.

   Never improvise a style.

5. **Route.** Load only what the job needs:
   - Subject undecided - the ask names a message, not a thing →
     [references/concept.md](references/concept.md) (material-first moves, caption test)
   - Vague or underspecified ask; precision work that must not be re-rolled
     (identity-critical, 1:1 recreations, print, expensive finals) →
     [references/brief.md](references/brief.md) (decision set, playbook, lock
     levels, full-lock template)
   - Production asset → [references/scenes.md](references/scenes.md) (layer-splittable
     composition, cutout rules, post-processing mechanics, failure catalog)
   - Promotional imagery → [references/social.md](references/social.md) (scroll-stop
     doctrine, recipes, character pipeline, pre-post audit, failure catalog)
   - A real person, a recurring character, or any person photo attached →
     [references/identity.md](references/identity.md), alongside the mode file
     (reference roles, clean-reference builder, identity locks, camera for people)
   - Engine choice, settings, or engine-specific edit syntax →
     [references/engines.md](references/engines.md)

## Shared craft (both modes, every prompt)

- **Prompt skeleton, in order** (generators weight early tokens heavier):
  style/medium → subject (+ expression if a character) → the one action → setting →
  composition (camera height and angle, subject distance or lens feel, framing, focal
  point, reserved negative space) → exact text in quotes with typography and
  placement (promotional only) → negative constraints → ratio and resolution. State
  ratio inside the prompt *and* in the tool's settings.
- **Full sentences, one scene, one focal subject.** Current engines are reasoning
  models that read a prompt like a creative director reads a brief; comma-separated
  keyword soup actively degrades results. Describe what a viewer sees, and give the
  *why* ("the viewer should wonder what the robot broke") - intent is used.
- **The style anchor block.** Series consistency comes from verbatim reuse, not from
  re-describing the style in new words. Extract the project's documented style into
  one fixed block and paste it unchanged into every prompt; only the subject/
  composition clause varies. Paraphrase is drift. Record seeds/style references when
  the engine supports them.
- **Reference images carry identity only.** A person-reference locks the face:
  likeness, bone structure, features. Everything else - camera, framing, crop, pose,
  lighting, wardrobe, background - must be stated in the prompt: the engine silently
  copies whatever the prompt leaves unstated, flaws included, and casual references
  are usually low-angle selfies with wide-angle distortion. Never write "use the
  reference's framing". Roles, locks, drift: [references/identity.md](references/identity.md).
- **Atmosphere belongs to full frames.** Glow, haze, bloom, light shafts, and
  vignette are composite-level effects for images shipping as a whole frame. A
  cutout-destined asset gets subject-contained lighting, zero atmosphere, and a
  locked flat-backdrop clause restated on every edit; whole-frame assets keep their
  composed background. Mechanics: [references/scenes.md](references/scenes.md).
- **Exact text goes in quotes, always** (when the mode allows text), with typography
  and placement named. Models render what is in the quotes and improvise anything
  left vague.
- **Constraints are load-bearing, and the two kinds behave differently.** *Banned
  content* - watermark, signature, extra text, extra logos, plus the project's
  documented banned list, phrased concretely ("no neon colors" beats "nothing
  off-brand") - is recorded literally in the brief, then phrased per engine: diffusion
  takes the negation, reasoning engines need the positive state that excludes it ("a
  clean unmarked corner", never "no watermark"). *Process instructions* ("change only
  X", "do not redraw the logo") name no absent object and stay literal on every
  engine. Both buckets: [references/brief.md](references/brief.md).
- **Iterate with edits, not re-rolls.** A near-miss gets a surgical edit instruction -
  "Change only [X]. Keep [everything else, listed] exactly as in the input." - with
  the full preserve list restated on *every* iteration; preservation does not carry
  over between edits. Re-generating from scratch re-rolls the parts that were right.
- **Cost ladder: draft cheap, finalize once.** Explore at the lowest quality tier with
  multiple variants → iterate at medium with preserve-list edits → one final
  high-quality render, only if the image contains small text or a face. Stop-loss: if
  five edits have not landed it, the prompt is wrong, not the model - rewrite from the
  nearest known-good template. Tier mechanics per engine: [references/engines.md](references/engines.md).
- **Audit before ship.** No generated image ships without the mode's verification
  pass (processing checklist for production, pre-post audit for promotional). Fresh
  eyes, 100% zoom, then thumbnail size.

## Deliverable

Open with the **confirmed brief**: step 2's readback with the user's corrections
applied, every line tagged [user], [doc], or [proposed]. Then per target asset: the
file name or placement, the primary prompt (anchor block + scene clause), the negative
constraints, generation size/ratio and engine, 1-2 labeled variations (composition or
camera only - never style), and the mode's checklist instantiated. Close with any doc
ambiguity you interpreted, flagged for review, and the anchor block to reuse next.
