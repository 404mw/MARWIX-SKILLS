# mw-image-direction — Optics and light: the camera and the light as physics

The camera and light maths behind a staged scene: how big the frame is where the hero
stands, where the hero and the horizon land, what is sharp, how long the shadows are,
how fast light falls off and how dark the shade goes. Load it only for photographic,
3D render and miniature directions, or when a render's geometry is being diagnosed;
painterly, flat and graphic families skip it (the depth table in
[staging.md](staging.md)). Every number here is **decided from the framing, never asked
of the user** (staging.md, "Decided, not measured"). The numbers go on the Scene sheet;
the Plain readback says the results in everyday words.

Terms: [vocabulary.md](vocabulary.md). Placement on the frame: [composition.md](composition.md).

## Contents

- Frame size and distance
- Tilt, horizon and placement
- Lens feel and perspective
- Depth of field and background blur
- Close-up and macro
- Light: direction and shadows
- Falloff
- Hard and soft
- Bounce
- Color and white balance
- Contrast: key to fill
- Worked check

## Frame size and distance

**Distance** is camera to hero **along the lens axis**. Overhead, it is the camera's
height above the surface. Horizontal distance is wrong once the camera tilts: 1.41× off
at 45°, 2× at 60°, and a flat-lay gives zero.

**Frame size at the hero** = distance × (width-mm × height-mm) ÷ focal length, with
full-frame lens feel:

| Ratio | Width × height (mm) |
|---|---|
| 3:2 landscape | 36 × 24 |
| 16:9 | 36 × 20.25 |
| 4:5 portrait | 24 × 30 |
| 3:4 portrait | 24 × 32 |
| 1:1 | 24 × 24 |
| 2:3 portrait | 24 × 36 |
| 9:16 | 20.25 × 36 |

Use the portrait row for portrait frames; dividing a 4:5 frame by 36 overstates its
width 1.5×. A 13 cm bottle in 4:5 at 50mm and 0.6 m: the frame is 0.29 × 0.36 m, so the
bottle fills about 36% of the height. Overhead flat-lay in 4:5, 50mm, camera 0.9 m
above the table: 0.43 × 0.54 m of tabletop.

**Frame share** is always **linear**: the share of frame width, or of height for
standing figures. Say which. Share = real size ÷ frame size at that object's distance.
A share the sizes cannot produce is a scale error waiting to happen.

**Legibility floor.** Anything that must read (a face, hands, a label, the money
detail) spans at least ~1/8 of the frame height at render size, or is not relied on.
Faces under ~1/10 of the frame height get mangled: turn them away or make them a
silhouette.

## Tilt, horizon and placement

- **Angle to the hero** = atan(height difference ÷ horizontal distance).
- **Tilt** = that angle − the hero's offset from frame center.
- **Offset** in degrees = atan((2p − 1) × tan(half vertical view)), where p is the
  hero's position down the frame (0.5 = center).
- **Half vertical view** = atan(frame-height-mm ÷ 2 ÷ f).

| Half vertical view | 24mm | 35mm | 50mm | 85mm |
|---|---|---|---|---|
| 16:9 | 22.9° | 16.1° | 11.4° | 6.8° |
| 3:2, 1:1 | 26.6° | 18.9° | 13.5° | 8.0° |
| 4:5 | 32.0° | 23.2° | 16.7° | 10.0° |
| 9:16 | 36.9° | 27.2° | 19.8° | 12.0° |

Tilting the full angle centers the hero. A **lower-third hero needs about half the
centering tilt**: the bakery loaf sits 19° below the camera, and a 10° tilt puts it 77%
down the frame.

**Vertical extents per plane.** At horizontal distance d, the frame's top edge sits at
camera height + d·tan(half vertical view − tilt), and the bottom edge at
camera height − d·tan(half vertical view + tilt). Check them at every plane that
matters: they show where a standing figure gets cropped (brow, chin, chest) before the
model decides.

**Horizon and eye level.** With a level camera the horizon runs through mid-frame, at
the camera's own height, and everything at that height sits on it. Camera at standing
eye height: the heads of standing adults on flat ground line up near the horizon, near
or far. Camera at hip height: the horizon cuts every standing adult at the hip. Tilting
down moves the horizon up, to (tan(half view) − tan(tilt)) ÷ (2·tan(half view)) from
the top; it leaves the frame once the tilt exceeds the half vertical view. Tilting up
moves it down. Objects on one floor share one horizon and one set of vanishing points.

**Verticals** stay parallel only with a level camera. Tilted up they converge toward
the top, tilted down toward the bottom. State which, or keep the camera level for
architecture.

## Lens feel and perspective

| Lens feel | Frame width at 1 m (3:2) | Horizontal view |
|---|---|---|
| 16mm | 2.25 m | 97° |
| 24mm | 1.50 m | 74° |
| 35mm | 1.03 m | 54° |
| 50mm | 0.72 m | 40° |
| 85mm | 0.42 m | 24° |
| 135mm | 0.27 m | 15° |
| 200mm | 0.18 m | 10° |

**Perspective comes from distance, not from the lens.** Apparent size = real size ÷
distance, whatever the lens: twice as far looks half as large. A wide lens up close
makes the foreground huge against a tiny background; stepping back with a long lens
makes the background loom behind the subject (compression).

**One procedure order:**

1. **Relation first.** The size relation between hero and background sets their
   distance ratio. Place them for it, at a working distance a camera could really
   stand (across a counter; 1.5–3 m for a portrait).
2. **Frame share second.** The hero's frame share at that distance sets the focal
   length: f ≈ distance × frame-mm ÷ (hero size ÷ share).
3. **If that focal length clashes with the direction's lens feel**, change the frame
   share, not the physics. Never fudge a size or a distance to force a lens.

With no relation to hold (one subject on a plain ground), take the direction's lens
feel and solve for distance: distance ≈ frame size × f ÷ frame-mm.

**Wide-angle faces.** A camera closer than ~1–1.5 m enlarges the nose: at 0.5 m it is
drawn ~20% larger against the ears, at 1.5 m ~7%, at 3 m ~3%. Portraits sit at
1.5–3 m; get closer only when the distortion is the point.

## Depth of field and background blur

**Sharp zone** (total depth of field, full frame, well inside the hyperfocal distance)
≈ 2 × N × 0.03 mm × d² ÷ f². 35mm f/2.8 at 1.15 m: ≈ 18 cm. 85mm f/1.8 at 2 m: ≈ 6 cm,
so the near eye is sharp and the ear already soft. Use it to decide which planes are
sharp.

**How soft** something outside it looks is the blur disc as a share of frame width,
not the sharp zone. All in mm, with s = focus distance and d = the object's distance:

blur share ≈ f² ÷ (N·(s − f)) × |d − s| ÷ d ÷ frame-width-mm

| Blur share | Reads as |
|---|---|
| < 0.3% | a touch soft |
| ≈ 1% | clearly soft, still recognizable |
| > 2.5% | melted |

Worked: 35mm f/2.8, focus 1.15 m, a face 35 cm behind (1.5 m) in 16:9 → ≈ 0.3% (0.25%,
about 4 px across a 1600 px frame): a touch soft, eyes and mouth readable, still
pulling attention. Even infinity only reaches ~1.1% at those settings.

- **Holding a face down needs ≥ 1%, or a crop or turn.** At wide-normal lens feel and
  arm's-length distances, focus alone rarely gets there.
- **Subject-to-background distance is the main separation lever.** 85mm f/2, subject
  at 2 m, 4:5: a wall 0.5 m behind blurs ~1.6%; 3 m behind, ~4.7%. Moving the
  background back does more than opening the aperture.
- **Hyperfocal distance** H ≈ f² ÷ (N × 0.03) mm. For landscapes, focus at H and
  everything from H/2 to infinity is sharp: 24mm f/8 → H ≈ 2.4 m, sharp from 1.2 m;
  35mm f/11 → H ≈ 3.7 m. Don't use the near-field formula for a landscape.

Out of focus is an emphasis tool, not a filter: write the result ("the baker's face a
touch soft; the shelf behind clearly soft").

## Close-up and macro

The formulas above hold beyond ~10× the focal length (about 10% off there). Closer, the
frame is smaller and the depth of field thinner than they say.

- **Magnification** m ≈ f ÷ (distance from the lens − f); frame = frame-mm ÷ m.
  100mm at 40 cm: m ≈ 1/3, frame ≈ 11 cm wide, not the 14 cm the far-field formula
  gives.
- **Sharp zone at macro** ≈ 2 × N × 0.03 × (1 + m) ÷ m² mm. At 1:1 and f/2.8 it is
  ~0.3 mm; at f/8–16 a millimeter or two. 100mm f/2.8 at 40 cm: ≈ 2 mm.
- A whole product sharp at macro reads as focus-stacked: a style choice, state it.
- **Miniature:** compute with model-scale sizes (at 1:87 a 1.75 m figure is 2 cm),
  and the shallow focus follows on its own. A thin band of focus on a full-size scene
  (tilt-shift) makes it read as a miniature.

## Light: direction and shadows

Every light has a **source, a direction, a size, a color and a reach.** State the
number of sources; unstated light gets added by the model.

- **Shadow direction.** The sun and other distant sources throw parallel shadows: every
  shadow points the same way. A near lamp throws shadows that fan out away from it. Two
  shadow directions mean two sources, allowed only if both are listed.
- **Shadow length** = object height ÷ tan(sun elevation).

  | Sun elevation | 5° | 10° | 15° | 20° | 30° | 45° | 60° | 75° |
  |---|---|---|---|---|---|---|---|---|
  | Shadow ÷ height | 11× | 5.7× | 3.7× | 2.7× | 1.7× | 1× | 0.6× | 0.3× |

- **Times of day.** Golden hour is a sun elevation of about −4° to +6°: shadows
  about 10× the height and longer, or none once the sun is below the horizon. A 10–20°
  sun is **low morning/evening sun**, about 4000–4500K, with shadows about 3–6× the
  height. Midday in
  summer at mid-latitudes is 60–75°. Choose the elevation and describe it; a clock time
  fixes nothing until latitude and season are known. The sky color, the shadow length
  and the time words must agree.
- **One world rig per series.** Direction and elevation live in each image's staging,
  translated from one rig in the world ("low sun through the east window"). The
  series style block names only quality, temperature, contrast and shadow share, never
  "camera-left".
- **Catchlights and highlights agree.** The catchlight in an eye has the key's shape
  and position (a window is a rectangle, a ring light a ring). Specular highlights on
  every glossy object sit on the side facing the same source.
- **Visible beams need something in the air**: dust, flour, steam, smoke, fog or rain,
  and only where the beam passes through it.
- **Side, rim, back.** A low sun from camera-left is side light: grazing, it rakes
  texture. Rim light comes from behind the subject (vocabulary.md). Don't call side
  light "rim-lit".

## Falloff

- **Inverse square** holds for a source smaller than about a fifth of its distance:
  1.4× the distance is one stop darker, 2× two stops, 3× about three, 4× four. A lamp
  1 m from a face and 3 m from the wall behind leaves the wall about three stops
  darker; that is how a practical lamp isolates its subject.
- **A window or softbox closer than its own width falls off more gently.** For a 1 m
  source, doubling from 0.5 to 1 m loses ~1.5 stops, not two; from 25 to 50 cm, under
  one. Further out it approaches the square law.
- **Sunlight has no falloff across a scene.** What is out of the beam is darker because
  it is lit only by sky and bounce, not because it is farther (see Bounce).
- **Atmosphere stacks with distance.** Outdoors, far planes get lighter, lower in
  contrast and cooler; at a few hundred meters the effect is clear, at kilometers it
  dominates.

## Hard and soft

Hard or soft is **the source's size as seen from the subject.**

- A source much smaller than its distance (the sun, a bare bulb across the room, a
  flash) gives crisp shadow edges.
- A source about as wide as its distance or wider (overcast sky, a 1 m window at 1 m,
  a big softbox close in) gives soft ones.
- Moving the same window or softbox away hardens it.
- Shadow edges also soften with distance from the object casting them: crisp at the
  contact point, softer at the tip of a long shadow.
- Caustics (the bright pattern under a glass of water) need hard light.

## Bounce

- **Every lit surface becomes a dim source in its own color.** Grass puts green under
  a chin, a wooden table warms the underside of hands, a red wall tints the cheek
  facing it.
- **Daylight shadows outdoors are blue-ish** (lit by the sky); shadows indoors under
  warm lamps stay warm.
- **Out-of-beam surfaces** are lit by sky and bounce only:

  | Surface | Below direct sun |
  |---|---|
  | Open shade outdoors | about 3 stops |
  | Indoor wall lit only by bounce, beside a sunbeam | about 4+ stops |

  How that renders is a style decision: dark with detail on soft film, near-black on a
  hard digital grade. Write the result ("the wall a dark warm mid-gray with detail").
- **Mixed temperatures.** If two sources differ in color, write which surfaces each
  one reaches; the boundary between them is part of the picture.

## Color and white balance

A Kelvin number alone is ambiguous: it can mean the light's color or a camera setting.
**Write color as a result under a stated white balance**, never as a bare Kelvin
number in a style block ("balanced for daylight, the low sun reads warm gold").

| Source | Kelvin | Under daylight balance it reads |
|---|---|---|
| Candle, firelight | ~1900K | deep orange |
| Household tungsten | ~2700–3000K | amber, cozy |
| Golden-hour sun (−4° to +6°) | ~2000–3500K | deep gold to orange |
| Low morning/evening sun (10–20°) | ~4000–4500K | warm gold |
| Midday sun, flash | ~5000–5600K | neutral |
| Window daylight (sun and sky) | 5500–6500K | neutral to faintly cool |
| Overcast | ~6500–7500K | cool |
| Open shade, blue hour | 7500K+ | blue |

- **Window daylight is not warm.** Warmth in a window-lit interior comes from bounce
  (wood, warm walls) and from the grade.
- Under a tungsten balance the same window light reads blue and the lamps neutral; say
  which balance the image is in.

## Contrast: key to fill

Contrast is the key-to-fill ratio, plus the share of the frame in shadow.

| Key:fill | Stops | Reads as |
|---|---|---|
| 2:1 | 1 | open, gentle |
| 4:1 | 2 | sculpted |
| 8:1 | 3 | dramatic or low-key |

- In a prompt, write the result: "shadow side about two stops darker, detail visible".
- **Negative fill** (a dark flag or wall on the shadow side) removes bounce and deepens
  the shadow side without touching the key.
- **Recorded brightness = light × surface lightness.** A white surface in shade can
  match a dark hero in sun: keep light set pieces out of the beam, or make the hero the
  lightest material in it (staging.md, "Emphasis").

## Worked check

The bakery hero from staging.md, "Worked example" (16:9, 35mm feel, f/2.8):

```
Camera      1.35 m high, 1.1 m back horizontally → ≈ 1.15 m along the lens axis
Angle       to the loaf's upper half (~0.97 m): atan(0.375 ÷ 1.1) ≈ 19°
Tilt        10° down → loaf ≈ 77% down the frame (lower third); horizon ≈ 20% from
            the top, behind the wall
Frame       at the loaf: 1.15 × 36 ÷ 35 ≈ 1.18 m × 1.15 × 20.25 ÷ 35 ≈ 0.66 m
Share       22 cm loaf ÷ 1.18 m ≈ 19% of the width
Baker       35 cm beyond the loaf: top edge 1.35 + 1.45·tan(16.1° − 10°) ≈ 1.51 m → crop
            at the brow; head ≈ half the loaf's width (0.15/1.45 ÷ 0.22/1.1)
Focus       sharp zone ≈ 18 cm; face blur ≈ 0.3% → a touch soft, so the face is held
            down by turn and crop, not focus
Sun         ~15° up → shadows 3.7× the height: the 11 cm loaf throws ≈ 40 cm
Wall        out of the beam, bounce only → ≈ 4 stops below the lit crust
```
