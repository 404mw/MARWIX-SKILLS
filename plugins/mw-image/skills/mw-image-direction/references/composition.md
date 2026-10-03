# mw-image-direction — Composition: grids, positioning, alignment, layers

Where things sit in the frame, and what they line up with. A shot ([shots.md](shots.md))
puts the camera somewhere; composition decides what the frame does with what the camera
sees. Models center the subject and spread everything evenly unless the prompt places
each element. Grid names alone ("rule of thirds") are weak cues: state positions as
fractions and percentages of the frame.

## Contents

- Picking a grid
- The grids
- Positioning the subject
- Value plan
- Alignment — the image and what sits on it
- Text-safe and crop-safe zones
- Layers and depth
- Writing composition into a prompt

## Picking a grid

| The image needs to… | Use |
|---|---|
| place one subject naturally, with space to breathe | rule of thirds |
| feel a little tighter and more classical than thirds | phi grid |
| feel formal, grand, ritual, confrontational | center axis / symmetry |
| create movement or tension | diagonals (dynamic symmetry) |
| lead the eye through several elements in order | golden spiral or a Z/S path |
| hold text and image together | a column grid matched to the layout |
| show many items equally | modular grid (tiles) |
| feel layered and deep | foreground / midground / background planes |

One grid per image. A direction's entry names the grid it favors.

## The grids

- **Rule of thirds.** Two vertical and two horizontal lines at ⅓ and ⅔. Put the subject
  on a line, the key detail (eyes, product logo side) near an intersection, horizons on
  a horizontal line — never the middle unless the image is about symmetry.
- **Phi grid.** Lines at about 38% and 62% instead of 33% and 67%. Pulls the subject
  closer to center; calmer, more classical.
- **Center axis.** Subject on the vertical center line; elements mirrored or balanced
  around it. Works with one-point perspective. Breaks if text sits on one side.
- **Diagonals.** The frame's corner-to-corner diagonals and the perpendiculars from the
  other corners onto them (the base of dynamic symmetry). Place limbs, roads, shadows,
  product edges along them for energy.
- **Golden spiral.** A layout device, not an eye-tracking fact: place the focal point
  at the spiral's tight end and let supporting elements sweep around it. What the eye
  actually goes to first is decided by emphasis ([staging.md](staging.md#emphasis)).
- **Z and S paths.** Left-to-right readers scan top-left to bottom-right: a Z for flat
  layouts, an S curve (road, river, body line) for scenes. Right-to-left readers scan
  the mirror path.
- **Column grid.** The layout's own columns (12-column web, 2–6 columns print). The
  subject's edge, horizon or main vertical lines up with a column edge or the gutter.
- **Modular grid.** Rows and columns of equal cells: carousels, product sets, pattern
  walls, Swiss posters.

## Positioning the subject

- **Frame share.** Say how much of the frame the subject fills: "about a tenth"
  (minimal, wide), "about a third" (medium), "most of the frame" (close-up, poster).
  This one number changes the image more than any adjective. Frame share is always
  linear: the share of the frame's width, or of its height for standing figures. Say
  which. A tenth of the width is only 1% of the area.
- **Headroom.** The space above a head. Tight portraits: little, eyes on the upper third
  line. Full figures: some, but not half the frame unless emptiness is the point.
- **Lead room (look room).** Space in front of where the subject looks or moves —
  about two thirds of the width ahead. Putting the space *behind* them instead creates
  unease; use it on purpose only.
- **Eyeline and gaze.** The viewer follows the subject's gaze. When the person is
  support, they look at the hero. When the person is the hero, they look toward the text,
  or out of frame toward the open side. Gaze straight into the lens only when the image
  is a direct address.
- **Edges.** Decide what touches the frame edge: a cropped limb at a joint looks wrong
  (crop between joints), a horizon touching a head reads as a mistake, an object
  cropped at the edge implies the world continues.
- **Visual weight.** Big, bright, saturated, high-contrast, faces and text weigh more.
  A small bright subject balances a large dark field. Balance weight across the frame
  rather than centering everything.
- **Context: zero, or an odd number.** Context items (the things that only set the
  scene) are none, or one, three, five: as few as the direction allows. Two or four look
  arranged. Minimalism, studio product, Swiss, flat vector and editorial seamless default
  to none; maximalism and collage are exempt. Supporting items are a separate count,
  0–3 ([staging.md](staging.md#inventory-and-roles)).
- **Overlap.** Let elements overlap and touch. Models spread objects apart in even
  rows, which reads as fake.

## Value plan

Value is lightness, without color. An image reads at a glance when its values group into
a few large shapes.

- **Three values.** Plan the frame as light, mid and dark masses, each a big connected
  shape. The hero sits where the strongest value step is; the quiet zone is one value.
- **Squint test.** Squint at the sketch or render, or blur it, until detail is gone. If
  the hero and the first read still stand out, the structure holds. If the frame turns
  to an even gray, no color choice will save it.
- **160 px.** It must read at about 160 px wide (a thumbnail, a grid tile, a link
  preview): one large shape, a clear value step, nothing that depends on detail.
- On the scene sheet, one line: which mass is light, which mid, which dark.

## Alignment — the image and what sits on it

When the image carries text, UI or other images, the composition must line up with
them, not just look good alone.

- **Opposite sides.** Subject on one side, text on the other. Name the sides: "the
  subject in the left third; the right 40% quiet, low-contrast wall for the headline".
- **Right-to-left layouts** (Arabic, Hebrew, Persian, Urdu): the text column starts on
  the right, so mirror the plan: subject and text swap sides, and so do the gaze and the
  leading lines.
- **Gaze and text.** A person who is the hero looks toward the text block, never away
  from it. A person in support looks at the hero, and a line or the hero's own shape
  leads on to the text. Decide which the viewer reads first, hero or headline.
- **Match the layout grid.** Ask (or read from docs) where the text column starts. Put
  the subject's edge, a horizon or a strong vertical on that line, so image and layout
  share structure.
- **Quiet zone.** Under text: low contrast, low detail, one value. No bright bands,
  faces or patterns. Name what the zone *is* ("an evenly lit plaster wall"); in flat
  styles a flat color field is a valid quiet zone.
- **Contrast target.** The planned text color keeps WCAG contrast against the busiest
  point of the zone: 4.5:1 for body text, 3:1 for large text (about 24 px, or 19 px
  bold). For white text, the zone's lightest point stays at or below about #767676
  (#949494 for large); for black text, its darkest point stays at or above #767676
  (#595959 for large). Check the render, not the plan.
- **Optical center.** For centered layouts, the optical center sits slightly above the
  geometric center; place a single centered subject a little high.
- **Across a grid set.** In a product grid or a swipe-continuous carousel, keep the
  horizon height, subject size and margin identical across images. Inconsistent subject
  size reads as sloppy more than any other difference. A narrative set (campaign,
  separate posts, a website's pages) rotates shots and keeps the light logic instead
  ([shots.md](shots.md)).
- **Crop survival.** The hero and the first read survive every crop the placement uses.
  When one master is cropped to several ratios (16:9, 4:5, 9:16), keep them in the area
  every crop shares — usually the center half — and generate with bleed around it. When
  they can't all fit, art-direct a separate crop: a web hero with its subject in the
  left third loses most of it in a mobile center 9:16 slice (that slice is only the
  middle ~32% of a 16:9 width), so the mobile version gets its own crop or render.

## Text-safe and crop-safe zones

These are hard limits from the placement, not style choices. Check the platform's own
current guidance before locking them; they change.

- **Vertical video and stories (9:16):** Meta (Reels, Stories, Facebook and Instagram
  ads) asks for text and key elements to stay out of the top 14%, the bottom 35% and 6%
  on each side. TikTok's overlays sit differently (a right-hand button column, a
  caption area at the bottom); check its current guidance. Keep faces and text in
  the band that is left.
- **Feed posts:** posts are 4:5 or 3:4 (1080×1440). The Instagram profile grid crops to
  3:4, so a 4:5 post loses a strip at each side there; keep the subject in the
  center.
- **Web heroes:** the headline and buttons sit where the layout puts them; on mobile the
  same image may crop to a center portrait slice. Ask, and plan the mobile crop
  separately when the subject sits off-center (see crop survival above).
- **Thumbnails:** the subject must read at around 160 px wide; one large shape, high
  contrast ([value plan](#value-plan)).

## Layers and depth

Depth gives an image room and makes production splits possible.

- **Three planes.** Foreground (a soft framing element, texture or object), midground
  (the subject), background (the setting). Name each and what is in it.
- **Separation.** Keep a gap of value or color between planes: lighter background behind
  a dark subject, fog or shadow between planes. Models merge planes that are close in
  tone. In photographic scenes, moving the background farther behind the subject also
  softens it.
- **Scale cues.** A person, door or tree of known size makes the space readable. Real
  sizes: [staging.md](staging.md#real-sizes). How far each plane sits from the camera and
  what that does to its size and sharpness:
  [optics-light.md](optics-light.md#depth-of-field-and-background-blur).
- **Atmospheric depth.** Farther planes lighter, cooler and lower contrast — unless the
  direction is flat (graphic, Swiss, pixel), where depth comes from overlap only.
- **For parallax and cutouts.** The direction decides what sits in each plane; the
  production mechanics (clean silhouettes between planes, bleed, generating planes
  separately) live in `mw-image-prompt`'s scenes reference. Name the planes in the
  readback so the prompt can build them.

## Writing composition into a prompt

- Positions as fractions: "the horizon a third from the bottom", "the cup at the
  intersection of the right third and the lower third".
- Frame share as a number, with its axis: "the figure is about one eighth of the frame
  height".
- Real sizes in the user's units: inches and feet if that is how they write, centimeters
  and meters otherwise. Fractions and percentages need no units.
- Every region assigned: "the upper half is clear pale sky; the lower left holds the
  road; the subject stands on the right third".
- Camera-left and camera-right, never a bare left or right.
- Empty space described as a thing that exists ("a plain sand-colored wall"), not as
  "empty" or "negative space" alone.
