# mw-image-direction — Staging: the scene's physics and emphasis

A direction decides how an image looks; a shot decides where the camera is. Staging
decides **what physically exists in front of that camera**: every object, how big it
really is, where it stands in space, what holds it up, where its light comes from, what
its shadow and reflection do, and which one of them the viewer must see first.

Image models compose by pattern, not by physics. Left unstaged they float a cup a
centimeter above the table, make a phone as long as a forearm, throw two shadows in two
directions from one sun, tilt the coffee with the cup, put a reflection where no mirror
could make one, and light every object equally so nothing leads. Each of those reads as
"AI" before the viewer can say why. Staging reasons the scene out like a set designer,
a gaffer and a camera operator would, then writes down the *visible results* so the
model has nothing physical left to guess.

Terms: [vocabulary.md](vocabulary.md). Placement on the frame: [composition.md](composition.md).

## Contents

- When to stage, and how deep
- Decided, not measured
- The scene sheet
- 1. Inventory and roles
- 2. Real sizes
- 3. The camera as a physical object
- 4. Gravity, support and contact
- 5. Light as physics
- 6. Materials
- 7. Motion and the instant
- 8. Emphasis
- Stylized directions — which laws bend
- The physics check
- Writing physics into a prompt
- Worked example

## When to stage, and how deep

| The image… | Stage |
|---|---|
| shows a physical scene — people, products, rooms, food, landscapes — in any photographic, 3D, painterly or illustrated direction | the full sheet |
| is a flat graphic, Swiss, pattern, pixel or isometric composition | inventory, sizes as frame shares, emphasis; skip optics and light falloff |
| is abstract (aurora, gradient, texture) | emphasis and the quiet zones only |
| is a series | one sheet per image; the world scale, light rig and materials stay identical across the set |

Stage after the shot is picked: the shot sets camera height, distance and placement;
staging fills the space the shot looks into.

## Decided, not measured

The scene does not exist yet, so nothing in it can be measured, and nobody knows its
distances. They are not unknowns to find out; they are **choices**, made the way a set
designer decides where the table stands and a camera operator decides where to stand.
Two kinds of number go on the sheet, and only one of them is a fact:

| Number | Where it comes from |
|---|---|
| **Object sizes** | known: a mug is about 10 cm tall, a counter 90 cm high, an adult about 1.7 m (the size table in section 2), or the product's real dimensions |
| **Distances, camera height, tilt, sun elevation, aperture** | decided: worked out backwards from the picture you want |

**Work backwards from the framing.**

1. **Decide the framing** — how much of the frame the hero fills, and the lens feel the
   direction calls for: "the loaf about a fifth of the frame width, 35mm feel".
2. **Take the known size** — the loaf is 22 cm across, so the frame must be about
   22 ÷ 0.2 ≈ 1.1 m wide where the loaf sits.
3. **Derive the distance** — distance ≈ frame width × focal length ÷ 36, so
   1.1 × 35 ÷ 36 ≈ 1.1 m. Nobody measured it; the framing forced it.
4. **Place everything else relative to the hero** — "the baker 35 cm behind it", "the
   wall 1.2 m behind the counter" — each a decision about the scene, chosen for what
   it does to the picture.
5. **Collect the consequences** — the one invented geometry now decides the rest: the
   baker falls outside the sharp zone, their head appears about the loaf's width, the
   shadow length follows from the sun height you chose for the time of day.

The point is not accuracy, it is **consistency**: every relation in the prompt comes from
one geometry, so they agree with each other. Written without it — "big loaf, baker
behind, blurry background" — the model guesses each part separately, and that is where
floating objects and mismatched scale come from.

**What never to ask the user.** Distances, camera height, tilt, aperture, sun angle:
nobody knows them, and asking hands the user the arithmetic. Ask only what they really
know and you cannot — a product's real dimensions, the size of a space that exists
(their shop, their office), and what the viewer must notice first. A size that matters
and is unknown is assumed and stated on the sheet ("bottle assumed 14 cm tall —
correct me if not").

**Reading an image that exists.** For a reference photo or a failed render, distances
can be estimated, not chosen: find something of known size in it (a door is about
2 m, a face about 23 cm, a phone 15 cm) and scale from it. Its frame share and the
lens feel give its distance by the same formula, and every other object follows from
how big it looks beside it. That is how a render's scale error is diagnosed: "the mug
is drawn as wide as the laptop, so it is either 30 cm across or twice as close — the
prompt must state its size relative to the laptop".

**How exact.** The model never sees the centimeters; it gets the visible results
(section "Writing physics into a prompt"), and lands near them, not on them. Round
every number to what a person would say aloud — 1.1 m, not 1.07 m — and treat the sheet
as a consistent plan, not a measurement.

## The scene sheet

One sheet per image. The left half is reasoning (real units); what goes into a prompt
is the right half (relations, frame shares, visible results).

```
Scene         one sentence: who/what, doing what, where, when
World scale   the anchor object of known size, and the floor/table/ground everything stands on
Camera        height above the floor, distance to the hero, tilt, lens feel, ratio
              → frame width × height at the hero's distance; depth of field in cm
Objects       role · object · real size · position in space · rests on / held by ·
              material · frame share · sharp or soft
Light         each source: type, direction (camera-left/right, elevation), size → hard/soft,
              temperature; shadow direction and length; falloff; bounce
Physics       contact, liquids, cloth, hair, steam, wind, reflections, motion — only what
              this scene contains
Emphasis      1st, 2nd, 3rd read; the money detail; how the hero wins; what is held down
Quiet zones   text-safe or UI areas and what physically fills them
```

## 1. Inventory and roles

List **everything in frame**, including the floor, the wall, and anything only seen as a
shadow or reflection. Anything not listed gets invented by the model. Give every item
exactly one role:

| Role | Count | Job |
|---|---|---|
| **Hero** | exactly one (a person *or* an object *or* one action) | what the image is about; wins the emphasis budget |
| **Support** | one to three | explains or serves the hero — the hands using it, the person holding it, the thing it acts on |
| **Context** | odd numbers, three or five | tells where and when; never competes |
| **Set** | the surfaces | floor, table, wall, sky; carries light, shadow and quiet zones |

A face is never neutral: if a person is in frame but is not the hero, plan how the face
is held down (cropped, turned, out of focus, eyes on the hero). Text, logos, screens
and bright windows pull the eye the same way.

## 2. Real sizes

Write each object's real size before deciding its frame share. Relative scale is where
generated scenes break most visibly — and the viewer knows these sizes in their body.

| Thing | Typical size |
|---|---|
| Adult standing | 1.60–1.85 m; eyes about 10–12 cm below the top of the head |
| Adult seated (chair) | eyes about 1.15–1.25 m from the floor |
| Head (chin to crown) | 22–24 cm; width 15 cm |
| Hand (wrist to fingertip) | 17–20 cm; palm width 8–9 cm |
| Child, 5 years | about 1.10 m |
| Door | 2.0–2.1 m × 0.8–0.9 m |
| Ceiling | 2.4–2.7 m in homes; 3–4 m in lofts and shops |
| Dining table / desk top | 72–76 cm from the floor |
| Kitchen counter | 90–92 cm |
| Bar counter / bar stool seat | about 105 cm / 75 cm |
| Chair seat · sofa seat | 45 cm · 40–45 cm |
| Stair step | 17–18 cm high, 28 cm deep |
| Smartphone | 15 × 7 × 0.8 cm |
| Laptop (13–14 in) | 31 × 22 cm, 1.5 cm closed; screen about 30 × 19 cm |
| A4 / US letter | 21 × 29.7 cm / 21.6 × 27.9 cm |
| Hardcover book | 24 × 16 × 3 cm |
| Coffee mug · espresso cup | 9–10 cm tall, 8 cm across · 6 cm tall |
| Wine glass · wine bottle | 20–22 cm · 30 cm, 7.5 cm across |
| Dinner plate | 26–28 cm |
| Sourdough loaf · croissant | 20–25 cm across · 12–15 cm long |
| Apple · lemon | 7–8 cm · 6 cm long |
| Sneaker | 27–31 cm long |
| Cat · medium dog | 25 cm at shoulder, 45 cm body · 50 cm at shoulder |
| Bicycle | 1.7 m long; wheel 70 cm |
| Car | 4.5 × 1.8 × 1.5 m |
| One building storey | about 3 m |
| Street lamp | 4–8 m |
| Mature tree | 10–25 m |

For a product, use its real dimensions from the user or the docs; ask if they matter
and are unknown. For an invented object, decide its size anyway and write it down.

**Scale relations** are what the prompt uses: "the bottle is a little taller than the
person's forearm", "the mug is about the width of their palm". A model reads relations
far more reliably than centimeters.

## 3. The camera as a physical object

The camera is somewhere in the room. Put it there in numbers — chosen, as above, from
the framing you want, never asked for.

**Height and distance.** Camera height above the floor (or table), horizontal distance
to the hero, and tilt in degrees. The tilt follows from them: a camera 40 cm above a
table top and 1.1 m back looks down about 20° to reach it (tan⁻¹ 0.4/1.1).

**Frame size at the hero.** With full-frame lens feel, the frame width at the hero's
distance is about **distance × 36 ÷ focal length** (landscape). Frame height is
distance × 24 ÷ f for 3:2, × 20 ÷ f for 16:9; swap width and height for portrait frames.

| Lens feel | Frame width at 1 m | Horizontal view |
|---|---|---|
| 16mm | 2.25 m | 97° |
| 24mm | 1.50 m | 74° |
| 35mm | 1.03 m | 54° |
| 50mm | 0.72 m | 40° |
| 85mm | 0.42 m | 24° |
| 135mm | 0.27 m | 15° |
| 200mm | 0.18 m | 10° |

Then the **frame share** is just size ÷ frame width: a 22 cm loaf at 1.1 m with a 35mm
feel spans 22 ÷ 113 ≈ a fifth of the width. Check every object this way; a frame share
the sizes cannot produce is a scale error waiting to happen.

**Perspective comes from distance, not from the lens.** The size ratio between a near
and a far object is set only by their distances from the camera: an object twice as far
appears half as large, whatever the lens. A wide lens up close makes the foreground huge
against a tiny background; stepping back with a long lens makes the background loom
behind the subject (compression). Choose the distance for the relation you want, then
the lens for the crop.

**Horizon and eye level.** With a level camera, the horizon runs through the frame at
the camera's own height, and everything at that height sits on it. Camera at standing
eye height → the heads of standing adults on flat ground all line up near the horizon,
near or far. Camera at hip height → the horizon cuts every standing adult at the hip.
Tilting down pushes the horizon up and out of the top of the frame; tilting up pulls it
down. Objects on one floor share one horizon and one set of vanishing points. Verticals
stay parallel only when the camera is level; tilted up they converge toward the top,
tilted down toward the bottom (state which, or keep the camera level for architecture).

**Depth of field.** Total sharp depth ≈ 2 × f-number × 0.03 mm × distance² ÷ focal
length² (full frame, subject well inside the hyperfocal distance). Worked: 35mm at
f/2.8 and 1.1 m → about 17 cm; 85mm at f/1.8 and 2 m → about 6 cm, so the near eye
sharp and the ear already soft; 100mm macro at 40 cm → a few millimeters. Use it to
decide which objects are sharp and which melt, then write that result. Out of focus is
an emphasis tool, not a filter.

## 4. Gravity, support and contact

Every object is **resting, held, hanging, or in flight for a reason.** Write which.

- **Contact.** Where an object touches a surface there is a thin, dark contact shadow,
  darkest and sharpest at the touch point. Missing contact shadow is the main reason
  objects look pasted in or floating.
- **Weight shows.** A cushion compresses under a sitter; a full bag pulls its strap
  taut and the shoulder down; a hand holding something heavy has tension in the wrist;
  a stack is stable only with its center of mass over its base.
- **Liquids stay level with the world, not with the vessel.** Tilt the glass, the
  surface stays horizontal. A meniscus climbs the glass wall. A pour narrows as it
  falls; a thin trickle breaks into drops within a few centimeters, a thick pour stays
  a smooth rope much longer. Condensation sits only below the
  liquid line on a cold drink.
- **Cloth and hair hang.** Fabric drapes from its support points and folds where it
  is gathered; heavy fabric (denim, wool) falls in few broad folds, light fabric (silk,
  chiffon) in many fine ones. Hair falls with gravity unless wind or motion moves it.
- **Wind is one direction.** Hair, scarves, flags, smoke, grass and tree tops all lean
  the same way, at strength matching each other.
- **Heat rises.** Steam and smoke rise, widen, curl and thin out within 10–30 cm;
  they show best backlit or against a dark ground. Steam needs a hot source and reads
  faint in a warm room, strong in a cold one.
- **Hands that hold.** A grip needs a thumb opposing the fingers; fingers wrap at the
  object's real width. A hand holding a phone covers part of it.

## 5. Light as physics

Every light has a **source, a direction, a size, a color and a reach.** State the
number of sources; unstated light gets added by the model.

- **Shadow direction.** The sun and other distant sources throw parallel shadows: every
  shadow in the scene points the same way. A near lamp throws shadows that fan out away
  from it. Two shadow directions mean two sources — allowed only if both are listed.
- **Shadow length from sun height.** Shadow length = object height ÷ tan(sun elevation).

  | Sun elevation | 5° | 10° | 20° | 30° | 45° | 60° | 75° |
  |---|---|---|---|---|---|---|---|
  | Shadow ÷ height | 11× | 5.7× | 2.7× | 1.7× | 1× | 0.6× | 0.3× |

  Golden hour is roughly 0–10°; midday in summer at mid-latitudes is 60–75°. The sky
  color, the shadow length and the time of day must agree.
- **Hard or soft is the source's size as seen from the subject.** A source much smaller
  than its distance (the sun, a bare bulb across the room, a flash) gives crisp shadow
  edges; a source about as wide as its distance or wider (overcast sky, a 1 m window
  at 1 m, a big softbox close in) gives soft ones. Moving the same window light away
  hardens it. Shadow edges also soften with distance from the object casting them.
- **Falloff.** A nearby source loses light with the square of distance: 1.4× the
  distance is one stop darker, 2× two stops, 3× about three, 4× four. A lamp 1 m from
  a face and 3 m from the wall behind leaves the wall about three stops darker — that
  is how a practical lamp isolates its subject. The **sun does not fall off** across a
  scene: what is out of its beam is darker because it is lit only by sky and bounce,
  not because it is farther.
- **Bounce and color bleed.** Every lit surface becomes a dim source in its own color:
  grass puts green under a chin, a wooden table warms the underside of hands, a red
  wall tints the cheek facing it. Daylight shadows outdoors are blue-ish (lit by sky);
  shadows indoors under warm lamps stay warm.
- **Catchlights and highlights agree.** The catchlight in an eye has the shape and
  position of the key source (a window is a rectangle, a ring light a ring). Specular
  highlights on every glossy object sit on the side facing the same source.
- **Visible beams need something in the air.** Light shafts appear only through dust,
  flour, steam, smoke, fog or rain, and only where the beam passes through them.
- **Atmosphere stacks with distance.** Outdoors, far planes get lighter, lower in
  contrast and cooler; at a few hundred meters the effect is clear, at kilometers it
  dominates.
- **Mixed temperatures.** If two sources differ in Kelvin, write which surfaces each
  one reaches; the boundary between them is part of the picture.

## 6. Materials

How each surface answers the light. Name it per object; "realistic materials" names
nothing.

| Material | It shows | Watch for |
|---|---|---|
| Matte (paper, plaster, cotton, unglazed clay) | even shading, no highlight, soft terminator | a stray gloss the model adds to "look premium" |
| Satin (oiled wood, skin, eggshell paint) | a broad dim highlight toward the source | skin rendered as plastic gloss |
| Gloss (lacquer, glazed ceramic, wet surfaces) | a sharp highlight shaped like the source; a dim reflection of the room | highlights on the wrong side |
| Metal | mostly reflection of its surroundings; gold and copper tint their highlights | chrome reflecting nothing, or a studio that isn't there |
| Glass and clear liquid | the background bent through it; bright or dark edges depending on the background; caustics on the surface below | glass with no refraction, straws that don't break at the water line |
| Translucent (skin, leaves, wax, marble, paper) | glow where backlit, warmer at thin edges (ears, fingertips, leaf veins) | backlit skin that stays opaque |
| Fabric | weave at close range; drape by weight (above) | every fabric the same weight |
| Fresnel (any smooth surface) | reflects more at grazing angles — a low camera turns a table into a mirror of the window | a mirror-table from a high camera |

**Reflections are geometry.** A mirror image is the scene seen from the mirror's far
side: equal distance behind the surface, reversed. A reflection in still water shows
objects from below — the underside of a bridge, the chin of a figure. Ripples stretch
reflections into vertical streaks toward the camera (neon on wet asphalt).

## 7. Motion and the instant

Name **one instant**, not an activity: "the moment the flour leaves the fingers", not
"baking". Then make everything obey the same shutter:

- **Frozen** (fast shutter or flash): drops are spheres, hair strands sharp, pour is a
  glassy rope.
- **Blurred** (slow shutter): only what moves blurs, along its path of travel, in
  proportion to its speed; still objects stay sharp. Blur on the hands but a frozen
  splash next to them is a contradiction unless flash is stated.
- **Bodies in motion** keep their mechanics: in a stride, opposite arm swings with
  opposite leg; a turn leads with the head, then shoulders, then hips; hair and cloth
  trail behind the movement.
- **Ballistics.** Thrown and splashed things move on arcs; a splash crown rises around
  the impact and drops fall back toward it.

## 8. Emphasis

The point of staging is that the viewer looks where you decided. Decide the order:

1. **First read** — the hero, and the exact part of it that carries the image: the
   **money detail** (the scored ear of the crust, the near eye, the label side, the
   drop at the lip of the glass).
2. **Second read** — the support that explains it.
3. **Third read** — the context that places it.

The eye goes, in roughly this order, to: a face or eyes · the brightest value · the
sharpest area · the strongest local contrast · the only saturated color · text · the
largest shape · what lines and gazes point at · what is isolated by empty space · the
most detailed texture.

**The hero must win at least three of those, and must win both of the strongest two
available in the scene** (if a face is present and is not the hero, that face is the
first competitor to hold down). Then state how each competitor loses:

| Competitor | Hold it down by |
|---|---|
| A face that is not the hero | crop it, turn it, put it out of focus, point its gaze at the hero |
| A bright window or sky | expose for the hero and let it clip softly, or crop it out, or curtain it |
| A second saturated color | desaturate it into the palette, or move it out of frame |
| Sharp background detail | distance plus shallow depth of field (section 3), or a plain set |
| Text, logos, screens | remove, turn away, or leave out of focus; banned anyway unless asked |
| Objects equal in size to the hero | move them back (section 3: twice the distance, half the size) |

**Lines and gazes.** Edges of tables, shadows, a road, an arm and every eye in the
frame should lead toward the hero, or at least not lead out of the frame on the far side.

**Light is emphasis.** The brightest well-exposed area should be on or right behind the
hero. Placing the hero where the key light is strongest and letting falloff (section 5)
darken everything else is the most natural emphasis there is.

## Stylized directions — which laws bend

Staging is not only for photographs. Each direction keeps some laws and drops others;
decide which, and keep the rest strict.

| Direction family | Keeps | Drops or bends |
|---|---|---|
| Painterly, watercolor, children's book, anime | sizes, contact, one light direction, emphasis | exact optics; texture replaces depth of field |
| Clay, soft 3D, miniature | everything physical, at tabletop scale — a miniature needs very shallow depth of field, which is what makes it read as small | real-world size: decide the scale (1:1 tabletop or a 1:87 world) and keep it |
| Isometric, technical | relative sizes, contact | perspective (none: far objects stay full size), light falloff |
| Flat vector, Swiss, pop art, pixel | relative sizes as frame shares, overlap for depth, emphasis | shadows (or one flat offset shadow at one angle), optics, materials |
| Surreal | **every law except one.** Break exactly the law the idea is about, and keep everything else rigorously real — that contrast is what makes surrealism believable | the one chosen law |
| Collage, maximalism | emphasis (more important, not less, with many elements) | consistent light and scale between cut-outs, on purpose |

## The physics check

Run this over the sheet before the readback, and again over the first render.

- [ ] Exactly one hero; it wins brightest and sharpest (or the two strongest available).
- [ ] Every object has a real size, and its frame share follows from size ÷ frame width.
- [ ] Every object rests, is held, hangs, or is in flight for a stated reason; contact
  shadows at every touch.
- [ ] All shadows agree with the listed sources in direction and length; sky and time
  of day agree with sun height.
- [ ] Number of light sources stated; nothing lit that no source reaches.
- [ ] Catchlights and highlights sit on the side of the key source.
- [ ] Horizon height matches camera height; objects on one floor share it.
- [ ] Depth of field matches lens, aperture and distance; sharp and soft objects listed.
- [ ] Liquids level, cloth and hair hang, wind one way, steam rises.
- [ ] Reflections where glossy surfaces must have them, with the right geometry.
- [ ] One instant, one shutter: frozen and blurred parts agree.
- [ ] Hands have a job and a real grip; finger count natural.
- [ ] Quiet zones are filled by a named physical surface, not "empty space".

## Writing physics into a prompt

Models do not simulate; they match descriptions of results. So the sheet's numbers
become what the camera would *see*:

- **Sizes as relations and frame shares**, not centimeters: "the loaf spans about a fifth
  of the frame width; the baker's hands are almost as wide as it".
- **Distance as overlap and blur**: "the baker stands just behind the loaf, slightly out
  of focus".
- **Light as direction, elevation and shadow**: "low morning sun from camera-left, the
  loaf's shadow stretching toward camera-right about four times its height".
- **Contact named once per object that matters**: "the loaf sits on the board, a thin
  dark shadow where it touches".
- **Materials by their visible response**: "the crust matte with small glossy blisters;
  the steel scraper shows one bright line of the window".
- **Emphasis as the brightest and sharpest**: "the brightest and sharpest point in the
  image is the scored ridge of the crust where the sun catches it".
- **One instant**: "flour mid-fall from the fingertips, fine dust hanging in the sunbeam".

Keep the sheet's numbers in the readback: they are what the next image of a series
must match, and what a failed render is checked against.

## Worked example

Analog film · warm consumer color; shot A (candid mid-action, waist-up, 35mm feel);
1600×900 hero with the headline top-right over the right 40%.

```
Scene         a baker dusting flour over a fresh boule on an oak counter, 7am, sun through the bakery window
World scale   counter top 90 cm; the loaf (Ø 22 cm) is the scale anchor
Camera        1.35 m high, 1.1 m from the loaf, tilted down ~10°, 35mm feel, 16:9
              → frame at the loaf ≈ 1.13 m × 0.64 m; at f/2.8 sharp depth ≈ 17 cm
Objects       hero     sourdough boule, Ø 22 × 11 cm, on a floured board, left third, lower third
                       matte crust with small glossy blisters · ≈ a fifth of frame width · sharp
              support  baker's hands, 19 cm, 20–25 cm above the loaf, fingers tapping flour loose
                       ≈ a sixth of frame width · sharp, slight blur on the tapping fingertips
              support  baker, 1.72 m, leaning over the counter 35 cm behind the loaf; eyes in the
                       upper quarter, looking down at the loaf; linen apron · soft (outside the 17 cm)
              context  bench scraper (steel), folded linen cloth, glass jar of flour — at the left
                       edge, the jar half cropped
              set      oak counter running full width; white tiled wall 1.2 m behind the counter
Light         one source: low sun through a window off-frame camera-left, ~15° elevation, ~3500K, hard
              → parallel shadows toward camera-right; the loaf's shadow ≈ 40 cm (11 cm × 3.7)
              the wall is outside the beam: lit only by bounce, ≈ 2 stops darker than the loaf
              oak counter bounces warm light into the undersides of the hands
Physics       contact shadow and a ring of flour around the loaf's base; flour falling in a
              loose 15 cm cone, visible as a bright haze only inside the sunbeam; apron hangs
              straight with one fold where it is tied; the scraper shows one bright line of the window
Emphasis      1st  the scored ear of the crust, rim-lit by the sun, flour glowing above it (money detail)
              2nd  the hands, sharp, mid-value
              3rd  the baker's face — soft, turned down, gaze leading to the loaf
              held down: the face (focus + gaze), the window (off frame), the white tiles (in shadow)
Quiet zones   right 40%, upper part: the tiled wall in shadow, low contrast; the loaf's 40 cm
              shadow reaches into the right 40% but only on the counter, below the headline zone
```

What the physics changed: the frame-share check put the loaf at a fifth of the width
instead of the poster-sized hero a model would draw; the depth-of-field number made the
face fall soft on its own, handing the first read to the crust; the sun's 15° elevation
fixed the shadow length and showed it crossing into the text side — low on the counter,
so it stays; and knowing the sun does not fall off told us the wall goes dark only
because it is out of the beam, which is what the prompt says.
