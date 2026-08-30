# mw-image-prompt — From vague ask to locked brief

How to finalize every decision an image needs when the user gave you three words,
and how deep to lock a prompt when the job cannot afford a re-roll. Generic method
only; the actual style facts still come from the host project's docs at runtime.

---

## Contents

- The decision set
- Constraints - the exclusion list
- Clarify, never assume
- Vague-ask playbook
- Lock levels
- The full-lock template (L3)
- The readback - the gate before prompts

## The decision set

A prompt is finished when every row below is locked. A vague ask covers two or three
of them; the rest you take from the project docs or recommend from the defaults
below - and every recommendation is confirmed by the user in the readback before a
single prompt is written. Never assume a row silently, and never leave one to the
image model - whatever the prompt doesn't decide, the engine decides, and the
engine's habits are nobody's taste.

| Decision | What it locks | If nobody said |
|---|---|---|
| Purpose & placement | the image's one job, where it lives, who sees it at what size | infer from conversation context; this row drives every other row |
| Mode | production vs promotional (SKILL.md table) | ask only if genuinely both |
| Destiny | whole-frame / cutout / layered / editor-composite | whole-frame - but if any signal points at cutout or text-overlay, ask: this row flips the background and atmosphere rules |
| Subject + the one action | the focal point | the concrete noun in the ask; one subject, never a collage |
| Style source | which doc or kit rules the look | project docs; if the project has none, ask the user. A genre convention may be offered as a [proposed] line for confirmation, never applied on its own |
| Camera | height, angle, distance/lens feel, framing | eye-level straight-on; ~85mm compression for people; wide establishing for places |
| Lighting | source count, direction, temperature | one motivated key with a stated direction; never "well lit" |
| Palette & grade | colors allowed, colors banned | the project's documented art-direction or brand palette. Design-system tokens count only for assets shipping inside the interface, and only for graphic/background colour - never for skin, faces, or photographic material. Otherwise restrained, one accent maximum |
| In-image text | exact words in quotes, or none | none for production; ≤4 words for promotional |
| Ratio / size / engine | generation settings | the placement's platform ratio; engine per engines.md routing |
| References & roles | what each attached image may control | identity.md for people; a style or logo reference gets exactly one named role |
| Verification | which checklist gates shipping | the mode's checklist, instantiated |

## Constraints - the exclusion list

Every brief carries an explicit constraint block, and it has **two buckets that behave
differently.** Collapsing them is how a guardrail gets rewritten into nothing.

**1. Banned content - things that must not appear in the frame.** The standing four
(watermark, signature, extra text, extra logos) plus the project's documented banned
list, phrased concretely: "no neon colors, no lens flare" beats "nothing off-brand".

*Recorded literally in the brief, always.* This list is the audit's checklist - the
pre-ship pass cannot look for what nobody wrote down - and it must survive every edit
iteration. **Only the prompt translates it:** diffusion engines take the negation
directly; reasoning engines have no subtractable negative and need each item restated
as the positive state that excludes it (engines.md). The brief keeps the ban; the
prompt phrases it.

**2. Process instructions - how the engine must treat its inputs.** "Change only [X],
keep everything else exactly as in the input" · "do not redraw, restyle, or alter the
logo from Image 2" · "do not import the reference photo's background, clothing, or
perspective" · "do not edit toward likeness".

*Stated as literal negations, on every engine, always.* These name no absent object -
they constrain handling of an input already in frame - so the pink-elephant failure
does not apply, and softening them into positive phrasing destroys the instruction.
Restate the full list on every iteration; process constraints never carry over.

**The test for which bucket an item belongs to:** does the constraint describe
something that is not in the picture, or something the model must not *do*? Absent
things get positively restated for reasoning engines. Forbidden actions stay negative.

## Clarify, never assume

A decision the user's words or the project docs already answer is settled -
re-asking it reads as not having done the work. Every other decision is proposed,
never silently applied: it goes into the readback tagged [proposed], carrying a
recommended answer the user can accept with one word. The decisions that flip the
work always get an explicit question, even when you have a strong recommendation:
mode, destiny (cutout vs composed vs text-overlay), how a real person's likeness
may be used, and final-tier spend. Batch everything into the single readback; never
drip questions one at a time.

## Vague-ask playbook

The translation table for asks that name a feeling instead of a picture. Read the
hidden decisions, resolve them, and show the translation in the readback.

| The ask | What it hides | Resolve by |
|---|---|---|
| "an image for the [launch/post/page]" | mode, placement, platform ratio, headline? | placement from where it will live; promotional → scroll-stop doctrine (social.md) |
| "a background for X" | **destiny** - will text or UI sit on it? will it be cut or layered? | ask destiny if unclear; reserve named negative space wherever content will sit |
| "make it pop" | focal contrast, not saturation | one subject larger/brighter, everything else quieter; never neon, never more elements |
| "professional / premium / clean" | restraint | fewer elements, controlled palette, generous negative space, one disciplined light |
| "cinematic / moody / epic" | genre defaults | one motivated light source, atmosphere per destiny, restrained high-contrast grade |
| "something like this" + attached image | *which property* they liked | name the property (composition? palette? mood? subject?) in the readback; borrow that one property - never clone the image, its style wholesale, or anyone's identity |
| "use my photo" | identity work | identity.md: reference roles, clean-reference builder, likeness gate |
| "just make something" | full delegation | resolve every row from docs + defaults; the readback *is* the consultation |

## Lock levels

Match prompt depth to the price of a miss:

- **L1 - sketch.** Throwaway drafts, gray-box comps, idea exploration. Compact
  skeleton: subject, composition, ratio. Cheapest engine tier.
- **L2 - standard.** Most shipping work. Full shared skeleton (SKILL.md) with the
  project's verbatim anchor block, negatives, camera stated, destiny rules applied.
- **L3 - full lock.** Identity-critical work, 1:1 recreations of a target
  composition, print, any final too expensive to re-roll. Nothing is left to the
  model. Template below.

## The full-lock template (L3)

One file per image, self-contained: no links between prompt files; anything shared
(identity block, reference rules, standing constraints) is duplicated verbatim into
every file, so any single file pasted alone is complete. Section order fixed:

1. `# Image <id> - <title>`
2. **Gestalt paragraph** - one dense cinematic paragraph describing the whole shot;
   reasoning engines plan from it, structured sections below make it auditable.
3. `## REFERENCE USAGE` - what each attached image may control, and an explicit
   denial of everything else it must not leak.
4. `## OUTPUT SPEC` - exact pixel dimensions, API size value, quality tier, medium
   ("photorealistic photograph, not illustration / painting / 3D render"), full bleed.
5. `## IDENTITY LOCK` - the verbatim identity block when a person is in frame
   (identity.md), with per-shot visibility notes only.
6. `## COMPOSITION & FRAMING` - subject placement as frame percentages, headroom,
   what occupies each region of the frame, camera height and level.
7. `## POSE` - body mechanics only: limbs, weight, head angles in degrees.
8. `## EXPRESSION & GAZE` - eyes (open/closed/direction), gaze vector, brow, mouth,
   a named mood. The only section allowed to change a face relative to references.
9. `## WARDROBE & PROPS` - fabric, fit, color, every prop named; "no logos".
10. `## LIGHTING (locked - exactly N sources)` - each source: position
    (clock-position or camera-left/right + elevation), hardness, color temperature,
    an explicit list of what it may touch, and the exclusions (no fill, no rim, no
    flare); a glasses/reflective-surface rule when relevant.
11. `## CAMERA & OPTICS` - focal length equivalent, aperture, subject distance,
    focus plane, blur and flare rules.
12. `## BACKGROUND & SET` - materials, textures, and what does NOT exist in frame.
13. `## COLOR & GRADE` - palette, B&W vs color, grain reference or "no grain",
    "no HDR".
14. `## HARD CONSTRAINTS` - standing bans (one person, no text/watermark/border,
    identity untouched, photorealism) plus shot-specific ones.

Authoring rules for L3:

- **Lock numerically**: degrees, frame percentages, Kelvin, focal lengths, exact
  source counts ("exactly one light source", "one catchlight, one lens glint").
- **State the negative space**: what is NOT in frame, which light does NOT exist,
  where text must NOT appear.
- **Camera-left / camera-right language** throughout; a bare "left" is ambiguous
  between viewer and subject and will be guessed.
- **Exceptions are granted, never assumed**: a lens glint, a visible bulb, a second
  catchlight - each is explicitly allowed in its section or it is banned by the
  constraints.

## The readback - the gate before prompts

The readback is delivered **before any prompt is written**, and prompt writing waits
for the user's confirmation. One line per decision, tagged `[user]`, `[doc]`, or
`[proposed]`; the open questions listed at the end, each with a recommended answer.
The user confirms or corrects lines; only the confirmed brief becomes prompts. The
readback is the contract - a wrong inference costs the user one word here and a paid
re-roll after generation. For fully delegated asks ("just make something") the
readback is the consultation itself: the user edits lines instead of being
interviewed about a brief they never had in their head - but even full delegation
gets its readback confirmed before anything is written or generated.
