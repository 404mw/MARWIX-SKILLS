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
- **Golden spiral.** The eye lands at the spiral's tight end; place the focal point
  there and let supporting elements sweep around it.
- **Z and S paths.** Western readers scan top-left to bottom-right: a Z for flat
  layouts, an S curve (road, river, body line) for scenes.
- **Column grid.** The layout's own columns (12-column web, 2–6 columns print). The
  subject's edge, horizon or main vertical lines up with a column edge or the gutter.
- **Modular grid.** Rows and columns of equal cells: carousels, product sets, pattern
  walls, Swiss posters.

## Positioning the subject

- **Frame share.** Say how much of the frame the subject fills: "about a tenth"
  (minimal, wide), "about a third" (medium), "most of the frame" (close-up, poster).
  This one number changes the image more than any adjective.
- **Headroom.** The space above a head. Tight portraits: little, eyes on the upper third
  line. Full figures: some, but not half the frame unless emptiness is the point.
- **Lead room (look room).** Space in front of where the subject looks or moves —
  about two thirds of the width ahead. Putting the space *behind* them instead creates
  unease; use it on purpose only.
- **Eyeline and gaze.** The viewer follows the subject's gaze. Point it at the headline,
  the product, or out of frame toward the open side. Gaze straight into the lens only
  when the image is a direct address.
- **Edges.** Decide what touches the frame edge: a cropped limb at a joint looks wrong
  (crop between joints), a horizon touching a head reads as a mistake, an object
  cropped at the edge implies the world continues.
- **Visual weight.** Big, bright, saturated, high-contrast, faces and text weigh more.
  A small bright subject balances a large dark field. Balance weight across the frame
  rather than centering everything.
- **Odd numbers.** Three or five supporting elements read as natural; two or four look
  arranged.
- **Overlap.** Let elements overlap and touch. Models spread objects apart in even
  rows, which reads as fake.

## Alignment — the image and what sits on it

When the image carries text, UI or other images, the composition must line up with
them, not just look good alone.

- **Opposite sides.** Subject on one side, text on the other. Name the sides: "the
  subject in the left third; the right 40% quiet, low-contrast wall for the headline".
- **Gaze to text.** The subject looks toward the text block, never away from it.
- **Match the layout grid.** Ask (or read from docs) where the text column starts. Put
  the subject's edge, a horizon or a strong vertical on that line, so image and layout
  share structure.
- **Quiet zone.** Under text: low contrast, low detail, one value. No bright bands,
  faces or patterns. Name what the zone *is* ("an evenly lit plaster wall").
- **Optical center.** For centered layouts, the optical center sits slightly above the
  geometric center; place a single centered subject a little high.
- **Across a set.** In a carousel or a product grid, keep the horizon height, subject
  size and margin identical across images. Inconsistent subject size reads as sloppy
  more than any other difference.
- **Mixed shapes.** When one master image is cropped to several ratios (16:9, 4:5,
  9:16), keep the subject in the area that survives every crop — usually the center
  half — and generate with bleed around it.

## Text-safe and crop-safe zones

These are hard limits from the placement, not style choices. Check the platform's own
current guidance before locking them; they change.

- **Vertical video and stories (9:16):** platform buttons and captions cover the bottom
  roughly 20–25% and a strip on the right; the top ~10% carries the account bar. Keep
  faces and text in the middle band.
- **Feed posts:** profile grids may crop 4:5 or 9:16 to a center square or 3:4 — keep the
  subject in the center.
- **Web heroes:** the headline and buttons sit where the layout puts them; on mobile the
  same image may crop to a center portrait slice. Ask, or keep the subject centered
  horizontally with room above or below.
- **Thumbnails:** the subject must read at around 160px wide; one large shape, high
  contrast.

## Layers and depth

Depth gives an image room and makes production splits possible.

- **Three planes.** Foreground (a soft framing element, texture or object), midground
  (the subject), background (the setting). Name each and what is in it.
- **Separation.** Keep a gap of value or color between planes: lighter background behind
  a dark subject, fog or shadow between planes. Models merge planes that are close in
  tone.
- **Scale cues.** A person, door or tree of known size makes the space readable. Real
  sizes, how far each plane sits from the camera and what that does to its size and
  sharpness: [staging.md](staging.md).
- **Atmospheric depth.** Farther planes lighter, cooler and lower contrast — unless the
  direction is flat (graphic, Swiss, pixel), where depth comes from overlap only.
- **For parallax and cutouts.** The direction decides what sits in each plane; the
  production mechanics (clean silhouettes between planes, bleed, generating planes
  separately) live in `mw-image-prompt`'s scenes reference. Name the planes in the
  readback so the prompt can build them.

## Writing composition into a prompt

- Positions as fractions: "the horizon a third from the bottom", "the cup at the
  intersection of the right third and the lower third".
- Frame share as a number: "the figure is about one eighth of the frame height".
- Every region assigned: "the upper half is clear pale sky; the lower left holds the
  road; the subject stands on the right third".
- Camera-left and camera-right, never a bare left or right.
- Empty space described as a thing that exists ("a plain sand-colored wall"), not as
  "empty" or "negative space" alone.
