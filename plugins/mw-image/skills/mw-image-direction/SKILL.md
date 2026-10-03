---
name: mw-image-direction
description: Decide how an image or a series should look — the art direction — with the user: style, palette, light, camera angle, pose, framing, placement, layers, and the scene's physical staging: each object's real size and place, what holds it up, where light and shadows fall, what the image emphasizes. Use when the user has no idea what an image should look like, asks for a style, a look, a vibe, a mood or art direction, names one ("make it Y2K", "editorial"), wants a look for a brand or a series, says every image comes out the same — same pose, angle, centered subject — or that images look fake: floating objects, wrong scale, clashing shadows, nothing standing out. It interviews in plain words, shortlists three contrasting directions from a library of 46, offers two or three shots, stages the chosen one as a scene sheet with sizes, light physics and an emphasis order, and reads the look back for prompting. Decides the look; does not write the final prompt or generate. Not for logos, UI layouts, SVG or CSS.
argument-hint: "[what the image is for, or the look you have in mind]"
---

Give an image a look on purpose. Image models fill every undecided choice with their
own habits: a centered subject at eye level, a smiling face turned to camera, a
teal-and-orange grade, a glossy surface, a purple-blue gradient. Nobody chose any of
it. This skill makes those choices with the user, from a library of named directions
and a menu of shots, and writes them down precisely enough to prompt from.

It decides the **look**, the **shot**, and the **staging** — what physically stands in
front of the camera, at what size, lit how, and which part of it the viewer reads
first. Turning that into a prompt for a specific
model is the job of `mw-image-prompt`; rendering it is the job of `mw-image-gen`.
Either may be installed or not. This skill works alone.

## Rules nothing overrides

- **Attributes, never names.** A direction is described by what it is made of — palette,
  light, medium, texture, framing. Never "in the style of [living artist]", a named
  studio, or a named photographer, in the readback or in any style block. A user who
  names one gets the attributes back, and is told why.
- **Rights.** A reference image the user does not own is *described in words* and never
  sent to a model, mood references included.
- **Real people, minors, honest evidence.** A look never relaxes these. Photoreal styles
  applied to an identifiable real person still need their consent for the use, and a
  style never turns generated imagery into fake evidence.
- **Spend.** Only the optional sketch round costs money, and only on the user's yes,
  with the cost stated first.

## Direction vs. project docs

Once a direction is chosen, **it controls the look**: style, palette, lighting, texture,
camera, pose, composition. Project docs keep control of only two things:

1. **Hard technical limits** — exact sizes and ratios, formats, the layer and naming
   scheme the code expects, text-safe zones, where live text or UI will sit.
2. **Content bans** — legal or client rules ("never show competitor logos", "no
   alcohol").

Where files can be read, look only for those two. If the docs also describe a look, say
so in one line ("your docs describe a dark editorial look — this direction replaces it
for the look; I kept their sizes and layer names") and move on. Do not ask permission
each time and do not blend the old look in.

A file this skill saved earlier (`docs/art-direction.md`, see step 7) is not "other
docs": it *is* the direction. Reuse it unless the user asks for a new one.

## Procedure

### 1. Read what is already settled

From the conversation and, where files exist, the docs: what the image is for, where
it lives, at what size, whether text or UI sits on it, whether it is one image or a
series, and the technical limits above. Do not re-ask any of it.

Then pick the entry point:

| The user… | Start at |
|---|---|
| has no idea, or says "make it look good" | step 2, the full interview |
| names a feeling ("calm", "premium", "loud") | step 2, only the questions the feeling leaves open |
| names a direction ("Y2K", "editorial", "clay") | step 3 with that direction; show its variants instead of a shortlist |
| shows an image they like | name the *properties* that make it work (palette? light? medium? framing?), map them to the nearest directions, then step 3. Describe it in words; never clone it |
| complains every image looks the same | skip to step 4: the shot is the problem, not the style |
| complains images look fake, flat, pasted together, or that nothing stands out | skip to step 5: the staging is the problem — scale, contact, light and emphasis |
| has the look and the shot, and wants the scene planned precisely | step 5 |

### 2. Interview — one batch, plain words

People without a visual vocabulary can still answer contrasts. Ask, in one reply, only
what is open, each question with a recommendation and concrete options:

1. **Who sees it, and where?** — feed scrollers, site visitors, investors, kids…
2. **Three words for the feeling.** Offer three ready-made triples to react to
   ("calm · expensive · quiet", "loud · playful · fast", "honest · warm · human").
3. **What must it never look like?** The anti-reference often tells more than the
   reference: "not corporate", "not another AI gradient", "not childish".
4. **Real or made?** Photograph · drawn or painted · 3D · flat graphic · "you choose".
5. **New or nostalgic?** Today · a past era (which?) · the future · timeless.

Skip a question the context answers. For a series or a brand, also ask whether the
look must survive across many images: that rules out directions that only work once.

### 3. Shortlist three contrasting directions

Load [references/catalog.md](references/catalog.md), then the files for the candidate
directions. Choose **three that differ on at least two axes** — medium, energy, era,
light/dark — so the choice teaches the user something. Three flavors of minimal is not
a shortlist. If the user already narrowed the medium, contrast on energy and palette
instead.

For each, give:

- **Name and variant** — "Analog film · warm consumer color".
- **Why it fits** — one line tied to their words: "honest and warm, and it reads as a
  real moment rather than an ad".
- **What it looks like** — palette, light, texture in one sentence, concrete enough to
  picture.
- **The risk** — the one way it goes wrong ("can tip into nostalgia filter").

Recommend one. Then offer the sketch round.

**Sketch round (optional).** Render the same subject in all three directions at the
cheapest tier, so the user chooses by looking, not reading. State the cost before
anything runs: three to six draft renders on whatever they generate with — a few cents
on an API's draft tier, or that many generations from a chat plan's quota. On a yes:
hand the three short prompts to `mw-image-gen` if it is installed and the session can
run it, otherwise give the user three copyable sketch prompts for their own tool. On a
no, continue in words. Never run it unasked.

### 4. Shot options — never one default

Load [references/shots.md](references/shots.md) and
[references/composition.md](references/composition.md). Offer **two or three shot
options** that differ on at least two of: camera height, distance, subject placement,
pose register. Start from the direction's preferred recipes; at least one option should
be something the user would not have asked for. For each: the recipe name, one line of
what it shows, and what it says ("low-angle hero — the product towers; it says
confidence").

For a series, assign a recipe per image instead of one for all, so the set does not
repeat itself. Precise terms for the readback come from
[references/vocabulary.md](references/vocabulary.md).

### 5. Stage the scene — physics and emphasis

Load [references/staging.md](references/staging.md). For the chosen shot (each shot, in
a series), reason the scene out physically before anything is described, and fill a
**scene sheet**:

1. **Inventory and roles.** Every object in frame — floor and wall included — as hero
   (exactly one), support (one to three), context (odd numbers) or set. What is not
   listed, the model invents.
2. **Real sizes.** Each object's real dimensions, from the user, the docs or the size
   table; the scale relations between them.
3. **The camera in the room.** Height, distance to the hero, tilt, lens feel → the
   frame's width at the hero, each object's frame share (size ÷ frame width), the
   horizon height, and the depth of field in centimeters, so it is known which objects
   are sharp.
4. **Gravity and contact.** What each object rests on or is held by; contact shadows;
   liquids, cloth, hair, steam and wind behaving as they must.
5. **Light as physics.** Each source's direction, elevation, size and temperature →
   shadow direction and length, hard or soft edges, falloff, bounce color, catchlights,
   reflections.
6. **Materials.** How each surface answers the light: matte, satin, gloss, metal,
   glass, translucent.
7. **The instant.** One moment, one shutter: what is frozen, what blurs.
8. **Emphasis.** First, second and third read; the money detail on the hero; which
   attention pulls the hero wins (brightest, sharpest, contrast, saturation, gaze,
   lines); how every competitor — a face, a window, a second color — is held down.

Then run the physics check at the end of staging.md and fix the sheet, not the prose.
Stylized directions keep the laws staging.md lists for their family and bend the rest
on purpose; a surreal image breaks exactly one law and keeps all others strict.

Show the sheet in the readback; ask only about what the user alone knows (a product's
real dimensions, what the image must make the viewer notice first). Do not ask the user
to check the arithmetic.

### 6. Read back the locked look

One block the user can correct line by line. Every value concrete and measurable; no
"moody", no "well lit":

```
Direction     Analog film · warm consumer color
Feels         honest · warm · unhurried
Palette       warm creams, faded teal, rust; skin stays natural; no pure black
Light         one low sun from camera-left, ~15° up, 3500K; a hard-edged beam, the rest in
              soft warm bounce; about a third of the frame in shadow
Texture       fine visible grain; slight halation on highlights only; soft contrast
Shots         A) candid mid-action, waist-up, 35mm feel, subject in the left third
              B) wide environmental, figure a fifth of frame height, horizon on the low third
              C) tight detail on hands and object, overhead
Composition   rule-of-thirds; lead room in the direction of gaze; headline zone top-right
Staging (A)   baker dusting flour over a boule on an oak counter, 7am
              camera 1.35 m high, 1.1 m from the loaf, down ~10°; frame ≈ 1.13 m wide there;
                sharp depth ≈ 17 cm
              hero     boule Ø 22 cm on a floured board, left third · a fifth of frame width · sharp
              support  hands 20–25 cm above it, sharp · baker leaning 35 cm behind, soft, eyes down
              context  steel scraper, linen cloth, flour jar — left edge, jar half cropped
              light    one sun, camera-left, ~15° up, hard → shadows to camera-right, ~4× height;
                       wall out of the beam, ~2 stops darker; oak bounces warm under the hands
              physics  contact shadow + flour ring at the base; flour glows only inside the beam
              emphasis 1) sunlit scored crust (money detail) 2) hands 3) face, held down by focus
Layers        (layered or parallax assets only) what sits in the foreground, midground, background
Type          (promotional only) a warm grotesque, lowercase, small
Kept from docs  1600×900 hero; text sits over the right 40%; no competitor marks
Avoid         teal-and-orange grade, glossy skin, lens flare, centered smiling subject
Style block   "A 35mm color photograph with fine visible grain and soft contrast. Warm
              creams, faded teal and rust; natural skin; the darkest tones stay lifted,
              never pure black. One low sun from camera-left at about 3500K…"
```

**The style block** is the paragraph that gets pasted word for word into every prompt
of the series; that is what keeps a series consistent. Write it in full sentences with
every exclusion stated as the positive state that excludes it ("clean unmarked
corners", not "no watermark"). That form works on every model family. If the user
already said which model they will use, add that family's notes from the direction's
entry (a Midjourney parameter string, a GPT-Image photoreal clause) and stamp the block
with the family. It is not re-tuned for a family it was not written for.

**The staging block** is per image, never pasted across a series: in a set, each image
has its own, while the world scale, light rig and materials repeat. Keep its numbers —
they are what a failed render is checked against.

Confirm, adjust, or swap a line. One more batch at most.

### 7. Hand off, and offer to save

- **`mw-image-prompt` installed:** continue straight into it. The readback is its style,
  camera and staging source, tagged `[direction]`: subject, composition, lighting
  geometry and emphasis come from the staging block, and the brief does not re-ask what
  the direction settled.
- **Not installed:** the style block plus a shot and its staging, written as visible
  results (staging.md, "Writing physics into a prompt"), is already a usable prompt
  skeleton. Say so, and that `mw-image-prompt` can encode it per model.

Where files can be written, offer once: *"Save this look to `docs/art-direction.md` so
future sessions reuse it?"* It matters for a series, a brand or any ongoing project: a
new conversation starts empty, and the style block must survive word for word. On a
no, nothing is written. In chat-only apps, suggest the user keep the readback with
their project notes.

The saved file is the readback block, staging blocks included, plus the date and the model family the style block
was tuned on. If the file already exists, show what changes and ask before replacing it.

## Library at a glance

[references/catalog.md](references/catalog.md) indexes 46 directions in seven groups,
each with its variants, plus the shortlisting axes and the generic AI looks every
direction steers away from. Entries live in:

- [photo.md](references/directions/photo.md) — photography: cinematic, documentary,
  editorial, direct flash, lifestyle, product, low-key, B&W, analog film, architecture,
  food, landscape
- [graphic.md](references/directions/graphic.md) — vector, Swiss, minimalism, pop art,
  pixel art, print, type-led editorial, brutalist
- [surface.md](references/directions/surface.md) — glass morphism, aurora
- [dimensional.md](references/directions/dimensional.md) — clay, soft 3D, isometric,
  low-poly, miniature, paper craft
- [illustrated.md](references/directions/illustrated.md) — hand-drawn, watercolor,
  painterly, editorial ink, anime and manga, children's book, technical, surreal
- [mixed.md](references/directions/mixed.md) — collage, graffiti, maximalism
- [eras.md](references/directions/eras.md) — retro, Y2K, futuristic, cyberpunk,
  Victorian, bohemian, Art Deco

Every entry uses the same fields: feels, use for, not for, palette, light, medium and
texture, shots, composition, type, variants, engine notes, slop risks.

Beside the library: [shots.md](references/shots.md) (20 shot recipes),
[composition.md](references/composition.md) (grids, placement, layers),
[staging.md](references/staging.md) (real sizes, camera geometry, gravity, light
physics, materials, motion, emphasis, the physics check) and
[vocabulary.md](references/vocabulary.md).
