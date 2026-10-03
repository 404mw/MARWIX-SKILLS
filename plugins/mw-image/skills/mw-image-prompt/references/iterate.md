# mw-image-prompt — After generation: diagnose, then one edit

Load this when the user comes back with a result — attached, described, or "it's not
quite right". The job is to find the one thing most wrong, and change only that.
Re-generating from scratch re-rolls every part that was already right.

---

## Contents

- Look before you touch the prompt
- Edit or regenerate
- Writing the edit
- Edit mechanics by surface
- Common failures across both modes
- Stop-loss

## Look before you touch the prompt

1. **Get the image.** If it was not attached, ask for it. A description ("the face
   looks off") is a lead, not a diagnosis; where the image cannot be shared, ask
   targeted questions — where is the camera, what fills the frame, where is the light.
2. **Compare it line by line against the confirmed brief**, not against your memory of
   it. When a direction staged the shot, compare it line by line against the scene
   sheet too — hero size and placement, contact, light count and side, shadow
   direction, what is brightest and sharpest, the scale relations. The sheet holds
   more than the prompt did; that is what it is for. Note every miss.
3. **Rank the misses and pick one.** The miss that changes how the image reads at its
   real size goes first: identity, then focal subject and framing, then scale and
   contact, then light, then palette, then detail. The rest wait for later passes.
   When it "looks fake", sort the tells first — physics, surface, grade, composition,
   artifacts (`mw-image-direction` staging.md, "Why renders look fake") — and fix the
   class that changes the read most.
4. **Say what you saw** in one or two sentences before proposing anything, so the user
   can correct the diagnosis instead of a prompt built on it.

## Edit or regenerate

| The result | Do |
|---|---|
| Composition right, a detail wrong | **Edit** — the default |
| Composition or camera wrong | **Regenerate** from a corrected prompt; edits fight composition |
| Looks fake: one problem, composition right | **One edit** for that problem |
| Looks fake: scale, camera or hero wrong, or three or more problems | **Re-stage and regenerate** (`mw-image-direction` staging.md, "Diagnose a render"); a stack of edits costs more and drifts |
| Wrong face on identity work | **Regenerate from the canonical references** — never edit toward likeness (identity.md) |
| Embedded text or pseudo-lettering on a production asset | **Regenerate**; retouching text out leaves scars |
| Moved to a different model family | **Rewrite** the encoding first (engines.md), then budget fresh exposure and framing passes |

## Writing the edit

One change per pass. Two changes in one pass make the result unattributable: when it
comes back wrong, the next pass is a guess.

```
Change only [the one thing, stated concretely — quantified if it came back wrong once].
Keep [everything else, listed: face, expression, pose, camera, framing, palette,
lighting, background, all text — plus any destiny clause, e.g. the flat-backdrop
clause for cutouts] exactly as in the input image.
```

- **Restate the full preserve list every pass.** Preservation does not carry over
  between edits; whatever is not restated drifts.
- **The change is a measurement, not a mood.** "Lower the camera to chest height and
  pull back until the head fills one seventh of the frame", not "make it more heroic".
- **Process instructions stay literal** ("do not redraw the logo"); banned content is
  phrased per family (brief.md).
- **Bundled edits.** Some models take several changes in one edit well (Nano Banana
  2 handles bundled edits). One change per pass still wins when you need to know
  which change worked; bundle only fixes you would not need to tell apart.

## Edit mechanics by surface

- **Chat apps (ChatGPT, Gemini).** Edit in the same conversation, with the image to
  change attached or selected. Where the app offers a select-area tool, scope the
  change with it — the region does the job of a mask. A new chat loses the image as
  context.
- **Midjourney.** *Vary (Subtle)* for small drift, *Vary (Region)* or the Edit model to
  change one area, the Edit model with references to re-stage a subject. Inpainting or
  outpainting an HD image downscales the result to SD; fix composition before going HD.
- **APIs.** The model's edit endpoint with the input image, plus a mask where the model
  takes one — the only way to scope an edit to an exact region. Reuse the seed where
  the model has one.

## Common failures across both modes

Mode-specific catalogs live in scenes.md and social.md; these show up everywhere.

| Failure | What it looks like | Fix |
|---|---|---|
| Inherited reference geometry | The reference photo's camera comes back: low selfie angle, wide-angle distortion, its crop | State camera height, angle, distance and framing in the prompt; references carry identity only (identity.md) |
| Brand marks nobody asked for | A real logo on plain shoes, a cup, a laptop | Positive restatement: "plain unbranded white sneakers" — never name the brand to exclude it |
| Light drift after a model switch | A dark scene comes back gold and blown out, or murky | Re-state light as a measurement (engines.md); expect two or three passes |
| Content escaping its frame | Art on an in-scene screen or poster floats past its edge | Name the surface and say the content stops at its border |
| Face too small to hold | Likeness lost at full-figure scale | Quantify head size in frame; keep identity-critical shots at portrait range |
| Text wrong | Misspelled or invented words | Exact text in quotes; spell tricky words letter by letter; on production assets, regenerate |
| Style drift across a series | Image N reads as a different artist | Verbatim anchor block on the same family; never paraphrase it |
| Floating object | The hero hovers over its surface; no dark line where it touches | Edit: "add a thin dark contact shadow where [the loaf] meets [the board]" |
| Wrong relative scale | A cup as big as the laptop beside it; a head too large for the doorway | Regenerate with the relation from the scene sheet stated as it should appear ("the cup appears about a quarter of the laptop's width"); if it fails again, a blockout reference (`mw-image-direction` staging.md, "When words aren't enough") |
| Shadows disagree | Two shadow directions, or a shadow on the lit side | Restate the light count and side ("one sun from camera-left; every shadow falls to camera-right"); regenerate if the composition has to move |
| Waxy skin | Poreless, airbrushed faces; plastic sheen | Edit: "natural skin texture with visible pores and fine lines, no retouching" |
| HDR glow | Bloom on every edge, lifted shadows, over-sharpened detail | Edit: "soft highlight roll-off, deep shadows with detail, no HDR look"; drop "glowing" and "halation" from the prompt |
| Too clean | Pristine sets, no wear, everything evenly spaced | Edit: name two or three signs of use ("a few crumbs, the lid slightly askew") |
| Interpenetration | A hand passing into a cup, a strap merging with a shoulder | Edit, scoped to the area: "[the fingers] wrap around [the cup's handle], touching, not passing through" |
| Duplicates | A second hero, an extra hand, a repeated object | Edit to remove it; restate the count ("exactly one loaf"); regenerate if it is the hero |

## Stop-loss

- **Five edits without landing it means the prompt is wrong, not the model.** Rewrite
  from the brief, or from the nearest known-good prompt, instead of paying for edit six.
- **Identity work chains at most ~3 edits off any base.** Likeness mutates one
  generation at a time; re-base from the canonical references, never from the latest
  output.
- When an edit lands, **record what fixed it** in the brief or the prompt library, so
  the next asset starts from the corrected prompt instead of rediscovering the fix.
