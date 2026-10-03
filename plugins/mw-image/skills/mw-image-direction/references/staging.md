# mw-image-direction — Staging: the scene's physics and emphasis

A direction decides how an image looks; a shot decides where the camera is. Staging
decides **what physically exists in front of that camera**: every object, its real size,
what holds it up, where its light comes from, and what the viewer sees first. Models
compose by pattern: unstaged, they float cups and throw two shadows from one sun.
Staging reasons the scene out once, then writes the *visible results*.

Terms: [vocabulary.md](vocabulary.md). Placement: [composition.md](composition.md).
Camera and light maths: [optics-light.md](optics-light.md).

## Contents

When to stage, and how deep · Decided, not measured · The scene sheet · Inventory and
roles · Real sizes · Casting and styling · Gravity, support and contact · Materials ·
Motion and the instant · Emphasis · Stylized directions · Physics check · Why renders
look fake · Diagnose a render · When words aren't enough · Placing a supplied product ·
Screens and devices · Where models still break · Prompt budget · Writing physics into a
prompt · Worked example

## When to stage, and how deep

Stage after the shot is picked and the destiny is known. Set the depth first:

| Family | Sheet parts used |
|---|---|
| Photographic, 3D render, miniature | Full: inventory, sizes, camera ([optics-light.md](optics-light.md)), contact, light, materials, instant, emphasis, check |
| Painterly, illustrated, children's book, anime, ink, hand-drawn | Inventory, sizes, contact, one light direction, emphasis, a stated focus area; no optics numbers |
| Soft 3D, clay, paper craft, low-poly, glass morphism | Inventory, sizes, contact or licensed floating, one light, materials, emphasis |
| Isometric, technical | Inventory, sizes, one consistent light direction with shadows on one side, emphasis; no perspective |
| Flat, vector, Swiss, type-led, pop, pixel, print | Inventory, frame shares, overlap, emphasis, quiet zone (a flat colour field is a valid quiet zone); no camera, no optics, no contact shadows unless the style draws them |
| Surreal | The family it is painted or photographed in, minus the law(s) the idea breaks |
| Cutout or layer asset (destiny) | Inventory, sizes, light on the subject only (key side and temperature matched to the composite); no set, no cast shadow, no bounce; contact shadows are added at composite time |

Abstract images (aurora, gradient, texture) need only emphasis and the quiet zone.

## Decided, not measured

The scene does not exist yet, so its distances are **choices**, worked backwards from
the framing. Only object sizes are facts (the size table, or the product's own).

1. **Decide the framing**: "the loaf about a fifth of the frame width, 35mm feel".
2. **Take the known size**: a 22 cm loaf at a fifth needs a frame about 1.1 m wide.
3. **Derive the distance** along the lens axis: frame width × f ÷ frame-width-mm =
   1.1 × 35 ÷ 36 ≈ 1.1 m. A camera 1.35 m high and 1.1 m back is ≈ 1.15 m along the
   axis, close enough: the loaf lands at 19%.
4. **Place the rest relative to the hero**: "the baker 35 cm beyond it".
5. **Collect the consequences**: the head appears about half the loaf's width; the face
   is only a touch soft, so it needs a turn and a crop.

The point is **consistency**: every relation comes from one geometry. Round to what a
person says aloud.

- **Never ask the user** for distances, camera height, tilt, aperture or sun angle; ask
  only a product's real size, a real space, what must be seen first.
- **An unknown size** is assumed, stated and open to correction in the same reply
  ("bottle assumed 14 cm tall — correct me if not"). It never blocks the work.
- **Frame share** is linear: the share of frame width, or of height for standing
  figures. Say which.
- **Reading an image that exists:** scale from something of known size (a door ≈ 2 m, a
  face ≈ 23 cm, a phone 15 cm). A mug (8 cm) drawn as wide as the laptop (31 cm) beside
  it is either 31 cm across or about four times closer (31 ÷ 8).

## The scene sheet

The numbers, for the hand-off (`[direction]` lines) and `docs/art-direction.md`. The
user sees the **Plain readback** (SKILL.md); the sheet only on request, at L3, or when a
render is checked. Fill only the lines the family uses.

```
Scene        who or what, doing what, where, when
Use          destiny, ratio, live-text zone, the crops the placement uses
World scale  the anchor of known size; the surface everything stands on
Camera       height, distance along the lens axis, tilt, lens feel → frame at the hero
Objects      role · object · real size · rests on / held by · material · share · sharp/soft
Cast         per person: age, build, skin tone, hair, wardrobe, grooming, one trait
Light        count; side, elevation, hard/soft, colour under a stated white balance;
             shadow direction and length; key:fill; shadow share
Physics      only what the scene has: contact, liquids, cloth, steam, wind, the instant
Emphasis     1st, 2nd, 3rd read; how the hero wins; what is held down
Quiet zone   where text sits, and what physically fills it
Assumed      sizes assumed; the honesty note for a real business
```

**Camera and light.** Decide camera height, distance, tilt, lens feel and ratio; light
count, side, elevation, quality, temperature against a stated white balance, and
key:fill. The maths is in [optics-light.md](optics-light.md); the sheet needs only:
- frame width at the hero = distance along the lens axis × frame-width-mm ÷ f (36 for
  landscape; 24 for 4:5, 3:4 and 1:1; 20.25 for 9:16);
- shadow length = height ÷ tan(sun elevation): 15° → 3.7×, 30° → 1.7×, 45° → 1×;
- key:fill 2:1 open, 4:1 sculpted, 8:1 dramatic;
- a face held down by focus needs blur ≥ 1% of the frame width; otherwise crop or turn it.

**A series:** one shared world sheet (scale, light logic with the rig in world terms,
"low sun through the east window", materials, palette, casting) plus a 4–6-line delta
per image. **Grid sets** (product grid, swipe carousel) keep shot, subject size, horizon,
margin and rig. **Narrative sets** (campaign, editorial, a site's pages) rotate shots and
keep the light logic (quality, temperature, contrast, shadow share). A product rotates:
three-quarter packshot · in hand · material macro · in context · overhead.

## Inventory and roles

List everything in frame on the sheet, the floor and wall included. One role each:

| Role | Count | Job |
|---|---|---|
| **Hero** | one, or one group read as one unit with a lead member | what the image is about |
| **Support** | 0–3 | explains or serves the hero: the hands, the person holding it |
| **Context** | zero, or an odd number, as few as the direction allows | where and when; never competes |
| **Set** | the surfaces | carries light, shadow and the quiet zone |

Minimalism, studio product, Swiss, flat vector and editorial seamless default to zero
context; maximalism and collage are exempt. **Prompt cap:** name the hero, ≤ 2 supports
and ≤ 3 context items; describe set surfaces as materials; everything else is "nothing
else on the counter".

## Real sizes

| Thing | Typical size |
|---|---|
| Adult standing · seated eyes | 1.55–1.85 m, eyes 10–12 cm below the crown · 1.15–1.25 m |
| Head · eye spacing · shoulders | 22–24 cm tall, 15 wide · ≈ 6.3 cm · 40–46 cm |
| Hand · child of 5 | 17–20 cm, palm 8–9 · ≈ 1.10 m |
| Door · ceiling | 2.0–2.1 × 0.8–0.9 m · 2.4–2.7 m homes, 3–4 m shops |
| Table · counter · bar | 72–76 cm · 90–92 high, 60 deep · ≈ 105, stool 75 |
| Chair seat · sofa · double bed · sill | 45 cm · ≈ 200 × 90, seat 45 · 140–160 × 200 · ≈ 90 |
| Phone · credit card | 15 × 7 × 0.8 cm · 8.56 × 5.4 cm |
| Laptop 13–14″ · 27″ monitor · keyboard | 31 × 22, screen ≈ 30 × 19 · ≈ 61 × 36 · ≈ 44 × 13 cm |
| A4 · hardcover | 21 × 29.7 · 24 × 16 × 3 cm |
| Mug · espresso · 12 oz takeaway cup | 9–10 tall, 8 across · 6 · 11–14 cm |
| 330 ml can · 500 ml bottle · wine bottle | 12.2 × 6.6 · ≈ 21 · 30 cm |
| Plate · layer cake · cupcake | 26–28 · Ø 20–25 · ≈ 7 cm |
| Sourdough loaf · baguette · croissant | Ø 20–25 · 55–65 · 12–15 cm |
| Apple · lemon | 7–8 · 7–9 long, 5–6 across |
| Perfume 50 ml · 100 ml | 9–12 · 12–15 cm tall |
| Lipstick · skincare jar · watch · ring | ≈ 8 · Ø 6–7 cm · case 36–44 mm · ≈ 2 cm |
| Sneaker · cat · medium dog | 23–31 cm · 25 at the shoulder · 50 |
| Car · storey · tree | 4.5 × 1.8 × 1.5 m · ≈ 3 m · 10–25 m |

Invented objects get a decided size. Inches convert on the sheet. The prompt uses
**scale relations**: "the bottle a little taller than a hand".

## Casting and styling

Left alone, models cast young, slim, generic faces. Decide each person: age range,
build, skin tone, hair; wardrobe in the palette, with a fabric weight; grooming; one
specific trait (reading glasses pushed up, a rolled sleeve, a grey streak). Set the
exposure for their skin. Across a set, cast deliberately: reflect the user's real
audience or staff when they say who that is, and vary with intent, not as a stock lineup.

## Gravity, support and contact

Every object is **resting, held, hanging, or in flight for a reason**. Write which.

- **Contact:** a thin dark shadow, darkest at the touch point; without it, objects look
  pasted in. Objects touch; they never merge.
- **Weight shows:** a cushion compresses, a full bag pulls its strap taut, a stack stands
  only with its centre of mass over its base.
- **Liquids stay level with the world.** A meniscus climbs the glass. A thin trickle
  stays a continuous thread for 10 cm or more and breaks into drops lower down; a thick
  pour stays a rope longer. Condensation sits below the liquid line of a cold drink.
- **Cloth and hair hang:** heavy fabric in few broad folds, light fabric in many fine ones.
- **Wind is one direction**, at matching strength for hair, smoke and grass.
- **Heat rises:** steam curls and thins within 10–30 cm, best seen backlit.
- **Hands hold for real:** a pinch or wrap grip opposes thumb and fingers; a hook grip (a
  bag handle) has no opposed thumb. Fingers wrap at the object's real width.

## Materials

| Material | It shows |
|---|---|
| Matte (paper, plaster, cotton) | even shading, no highlight; no stray "premium" gloss |
| Satin (oiled wood, skin) | a broad dim highlight toward the source; skin is not plastic |
| Gloss (lacquer, glaze, wet) | a sharp highlight shaped like the source, on the source's side |
| Metal | mostly its surroundings; gold and copper tint their highlights |
| Glass, clear liquid | the background bent through it; caustics below, under hard light only |
| Translucent (skin, leaves, wax) | glow where backlit, warmer at thin edges |
| Any smooth surface | more reflection at grazing angles: a low camera mirrors the window |

**Reflections are geometry:** the scene seen from behind the surface, reversed; still
water shows objects from below; ripples stretch reflections into vertical streaks.

## Motion and the instant

Name **one instant** ("the blade mid-cut", not "baking") and one shutter: frozen (drops
are spheres) or blurred (only what moves blurs, along its path).
- In a stride, each arm swings forward with the opposite leg.
- A look-turn leads with the head; a throw or swing leads with the hips.
- Hair and cloth trail the movement. Thrown things move on arcs.
- In a splash crown the rim's drops fly outward; only the central jet's drops fall back.

## Emphasis

Decide the **first read** (the hero and its money detail), second and third.
**Pull order:** faces and eyes · legible text · local contrast · brightness · sharpness ·
an isolated saturated colour · lines and gaze · size · isolation · texture.

**The rule.**
- The hero owns the strongest cue it *can* own: brightest relative to its surroundings,
  or highest local contrast. It is the sharpest, and wins at least one more pull.
- Any face or legible text that is not the hero is held down by at least two of: crop,
  turn, focus, value. Say it will still be glanced at.
- In silhouette, rim-lit low-key or backlit designs, the hero is the darkest shape
  against the brightest field.
- **Brightness = light × surface lightness.** A white surface in shade can match a dark
  hero in sun. Keep light-coloured set pieces out of the beam, or make the hero the
  lightest material in it.
- **Live text:** decide the order (hero → headline, or the reverse) and route a gaze or
  line between them. **Gaze** goes to the hero when the person is support, and to the
  text when the person is the hero.

| Competitor | Hold it down by |
|---|---|
| A face, not the hero | two of crop, turn, focus, value |
| Text, logos, screens | remove, turn or defocus; **except the product's own label or screen**: composite it from the supplied photo or leave a clean plate |
| A window or sky | expose for the hero and let it roll off, crop it, or curtain it |
| A light set piece in the beam | move it out of the beam, or use a darker material |
| A second saturated colour | desaturate it into the palette |
| An object as big as the hero | move it back: twice the distance, half the size |

## Stylized directions

| Family | Keeps | Bends |
|---|---|---|
| Painterly, children's book, anime, hand-drawn, ink | sizes, contact, one light, emphasis, a focus area | optics; texture or line replaces depth of field; ink draws shadow as shapes |
| Clay, soft 3D, low-poly, paper craft | contact, one light, material (thumbprints, facets, paper thickness) | real scale: pick tabletop or toy world and keep it |
| Miniature | everything; very shallow focus is what reads as small | nothing |
| Glass morphism | one light; panels with thickness, frosted blur, a bright lit edge | floating panels |
| Isometric, technical | relative sizes, contact, shadows on one side | perspective, falloff |
| Flat, Swiss, type-led, pop, pixel, print | frame shares, overlap, emphasis, quiet zone | camera, optics, materials, contact shadows; print keeps halftone as surface |
| Graffiti | the wall: its size, its light, drips that run down | the piece follows flat rules |
| Collage, maximalism | emphasis, more than ever | light and scale between cut-outs |
| Eras (retro, Y2K, cyberpunk, Art Deco…) | the family they are rendered in: Y2K chrome as soft 3D, a 70s poster as print | the era's conventions |
| Surreal | every law the idea is not about | the law(s) it breaks |

**Surreal:** name the law(s) the idea breaks, usually one, and exempt them from the
check; keep the rest strictly real. **Floating** only by a direction's licence (soft 3D,
Y2K, glass morphism), with a soft shadow marking the ground.

## Physics check

Run it over the sheet, and over a render in this order: scale → contact → light
direction → emphasis → materials. Tags: **Ph** photographic, 3D render, miniature ·
**Il** illustrated · **S** soft 3D group · **Iso** isometric, technical · **F** flat ·
**Cut** cutout. Surreal takes its family's lines minus its named law(s).

**Scale**
- [ ] all: counts as stated; one hero or group; no duplicates.
- [ ] all: real sizes (assumed and stated if unknown); frame share = size ÷ frame width.
- [ ] Ph Il S Iso Cut: every "appears as big as" claim recomputed as size ÷ distance.
- [ ] Ph: horizon at camera height; headroom and crops checked at each plane.
- [ ] all: legibility floor: what must read spans ≥ ~1/8 of the frame height.

**Contact**
- [ ] Ph Il S Iso: everything rests, is held, hangs or flies for a reason, or floats by
  licence with a shadow marking the ground.
- [ ] Ph S Iso: a contact shadow at every touch (Cut: added at composite).
- [ ] all: objects touch, never merge.
- [ ] Ph Il S: hands have a job, a real grip, natural fingers.

**Light direction**
- [ ] Ph Il S Iso Cut: light count stated; every shadow and highlight agrees with it;
  catchlights sit on the key side.
- [ ] Ph: shadow length matches sun height; sky matches the time of day.

**Emphasis**
- [ ] all: the hero wins by the rule; other faces and text held down by two levers.
- [ ] all: nothing lighter than the hero sits in the beam.
- [ ] all: the quiet zone is a named surface (F: a flat colour field).
- [ ] all: the hero and first read survive every crop the placement uses.

**Materials**
- [ ] Ph S: each material answers the light as stated; reflections are geometric.
- [ ] Ph Il S: liquids level, cloth hangs, wind one way; one instant, one shutter.
- [ ] Ph: sharp and soft match lens, aperture and distance.

## Why renders look fake

Classify first, then fix the class that changes the read most.

| Class | Tells | What to write |
|---|---|---|
| Physics | floats, wrong scale, shadows disagree, wrong reflection, bent verticals, interpenetration | re-stage: contact, one scale relation, one light and its shadow side |
| Surface | waxy or poreless skin, plastic, pristine, no wear | "a few crumbs, a flour smudge on the apron, the lid slightly askew"; "visible pores" |
| Grade | HDR glow, bloom, over-sharpening, uniform sharpness, no grain | "soft highlight roll-off, no HDR look, fine grain, one plane sharp" |
| Composition | centred, symmetric, evenly spaced, nothing cropped | "off-centre, objects overlap, one cropped by the edge" |
| Artifacts | duplicates, wrong counts, garbled or mirrored text, labels not wrapping | ≤ 3 named items or "a loose pile"; composite real labels |

## Diagnose a render

1. Ask for the image and its prompt in one batch.
2. Infer the direction and shot as `[inferred]`; the Direction line reads "as your
   current images".
3. Check: scale → contact → light direction → emphasis → materials, plus the triage.
4. Decide: one problem with the composition right → **one edit**
   ([mw-image-prompt iterate.md](../../mw-image-prompt/references/iterate.md)); scale,
   camera or hero wrong, or 3+ problems → **re-stage and regenerate**.
5. Output only the changed lines.

## When words aren't enough

When scale or contact must hold, or after one failed render, give the model a structure
reference: a grey-box blockout (rectangles at the computed frame shares, the horizon, a
hatched text zone, an arrow for the key light); a phone photo of a stand-in setup; a
sketch; pose or depth control where supported; Ideogram bounding boxes; masks. Attach it
with the role "composition and placement only — ignore its colours, shapes and style".

## Placing a supplied product

A real product, label, screen or pack is placed from the user's photo by edit or
composite, never redrawn. Read the photo and stage the scene to match it:
- **Camera elevation** from the ellipse of a round top or base: minor ÷ major ≈
  sin(elevation); 0.5 is about 30°, 0.17 about 10°, a circle is overhead.
- **Key side** from the highlights and the shadow side.
- **Lens feel** from how edges converge: strongly is close and wide; parallel is far.
- The scene draws the contact shadow and the reflections; the product keeps its pixels.

## Screens and devices

A screen with content faces the camera within ~15°. Render it as a flat, uniform plate
colour for replacement. Its glow is a light, soft and cool on the face and hands. Real UI
is composited from screenshots, never generated.

## Where models still break

- **Counts above ~4:** "a few", or group them ("a row of jars").
- **Attribute binding:** each attribute in the same clause as its object.
- **Small faces** under ~1/10 of the frame height get mangled: turn or silhouette them.
- **Left/right flips:** say "on the left side of the image".
- **Duplicate heroes:** name the hero once, as one.
- **Text** comes out garbled or mirrored: keep it out, or composite it.

## Prompt budget

A prompt carries a few clauses, not the sheet. Keep, in this order:
1. hero + frame share + placement;
2. what it rests on + contact;
3. light count, side, height, shadow direction;
4. what is brightest and sharpest;
5. the one scale relation most likely to break;
6. what is soft and how soft;
7. the hero's material response;
8. the instant.

| Family | Physics clauses | Staging words |
|---|---|---|
| Midjourney, Ideogram, Recraft | 3–4 | ≤ ~50 |
| FLUX-class | ≤ 5, front-loaded | ≤ ~80 |
| Nano Banana, GPT-Image, Seedream, Qwen | ≤ 8 | ≤ ~150; labelled sections at L3 |

Everything else stays on the sheet, to check the render against. A miss is fixed with an
edit pass, never by adding clauses. Bind each attribute inside the same clause as its
object.

## Writing physics into a prompt

Models match descriptions of results; they do not simulate. Within the budget, write
what the camera would *see*, not centimetres: sizes as relations and frame shares,
distance as overlap and blur, light as side, height and shadow, contact once per object
that matters, materials by their response, emphasis as the brightest and sharpest point,
one instant. The worked example in Midjourney (4 clauses, 47 words):

> a round sourdough loaf on a dark walnut board in the lower left, a baker's hands scoring it, face turned away and cropped at the brow; low morning sun from the left casting long shadows to the right; the floured scored ridge is the brightest, sharpest point

## Worked example

A real bakery's homepage hero, 16:9, headline over the right 40%. Analog film · warm
consumer colour. Shot A: candid mid-action over the counter, the baker cropped at the
brow, 35mm feel, loaf in the lower-left third.

```
Scene        a baker scoring a round loaf, early morning, sun through the east window
Use          homepage hero, 16:9, 1600 px; headline over the right 40%; own mobile crop
World scale  oak counter 0.90 m high; the loaf, Ø22 × 11 cm
Camera       1.35 m high, 1.1 m back from the loaf (≈ 1.15 m along the lens axis),
             tilted down ~10°, 35mm feel, f/2.8 → frame at the loaf ≈ 1.18 × 0.66 m;
             angle to the loaf ~19°, so it sits ~77% down (lower third);
             horizon ~20% from the top, behind the wall
Objects      hero     loaf on a dark oiled walnut board, lower left · 19% of width ·
                      sharp; matte crust, flour dusted on the scored ridge only
             support  the baker's hands, one drawing a blade along the ridge · sharp
             support  baker, 1.72 m, 35 cm beyond the loaf, leaning in, three-quarter
                      away, looking down at it; head ≈ half the loaf's width; frame top
                      at their plane ≈ 1.51 m → cropped at the brow
             context  proving baskets on a shelf · soft
             set      oak counter; a steel scraper on the board, pointing right;
                      lime-plastered wall ≈ 2.4 m back; the flour jar out of the beam
Cast         generic baker, 40s, sturdy, olive skin, dark hair under a cap, oat linen
             apron, flour on the forearms; exposure set for their skin
Light        one: low early sun, ~15° up, camera-left, ≈ 4000K, hard; balanced for
             daylight, so warm gold; side-lit and grazing, not rim-lit
             → shadows to camera-right, ≈ 3.7× height: the loaf's ≈ 40 cm
             wall out of the beam, bounce only: ≈ 4 stops below the lit crust, a dark
             warm mid-grey with detail on soft film; shadow share ≈ half the frame
Physics      contact shadows under loaf and board; a few crumbs; a flour smudge on
             the apron
Focus        sharp zone ≈ 18 cm; face blur ≈ 0.3% of width (≈ 4 px): a touch soft
Quiet zone   right 40%, upper part: the plaster wall in shadow, one value
Assumed      a 22 cm loaf; a generic baker, not their staff
```

**Emphasis.** 1st, the scored ridge: brightest (the lightest material in the beam; the
board is dark), sharpest, local contrast, the hands' lines leading to it. 2nd, the hands.
3rd, the face, held down by turn and crop, not focus; it will still be glanced at. Text:
hero → headline; the scraper's diagonal and the long shadow lead right to the text zone.

**Crops.** Mobile gets its own crop centred on the loaf; the centre 9:16 slice keeps only
the middle 32% of the width and would cut the loaf.

**Honesty.** The hero is atmosphere with a generic baker, not presented as their staff.
Product and team pages use their own photos; this sheet doubles as the shot list.

**The check passes.** Scale: 22 ÷ 118 = 19%; head 0.15/1.45 ÷ 0.22/1.1 ≈ 0.52; the loaf
is 17% of the frame height, above the floor. Contact: loaf on board on counter. Light:
one sun, shadows to camera-right, 15° → 3.7×. Emphasis: the ridge is brightest because
the board is dark and the jar is out of the beam; the face has two levers. Crops: mobile
has its own. Materials: matte crust and plaster, satin board.
