# mw-image-direction — Vocabulary

Precise words for camera, light, pose and expression. Use them in the readback so the
look can be prompted without guessing. Where a term is jargon, the prompt should also
state its result in plain words: models know "Rembrandt lighting" as a mood more
reliably than as a geometry.

## Contents

- Shot sizes
- Camera height and angle
- Lens feel and focus
- Light quality
- Contrast and value
- Portrait lighting patterns
- Light setups and times of day
- Color temperature
- Pose and body
- Expression
- Gaze
- Hands
- Motion

## Shot sizes

| Term | Frame holds |
|---|---|
| Extreme close-up (ECU) | a detail: eyes, a ring, a texture |
| Close-up (CU) | face, chin to forehead |
| Medium close-up (MCU) | head and shoulders, to mid-chest |
| Medium shot (MS) | waist up |
| Cowboy / medium-full | mid-thigh up |
| Full shot (FS) | whole figure, head to feet, little space |
| Wide / long shot (WS) | figure with substantial surroundings |
| Extreme wide (EWS) | landscape; figure small or absent |

## Camera height and angle

- **Heights:** ground level · knee · hip · chest/shoulder · eye level · above head ·
  overhead · aerial.
- **Angles:** level · low angle (looking up) · high angle (looking down) · bird's-eye
  (straight down) · worm's-eye (straight up) · Dutch (rolled).
- **Orientation to subject:** frontal · three-quarter (about 45°) · profile (90°) ·
  three-quarter back · from behind.

## Lens feel and focus

| Feel | Effect |
|---|---|
| Ultra-wide (14–20mm) | exaggerated depth, stretched edges; dramatic interiors, ground-level |
| Wide (24–35mm) | context and closeness; documentary, environmental |
| Normal (40–50mm) | natural perspective, honest |
| Short tele (85–105mm) | flattering faces, separated background |
| Telephoto (135mm+) | compressed space, stacked background, voyeur distance |
| Macro | life-size detail, razor-thin focus |
| Fisheye | curved lines, playful distortion |
| Tilt-shift | a thin band of focus; miniature effect, or corrected verticals in architecture |
| Anamorphic | wide aspect, oval bokeh, horizontal streak flares (state if unwanted) |

- **Depth of field:** how deep the sharp zone is: deep (everything sharp) · shallow
  (subject sharp, the rest soft) · a named focus plane ("focus on the near eye").
- **Background blur:** how soft a given plane renders, which is a different thing. At
  the same framing it grows with a longer lens, a wider aperture and, most of all, a
  background farther behind the subject. Write it as a result: "the shelf behind clearly soft, still
  recognizable". Numbers: [optics-light.md](optics-light.md#depth-of-field-and-background-blur).
- **Faces and distance:** a camera closer than about 1–1.5 m enlarges the nose on any
  lens; portraits sit at 1.5–3 m. The distance flatters, not the lens name.
- Lens numbers are cues for the look, not exact optics; state the resulting framing too.

## Light quality

- **Hard:** a small or distant source; crisp shadow edges (sun, bare flash, spotlight).
- **Soft:** a large or diffused source; gradual shadow edges (overcast, window,
  softbox).
- **Direction:** front · side (90°) · 45° · back (rim, silhouette) · top · under. A
  low light from the side grazes the surface and shows texture; that is side light, not
  rim.
- **Key / fill / rim:** main light, the light that opens shadows, and a light from
  behind that outlines the edge. Rim always comes from behind the subject. Say how many
  lights exist; unstated lights get added.
- **Motivated / practical:** light that comes from a visible source in the scene (lamp,
  window, screen).
- **High-key / low-key:** mostly bright with few shadows / mostly dark with selected
  highlights.

## Contrast and value

- **Key:fill ratio**, in stops between the lit side and the shadow side:

  | Key:fill | Stops | Reads as |
  |---|---|---|
  | 2:1 | 1 | open, gentle |
  | 4:1 | 2 | sculpted |
  | 8:1 | 3 | dramatic, low-key |

  In a prompt, write the result: "shadow side about two stops darker, detail visible".
- **Negative fill:** a dark card or wall on the shadow side that takes bounce away and
  deepens the shadow without touching the key.
- **Shadow share:** how much of the frame is in shadow, and whether the shadows hold
  detail.
- **Value grouping:** lights, mids and darks gathered into a few big shapes (a
  three-value pattern) instead of scattered spots. The hero sits on the strongest value
  step.
- **Squint test:** squint or blur until detail is gone; what still stands out is what
  the viewer sees first. Planning: [composition.md](composition.md#value-plan).

## Portrait lighting patterns

| Pattern | Key light position | Result |
|---|---|---|
| Butterfly | in front, above the face | a small shadow under the nose; symmetrical; glamour, beauty |
| Loop | 30–45° to the side, a little above | a small shadow loop from the nose toward the cheek; the everyday flattering default |
| Rembrandt | about 45° to the side and higher | a triangle of light on the far cheek under the eye; drama |
| Split | 90° to the side | half the face lit, half dark; mystery, tension |
| Broad | lights the side of the face toward the camera | wider face, open |
| Short | lights the side of the face away from the camera | slimmer face, more shadow, more mood |
| Rim / kicker | behind, to the side | a bright outline separating subject from background |
| Silhouette | behind the subject, subject unlit | a dark shape against a bright background |

## Light setups and times of day

- **Golden hour:** the sun from about 4° below to 6° above the horizon; deep gold, very
  long shadows, glowing edges; around sunrise and sunset.
- **Low morning or evening sun:** the sun 10–20° up; warm gold, not orange; shadows
  about three to six times the object's height.
- **Blue hour:** after sunset, cool even sky, artificial lights warm against it.
- **Overcast:** soft, shadowless, muted color; honest and calm.
- **Midday hard sun:** short dark shadows, high contrast; graphic.
- **Window light:** soft directional; falloff across the room. Daylight through a
  window is neutral to faintly cool; the warmth in a window-lit room comes from bounce
  off warm surfaces and from the grade.
- **Direct flash:** flat bright subject, hard shadow outline behind, dark background.
- **Ring light:** even frontal light, circular catchlights.
- **Colored gels:** a colored light per side (e.g. a warm key and a cool rim).
- **Practicals only:** only the scene's own lamps and screens; dark between pools.

## Color temperature

A Kelvin number alone is ambiguous: as a light it names a color, as a camera setting a
higher number warms the picture. Write color as the result under a stated white balance
("balanced for daylight, the low sun reads warm gold"), never a bare Kelvin number in a
style block.

| Source | Kelvin | Under daylight balance it reads |
|---|---|---|
| Candle, firelight | ~1900K | deep orange |
| Household tungsten | ~2700–3000K | amber, cozy |
| Golden-hour sun (−4° to +6°) | ~2000–3500K | deep gold to orange |
| Low sun (10–20°) | ~4000–4500K | warm gold |
| Midday sun, flash | ~5000–5600K | neutral |
| Window daylight | 5500–6500K | neutral to faintly cool |
| Overcast | ~6500–7500K | cool |
| Open shade, blue hour | 7500K+ | blue |

Mixed temperatures (a warm lamp in a blue room) create depth; say which source is
which, and which one the image is balanced for. Details:
[optics-light.md](optics-light.md#color-and-white-balance).

## Pose and body

- **Weight:** on one leg (contrapposto, relaxed) · even on both (stable, formal) ·
  leaning on something · sitting forward (engaged) · sitting back (at ease).
- **Line:** an S-curve through the body (graceful) · a straight vertical (strong) ·
  diagonals (dynamic).
- **Turn:** body and head turned differently (body three-quarter, face toward camera)
  adds life; everything square to camera looks like a passport photo.
- **Shoulders:** dropped and relaxed vs. raised; one shoulder closer to the lens.
- **Interaction:** holding, using, adjusting something — a prop gives hands a job.
- **Register:** candid (caught) · posed-natural (directed, but believable) · editorial
  (styled, angular, intentional) · action (mid-movement) · at rest.

State pose as body mechanics ("weight on the left leg, right hand in the jacket pocket,
head turned 20° camera-right"), not adjectives ("confident pose").

## Expression

Beyond "smiling": a closed-mouth half smile · laughing at something off frame ·
concentrating, brow slightly lowered · calm neutral with soft eyes · surprised, brows
up · skeptical, one brow raised · tired, eyes heavy · determined, jaw set · wistful,
gaze down and away. Name one, with what the mouth and eyes do.

## Gaze

- **Into the lens:** direct address; confrontation or connection.
- **Off frame:** toward something the viewer can't see; story, curiosity.
- **At something in frame:** the viewer follows the look to the product or the headline.
- **Down:** introspection, focus on a task.
- **Eyes closed:** calm, sensory moment.

## Hands

Hands are where generated people fail most. Give them a job (holding a cup, on a
railing, in a pocket, mid-gesture), keep the count of visible fingers natural, and avoid
open hands spread toward the camera. If hands don't matter, frame them out or put them
in pockets.

## Motion

- **Frozen:** fast shutter or flash; every drop sharp.
- **Motion blur:** slow shutter; the moving part blurred, the rest sharp.
- **Panning:** the subject sharp, the background streaked in the direction of travel.
- **Mid-stride, mid-turn, mid-laugh:** name the instant, not the action in general.
