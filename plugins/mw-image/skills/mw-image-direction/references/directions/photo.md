# Directions — Photography

Thirteen photographic directions. Shot recipe names refer to [shots.md](../shots.md);
grid and placement terms to [composition.md](../composition.md). Camera and light maths
live in [optics-light.md](../optics-light.md).

Photography is where the default shot hurts most: a person at eye level, centered,
facing the lens, softly lit from the front. Every entry below names a light and a shot
that is *not* that, unless the direction needs it.

**For every photographic direction:** ask for a photograph explicitly ("a real
photograph", "photorealistic"), on GPT-Image especially. Name the light as a measurement
(where it comes from, what share of the frame sits in shadow, its color as a result
under a stated white balance) so the look survives a model switch. On Midjourney,
`--raw` for photographic work.

**Fields.** *Palette* hexes are approximate starting points: a brand's mandated colors
replace the nearest role, and the rest are tuned around them. *Staging depth* names the
row of the depth table in [staging.md](../staging.md) ("When to stage, and how deep");
every photographic direction is **full**. Engine traits marked "(observed, small
sample, 2026)" come from a handful of renders, not a test; recheck them on the current
model.

**Real products and real businesses.** A real product, label, screen or packaging is
placed from the user's photo by edit or composite, never redrawn; the set, light and
contact are staged around it, with the camera and light read off the supplied photo
(staging.md, "Placing a supplied product"). Images that present a real business's own
products, premises, staff or events *as real* come from real photos, and the direction
becomes their shot list and light plan; a generated image stays generic and
illustrative and makes no claim.

## Contents

- Cinematic film still
- Documentary / candid
- Editorial fashion
- Direct flash snapshot
- Phone candid (UGC)
- Lifestyle natural light
- Studio product
- Dark luxury / low-key
- Black and white
- Analog film
- Architectural & interior
- Food & still life
- Landscape & nature

---

## Cinematic film still

**Feels:** tense, story-led, expensive. **Use for:** heroes, key art, campaign images,
anything that should feel like a moment from a larger story. **Not for:** product
detail, instructional images, anything that must be read at a glance.

- **Palette:** one dominant hue family plus one contrast accent, chosen per scene (cold
  blue night with warm practicals; desaturated green day). Never the default
  teal-and-orange. Approx., cold night: steel blue `#2E4660` (dominant) · slate
  `#5E6C7A` (secondary) · sodium amber practicals `#E3A35C` (accent) · blue-black
  `#0D141F` (shadow).
- **Light:** motivated — every light has a source in the scene (window, lamp, screen,
  streetlight). Contrast ratio high; 40–60% of the frame in shadow.
- **Medium & texture:** fine grain, slight softness off the focal plane, wide aspect
  feel (2.39:1 framing even inside a 16:9 crop).
- **Shots:** over-the-shoulder, through-frame, wide environmental, profile.
- **Composition:** off-center on the thirds; deep space with foreground, midground,
  background; lead room in the direction of gaze.
- **Staging depth:** full — camera, contact, motivated light, materials, the instant,
  emphasis; every light needs its source in the inventory.
- **Type:** condensed sans or a classic serif in wide tracking, small and low.
- **Variants:**
  - *Night practicals* — wet street or dark interior lit only by lamps, signs and
    screens; pools of light, most of the frame dark.
  - *Naturalistic daylight* — overcast or window light, muted color, restrained
    contrast; quiet drama.
  - *Period drama* — candle or window light, period costume and set; warm, low key.
- **Engines:** Flux — film-stock and lens shorthand reads well. Nano Banana — describe
  the story beat, it composes for it; holds deep darks (observed, small sample, 2026).
  GPT-Image — warms and brightens night scenes (observed, small sample, 2026); state
  exposure and shadow share. Midjourney — strongest at this look; `--raw`, low `--s`
  (50–100) to keep the story in your words, `--ar 21:9` or `--ar 16:9`.
- **Slop risks:** teal-and-orange grade, lens flare, fog in every shot, a hero staring
  into the distance, wet streets everywhere.

## Documentary / candid

**Feels:** honest, unposed, present. **Use for:** the look and shot list of a real shoot
— about pages, impact stories, teams at work, behind the scenes — and generic,
illustrative scenes that claim nothing. A real business's own people, premises and
events come from real photos; this direction becomes the photographer's brief, never a
generated stand-in presented as them. **Not for:** luxury, fantasy, anything that must
look perfect.

- **Palette:** whatever the place has; natural, slightly muted; no grade that announces
  itself. Approx., a workshop: muted wall gray `#9A958C` (dominant) · worn olive
  `#6E6A4F` (secondary) · faded work-jacket blue `#4F6278` (accent) · soft charcoal
  `#2B2A28` (shadow).
- **Light:** available light only — windows, overhead fluorescents, overcast sky. Mixed
  color temperatures left uncorrected.
- **Medium & texture:** 35mm feel, moderate grain, slight motion blur on hands allowed,
  imperfect focus on the edges.
- **Shots:** candid mid-action, over-the-shoulder, through-frame, wide environmental.
  Never anyone looking into the lens unless the story is that look.
- **Composition:** imperfect on purpose: a foreground shoulder cutting in, a subject
  near the edge, a tilted horizon of a degree or two.
- **Staging depth:** full — the place as found, available light only, the instant
  mid-action; casting and styling matter most. For a real shoot the sheet is the shot
  list.
- **Type:** plain sans, small; captions rather than headlines.
- **Variants:**
  - *Street* — public places, strangers, light and shadow geometry, wider lens.
  - *Photojournalism* — an event, a decisive moment, the subject in their real setting.
  - *Behind-the-scenes* — work in progress, tools, mess, people concentrating.
- **Engines:** Flux and Nano Banana both hold the plain look; state "unposed" and "not
  looking at the camera". GPT-Image — say "candid documentary photograph, not a stock
  photo". Midjourney — `--raw`, `--s` low; high stylize makes it glossy.
- **Slop risks:** clean stock-photo diversity lineup, everyone smiling, spotless
  offices, perfect teeth, a laptop with a glowing screen.

## Editorial fashion

**Feels:** confident, styled, aspirational. **Use for:** portraits, team pages (as the
brief for a real shoot), apparel, covers. **Not for:** candid or documentary stories.

- **Palette:** a controlled set: one backdrop color, one wardrobe color, skin. Or
  color-blocked complements. Approx., color-blocked: terracotta backdrop `#C8664A`
  (dominant) · cobalt wardrobe `#2E4FA3` (secondary) · bone white `#EFE8DC` (accent) ·
  deep umber `#2A1D18` (shadow).
- **Light:** a large soft key (beauty dish or window) at 45°, loop or butterfly pattern;
  or a hard single source for graphic shadows. Background lit separately.
- **Medium & texture:** crisp, high resolution, skin with real texture.
- **Shots:** low-angle hero (full figure), environmental portrait, profile; posed but
  with a gesture — weight on one leg, hand at the collar, a turn of the head.
- **Composition:** strong negative space for cover lines; subject on a third or
  deliberately centered against a seamless backdrop.
- **Staging depth:** full — portrait distance (1.5–3 m), key side and key:fill, the
  pose in body mechanics, casting and wardrobe; the set is often only a backdrop.
- **Type:** high-contrast serif or a bold sans, large, overlapping the figure is
  allowed.
- **Variants:**
  - *Studio seamless* — one colored paper backdrop, one or two lights, no props.
  - *Location* — an architectural or natural setting chosen for its lines.
  - *Color-blocked set* — painted set pieces in two or three flat colors.
  - *Corporate headshot / team portrait* — one soft key at 45° with fill at about 2:1,
    a plain or softly blurred office backdrop in one brand-friendly tone, chest-up,
    a slight turn of the shoulders, a relaxed real expression; a team set keeps the
    same light, backdrop, crop and eye height for every person. For a real team this is
    the brief for the photographer; generated headshots are only for generic
    placeholders and never stand in for real staff.
- **Engines:** Nano Banana and GPT-Image Sunburst for a recurring person (identity holds
  better). Midjourney — beautiful but not character-consistent. Name the pose in body
  mechanics, not adjectives.
- **Slop risks:** the same model face, a hand on the hip, a stare into the lens, glossy
  poreless skin, a beige backdrop.

## Direct flash snapshot

**Feels:** raw, immediate, party. **Use for:** social, events, youth and nightlife
brands, fashion with attitude. **Not for:** calm, luxury, anything soft.

- **Palette:** saturated, whatever is there; flash makes colors pop against dark
  surroundings. Approx.: venue black `#121212` (dominant) · flash-lit skin highlight
  `#F4E6DA` (secondary) · cherry red `#D7263D` (accent) · electric blue `#1F5BFF`
  (accent).
- **Light:** a bare on-camera flash pointed straight at the subject: flat bright faces,
  a hard shadow outline on the wall right behind, the background falling to dark.
  Red-eye and specular hotspots allowed.
- **Medium & texture:** point-and-shoot feel; slight motion blur behind sharp flash
  freeze; date stamp optional.
- **Shots:** close and frontal, high-angle down, candid mid-action; subjects reacting,
  not posing.
- **Composition:** tight, cropped limbs, subjects touching the frame edge, horizon
  tilted.
- **Staging depth:** full — the flash on the lens axis, falloff within two meters, the
  hard outline shadow on the wall just behind, the frozen instant.
- **Type:** handwritten marker or a blunt sans, as if stuck on.
- **Variants:**
  - *Night party* — dark venue, multiple people, flash fall-off within two meters.
  - *Daylight fill-flash* — sun behind, flash filling faces; hyper-real edges.
  - *Point-and-shoot film* — compact camera on color negative: grain, soft corners.
- **Engines:** all families render the shadow outline if it is described ("a hard dark
  outline of the subject on the wall just behind them"). GPT-Image may soften it to
  studio light; restate "harsh on-camera flash". Midjourney — `--raw`.
- **Slop risks:** soft studio light mislabeled as flash, everyone too polished, neon
  added to the background.

## Phone candid (UGC)

**Feels:** unpolished, peer-made, native to the feed. **Use for:** creator-style social
ads, product-in-hand posts, review-style ad concepts, vertical video covers, community
posts. **Not for:** luxury, packshots, or anything presented as a real customer's photo,
review or testimonial — real testimonials use the customer's own photos, with
permission.

- **Palette:** whatever the room has, through a phone's processing: punchy auto-HDR,
  slightly over-sharpened, mixed white balance left uncorrected. Approx., a home at
  night: off-white wall `#E6E1D8` (dominant) · warm lamp cast `#D9A76A` (secondary) ·
  everyday denim blue `#4A5D7A` (accent) · lifted phone shadow `#3A3633` (shadow).
- **Light:** the phone's own on-camera flash (flat, hard, falling off within a meter or
  two) or a window to one side; whatever lamps are on. No studio fill, no rim light.
- **Medium & texture:** a phone sensor: computational sharpening, a little noise in the
  shadows, deep focus (most things sharp) unless portrait mode fakes the blur; slight
  wide-angle distortion — near things big, a face stretched toward the frame edge when
  the phone is close.
- **Shots:** a front-camera selfie at arm's length (40–60 cm, held a little above eye
  level), a mirror selfie, the hands holding the product (tight detail from the
  holder's point of view), high-angle down onto a table, candid mid-action as a friend
  would film it.
- **Composition:** vertical (9:16 or 4:5); imperfect framing — the subject a little
  off-center, a tilt of a few degrees, a cropped forehead or elbow. Keep text and the
  product out of the platform's UI zones (Meta 9:16: top 14%, bottom 35%, 6% each
  side; TikTok differs — check current guidance).
- **Staging depth:** full — a short, wide phone lens close to the subject, one light,
  how the hand grips the product, the instant; casting matters most, since the default
  face is the young generic creator.
- **Type:** captions and stickers added natively in the app or editor, never rendered
  into the image.
- **Variants:**
  - *Front-camera selfie* — arm's length, talking-to-camera expression, room behind,
    window or lamp light.
  - *POV product in hand* — the holder's hand and the product filling the lower half,
    the room soft behind; the real product placed from the user's photo.
  - *Night flash unboxing* — phone flash on a table or bed, packaging open, hard
    shadows, warm lamps in the background.
- **Engines:** the real product is placed from the user's photo, never redrawn. Device
  and camera names ("shot on a phone's front camera") work as shorthand on every
  family; add the attributes too (wide-angle, flash, deep focus, auto-HDR). GPT-Image
  polishes toward a pro photo — restate "an unretouched phone snapshot, slightly
  imperfect framing". Midjourney — `--raw`, low `--s`. Photoreal people in ads may need
  the platform's AI-disclosure label.
- **Slop risks:** studio-perfect skin, a perfectly level centered frame, a ring light
  in both eyes, the same young creator face, a phone visible in a non-mirror selfie,
  extra fingers around the product.

## Lifestyle natural light

**Feels:** warm, easy, relatable. **Use for:** product in use, wellness, home, food and
family brands. **Not for:** technical, serious or dramatic subjects.

- **Palette:** warm neutrals — linen, oak, cream — plus one brand-friendly accent.
  Approx.: linen `#E9E1D3` (dominant) · oak `#B88A5A` (secondary) · cream `#F6F0E4`
  (secondary) · sage `#8DA38A` (accent; the brand color goes here) · warm umber
  `#4A3A2C` (shadow).
- **Light:** one large window or low sun, soft, from the side or behind; shadows open.
  Daylight through a window is about 5500–6500K, so under a daylight balance it reads
  neutral; the warmth comes from warm bounce surfaces (oak, linen) and the grade.
  Golden-hour sun outdoors reads amber-gold under the same balance.
- **Medium & texture:** shallow depth of field, gentle grain, true skin.
- **Shots:** candid mid-action, over-the-shoulder, tight detail (hands with the
  product), high-angle down at a table.
- **Composition:** subject off-center, lived-in clutter softly out of focus, room for
  copy on the window side.
- **Staging depth:** full — the window's side and size, the hand's grip and contact,
  how soft the background is, the instant; clutter is context, kept few and soft.
- **Type:** soft humanist sans or a friendly serif.
- **Variants:**
  - *Morning window* — sheer curtains, bed or kitchen, cool-warm mix.
  - *Golden hour outdoors* — low sun behind, flare kept off the face, warm rim.
  - *Kitchen and home* — counters, hands, steam, ingredients.
- **Engines:** a real product in use is placed from the user's photo, never redrawn.
  Nano Banana and Flux handle this well. GPT-Image — state the window position and that
  shadows are soft but present, or it goes flat and gold. Midjourney — `--raw` or it
  turns into an ad.
- **Slop risks:** a beige everything room, a laughing woman with salad, flawless white
  sheets, glowing backlight on every hair.

## Studio product

**Feels:** clear, clean, commercial. **Use for:** e-commerce, packshots, launch hero
images, catalog. **Not for:** storytelling or lifestyle context.

- **Palette:** the product's own colors carry; background white, light gray or one
  brand color. Approx.: white sweep `#F7F7F5` (dominant) · light gray `#E3E4E6`
  (secondary) · the product's own color, sampled from its photo (accent) · contact
  shadow gray `#9C9EA2` (shadow).
- **Light:** large softboxes left and right, a top light; controlled reflections (two
  long strip highlights on glossy surfaces); a soft contact shadow under the product.
- **Medium & texture:** tack-sharp, true color, no grain.
- **Shots:** three-quarter product (camera 15–30° above), flat frontal, overhead
  flat-lay, tight detail of material.
- **Composition:** product fills 50–70% of the frame; centered is fine here; a
  consistent margin across a series.
- **Staging depth:** full — the product's real size, the camera and light read off the
  supplied photo, the contact shadow, the reflections the material shows; no props
  unless the variant asks.
- **Type:** neutral sans, aligned to a grid; prices and specs.
- **Variants:**
  - *High-key white* — pure white sweep, near-shadowless, for marketplaces.
  - *Color sweep* — one saturated backdrop matched or complementary to the product.
  - *Styled tabletop* — a surface (stone, wood, terrazzo), one or two props, a hard
    sun shadow.
  - *CGI product render* — a 3D-rendered packshot: exact geometry, studio reflections
    shaped by named softboxes, materials stated (anodized aluminum, frosted glass, soft
    matte plastic), a contact shadow; for invented products, concepts, cutaways and
    angles a shoot can't reach. A real product is rendered from its CAD model or placed
    from its photo, never redrawn from a description.
- **Engines:** never let a model redraw a real product — place the supplied product
  image and ask for the setting around it (GPT-Image edit, Nano Banana edit). Flux pro
  for invented products and CGI-style renders. Recraft or Ideogram if labels and text
  must be crisp.
- **Slop risks:** water splashes, floating ingredients, glossy reflections on a matte
  product, a podium with a glowing ring.

## Dark luxury / low-key

**Feels:** exclusive, sculpted, quiet. **Use for:** premium products, fragrance,
watches, spirits, executive portraits. **Not for:** friendly, mass-market or kids.

- **Palette:** near-black, one metal (gold, steel, copper) or one deep color; blacks
  stay true black. Approx.: near-black field `#0B0B0D` (dominant, shadow) · charcoal
  `#1E1E21` (secondary) · antique gold `#B08D57` (accent) · or oxblood `#4A1420`
  (accent).
- **Light:** one hard or medium source raking from the side or behind; rim light
  separating the subject's edge; 70–85% of the frame in shadow.
- **Medium & texture:** rich blacks, crisp specular highlights, visible material
  (brushed metal, leather grain, glass).
- **Shots:** low-angle hero, profile, tight detail, three-quarter product.
- **Composition:** subject small to medium in a large dark field; one highlight edge
  leads the eye.
- **Staging depth:** full — one source's side and height, the rim, 70–85% shadow share,
  the material's highlight shape; the hero may be the darkest shape against a lit
  field.
- **Type:** thin high-contrast serif or spaced capitals, small, in metal tones.
- **Variants:**
  - *Product low-key* — the object on black glass or stone, one strip light.
  - *Chiaroscuro portrait* — Rembrandt or split light, a dark background, face
    emerging from shadow.
- **Engines:** a real product is placed from the user's photo, never redrawn. Nano
  Banana holds deep blacks best; flux-class lifts near-black toward gray (both observed,
  small sample, 2026), so check darks. GPT-Image — state the shadow share explicitly.
  Midjourney — `--raw`, low `--s`; it adds smoke unless told the air is clear.
- **Slop risks:** smoke and gold dust, a reflection pool under everything, lens flare,
  crushed blacks with no detail on the subject.

## Black and white

**Feels:** timeless, serious, graphic. **Use for:** portraits, documentary,
editorial, heritage. **Not for:** food, color-coded brands, products sold on color.

- **Palette:** monochrome; state the tonal range (deep blacks to clean whites, or a
  gray, low-contrast range). Approx. values, high contrast: mid gray `#7F7F7F`
  (dominant) · paper white `#F2F2F0` (secondary) · light gray `#C4C4C4` (secondary) ·
  deep black `#0E0E0E` (shadow).
- **Light:** shape matters more than color: side or top light, strong shadow shapes.
- **Medium & texture:** grain from fine to heavy; real silver-gelatin tonality, not a
  desaturated color photo.
- **Shots:** environmental portrait, profile, wide environmental, tight detail.
- **Composition:** strong geometry — lines, shadows as shapes; negative space reads
  well.
- **Staging depth:** full — light direction and shadow shapes carry the image; plan
  values, not hues (what is darkest, what is lightest).
- **Type:** classic serif or a grotesque in black or white only.
- **Variants:**
  - *High-contrast grain* — hard light, heavy grain, blacks and whites with few grays.
  - *Soft fine-art* — diffused light, long gray scale, quiet.
  - *Film noir* — hard low-angle light, venetian-blind shadows, smoke allowed, night.
- **Engines:** all families do it; say "a black-and-white photograph" up front, not as a
  late filter. Midjourney — `--raw`.
- **Slop risks:** a color photo with saturation pulled out (flat grays), fake vignette,
  blown-out skies.

## Analog film

**Feels:** nostalgic, real, imperfect. **Use for:** brand stories, social, lifestyle,
music. **Not for:** technical precision, products sold on exact color.

- **Palette:** depends on the stock: warm creams and soft greens (consumer color
  negative), saturated deep blues and reds (slide film), pale washed color (instant).
  Blacks lifted. Approx., warm consumer color: cream `#F1E4C8` (dominant) · soft green
  `#8FA582` (secondary) · faded teal `#5E8C8A` (accent) · rust `#B5583A` (accent) ·
  lifted black `#2E2A27` (shadow).
- **Light:** natural, often low sun or mixed interior; highlights roll off gently.
- **Medium & texture:** visible grain, halation glow around bright highlights only, soft
  corners, occasional light leak or frame edge when wanted.
- **Shots:** candid mid-action, environmental portrait, wide environmental, tight
  detail.
- **Composition:** relaxed, slightly imperfect; subject on a third.
- **Staging depth:** full — the low sun or mixed interior light, the instant, soft
  focus fall-off; highlights that roll off rather than clip.
- **Type:** typewriter mono, a warm grotesque, or handwritten.
- **Variants:**
  - *Warm consumer color* — soft contrast, warm skin, cream highlights.
  - *Cool slide film* — punchy saturation, deep shadows, cool cast.
  - *Instant film* — white border, washed pale colors, soft focus; square on some
    formats, wider or smaller on others — name the frame.
- **Engines:** film-stock and camera names work as style shorthand on every family
  (Google's guide recommends them on Nano Banana); add the attributes too — grain
  size, lifted blacks, color cast — so the look survives a model switch. `halation`
  brings bloom everywhere on every family — confine it: "a faint glow around the
  brightest highlights only".
- **Slop risks:** heavy fake light leaks, scratches and dust overlay, everything orange,
  a vintage filter on a modern scene.

## Architectural & interior

**Feels:** ordered, spacious, calm. **Use for:** real estate, hospitality, workspace,
architecture and design brands — a real property or venue as the shot list for its own
photographs; generated rooms only for concepts and mood, never shown as the place.
**Not for:** people-led stories.

- **Palette:** the materials: concrete, timber, plaster, glass; one accent from
  furnishing. Approx.: plaster `#E7E3DC` (dominant) · concrete `#A7A39C` (secondary) ·
  timber `#A9774B` (secondary) · ochre furnishing `#C9973E` (accent) · slate shadow
  `#3F4245` (shadow).
- **Light:** daylight from windows balanced with interior lamps; blue hour exteriors
  with warm windows.
- **Medium & texture:** vertical lines kept vertical (tilt-shift correction), crisp
  edges, true materials.
- **Shots:** symmetric center-punch, wide environmental, flat frontal elevation,
  through-frame (doorways), aerial.
- **Composition:** one-point perspective or two-point with clean verticals; horizon at
  mid-height for interiors.
- **Staging depth:** full — a level camera (verticals stay vertical), window and lamp
  balance, real room sizes; no camera tilt, shift instead.
- **Type:** light grotesque or a geometric sans, small, generous spacing.
- **Variants:**
  - *Clean architectural* — empty, pristine, graphic shadows.
  - *Lived-in interior* — a book open, a cup, a throw: signs of life, no people.
  - *Aerial* — top-down or high oblique, buildings as patterns.
- **Engines:** state "vertical lines perfectly vertical". Nano Banana plans the
  perspective well; Flux pro for photoreal finals. Midjourney — `--raw`.
- **Slop risks:** impossible geometry, fireplace plus pool plus ocean view, every
  room beige, over-wide distortion.

## Food & still life

**Feels:** appetite, texture, craft. **Use for:** menus, recipes, products as objects,
packaging. A real restaurant's menu shows its own dishes, photographed; this direction
is their shot list. **Not for:** abstract concepts.

- **Palette:** the food's colors against a neutral or complementary surface; crumbs and
  drips allowed. Approx., dark and moody: stone gray `#8E8A85` (dominant) · linen
  `#E6DED0` (secondary) · crust brown `#9A5B2E` (secondary) · herb green `#5E7F3A`
  (accent) · deep shadow `#24201C` (shadow).
- **Light:** one window or softbox from the back-side (backlight shows steam and
  texture), a small fill card in front.
- **Medium & texture:** shallow focus on the hero bite, real surfaces (linen, stone,
  ceramic).
- **Shots:** overhead flat-lay, high-angle down (45°), tight detail, three-quarter
  product.
- **Composition:** odd numbers of elements, a hero item on a third, edges cropping the
  arrangement so it continues past the frame.
- **Staging depth:** full — real plate and portion sizes, backlight side, steam only on
  hot food, the hero bite sharpest; overhead uses the camera's height as distance.
- **Type:** warm serif or handwritten.
- **Variants:**
  - *Dark and moody* — dark surface, low-key side light, rich shadows.
  - *Bright and airy* — white marble, high-key, soft shadows.
  - *Overhead flat-lay* — everything arranged on one plane, shot straight down.
  - *Macro detail* — one texture filling the frame: crumb, grain, fiber, droplet.
- **Engines:** packaged products and a real menu's dishes are placed from the user's
  photos, never redrawn. Nano Banana and Flux handle food well. GPT-Image for menus with
  text. Midjourney — strong but over-garnishes; keep the description specific.
- **Slop risks:** garnish everywhere, steam on cold food, perfect symmetry, a sprinkle
  of herbs mid-air.

## Landscape & nature

**Feels:** grand, calm, elemental. **Use for:** backgrounds, travel, sustainability,
outdoor brands. **Not for:** product detail or people-led stories.

- **Palette:** the season and hour: blue-hour cool, golden-hour warm, overcast muted
  greens. Approx., golden hour: muted grass `#6F7F4E` (dominant) · warm sky `#EBC189`
  (secondary) · distant haze blue `#9DB0C2` (secondary) · sunlit ochre `#D49A4A`
  (accent) · rock shadow `#3B3A36` (shadow).
- **Light:** time of day named with the sun's height and direction.
- **Medium & texture:** deep focus, atmospheric haze for depth, true foliage.
- **Shots:** wide environmental with a scale figure, aerial, ground-level, tight detail.
- **Composition:** horizon on the upper or lower third, never the middle unless
  mirrored; a foreground anchor (rock, path, grass) for depth.
- **Staging depth:** full — sun height and direction, haze with distance, a scale
  figure at its real size, focus at the hyperfocal distance for deep sharpness.
- **Type:** light sans or a classic serif in the sky or quiet ground.
- **Variants:**
  - *Grand vista* — mountains, coast or desert, tiny figure for scale.
  - *Intimate detail* — moss, bark, a single leaf, close and quiet.
  - *Aerial* — top-down patterns: fields, rivers, roads.
- **Engines:** Flux pro for photoreal production backgrounds; Nano Banana for very dark
  night skies (observed, small sample, 2026). Midjourney — strong but adds drama; `--s`
  low.
- **Slop risks:** a lighthouse in a storm, aurora plus milky way plus sunset in one
  frame, oversaturated green, a lone figure on a cliff with arms raised.
