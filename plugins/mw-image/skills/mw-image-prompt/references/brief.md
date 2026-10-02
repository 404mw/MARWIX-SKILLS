# mw-image-prompt — From rough idea to locked brief

How to turn three words into every decision an image needs, together with the user,
and how deep to lock a prompt when the job cannot afford a re-roll. Generic method
only; the actual style facts come from the user, or from the project's documented
rules when there are some.

---

## Contents

- The decision set
- Constraints — the exclusion list
- The batch — understanding, suggestions, questions
- Vague-ask playbook
- Lock levels
- The full-lock template (L3)

## The decision set

A prompt is finished when every row below is locked. A rough ask covers two or three
of them; the rest come from documented rules where they exist, or from your own
proposal built on the defaults below — and every proposal reaches the user in the
batch before a prompt is written. Never assume a row silently, and never leave one to
the image model: whatever the prompt doesn't decide, the model decides, and its habits
are nobody's taste.

| Decision | What it locks | If nobody said |
|---|---|---|
| Purpose & placement | the image's one job, where it lives, who sees it at what size | infer from conversation context; this row drives every other row |
| Mode | production vs promotional (SKILL.md table) | ask only if genuinely both |
| Destiny | whole-frame / cutout / layered / editor-composite | whole-frame — but if any signal points at cutout or text overlay, ask: this row flips the background and atmosphere rules |
| Subject + the one action | the focal point | the concrete noun in the ask; one subject, never a collage. If the ask names a message instead of a thing → concept.md |
| Style source | which doc, kit or user description rules the look | documented rules if any; otherwise ask whether there is a look to match, and offer two or three concrete directions as `[proposed]` options. Never applied without confirmation |
| Camera | height, angle, distance/lens feel, framing | eye-level straight-on; ~85mm compression for people; wide establishing for places |
| Lighting | source count, direction, temperature | one motivated key with a stated direction; never "well lit" |
| Palette & grade | colors allowed, colors banned | the documented art-direction or brand palette if any. Design-system tokens count only for assets shipping inside the interface, and only for graphic/background color — never for skin, faces or photographic material. Otherwise restrained, one accent maximum |
| In-image text | exact words in quotes, or none | none for production; ≤4 words for promotional |
| Where it's generated | model and surface — a web app, an API, a tool the user already has | ask what they have access to; recommend from roster.md routing within that. This row decides the prompt's encoding |
| Ratio & size | generation settings | the placement's platform ratio; checked against the model's limits (roster.md resolution gate) |
| References & roles | what each attached image may control | identity.md for people; a style or logo reference gets exactly one named role |
| Lock level | prompt depth: L1 sketch / L2 standard / L3 full lock | L2; L1 for throwaway exploration; L3 for the cases listed under Lock levels |
| Budget | tiers to draft, iterate and finalize at; whether a final-tier render is wanted | the cost ladder (engines.md); final tier only for small text or a face, and only on the user's yes |
| Verification | which checklist gates shipping | the mode's checklist, instantiated |

## Constraints — the exclusion list

Every brief carries an explicit constraint block, and it has **two buckets that behave
differently.** Collapsing them is how a guardrail gets rewritten into nothing.

**1. Banned content — things that must not appear in the frame.** The standing four
(watermark, signature, extra text, extra logos) plus any documented banned list,
phrased concretely: "no neon colors, no lens flare" beats "nothing off-brand".

*Recorded literally in the brief, always.* This list is the audit's checklist — the
pre-ship pass cannot look for what nobody wrote down — and it must survive every edit
iteration. **Only the prompt translates it:** models with a negative channel take the
negation; the rest need each item restated as the positive state that excludes it
(engines.md). The brief keeps the ban; the prompt phrases it.

**2. Process instructions — how the model must treat its inputs.** "Change only [X],
keep everything else exactly as in the input" · "do not redraw, restyle, or alter the
logo from Image 2" · "do not import the reference photo's background, clothing, or
perspective" · "do not edit toward likeness".

*Stated as literal negations, on every model, always.* These name no absent object —
they constrain handling of an input already in frame — so naming them cannot summon
anything, and softening them into positive phrasing destroys the instruction. Restate
the full list on every iteration; process constraints never carry over.

**The test for which bucket an item belongs to:** does the constraint describe
something that is not in the picture, or something the model must not *do*? Absent
things get phrased per family. Forbidden actions stay negative.

## The batch — understanding, suggestions, questions

People rarely arrive with a brief in their head; they arrive with a feeling. The batch
is where the skill thinks *with* them: it shows its reading of the ask, proposes
everything it can, and asks only what the user alone can answer. One reply, three
parts:

**1. What I understand.** Two or three plain sentences — what the image is for, where
it lives, what it shows. Say the inference out loud ("a docs hero means text will sit
over it, so…"): a wrong reading caught here costs one word; caught after generation it
costs a paid re-roll.

**2. The draft brief.** One line per decision, tagged:

```
Purpose & placement   docs landing hero, full-width above the fold        [user]
Mode                  production asset                                      [proposed]
Destiny               whole-frame, live HTML headline over the left third   [proposed]
Palette & grade       near-black, single amber accent                       [doc: docs/brand.md]
Where it's generated  ?                                                     [open]
```

**3. Questions.** Only what is genuinely open. Each carries a recommendation and two
or three concrete options, so the user reacts instead of inventing:

```
1. What should the image show? Recommended: (a).
   (a) your terminal mid-run, the one green line in focus   (b) the before/after
   config diff side by side   (c) something else you already have — a screenshot?
2. Where will you generate it? Recommended: whatever you already pay for.
   (a) ChatGPT  (b) Gemini  (c) Midjourney  (d) an API / something else
```

Rules for the batch:

- **A decision the user's words or the docs already answer is settled.** Re-asking it
  reads as not having done the work.
- **The decisions that change the whole job always get a question**, even with a strong
  recommendation: mode, destiny, where it's generated, how a real person's likeness may
  be used, final-tier spend.
- **Suggestions are concrete.** "Moody" is not an option; "one desk lamp, camera-left,
  the rest of the room in shadow" is.
- **Batch everything; never drip one question at a time.** A second batch only when the
  answers opened something genuinely new.
- **Fast lane.** If no work-changing line is `[proposed]`, or the user says go, show the
  brief and continue to prompts in the same reply. Full delegation ("just make
  something") still gets its brief shown — the user edits lines instead of being
  interviewed.

A complete worked batch and the deliverable that follows it: examples.md.

## Vague-ask playbook

The translation table for asks that name a feeling instead of a picture. Read the
hidden decisions, resolve what you can, and turn the rest into questions with options.

| The ask | What it hides | Resolve by |
|---|---|---|
| "an image for the [launch/post/page]" | mode, placement, platform ratio, headline? | placement from where it will live; promotional → scroll-stop doctrine (social.md) |
| "a background for X" | **destiny** — will text or UI sit on it? will it be cut or layered? | ask destiny if unclear; reserve named negative space wherever content will sit |
| "make it pop" | focal contrast, not saturation | one subject larger/brighter, everything else quieter; never neon, never more elements |
| "professional / premium / clean" | restraint | fewer elements, controlled palette, generous negative space, one disciplined light |
| "cinematic / moody / epic" | genre defaults | one motivated light source, atmosphere per destiny, restrained high-contrast grade |
| "I can picture it but can't describe it" | the user has a feeling, not a frame | offer three distinct directions — different subject, camera or light — and let them pick or blend |
| "something like this" + attached image | *which property* they liked | name the property (composition? palette? mood? subject?); borrow that one property — never clone the image, its style wholesale, or anyone's identity |
| "use my photo" | identity work | identity.md: reference roles, clean-reference builder, likeness question |
| "just make something" | full delegation | resolve every row from docs and defaults; the brief *is* the consultation |

## Lock levels

Match prompt depth to the price of a miss. The level is a brief row, so the user sees
it and can change it:

- **L1 — sketch.** Throwaway drafts, gray-box comps, idea exploration. Compact
  skeleton: subject, composition, ratio. Cheapest tier.
- **L2 — standard.** Most shipping work. The full shared skeleton (SKILL.md) with the
  verbatim anchor block, constraints, camera stated, destiny rules applied.
- **L3 — full lock.** Identity-critical work, 1:1 recreations of a target composition,
  print, any final too expensive to re-roll. Nothing is left to the model. Template
  below.

## The full-lock template (L3)

One file (or one block) per image, self-contained: anything shared — identity block,
reference rules, standing constraints — is duplicated verbatim into every one, so any
single prompt pasted alone is complete. Section order fixed; on families that prefer
flowing prose, the sections are the *checklist* the prose must cover (engines.md).

1. `# Image <id> — <title>`
2. **Gestalt paragraph** — one dense cinematic paragraph describing the whole shot;
   reasoning models plan from it, the sections below make it auditable.
3. `## REFERENCE USAGE` — what each attached image may control, and an explicit
   denial of everything else it must not leak.
4. `## OUTPUT SPEC` — exact pixel dimensions or ratio, quality tier, medium
   ("photorealistic photograph, not illustration / painting / 3D render"), full bleed.
5. `## IDENTITY LOCK` — the verbatim identity block when a person is in frame
   (identity.md), with per-shot visibility notes only.
6. `## COMPOSITION & FRAMING` — subject placement as frame percentages, headroom,
   what occupies each region of the frame, camera height and level.
7. `## POSE` — body mechanics only: limbs, weight, head angles in degrees.
8. `## EXPRESSION & GAZE` — eyes (open/closed/direction), gaze vector, brow, mouth,
   a named mood. The only section allowed to change a face relative to references.
9. `## WARDROBE & PROPS` — fabric, fit, color, every prop named, all of it unbranded.
10. `## LIGHTING (locked — exactly N sources)` — each source: position
    (clock-position or camera-left/right plus elevation), hardness, color temperature,
    an explicit list of what it may touch, and the exclusions (no fill, no rim, no
    flare); a glasses/reflective-surface rule when relevant.
11. `## CAMERA & OPTICS` — focal length equivalent, aperture, subject distance,
    focus plane, blur and flare rules — and the framing that results, since lens specs
    are cues, not a physical simulation.
12. `## BACKGROUND & SET` — materials, textures, and what does NOT exist in frame.
13. `## COLOR & GRADE` — palette, B&W vs color, grain reference or "no grain",
    "no HDR".
14. `## HARD CONSTRAINTS` — standing bans (one person, no text/watermark/border,
    identity untouched, photorealism) plus shot-specific ones, phrased per family.

Authoring rules for L3:

- **Lock numerically**: degrees, frame percentages, Kelvin, focal lengths, exact
  source counts ("exactly one light source", "one catchlight, one lens glint").
- **State the negative space**: what is NOT in frame, which light does NOT exist,
  where text must NOT appear.
- **Camera-left / camera-right language** throughout; a bare "left" is ambiguous
  between viewer and subject and will be guessed.
- **Exceptions are granted, never assumed**: a lens glint, a visible bulb, a second
  catchlight — each is explicitly allowed in its section or it is banned by the
  constraints.
