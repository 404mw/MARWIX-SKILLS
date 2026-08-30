# mw-image-prompt — Promotional imagery (covers, concept art, carousels, characters)

Deep technique for images that sell, announce, or stop a feed scroll. Generic craft
only; the brand kit (style blocks, palette, accent color, recurring props and
characters, metaphor libraries, voice rules) comes from the host project's brand docs
at runtime. The shared skeleton, anchor-block, edit, and cost rules live in SKILL.md.

---

## Contents

- The job of the image
- The scroll-stop doctrine
- Aspect ratios — generate for the placement
- Recipes by role
- The recurring-character pipeline
- The library and the scoreboard
- Pre-post verification — the image audit
- Failure modes
- The numbers

## The job of the image

An image attached to a post has exactly one job: **buy ~1.5 seconds** — long enough
for the viewer to decide the post is worth reading. It doesn't teach or tell the joke;
it stops the thumb and opens a curiosity gap the post then pays off.

The honesty line: **the image may exaggerate visually, but it must never promise
content the post doesn't deliver.** Curiosity promises something specific and delivers
it; a dramatic image on an unrelated post is clickbait — a one-time engagement spike
bought with a permanent trust discount.

Three facts to internalize:

1. **One subject, one message, one second to understand.** Cluttered images can't be
   parsed at scroll speed; every scroll-stopper has a single focal point.
2. **Prompt like a creative director** (SKILL.md): full sentences, one scene, intent
   included.
3. **The feed itself is a brand asset.** One great image gets a click; thirty visually
   consistent images get recognition. Style consistency compounds.

## The scroll-stop doctrine

What stops a thumb, in order of power:

1. **A face with an emotion.** Expressive faces lift click-through measurably. Gaze
   direction is a steering wheel: a character *looking at* the headline drags the
   viewer's eyes there too.
2. **Pattern interrupt against the median feed.** Whatever the brand's stage is, its
   power is contrast with what surrounds it. Check both light and dark feed
   backgrounds: a dark backdrop that interrupts a light feed melts into a dark one,
   where the lit subject, rim light, and accent must carry the stop alone.
3. **In-image text, four words max.** Minimal-text images out-click text-heavy ones.
   The headline is a trigger, not a summary; paragraphs belong in the post.

Two further stops — the curiosity gap and absurd juxtaposition — decide *what the
image is of* rather than how it is staged, and live in [concept.md](concept.md).

**The zoom-out test (every image):** shrink to thumbnail size — the size it's actually
seen at, in-feed, on a phone. If the subject and the pull aren't clear in under a
second, it fails, no matter how good it looks full-screen.

## Aspect ratios — generate for the placement

| Placement | Ratio | Note |
|---|---|---|
| X in-feed image | 16:9 or 1:1 | 16:9 fills the timeline card |
| LinkedIn post image | 1.91:1 or 1:1 | 1:1 takes more vertical feed space — usually wins |
| IG feed / carousel | 4:5 | Maximum feed real estate; a good reusable master format |
| Reel / TikTok cover | 9:16 | Keep subject in the center 4:5 — profile grid crops it |

Generate the master at the ratio the brand docs name (or 4:5 if they don't), crop
outward for others. State the ratio inside the prompt *and* in the tool's settings.

## Recipes by role

### Covers / hooks

Formula: **[brand style block] + one character or prop + one absurd-but-specific
situation + curiosity gap + ≤4 words of exact quoted text + the brand accent used as
a signature (sparingly, per the brand docs).** Reserve named negative space for the
headline and steer the character's gaze at it.

### Concept illustrations

The job: make an abstract mechanism *graspable in one glance* via physical metaphor —
these earn saves and shares. Use the project's standing metaphor library if it has one
(consistent metaphors become visual vocabulary; don't reinvent per post). The litmus:
if the metaphor can't be described as a physical scene with real objects, it isn't a
metaphor yet — "glowing abstract data streams" is generic AI slop, interchangeable
with every other AI image on the feed.

### Carousels / infographics

Consistency across slides is the whole problem: ten slides that drift read as amateur.

1. **Design the master frame first** (highest text-accuracy engine and tier): slide 1
   with the full layout system — title placement, icon style, margins, accent usage.
2. **Produce siblings by editing the master, never from scratch.** Edit mode with a
   full preserve list ("keep background, palette, margins, typography style identical;
   change only the icon and headline"). "Same style as before" across separate
   generations is a coin flip per slide.
3. **Body text lives in the editor (Figma/Canva), not the model.** Generate slides
   with headline + illustration + *reserved empty zones*; fonts stay pixel-identical
   and a text fix costs nothing. Model-rendered text is for the cover headline and
   short labels only.
4. **Data infographics use search-grounded generation** where available to get real
   numbers into the draft — then verify every figure against the source before
   posting. A wrong number in a shared infographic is a viral correction waiting.
5. **Slide 1 is a cover, not a slide** (cover rules above; information starts on
   slide 2). The last slide reserves a zone for the CTA in editor text.

### Logos in-image

Every post about a technology carries that technology's logo. In order of reliability:

1. **Composite in the editor** (default for flat/carousel work): generate with a
   reserved blank zone, place the official SVG/PNG in the editor. Pixel-perfect.
2. **Reference-image placement** (default for rendered scenes): upload the official
   logo file and instruct placement without redrawing: "apply the logo from Image 2
   as-is, correct proportions; do not redraw, restyle, or alter it." Integrates the
   logo into the scene's lighting, which compositing can't.
3. **Model-drawn from memory (avoid).** Engines redraw known logos with subtle
   letterform errors — a competence tell. If unavoidable: highest quality tier, then
   zoom to 200% and compare against the official file before posting.

Riding rules: logos accurate and respectful — commentary is fine, never distort a mark
into mockery; never compose an implied partnership or endorsement; keep an assets
folder of official files pulled from each vendor's brand page.

## The recurring-character pipeline

A recognizable face compounds into recognition. **The governing rule: identity is
frozen, presentation is free.** Likeness (face shape, hair, build) stays constant;
expression, pose, wardrobe, role, and scenario are per-post variables.

1. **Build the identity anchor once, carefully.** Highest quality tier and input
   fidelity, from the reference portrait: a character sheet (front, three-quarter,
   profile, plus a few expression close-ups) in the brand's documented style. This
   step is also where poor raw references get fixed: selfie camera geometry, color
   casts, and uneven light are corrected here, once, instead of fought in every
   downstream prompt (builder mechanics and reference roles:
   [identity.md](identity.md)). Iterate
   until the likeness is right — this is the one image worth ten re-rolls — then
   **freeze it**. The sheet's expressions are calibration samples, not a menu. Every
   casual regeneration is a new person.
2. **Direct the character like an actor, per post.** Engines with named references:
   upload the anchor, name the character once, describe the scene. Engines with
   indexed references: anchor as Image 1 plus restated *identity* constraints every
   single time ("same face, hairstyle, proportions, palette as Image 1; do not
   redesign") — wardrobe and pose deliberately left out of the preserve list. The
   anchor is an identity reference only: state the scene's camera (height, angle,
   distance), framing, pose, and lighting in every prompt. "Match Image 1's framing"
   copies the anchor's geometry — including any selfie-angle or lens flaws — into
   the new post.
3. **Expression is cast per post; the range is unlimited.** The only rule is
   register-matching: the emotion shown must be the emotion of the post — a horrified
   face on a neutral tutorial is visual clickbait.
4. **Wardrobe and role are content variables.** One costume per image, matched to the
   topic, never random.
5. **Drift control.** Variety makes identity drift easy to miss: periodically line up
   recent generations against the frozen anchor and compare only the faces. Never
   chain edits more than ~3 deep off the anchor; when the likeness wanders, re-base
   from the anchor sheet, not the most recent image.

## The library and the scoreboard

Prompts and approved images are **assets, not exhaust**:

- **The prompt ledger.** Every prompt that produced a *shipped* image gets filed where
  the brand docs say (a prompt-library file), with the variable parts turned into
  slots (`{SUBJECT}`, `{ACTION}`, `{COSTUME}`, `{HEADLINE}`), the engine + settings,
  the path to the approved output, and one line on why it worked. New images start
  from the nearest template, never from blank. Prune quarterly.
- **Ship images beside their prompts** so any image can be re-edited months later.
- **The scoreboard.** Tag shipped images by genre and record what the platforms give
  back (saves, shares, profile taps, CTR). The kit evolves on that data — quarterly at
  most, never per-post, never on boredom: style-hopping reads as no-brand.

## Pre-post verification — the image audit

Run every final image through this before it ships; audit fresh, at 100% zoom, then
at thumbnail size:

1. **Text, letter by letter.** One typo in an image is unfixable after screenshot.
2. **Hands, limbs, duplicates.** Count fingers and arms; scan edges for half-formed
   objects and phantom background text.
3. **Logo fidelity** at 200% zoom against the official file.
4. **The zoom-out test:** thumbnail-size, phone-distance — subject readable, pull
   felt, in under a second?
5. **The slop check:** would this image look at home in every other AI account's
   feed? Glowy gradients, generic palettes, over-detailed everything. If it doesn't
   look like *the brand kit*, it doesn't post.
6. **The honesty check:** does the post fully pay off what the image promises?
7. **Crop safety:** subject and text inside the platform's safe zones.
8. **The accent:** the brand's signature accent present, at the frequency the brand
   docs prescribe (typically once or twice — everywhere is noise, once is a signature).
9. **The dark-mode check:** thumbnail against both a light and a dark feed. If the
   image vanishes on one, raise the subject's contrast, not the background's.
10. **Alt text written.** Describe subject, action, and any rendered text verbatim;
    accessibility first, personality second.

## Failure modes

1. **House-style drift (slop).** Without the brand's standing style block, engines
   regress to their generic look. The style block is the guardrail; every prompt
   carries it.
2. **Keyword-soup prompting.** Comma tags and "8k, trending" actively degrade
   reasoning-model engines.
3. **Re-rolling instead of editing.** Fixing one detail by regenerating re-rolls
   everything that was right.
4. **Text overload.** More than ~4 words on a cover measurably drops click-through.
5. **Unverified model-drawn logos and data.** The two places a generated image makes
   the brand wrong in public; both have mandatory verification steps above.
6. **Character drift.** Chained edits mutate the face one generation at a time;
   re-base from the frozen anchor.
7. **Visual clickbait.** Drama the post doesn't contain — a bad trade in pixels as in
   headlines.
8. **Style-hopping.** A new aesthetic every week reads as no-brand; evolve the kit
   quarterly on scoreboard data.

## The numbers

~1.5 seconds to stop the thumb · 1 focal subject · ≤4 words in-image · accent used
sparingly per the brand docs · ≤3 chained edits off the anchor · stop-loss at 5
failed edits.

---

### Sources consulted

- [Kontent.ai — Psychology behind scroll-stopping content](https://kontent.ai/blog/psychology-behind-scroll-stopping-content/)
- [Graphaize — Psychology of thumbnails](https://graphaize.com/psychology-of-thumbnails-how-to-stop-the-scroll-and-get-the-click/)
- [Alici — Thumbnail best practices 2026](https://alici.ai/blog/how-to-make-youtube-thumbnails-best-practices-2026)
