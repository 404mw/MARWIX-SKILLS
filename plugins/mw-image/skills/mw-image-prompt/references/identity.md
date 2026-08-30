# mw-image-prompt — Identity work (real people and recurring characters)

Everything that governs generating a specific person or a frozen character:
reference roles, cleaning poor references, verbal identity locks, camera for people,
edit discipline, likeness verification. Load this whenever a person photo is
attached or a recurring character is in frame, alongside the mode reference.

---

## Reference roles — the one law

An attached photo of a person locks **identity**: face geometry, hair, beard and
mustache, glasses, skin tone. Nothing else. The engine silently copies every
property the prompt leaves unstated - camera angle, distance distortion, crop,
lighting, wardrobe, background, even expression - so the prompt states all of them
itself. "Use the reference's framing" is how selfie geometry ends up in a final.

- **Audit each reference before writing**: where was the camera? how close? what
  light? A casual photo is usually a below-eye-level phone selfie with close
  wide-angle distortion and a color cast - all of it leaks unless overridden.
- **Name every reference and its role in the prompt text**: "Image 1, front view -
  identity only", "Image 2, left profile - 3D head shape only, never framing".
  Per-engine multi-reference mechanics: engines.md.
- **Deny the leak explicitly**, then state the replacements: "Do not import the
  reference photos' background, clothing, lighting, or phone-selfie perspective" +
  positive camera, pose, lighting, wardrobe, and background clauses.

## The clean-reference builder

When the only available references are casual photos, fix the reference itself
before any serial work - one build, and every future generation inherits it instead
of re-fighting the same flaws:

1. **Generate a canonical pair** from the raw photos: a **front** (chest-up, dead
   square, camera at eye level) and a **true 90° profile** (matching whichever side
   the raw profile shows). Neutral studio treatment, deliberately style-free: two
   identical soft sources at ~±35° and eye level, 5500K, even and near-shadowless;
   seamless mid-gray backdrop; plain logo-free wardrobe; ~85mm equivalent at ~2 m,
   deep f/8 focus, sharp everywhere; zero lens reflections so the eyes stay
   readable; accurate skin tone; no grade, no grain, no beautification. A reference
   is a document - mood belongs to the real work.
2. **Verify likeness with the user** (or someone who knows the face) against the
   raw photos. The agent compares features; only a human blesses likeness.
3. **Freeze the approved pair** as the canonical references and archive the raw
   photos beside them. Downstream prompts attach the clean pair.
4. **Rebuild only when the face materially changes** (grooming, glasses). Never
   refresh the canon casually - every regeneration is a new person.

## The verbal identity lock

For serial identity work, derive a written identity block from the references once
and duplicate it **verbatim** into every prompt - paraphrase is drift:

- Contents: face geometry (shape, cheeks, nose, brows, eye color) · skin tone with
  an explicit no-smoothing / no-lightening clause · hair (color, texture, exact
  style) · facial hair (length in cm, edge shape, mustache treatment, "do not
  shorten or sculpt") · eyewear (frame shape, material, "must be worn") · build and
  height for anything framed below the shoulders.
- **Identity is frozen; presentation is free.** Expression, gaze, pose, wardrobe,
  and role are per-image variables, each redefined explicitly in its own prompt -
  never inherited from the reference's expression.
- Per-shot exceptions (this shot's glasses-reflection rule, a lit eye in darkness)
  are granted in the shot's own sections, never edited into the lock block.

## Camera for people

- Default: camera at eye level, straight on, ~85mm portrait compression, subject
  distance ≥1.5 m, framing named (chest-up / head-and-shoulders / full figure).
- A low or high angle is a deliberate, stated choice with a reason - never an
  inheritance from the reference.
- The selfie-flaw catalog to prompt against: below-eye camera (up-nostril
  perspective), close wide-angle distortion (enlarged nose, narrowed skull), tilted
  frame, the reference's own expression and crop.
- Identity transfer weakens as the face shrinks in frame: at full-figure scale the
  face may render too small to hold likeness. Flag it, and keep identity-critical
  shots at portrait range.

## Edits and drift

- Every edit iteration restates the **full preserve list** - face, features,
  expression, camera, framing, palette, plus the destiny clauses (the flat-backdrop
  clause for cutouts). Preservation never carries over between edits.
- Chain at most ~3 edits off any base; likeness mutates one generation at a time.
  When it wanders, re-base from the frozen canonical references, never from the
  latest output.
- **A wrong face is a regeneration, never a retouch.** Do not edit toward likeness;
  discard and re-roll from the canon.

## Verification

Likeness is the first check, before composition, light, or grade: compare against
the canonical references at 100% zoom, feature by feature. Common drift points:
facial-hair length and edge, eyewear substitution or removal, skin-tone shift,
beauty-filter smoothing. A likeness failure fails the image no matter how good the
rest of it looks.
