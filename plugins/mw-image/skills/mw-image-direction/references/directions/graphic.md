# Directions — Graphic and flat

Eight directions built from flat shapes, type and print. Shot recipe names refer to
[shots.md](../shots.md); grid terms to [composition.md](../composition.md).

**For every graphic direction:** the "camera" is mostly flat frontal or isometric, and
the grid matters more than the lens. State shapes, edge quality (crisp vector edge, ink
spread, misregistration) and how many colors exactly. Image models blur flat styles
toward soft 3D shading; "flat color fills, no gradients, no shading" stated as the
positive state ("each shape one solid color") holds better. Where the user needs a
true vector file, Recraft's V4 Vector and V4 Pro Vector variants output SVG; every other
model (and Recraft's raster variants) outputs pixels.

**Fields.** *Palette* hexes are approximate starting points: a brand's mandated colors
replace the nearest role, and the rest are tuned around them. *Staging depth* names the
row of the depth table in [staging.md](../staging.md) ("When to stage, and how deep").
Most graphic directions are **flat**: inventory, frame shares, overlap, emphasis and a
quiet zone (a flat color field counts); no camera, no optics, no contact shadows unless
the style draws them.

## Contents

- Vector art
- Swiss design
- Minimalism
- Pop art
- Pixel art
- Print
- Type-led editorial
- Brutalist

---

## Vector art

**Feels:** clear, friendly, scalable. **Use for:** explainers, onboarding, marketing
sites, documentation. **Not for:** luxury, emotional storytelling, photoreal products.

- **Palette:** 3–5 flat colors with one accent; a set of tints of the main hue.
  Approx.: off-white `#FAF7F2` (dominant) · teal `#2A9D8F` (secondary) · teal tint
  `#A8DADC` (secondary) · coral `#F4845F` (accent) · ink navy `#1F2A44` (shadow).
- **Light:** none or one implied direction shown by a single darker tint on one side.
- **Medium & texture:** crisp edges, solid fills; optional subtle grain overlay to
  avoid the sterile look.
- **Shots:** flat frontal, isometric, wide environmental (characters small in a
  simple scene).
- **Composition:** clear figure-ground; the subject inside a simple shape (circle,
  blob); generous margin.
- **Staging depth:** flat — sizes as frame shares, overlap for depth, one emphasis
  order, the quiet zone as a flat field; zero context items by default.
- **Type:** geometric or rounded sans.
- **Variants:**
  - *Flat geometric* — built from circles, rectangles and triangles; no outlines.
  - *Outline* — uniform stroke weight, minimal fill, icon-like.
  - *Character vector* — simplified people with distinct proportions — choose them
    deliberately (head size, limb length), not the generic tiny-head big-limb figure.
  - *Gradient vector* — smooth two-tone gradients inside each shape.
  - *Editorial infographic illustration* — one idea made visual: numbers as sized
    shapes, a few labelled parts, icons in one stroke weight, a clear reading path
    (left to right or top to bottom), two or three colors plus gray. The data and
    labels come from the user and are checked; the model draws the frame, and exact
    numbers and words are set in the editor.
- **Engines:** Recraft V4 Vector (or V4 Pro Vector) when an SVG is needed. GPT-Image and
  Ideogram for scenes with labels. Midjourney — `--s` low, or it adds texture and depth.
  Nano Banana — describe shapes and color count in sentences.
- **Slop risks:** the big-limbed faceless corporate figure with purple skin, floating
  plants and blobs everywhere, a purple-blue palette.

## Swiss design

**Feels:** rational, precise, confident. **Use for:** posters, covers, type-led
headers, event graphics. **Not for:** warm, cozy or playful briefs.

- **Palette:** black, white and one strong color (red is the classic), or a strict two-
  or three-color set. Approx.: white `#FFFFFF` (dominant) · black `#111111`
  (secondary) · signal red `#E30613` (accent) · light gray `#E6E6E6` (secondary).
- **Light:** none; flat.
- **Medium & texture:** clean print; optional photographic element in black and white.
- **Shots:** flat frontal; when there is a photo, a cropped close detail.
- **Composition:** a visible modular grid (columns and rows), flush-left ragged-right
  type, asymmetric balance, large areas of white, strong diagonals allowed.
- **Staging depth:** flat — grid cells as frame shares, type and blocks in one
  emphasis order, white as the quiet zone; a photo inside keeps its own light only.
- **Type:** neo-grotesque sans, tight or wide tracking, big size contrast between
  headline and text.
- **Variants:**
  - *Grid poster* — type and geometric blocks only.
  - *Photographic Swiss* — one cropped black-and-white photo plus type on the grid.
  - *Bauhaus geometric (1919–33 precursor, not Swiss)* — the earlier school Swiss Style
    drew on, not a part of it: primary red, yellow and blue with black, circles,
    squares and triangles as composition. Say "Bauhaus", not "Swiss", in the prompt.
- **Engines:** type-heavy — GPT-Image or Ideogram for exact words; keep the words few.
  Midjourney for the abstract blocks without text, then set the type in an editor.
- **Slop risks:** fake gibberish body text, centered symmetric layouts, the grid
  described but not visible.

## Minimalism

**Feels:** calm, premium, focused. **Use for:** heroes, product, brand moments,
backgrounds behind text. **Not for:** busy information or loud campaigns.

- **Palette:** two or three colors, often tonal (stone, sand, white) or monochrome.
  Approx.: stone `#D9D3C7` (dominant) · off-white `#F4F1EA` (secondary) · sand
  `#C2B59B` (accent) · soft taupe shadow `#8C8478` (shadow).
- **Light:** soft, even, or one gentle directional source with long soft shadows.
- **Medium & texture:** works as photo, 3D or flat; surfaces matte and quiet.
- **Shots:** flat frontal, wide environmental (object small in a big field), tight
  detail.
- **Composition:** 70–90% negative space; one subject on a third or at the optical
  center; alignment exact.
- **Staging depth:** follows the medium — flat when drawn; full when photographed or
  rendered (then one contact shadow and one light). Either way: zero context items.
- **Type:** light sans or a refined serif, small, with lots of space.
- **Variants:**
  - *Japanese* — empty space as a subject, natural materials, asymmetry, one object.
  - *Scandinavian* — pale wood, white, soft daylight, functional objects.
  - *Product minimal* — one product on a tonal backdrop with one shadow.
  - *Monochrome* — one hue in many tints.
- **Engines:** a real product (the *product minimal* variant) is placed from the user's
  photo, never redrawn. Every family over-fills; state the empty share as a number ("the
  object takes up a tenth of the frame width; the rest is plain wall"). Midjourney —
  `--s` low.
- **Slop risks:** a single plant on a beige plinth, pastel arches, adding objects to
  "balance" the space.

## Pop art

**Feels:** loud, ironic, punchy. **Use for:** social, campaigns, merch, event promo.
**Not for:** quiet, serious or premium briefs.

- **Palette:** primaries plus black outlines; or acid complementaries. Approx.: process
  yellow `#FFE600` (dominant) · red `#E4002B` (secondary) · cyan `#00A0E3` (accent) ·
  black outline `#111111` (shadow).
- **Light:** flat; shading done with halftone dots.
- **Medium & texture:** Ben-Day dots, thick black outlines, screen-print
  misregistration.
- **Shots:** tight close-up (a face, an object) frontal, or a dramatic low-angle hero.
- **Composition:** subject fills the frame, cropped at the edges; repetition grids.
- **Staging depth:** flat — the subject's frame share and crop, outlines and dots
  instead of light, one emphasis; shadows only as drawn shapes.
- **Type:** comic lettering, speech bubbles, bold condensed capitals.
- **Variants:**
  - *Halftone comic* — comic panel look, speech bubbles, dot shading.
  - *Screen-print repeat* — the same image repeated in a grid with shifted colors.
  - *Bold flat pop* — flat saturated shapes, no dots, thick outlines.
- **Engines:** GPT-Image for exact bubble text. Midjourney strong on the look; keep text
  to one or two words. Flux handles dots well with explicit dot size.
- **Slop risks:** dots too fine to read as print, random comic sound effects, a famous
  painting copied.

## Pixel art

**Feels:** playful, nostalgic, gamer. **Use for:** games, developer tools, social,
retro campaigns. **Not for:** luxury or photographic subjects.

- **Palette:** a fixed small palette — 4, 16 or 32 colors, stated. Approx. anchors for a
  16-color set: grass green `#3E8948` (dominant) · sky blue `#5FCDE4` (secondary) · warm
  sand `#E4A672` (secondary) · hero red `#D95763` (accent) · deep navy `#1B1B3A`
  (shadow).
- **Light:** one direction, shown with one or two shading steps.
- **Medium & texture:** a visible pixel grid with every pixel the same size, no
  anti-aliasing, no blur.
- **Shots:** side view (platformer), top-down, isometric.
- **Composition:** tile-based; subject sized in pixels ("a 32×32 character").
- **Staging depth:** flat — sizes in pixels and tiles, one light direction as one or
  two shading steps, one emphasis; no camera.
- **Type:** pixel font.
- **Variants:**
  - *8-bit* — very few colors, chunky sprites.
  - *16-bit* — richer palette, dithering, detailed backgrounds.
  - *Isometric pixel* — 2:1 tiles (two pixels across for one up). Strictly this is
    dimetric, at 26.57°, not true isometric's 30°; it is what games call isometric.
  - *1-bit* — black and white only.
- **Engines:** every model drifts to mixed pixel sizes and soft edges, and its
  pseudo-pixels don't sit on an integer grid, so a plain nearest-neighbor downscale
  lands on cell edges and mixes colors. In post: detect the pseudo-pixel size and
  offset, sample each cell (its mode or median color), then quantize to the stated
  palette. State "every pixel square and the same size; hard edges".
- **Slop risks:** pixels of different sizes, smooth gradients, blurred pixel art.

## Print

**Feels:** tactile, indie, crafted. **Use for:** posters, editorial illustration,
packaging, merch. **Not for:** glossy tech or photoreal products.

- **Palette:** 2–4 spot inks; overlaps make new colors (risograph: fluorescent pink,
  blue, yellow; screen print: flat opaque inks). Approx., risograph: paper `#F3EEE3`
  (dominant) · fluorescent pink `#FF48B0` (secondary) · riso blue `#0078BF`
  (secondary) · yellow `#FFE800` (accent) · overprint purple `#5D3B8E` (shadow).
- **Light:** flat; tone by grain, halftone or carving.
- **Medium & texture:** paper tooth, misregistration of a millimeter or two, uneven
  ink density, grain.
- **Shots:** flat frontal, tight crop, simple wide scenes.
- **Composition:** bold silhouettes, layered overprints.
- **Staging depth:** flat — silhouettes as frame shares, overlap by overprint, tone by
  grain or halftone instead of light, one emphasis.
- **Type:** chunky grotesque or wood-type display.
- **Variants:**
  - *Risograph* — fluorescent inks, grainy fill, visible misregistration.
  - *Screen print* — opaque flat inks, halftone photo, poster scale.
  - *Linocut / woodcut* — carved lines, black on paper, one accent ink.
- **Engines:** Flux and Midjourney handle texture well. GPT-Image for exact poster
  text. State the ink count.
- **Slop risks:** a digital gradient under a "print" filter, too many colors, perfectly
  aligned layers.

## Type-led editorial

**Feels:** smart, publication, considered. **Use for:** covers, quote cards, carousels,
announcement graphics. **Not for:** wordless scenes.

- **Palette:** paper white or one strong background, black type, one accent. Approx.:
  paper white `#F7F5F0` (dominant) · ink black `#141414` (secondary) · vermilion
  `#E2412B` (accent).
- **Light:** flat, or a photo with its own light behind the type.
- **Medium & texture:** print-quality type, optional paper texture.
- **Shots:** flat frontal; a photo cropped to sit with the type.
- **Composition:** type is the subject; a baseline grid; headline sizes that break the
  grid on purpose.
- **Staging depth:** flat — type sizes as frame shares, reading order, the quiet field
  behind the type; a photo behind keeps its own light only.
- **Type:** an editorial serif with a strong italic, or a grotesque; at most two
  families.
- **Variants:**
  - *Magazine cover* — masthead, cover lines, one figure.
  - *Big-number* — one statistic huge, a small caption.
  - *Quote card* — the quote set large, attribution small.
- **Engines:** GPT-Image Flare for dense or exact text; Ideogram for big headlines. Or
  generate the background only and set type in the editor — the most reliable.
- **Slop risks:** misspelled words, fake mastheads, gibberish small print.

## Brutalist

**Feels:** raw, honest, anti-polish. **Use for:** developer brands, art and culture,
counter-culture campaigns. **Not for:** wellness, luxury, kids.

- **Palette:** black, white, system gray, one harsh color (pure red, blue or green).
  Approx.: white `#FFFFFF` (dominant) · black `#000000` (secondary) · system gray
  `#C0C0C0` (secondary) · pure blue `#0000FF` (accent).
- **Light:** flat; or harsh direct light on concrete.
- **Medium & texture:** default system fonts, hard borders, raw photographs, concrete.
- **Shots:** flat frontal, tight crop.
- **Composition:** visible structure, overlapping boxes, deliberate misalignment,
  oversized type.
- **Staging depth:** flat — boxes and type as frame shares, overlap, one thing that
  reads first; the *concrete poster* photo is full for its building only.
- **Type:** monospace or a heavy grotesque, huge.
- **Variants:**
  - *Raw web* — boxes, borders, monospace, as an early website.
  - *Concrete poster* — massive type over a concrete texture or brutalist building.
- **Engines:** GPT-Image for exact text. Midjourney for the concrete architecture.
- **Slop risks:** brutalism as "messy", random glitch effects, unreadable layouts.
