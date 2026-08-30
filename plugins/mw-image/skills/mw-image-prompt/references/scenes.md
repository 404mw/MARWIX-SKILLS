# mw-image-prompt — Production assets (layered scene art)

Deep technique for writing image-generation prompts that produce consistent,
production-processable scene assets. Generic craft only; the actual palette, mood,
banned elements, layer scheme, naming, formats, and sizes come from the host project's
docs at runtime. The shared skeleton, anchor-block, and edit rules live in SKILL.md;
this file covers what is specific to assets that ship inside the product.

---

## Contents

- Anatomy of a scene prompt
- Negative constraints
- Prompting for layer-splittable scenes
- Cutout-destined assets (subjects that will be background-removed)
- Variation prompts
- Consistency guard
- Post-processing mechanics
- The processing checklist (instantiate per scene)
- Failure-mode catalog

## Anatomy of a scene prompt

Build each primary prompt in the shared skeleton order, with these mode-specific
emphases:

1. **Medium and style** — the rendering identity ("digital matte painting",
   "cinematic concept art", whatever the project's style bible names). This is the
   part that must be identical across every scene.
2. **Subject and composition** — what the scene contains and how it's framed. This
   is the only part that should change per scene. The camera is always stated, never
   defaulted: height and angle (eye-level straight-on is the default for people; low
   or high angle only as a deliberate choice), subject distance or lens feel ("85mm
   portrait compression", "wide establishing shot", "close macro"), and framing
   (chest-up, full figure, horizon-low vista). An unstated camera falls back to the
   engine's habit — or, in image-to-image, gets copied from the reference photo
   (references carry identity only: [identity.md](identity.md)).
3. **Lighting** — source, direction, temperature, falloff. For projects with a
   lighting rule (single source, restricted color), spell it out redundantly: name
   the one light, then explicitly state the absence of others.
4. **Palette discipline** — name the allowed colors *and* the constraint form:
   "near-monochrome X; the only saturated color is Y, used only for Z" beats a bare
   color list. Generators leak color unless told what *not* to color.
5. **Texture and atmosphere** — grain, fog, surface qualities.
6. **Technical spec** — aspect ratio / generation size per the asset contract
   (typically oversized when layers will be cropped out of it).

## Negative constraints

On top of the universal set (SKILL.md), production assets always add:

- no text, no lettering, no typography (in-image text is a promotional-mode tool;
  a production scene with pseudo-lettering is a regeneration, not a retouch)
- no faces / no people unless the docs require them (faces draw the eye and read as
  content; accidental ones are expensive to retouch out)
- no borders, no frames, no vignette baked into the image

Then the project's documented banned list, phrased concretely.

## Prompting for layer-splittable scenes

When the contract splits scenes into parallax/depth layers, the *composition* must be
built for the knife:

- **Ask for distinct depth planes** explicitly: "clear foreground silhouette, distinct
  midground, distant background; strong depth separation between planes".
- **Prefer clean silhouettes** at plane boundaries (fog, darkness, or empty space
  between planes) — intertwined edges make masking manual and ugly.
- **Generate oversized** relative to the final crop so each layer has bleed: parallax
  movement reveals areas beyond the frame, and a layer with no bleed shows hard edges
  in motion.
- For stubborn scenes, **generate layers as separate images** against the same style
  anchor (background pass, midground pass, foreground pass) instead of splitting one
  image. More prompts, cleaner edges. Recommend this when the composition has heavy
  overlap.
- Keep the parallax travel direction in mind: bleed must exist on the axis the layer
  will move.

## Cutout-destined assets (subjects that will be background-removed)

When the contract's next processing step is a cutout to transparency (a portrait
layer, a prop, any subject-only asset), the prompt optimizes for the knife, not for
the frame:

- **No atmosphere anywhere in the image.** Volumetric haze, glow orbs, bloom, light
  shafts, fog, and vignette all bleed across the matte edge and die at cutout —
  what's left is a subject with a glowing halo of the discarded background. If the
  composite needs a glow, it is applied at composite time (a separate light layer, a
  page effect), never baked into the cutout.
- **Scope the style anchor.** Keep the anchor's grade, palette, grain, and rendering
  identity clauses; strip environment-only clauses (atmosphere, haze, vast negative
  space, background composition) for this asset. Record the scoped variant in the
  deliverable so it reads as a documented exception, not style drift.
- **Light the subject, not the air.** The named light may touch the subject (rim,
  key, wrap) with contained falloff; it never appears as a visible source, ambient
  glow, or lit background behind the subject.
- **Lock a flat background with a fixed clause — cutout assets only.** When the
  background will be stripped, it must strip in one pass, so it is locked, not
  described loosely. Paste this clause (with the tone filled in) into every cutout
  prompt and restate it on every edit iteration. Full-frame scenes are the opposite
  case: they keep their composed background and never get flattened — this clause
  appearing in a non-cutout prompt is a bug:

  > solid uniform [tone] background, completely flat and even, studio-backdrop style:
  > no gradient, no texture, no pattern, no shadows cast on the background, nothing
  > behind the subject

  Pick the tone for edge separation against the subject's actual edges — including
  hair — not for looks; the background is discarded (a mid-gray behind dark hair
  beats an on-palette near-black that swallows it). Keep the subject's silhouette
  clear of the side and top frame edges so no contour is amputated.
- Add the matching negatives: no background glow, no gradient background, no
  background texture, no cast shadows on the background, no haze, no light halo
  around the subject.

## Variation prompts

Provide 1–2 variations per primary prompt so there's a fallback without a new session:

- Vary **composition or camera only** (angle, distance, arrangement). Never vary
  style, lighting rule, or palette — those variations create drift, not options.
- Label variations as such so nobody grades them as competing styles.

## Consistency guard

If prompts for other scenes were generated earlier in the project, diff the new style
constraints against those to prevent drift; the docs win over both. When a scene
genuinely needs to break the anchor (a documented beat change), say so in the
deliverable — a silent exception becomes the next scene's accidental baseline.

## Post-processing mechanics

The generated image is raw material, not the asset. Per the contract:

1. **Split** into layers per the documented scheme. Inpaint or clone-fill the holes a
   foreground extraction leaves in the plane behind it.
2. **Grade against the documented palette.** Sample actual pixels (shadows, midtones,
   the accent) and compare numerically to the project's art-direction palette — or, for
   assets shipping inside the interface, its design tokens — not by eye; monitors lie
   and drift compounds. Correct with curves/HSL toward that palette. Photographic
   subjects (skin, faces, natural materials) grade to their own reference, never to
   interface colour.
3. **Name** every file per the naming contract before export, not after — the name
   encodes the contract (scene, layer, size).
4. **Export** in the documented formats and size variants. Encode from the master
   image each time; never convert one lossy export into another.
5. **Weigh** each file against the performance budget. If a layer can't hit budget at
   acceptable quality, that's a scene-complexity problem — flag it, don't just crush
   quality.

## The processing checklist (instantiate per scene)

- [ ] layer split per the documented scheme, each layer named per the naming convention
- [ ] color/grade check against the documented palette (sample pixels, compare numerically; photographic subjects excluded)
- [ ] export in the documented formats and size variants
- [ ] per-file size sanity check against the performance budget
- [ ] files placed in the documented asset directory

## Failure-mode catalog

Inspect every accepted generation for these before processing:

| Failure | What it looks like | Countermeasure |
|---|---|---|
| Embedded text | Signage, glyph-like shapes, pseudo-lettering | Negative prompt; regenerate rather than retouch |
| Palette leak | Saturated color outside the allowed accent | Strengthen the "only color is…" clause; desaturate in grade |
| Style drift | Scene N reads as a different artist than scene 1 | Verbatim anchor block; diff prompts; reuse seed |
| Watermark ghosts | Corner artifacts, faint signatures | Negative prompt; crop margin from oversized generation |
| Baked vignette/frame | Dark border that fights layout | Negative prompt "no borders, no vignette" |
| Unsplittable composition | Planes interlock, no clean silhouettes | Re-prompt for depth separation or generate layers separately |
| Accidental focal face | A face where none was asked | "no faces" negative; regenerate |
| Inherited reference geometry | Output copies the reference photo's camera: low selfie angle, wide-angle distortion, its crop | References carry identity only ([identity.md](identity.md)); state camera height, angle, distance, and framing explicitly in the prompt |
| Baked atmosphere on a cutout asset | Glow orb, haze, or halo that dies at the matte edge after background removal | Cutout rules above: no atmosphere, subject-contained light, flat separable background |
