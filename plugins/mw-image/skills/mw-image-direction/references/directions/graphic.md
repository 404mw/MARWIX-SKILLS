# Directions — Graphic and flat

Eight directions built from flat shapes, type and print. Shot recipe names refer to
[shots.md](../shots.md); grid terms to [composition.md](../composition.md).

**For every graphic direction:** the "camera" is mostly flat frontal or isometric, and
the grid matters more than the lens. State shapes, edge quality (crisp vector edge, ink
spread, misregistration) and how many colors exactly. Image models blur flat styles
toward soft 3D shading; "flat color fills, no gradients, no shading" stated as the
positive state ("each shape one solid color") holds better. Where the user needs a
true vector file, Recraft V4 outputs SVG; every other model outputs pixels.

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
- **Light:** none or one implied direction shown by a single darker tint on one side.
- **Medium & texture:** crisp edges, solid fills; optional subtle grain overlay to
  avoid the sterile look.
- **Shots:** flat frontal, isometric, wide environmental (characters small in a
  simple scene).
- **Composition:** clear figure-ground; the subject inside a simple shape (circle,
  blob); generous margin.
- **Type:** geometric or rounded sans.
- **Variants:**
  - *Flat geometric* — built from circles, rectangles and triangles; no outlines.
  - *Outline* — uniform stroke weight, minimal fill, icon-like.
  - *Character vector* — simplified people with distinct proportions — choose them
    deliberately (head size, limb length), not the generic tiny-head big-limb figure.
  - *Gradient vector* — smooth two-tone gradients inside each shape.
- **Engines:** Recraft V4 when an SVG is needed. GPT-Image and Ideogram for scenes with
  labels. Midjourney — `--s` low, or it adds texture and depth. Nano Banana — describe
  shapes and color count in sentences.
- **Slop risks:** the big-limbed faceless corporate figure with purple skin, floating
  plants and blobs everywhere, a purple-blue palette.

## Swiss design

**Feels:** rational, precise, confident. **Use for:** posters, covers, type-led
headers, event graphics. **Not for:** warm, cozy or playful briefs.

- **Palette:** black, white and one strong color (red is the classic), or a strict two-
  or three-color set.
- **Light:** none; flat.
- **Medium & texture:** clean print; optional photographic element in black and white.
- **Shots:** flat frontal; when there is a photo, a cropped close detail.
- **Composition:** a visible modular grid (columns and rows), flush-left ragged-right
  type, asymmetric balance, large areas of white, strong diagonals allowed.
- **Type:** neo-grotesque sans, tight or wide tracking, big size contrast between
  headline and text.
- **Variants:**
  - *Grid poster* — type and geometric blocks only.
  - *Photographic Swiss* — one cropped black-and-white photo plus type on the grid.
  - *Bauhaus geometric* — primary colors, circles, squares and triangles as composition.
- **Engines:** type-heavy — GPT-Image or Ideogram for exact words; keep the words few.
  Midjourney for the abstract blocks without text, then set the type in an editor.
- **Slop risks:** fake gibberish body text, centered symmetric layouts, the grid
  described but not visible.

## Minimalism

**Feels:** calm, premium, focused. **Use for:** heroes, product, brand moments,
backgrounds behind text. **Not for:** busy information or loud campaigns.

- **Palette:** two or three colors, often tonal (stone, sand, white) or monochrome.
- **Light:** soft, even, or one gentle directional source with long soft shadows.
- **Medium & texture:** works as photo, 3D or flat; surfaces matte and quiet.
- **Shots:** flat frontal, wide environmental (object small in a big field), tight
  detail.
- **Composition:** 70–90% negative space; one subject on a third or at the optical
  center; alignment exact.
- **Type:** light sans or a refined serif, small, with lots of space.
- **Variants:**
  - *Japanese* — empty space as a subject, natural materials, asymmetry, one object.
  - *Scandinavian* — pale wood, white, soft daylight, functional objects.
  - *Product minimal* — one product on a tonal backdrop with one shadow.
  - *Monochrome* — one hue in many tints.
- **Engines:** every family over-fills; state the empty share as a number ("the object
  takes up a tenth of the frame; the rest is plain wall"). Midjourney — `--s` low.
- **Slop risks:** a single plant on a beige plinth, pastel arches, adding objects to
  "balance" the space.

## Pop art

**Feels:** loud, ironic, punchy. **Use for:** social, campaigns, merch, event promo.
**Not for:** quiet, serious or premium briefs.

- **Palette:** primaries plus black outlines; or acid complementaries.
- **Light:** flat; shading done with halftone dots.
- **Medium & texture:** Ben-Day dots, thick black outlines, screen-print
  misregistration.
- **Shots:** tight close-up (a face, an object) frontal, or a dramatic low-angle hero.
- **Composition:** subject fills the frame, cropped at the edges; repetition grids.
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

- **Palette:** a fixed small palette — 4, 16 or 32 colors, stated.
- **Light:** one direction, shown with one or two shading steps.
- **Medium & texture:** a visible pixel grid with every pixel the same size, no
  anti-aliasing, no blur.
- **Shots:** side view (platformer), top-down, isometric.
- **Composition:** tile-based; subject sized in pixels ("a 32×32 character").
- **Type:** pixel font.
- **Variants:**
  - *8-bit* — very few colors, chunky sprites.
  - *16-bit* — richer palette, dithering, detailed backgrounds.
  - *Isometric pixel* — 2:1 isometric tiles.
  - *1-bit* — black and white only.
- **Engines:** every model drifts to mixed pixel sizes and soft edges. Generate at a
  multiple of the target, then downscale with nearest-neighbor in post. State "every
  pixel square and the same size; hard edges".
- **Slop risks:** pixels of different sizes, smooth gradients, blurred pixel art.

## Print

**Feels:** tactile, indie, crafted. **Use for:** posters, editorial illustration,
packaging, merch. **Not for:** glossy tech or photoreal products.

- **Palette:** 2–4 spot inks; overlaps make new colors (risograph: fluorescent pink,
  blue, yellow; screen print: flat opaque inks).
- **Light:** flat; tone by grain, halftone or carving.
- **Medium & texture:** paper tooth, misregistration of a millimeter or two, uneven
  ink density, grain.
- **Shots:** flat frontal, tight crop, simple wide scenes.
- **Composition:** bold silhouettes, layered overprints.
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

- **Palette:** paper white or one strong background, black type, one accent.
- **Light:** flat, or a photo with its own light behind the type.
- **Medium & texture:** print-quality type, optional paper texture.
- **Shots:** flat frontal; a photo cropped to sit with the type.
- **Composition:** type is the subject; a baseline grid; headline sizes that break the
  grid on purpose.
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
- **Light:** flat; or harsh direct light on concrete.
- **Medium & texture:** default system fonts, hard borders, raw photographs, concrete.
- **Shots:** flat frontal, tight crop.
- **Composition:** visible structure, overlapping boxes, deliberate misalignment,
  oversized type.
- **Type:** monospace or a heavy grotesque, huge.
- **Variants:**
  - *Raw web* — boxes, borders, monospace, as an early website.
  - *Concrete poster* — massive type over a concrete texture or brutalist building.
- **Engines:** GPT-Image for exact text. Midjourney for the concrete architecture.
- **Slop risks:** brutalism as "messy", random glitch effects, unreadable layouts.
