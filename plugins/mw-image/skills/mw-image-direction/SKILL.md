---
name: mw-image-direction
description: Decide with the user how an image or series should look, its art direction — style, palette, light, shot, framing and staging (real sizes, contact, light and shadow, what reads first). Use when the user has no idea what an image should look like; asks for a style, a look, a vibe, a mood or art direction; names one ("make it Y2K", "editorial"); wants a look for a brand or a series; says every image comes out the same; or says renders look fake — floating objects, wrong scale, clashing shadows — and wants the scene set up right. It interviews in plain words, shortlists three contrasting directions from a library of 48, each with a recommended shot, then reads it back in plain words, with a scene sheet for the prompt. Does not write or edit a model prompt or generate — that is mw-image-prompt / mw-image-gen. Not for logos, UI layouts, SVG or CSS, brand style guides, 3D-software settings, real photo shoots, or home staging.
argument-hint: "[what the image is for, or the look you have in mind]"
---

Give an image a look on purpose. Image models fill every undecided choice with their
own habits: a centered subject at eye level, a smiling face, a teal-and-orange grade, a
purple-blue gradient. This skill makes those choices with the user — the **look**, the
**shot**, and the **staging** (what stands in front of the camera, at what size, lit how,
read in what order) — and writes them down precisely enough to prompt from. Prompts are
`mw-image-prompt`'s job, rendering `mw-image-gen`'s; either may be absent. This skill
works alone.

## Rules nothing overrides

- **Attributes, never names.** A direction is described by what it is made of. Never a
  living artist, a named photographer or an active commercial studio, in the readback or
  a style block; a user who names one gets the attributes back, and is told why.
  Historical movements and schools, lighting patterns and film stocks are fine.
- **Rights.** A reference image the user does not own is *described in words* and never
  sent to a model, mood references included.
- **Real products are placed, never redrawn.** A real product, label, screen or
  packaging comes from the user's photo, by edit or composite. Staging plans the set,
  light and contact around it, and reads the camera and light off that photo
  ([staging.md](references/staging.md), "Placing a supplied product").
- **Honesty for real businesses.** When an image presents a real business's own
  products, premises, staff or events *as real* (about, team, "our shop", menu, impact
  stories), recommend real photos and make the direction their shot list and light
  plan — or keep the generated image generic and illustrative, claiming nothing.
  Generated images suit atmosphere, backgrounds, concepts and illustration.
- **Real people, minors, honest evidence.** A look never relaxes these: an identifiable
  person needs their consent, and a style never passes generated imagery off as evidence.
- **Spend.** Only the optional sketch round costs money, and only on the user's yes,
  with the model, size and cost stated first.

## Direction vs. project docs

Once chosen, **the direction controls the look**: style, light, texture, camera, pose,
composition. Project docs keep control of three things:

1. **Technical limits** — sizes and ratios, formats, the layer and naming scheme the
   code expects, text-safe zones, where live text or UI sits.
2. **Content bans** — legal or client rules ("no competitor logos", "no alcohol").
3. **Brand identity** — mandated colours (hex), typefaces, logo use, always/never rules.

The direction is built inside the brand: brand colours take a role in its palette. If a
direction cannot live inside the brand palette, say so once and ask. An existing brand
look or existing imagery becomes shortlist option 1, "match the current look". If the
docs describe some other look, say so in one line ("this direction replaces it; I kept
your sizes, layer names and brand colours"), and do not blend it in.

A file this skill saved earlier (`docs/art-direction.md`, step 7) *is* the direction.
Reuse it unless the user asks for a new one.

## Procedure

**Turn map.** Aim for four user turns; steps may share a reply.

1. Interview — including what it shows, which images go where, the generator and real
   photos.
2. Shortlist — each direction carries its recommended shot, so one pick settles both.
3. Plain readback, with the recommended shot already staged.
4. Confirm, then hand off to prompts.

**"You choose."** When the user says "you choose" or "just go", or answers vaguely
twice: pick the direction and shot yourself, mark each choice `[proposed]`, and go
straight to the plain readback.

### 1. Read what is already settled

From the conversation and any readable docs: what the image is for, where it lives, at
what size, whether text or UI sits on it, one image or a series, and the three protected
classes above. Do not re-ask any of it. Then pick the entry point:

| The user… | Start at |
|---|---|
| has no idea, or says "make it look good" | step 2, the full interview |
| says "you choose" or "just go" | the fast lane above |
| names a feeling ("calm", "premium") | step 2, only what the feeling leaves open |
| names a direction ("Y2K", "clay") | step 3 with that direction's variants instead of a shortlist |
| has a brand look or existing imagery | step 3, "match the current look" as option 1 |
| shows an image they like | name the *properties* that make it work, map them to the nearest directions, then step 3; never clone it |
| has a render that looks fake, or attaches a render; or says images look fake, flat, pasted together, or nothing stands out | staging.md "Diagnose a render": ask for the image and its prompt in one batch, infer the direction and shot as `[inferred]`, then one edit or re-stage and regenerate |
| says every image looks the same | step 4: the shot is the problem, not the style |
| has the look and shot, and wants the scene planned | step 5 |

Starting at step 4 or 5 with no chosen direction: the Direction line reads "as your
current images", with their palette and light in one line. Do not shortlist.

### 2. Interview — one batch, plain words

Ask, in one reply, only what is open, each question with a recommendation and concrete
options:

1. **Which images, and where does each go?** Offer a default set ("a 16:9 hero with room
   for the headline, three 4:5 product tiles, one about image").
2. **What should it show?** Offer three concrete scene ideas from what they make or do.
3. **Who sees it, and three words for the feeling.** Offer three triples ("calm ·
   expensive · quiet", "loud · playful · fast", "honest · warm · human").
4. **What must it never look like?** "Not corporate", "not another AI gradient".
5. **Real or made, new or nostalgic?** Photo · drawn · 3D · flat graphic; today · an era ·
   the future · timeless · "you choose".
6. **Do you have real photos** of the product, shop or team? They decide what is placed
   rather than generated, and what the honesty rule asks for.
7. **Where will you generate?** Skippable; "not sure" means a model-neutral block.

For a series or a brand, also ask whether the look must survive many images.

**A message, not a thing.** When the ask names a message ("burnout", "we're reliable"),
decide what the image shows before the shortlist with `mw-image-prompt`'s concept.md.
Without that skill, offer three visual metaphors, each a concrete object or scene.

### 3. Shortlist three contrasting directions

Load [references/catalog.md](references/catalog.md), then the direction files for the
finalists only. Choose **three that differ on at least two axes** — medium, energy,
era, light/dark. Three flavors of minimal is not a shortlist. For each:

- **Name and variant** — "Analog film · warm consumer color".
- **Why it fits** — one line tied to their words.
- **What it looks like** — palette, light, texture in one concrete sentence.
- **Recommended shot** — its best recipe for this image ("candid mid-action over the
  counter").
- **The risk** — the one way it goes wrong ("can tip into nostalgia filter").

Recommend one, then offer the sketch round.

**Sketch round (optional).** The same subject in all three directions, each in that
direction's first-favoured shot, so the user chooses by looking. Before anything runs,
name the model and size and state the cost: on an API at 1K, about $0.08 an image on
Nano Banana 2 and $0.15 on Nano Banana Pro, so three to six sketches cost about
$0.25–0.90; on a chat plan, that many generations from the quota. Prices move: check
`mw-image-prompt/references/roster.md`. On a yes, hand the prompts, model and size to
`mw-image-gen` if the session can run it; otherwise give three copyable prompts. Never
run it unasked.

### 4. Shot options — never one default

Offer alternatives to the recommended shot when the user asks, when every image looks
the same, or across a series. Load [references/shots.md](references/shots.md) and
[references/composition.md](references/composition.md). Give **two or three options**
that differ on at least two of: camera height, distance, placement, pose register; at
least one the user would not have asked for. Each: recipe name, what it shows, what it
says ("low-angle hero — the product towers; it says confidence").

Series: **grid sets** (product grid, continuous carousel) keep shot, size, horizon,
margin and rig; **narrative sets** (campaign, a site's pages) rotate recipes and keep
only the light logic (composition.md).

### 5. Stage the scene — physics and emphasis

**Set the depth from staging.md's depth table first** ([staging.md](references/staging.md),
"When to stage, and how deep"). The family decides which parts below apply; skip the
rest. For photographic, 3D render and miniature directions, also load
[references/optics-light.md](references/optics-light.md).

For each shot, fill the parts of the **scene sheet** the depth allows:

1. **Inventory and roles.** Hero: one, or one group with a lead member. Support: 0–3.
   Context: zero or an odd few; minimalism, studio product, Swiss, flat vector and
   editorial seamless default to zero, maximalism and collage are exempt. People get
   cast: age, build, skin tone, hair, wardrobe, one specific trait.
2. **Real sizes.** From the user, the docs or the size table. An unknown size is
   assumed, stated in the readback with an invitation to correct it; it never blocks.
3. **The camera** (photo, 3D, miniature). Decided, not measured: choose the hero's frame
   share and lens feel, derive the distance from its size, place the rest relative to it.
4. **Gravity and contact.** What rests on or holds what; contact shadows where the style
   draws them; floating only by the direction's licence, with a shadow marking the ground.
5. **Light.** Full families: each source's side, height, size and colour → shadows,
   falloff, bounce. Painterly, illustrated, soft 3D, isometric: one consistent direction.
6. **Materials.** How each surface answers the light.
7. **The instant.** What is frozen, what blurs.
8. **Emphasis.** The hero owns the strongest cue it can (brightest against its
   surroundings, or highest local contrast), is the sharpest, and wins one more pull. A
   face or legible text that is not the hero is held down by two of crop, turn, focus,
   value — and will still be glanced at. Silhouette or backlit: the hero is the darkest
   shape on the brightest field. Brightness is light × surface lightness. With live
   text, decide hero → headline or the reverse and route a gaze or line between them.

**Flat styles** (flat, vector, Swiss, type-led, pop, pixel, print) use inventory, frame
shares, overlap, emphasis and a quiet zone — a flat colour field counts. No camera, no
optics, no contact shadows unless the style draws them.

Run staging.md's "Physics check", only the lines tagged for this family, and fix the
sheet, not the prose. A surreal image names the law(s) the idea breaks — usually one —
exempt from the check; every other law stays strict.

When scale or contact must be exact, or after one failed render, offer once a structure
reference: a grey-box blockout or a phone photo of a stand-in setup (staging.md "When
words aren't enough").

Ask the user only what they alone know: a product's real size, a real space's size, what
the viewer must notice first. Never ask for distances, camera height, angles or
aperture, and never ask them to check the arithmetic.

### 6. Read back the locked look

Two layers. The user sees the **Plain readback**: at most about 8 lines per image, in
everyday words, no units except an assumed size. The **Scene sheet** holds the numbers;
it goes into the hand-off and the saved file, and is shown only when the user asks, at
L3, or when a render is checked. Terms: [vocabulary.md](references/vocabulary.md).

```
Looks like   warm analog film, an early-morning bakery
In it        a baker's hands dusting flour over a round loaf on a dark wooden board; their face mostly out of frame
Camera       just above the counter, close — the loaf is about a fifth of the picture, lower left
Light        one low morning sun from the left window; long shadows to the right; about half the picture in warm shadow
You see      the scored crust first, then the hands; the face last
Kept quiet   the plaster wall on the right, where your headline goes
I assumed    a 22 cm loaf; a generic baker, not one of your staff — your product pages should use your own photos
```

A flat style reads back shorter, with no camera numbers:

```
Looks like   flat vector, two blues and one orange, crisp edges, no shadows
In it        one person beside a large tilted card with a rising line chart; no props
Layout       figure and card on the right; your headline on the left, over a plain blue field
You see      the orange line first, then the person, then the headline
I assumed    a drawn, generic chart — your real product UI would be a screenshot composited in
```

The **Scene sheet** for the bakery hero (full version, check passing: staging.md
"Worked example"):

```
Direction    Analog film · warm consumer color · honest, warm, unhurried
Palette      warm creams, faded teal, rust; natural skin; no pure black; brand colours in their roles
Light logic  hard low sun balanced for daylight, reads warm gold; soft warm bounce; 4:1; half in shadow
Texture      fine grain; a faint glow around the brightest highlights only; soft contrast
Avoid        teal-and-orange grade, glossy skin, lens flare, centered smiling subject
Kept         1600×900; headline over the right 40%; no competitor marks
Shot A       candid mid-action over the counter, baker cropped at the brow, 35mm feel, 16:9
Rig          one low early sun, ~15° up, through the east window (camera-left), ≈ 4000K
Camera       1.35 m high, 1.1 m back, down ~10° → loaf ~77% down; frame at loaf ≈ 1.18 × 0.66 m; f/2.8
Hero         loaf Ø22 × 11 cm, dark walnut board, oak counter; lower-left third, ≈ a fifth of width, sharp
Support      hands dusting flour · baker 35 cm beyond, head ≈ half the loaf's width, three-quarter away
Context      proving baskets on a shelf, soft; plaster wall 2.4 m back, out of the beam, ≈ 4 stops down
Light        side-lit, grazing the ridge; shadows to camera-right ≈ 3.7× height; flour only on the ridge
Emphasis     1) floured scored ridge: brightest, sharpest  2) hands  3) face, held down by turn and crop
Quiet zone   right 40%, upper part: plaster wall in shadow, one value; mobile crops on the loaf
```

**The style block** is pasted word for word into every prompt of the series; that keeps
a series consistent. It names light by quality, colour against a stated white balance,
contrast and shadow share — never a direction relative to the camera, never an
elevation. Direction lives in each image's staging, translated from the one world rig.
Exclusions are stated as the positive state that excludes them:

> A 35mm colour photograph with fine visible grain and soft contrast. Warm creams, faded
> teal and rust; natural skin; the darkest tones stay lifted, never pure black. One hard,
> low sun balanced for daylight so it reads warm gold, with soft warm bounce in the
> shadows; sculpted contrast, about half the frame in shadow. A faint glow around the
> brightest highlights only.

With a known generator, add that family's notes from the direction's entry and stamp
the block with the family; if the entry has no note for it, use `mw-image-prompt`
engines.md's safe defaults and say the block is uncalibrated. For Midjourney, a fixed parameter line sits **beside** the
block and the Avoid line becomes `--no`:
`--v 8.2 --raw --s 100 --no teal-and-orange grade, lens flare`. Unknown generator: the
block stays model-neutral.

**A series** gets one shared world sheet (world scale, light logic, materials, palette,
casting); per image, one plain line (shot · hero · first read) and a 4–6-line delta on
the sheet:

```
1  hero 16:9   over the counter · the loaf · the scored crust
2  tile 4:5    overhead on linen · three loaves · the darkest crust
```

Lock it by reference too: attach the first approved render as a style-only reference to
every later prompt (Midjourney `--sref`, a style image on GPT-Image or Nano Banana),
alongside the verbatim block.

Confirm, or change anything in plain words; the sheet follows. One more batch at most.

### 7. Hand off, and offer to save

- **`mw-image-prompt` installed:** continue into it with the Scene sheet. Lines the
  direction settled carry `[direction]` and count as confirmed: destiny, generator
  ("model-neutral" if unknown), the image list, the text zone, and per image the staging
  lines that fit the generator's budget, in priority order (staging.md "Prompt budget").
  The rest of the sheet travels along to check the render against.
- **Not installed:** the style block plus a shot's staging lines, written as visible
  results (staging.md "Writing physics into a prompt") within that budget, is a usable
  prompt skeleton. Say so, and that `mw-image-prompt` can encode it per model.

Where files can be written, offer once: *"Save this look to `docs/art-direction.md` so
future sessions reuse it?"* A new conversation starts empty, and the style block must
survive word for word. On a no, nothing is written; in chat-only apps, suggest keeping
the readback with the project notes. The saved file holds the scene sheets — look, world
sheet, each image's staging, style block — plus the date and the model family the block
was tuned on. If the file exists, show what changes and ask before replacing it.

## Library at a glance

[references/catalog.md](references/catalog.md) indexes 48 directions in seven groups,
with variants, the shortlisting axes and the generic AI looks to steer away from. Every
entry carries the same fields, including its staging depth and a palette of named
colors with approximate hex and a role:

- [photo.md](references/directions/photo.md) — cinematic, documentary, editorial, direct
  flash, lifestyle, product, low-key, B&W, analog film, architecture, food, landscape,
  phone candid (UGC)
- [graphic.md](references/directions/graphic.md) — vector, Swiss, minimalism, pop art,
  pixel art, print, type-led editorial, brutalist
- [surface.md](references/directions/surface.md) — glass morphism, aurora
- [dimensional.md](references/directions/dimensional.md) — clay, soft 3D, isometric,
  low-poly, miniature, paper craft
- [illustrated.md](references/directions/illustrated.md) — hand-drawn, watercolor,
  painterly, editorial ink, anime and manga, children's book, technical, surreal
- [mixed.md](references/directions/mixed.md) — collage, graffiti, maximalism, product UI
  showcase
- [eras.md](references/directions/eras.md) — retro, Y2K, futuristic, cyberpunk,
  Victorian, bohemian, Art Deco

Beside the library: [shots.md](references/shots.md) (shot recipes),
[composition.md](references/composition.md) (grids, placement, layers, series),
[staging.md](references/staging.md) (depth table, scene sheet, sizes, emphasis, physics
check, fake-look triage, diagnosing a render, structure references, prompt budget),
[optics-light.md](references/optics-light.md) (camera and light maths; only for photo,
3D render and miniature, or a render's geometry) and
[vocabulary.md](references/vocabulary.md).
