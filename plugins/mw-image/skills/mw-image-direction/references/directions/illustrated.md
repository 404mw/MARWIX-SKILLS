# Directions — Drawn and painted

Eight directions made by hand, or that should look like it. Shot recipe names refer to
[shots.md](../shots.md); grid terms to [composition.md](../composition.md).

**For every drawn direction:** name the tool and its marks (pencil grain, brush edge,
ink line weight, paper). Models smooth hand-made marks into a digital look unless the
imperfection is stated. Never "in the style of" a named illustrator, studio or living
artist: describe the line, the color and the paper instead.

## Contents

- Hand-drawn
- Watercolor
- Painterly
- Editorial ink
- Anime and manga
- Children's book
- Technical
- Surreal

---

## Hand-drawn

**Feels:** human, personal, informal. **Use for:** notes, onboarding, personal brands,
explainers that should feel like a whiteboard. **Not for:** luxury, formal finance.

- **Palette:** paper white plus one or two ink colors; marker brights for doodles.
- **Light:** none.
- **Medium & texture:** uneven line weight, pen pressure, small overshoots at corners,
  paper grain.
- **Shots:** flat frontal; doodles around a photo.
- **Composition:** loose, with hand-drawn arrows and circles pointing at things.
- **Type:** handwriting or hand lettering.
- **Variants:**
  - *Hand lettering* — words drawn as the image: brush script, chunky marker, chalk.
  - *Sketchbook* — pencil and ink on toned paper, construction lines left in.
  - *Marker doodle* — thick colored markers, simple shapes, arrows.
  - *Chalkboard* — white and colored chalk on dark slate.
- **Engines:** lettering — GPT-Image or Ideogram, and spell the words. Doodles —
  any family; state "visible pen pressure and wobble".
- **Slop risks:** perfect geometric lines, font-like "handwriting", random doodles
  with no meaning.

## Watercolor

**Feels:** soft, gentle, airy. **Use for:** wellness, invitations, editorial,
botanical, travel. **Not for:** tech, bold campaigns.

- **Palette:** transparent washes, 3–5 pigments, lots of white paper.
- **Light:** paper white is the highlight.
- **Medium & texture:** wet edges, blooms, granulation, cold-press paper texture,
  unpainted areas.
- **Shots:** wide environmental, tight detail (botanical).
- **Composition:** vignetted wash fading to paper, subject loose at the edges.
- **Type:** light serif or a brush script.
- **Variants:**
  - *Loose wash* — big wet areas, few details.
  - *Botanical* — precise plant drawing with careful washes.
  - *Ink and wash* — ink line, color washed in loosely.
- **Engines:** Midjourney and Flux render paper and pigment best. State "white paper
  visible between washes".
- **Slop risks:** digital gradients called watercolor, outlines on everything,
  oversaturated pigment.

## Painterly

**Feels:** rich, crafted, emotive. **Use for:** key art, book and game covers, story
illustrations. **Not for:** UI-adjacent or technical images.

- **Palette:** a controlled harmony (analogous with one complement); state it.
- **Light:** strong directional light, painted.
- **Medium & texture:** visible brush strokes; the edge quality varies — sharp at the
  focus, lost elsewhere.
- **Shots:** low-angle hero, wide environmental, environmental portrait.
- **Composition:** classical — a clear focal point, value grouping, lost edges.
- **Type:** classic serif.
- **Variants:**
  - *Gouache* — opaque, matte, flat color areas with dry-brush edges.
  - *Oil impasto* — thick paint, palette-knife texture, rich darks.
  - *Digital concept painting* — big shapes, atmospheric perspective, speed-painting.
- **Engines:** Midjourney strongest; `--s` higher here is fine. Nano Banana for
  consistent characters across paintings.
- **Slop risks:** the fantasy-epic default — a hooded figure facing a glowing
  castle, god rays, overdetailed everything.

## Editorial ink

**Feels:** witty, intelligent, magazine. **Use for:** articles, op-eds, newsletters,
concept illustrations. **Not for:** realistic product or decoration.

- **Palette:** black line plus one or two flat spot colors.
- **Light:** none or flat shadows as shapes.
- **Medium & texture:** confident ink line, slightly variable weight, flat fills.
- **Shots:** flat frontal, high-angle down, a surreal scale shift.
- **Composition:** one clear idea; a visual metaphor; ample white.
- **Type:** editorial serif.
- **Variants:**
  - *Line and spot color* — clean line, one flat accent color.
  - *Crosshatched* — tone built from hatching, newspaper feel.
- **Engines:** all families; GPT-Image for metaphors with labels.
- **Slop risks:** a lightbulb for ideas, a brain for thinking, a rocket for growth —
  the metaphor should come from the story (`mw-image-prompt` concept.md).

## Anime and manga

**Feels:** expressive, dramatic, youthful. **Use for:** characters, story, fandom
social, games. **Not for:** corporate, formal, older audiences.

- **Palette:** cel anime — clean flat fills with one shadow tone; painted backgrounds
  richer.
- **Light:** strong rim light, colored shadows, dramatic sky.
- **Medium & texture:** clean line art, cel shading; manga — screentones and speed
  lines.
- **Shots:** low-angle hero, Dutch tilt for action, tight close-up on eyes, wide
  environmental with a big sky.
- **Composition:** dynamic diagonals, panel-like framing.
- **Type:** bold display or Japanese-style sound effects only if wanted.
- **Variants:**
  - *Cel anime* — flat fills, hard shadow edges, TV-animation look.
  - *Manga screentone* — black and white, halftone screentones, speed lines.
  - *Painted backgrounds* — lush painted landscapes and skies with simple characters.
- **Engines:** Midjourney's Niji model is built for this; otherwise any family. Never
  name a studio or a living artist; describe line, shading and color.
- **Slop risks:** the same face, sparkling eyes on everyone, cherry blossoms by default.

## Children's book

**Feels:** gentle, safe, imaginative. **Use for:** kids, education, family brands,
storytelling. **Not for:** serious or premium adult products.

- **Palette:** warm and soft, or bright primaries tempered with naturals.
- **Light:** soft, warm, simple.
- **Medium & texture:** gouache, colored pencil, crayon; visible texture.
- **Shots:** eye-level at the child's height, wide environmental, high-angle down.
- **Composition:** clear story moment, room for text on the page.
- **Type:** friendly serif or rounded sans, large.
- **Variants:**
  - *Textured gouache and crayon* — handmade marks, paper grain.
  - *Soft digital* — clean shapes, soft gradients, gentle textures.
- **Engines:** Nano Banana for a recurring character over many pages. Midjourney for
  look development.
- **Slop risks:** big glossy eyes, too-perfect symmetry, saccharine pastels.

## Technical

**Feels:** exact, engineered, credible. **Use for:** how-it-works, hardware, patents,
documentation, infographics. **Not for:** emotion or atmosphere.

- **Palette:** blueprint white on blue; black on white; or one accent color on gray.
- **Light:** none.
- **Medium & texture:** uniform line weights (thick outline, thin details), dimension
  lines, hatching for sections.
- **Shots:** flat frontal (elevation), isometric, exploded view, cutaway.
- **Composition:** centered object with callouts on a grid; leader lines to labels.
- **Type:** monospace or technical sans, small, numbered callouts.
- **Variants:**
  - *Blueprint* — white lines on cyan-blue, grid.
  - *Patent drawing* — black line on white, numbered parts, figure labels.
  - *Exploded view* — parts separated along their assembly axis.
  - *Cutaway* — a section removed to show inside.
- **Engines:** GPT-Image for labels and precise layout; check every label. Models
  invent plausible but wrong mechanics — the user checks the engineering.
- **Slop risks:** gibberish labels, impossible parts, decorative "tech" lines.

## Surreal

**Feels:** strange, memorable, conceptual. **Use for:** concept covers, art, ideas that
need a visual metaphor. **Not for:** literal product or documentary.

- **Palette:** clear, calm colors make the strangeness land; a clean sky is the classic
  stage.
- **Light:** realistic and consistent — the impossible thing must obey the scene's
  light.
- **Medium & texture:** photo-real, painted or collage.
- **Shots:** wide environmental (an impossible scale), flat frontal, low-angle hero.
- **Composition:** one impossible thing in an otherwise ordinary scene; space around it.
- **Type:** classic serif.
- **Variants:**
  - *Photo-real surreal* — a real photograph with one impossible element.
  - *Painted dreamscape* — painted, long shadows, empty plains, quiet.
  - *Surreal collage* — cut-out photos combined at wrong scales.
- **Engines:** Nano Banana and GPT-Image follow the logic of the impossible idea best;
  Midjourney for the look. Describe it as fact ("a staircase rises out of the sea"), not
  "surreal".
- **Slop risks:** melting clocks, floating islands, many impossible things at once.
