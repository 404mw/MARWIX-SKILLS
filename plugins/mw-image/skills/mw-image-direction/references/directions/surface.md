# Directions — Surfaces and gradients

Two directions that mostly live *behind* things: backgrounds, hero art under live text,
UI-adjacent scenes. Shot recipe names refer to [shots.md](../shots.md); grid and safe
zone terms to [composition.md](../composition.md).

**For both:** these are usually production assets with text or UI on top. Reserve the
text zone first, keep it low-contrast and calm, and check text contrast against the
busiest part of the background, not the average: at least 4.5:1 for body text and 3:1
for large headlines (WCAG). If the live UI is CSS, a real CSS gradient or
`backdrop-filter` may beat a generated image; say so.

**Fields.** *Palette* hexes are approximate starting points: a brand's mandated colors
replace the nearest role, and the rest are tuned around them. *Staging depth* names the
row of the depth table in [staging.md](../staging.md) ("When to stage, and how deep").
Engine traits marked "(observed, small sample, 2026)" come from a handful of renders,
not a test; recheck them on the current model.

## Contents

- Glass morphism
- Aurora

---

## Glass morphism

**Feels:** light, layered, modern tech. **Use for:** app and SaaS heroes, feature cards,
product UI scenes, OS-style marketing. A real product's interface on the panels comes
from real screenshots composited in the editor, never generated (see *Product UI
showcase* in [mixed.md](mixed.md)). **Not for:** warm, handmade or heritage briefs.

- **Palette:** a colorful blurred backdrop (two or three saturated hues) seen through
  frosted panels; panels near-white or near-clear with a thin bright edge. Approx.:
  frosted white panels `#FFFFFF` at 20–40% opacity (dominant) · coral `#FF7A59`
  (secondary) · teal `#19C3B1` (secondary) · sun yellow `#FFD166` (accent) · soft
  navy shadow `#1E2433` at low opacity (shadow).
- **Light:** soft environmental light; a crisp specular highlight along the top edge of
  each panel; a soft drop shadow beneath.
- **Medium & texture:** frosted translucency (the backdrop blurred through the glass),
  subtle noise to stop banding, rounded corners.
- **Shots:** flat frontal, three-quarter product (panels tilted 10–20°), isometric.
- **Composition:** two to four overlapping panels at different depths; the frontmost
  sharpest; colored shapes behind for the glass to blur. Floating is licensed: the
  panels hover, and a soft shadow beneath each one marks where the ground is.
- **Staging depth:** soft-3D — panels and shapes with sizes, licensed floating with a
  shadow marking the ground, one soft light, the glass and edge material, the frontmost
  panel first.
- **Type:** clean geometric sans, medium weight; never thin type on glass.
- **Variants:**
  - *Frosted panels* — flat frosted cards over a gradient backdrop.
  - *Liquid glass* — thick, rounded, refractive glass that bends the backdrop at its
    edges, with specular highlights; the 2025–26 OS look.
  - *Glass objects* — 3D glass shapes (spheres, blobs, icons) with refraction and
    caustics.
- **Engines:** GPT-Image and Nano Banana render refraction well when described ("the
  colors behind are blurred and bent at the panel's rounded edge"). Midjourney — the
  most beautiful glass, least exact layout. Flux — good, state blur strength.
- **Slop risks:** a purple-blue gradient behind every panel, too many floating cards,
  unreadable text on glass, glass with no visible edge.

## Aurora

**Feels:** soft, premium, ambient. **Use for:** backgrounds behind headlines, landing
heroes, event and AI product pages. **Not for:** anything that needs a subject or a
story.

- **Palette:** two to four hues blending in large soft fields; choose them from the
  brand, not purple-blue by default. Dark variants keep 60–80% of the field near black.
  Approx., dark aurora: near-black `#07090F` (dominant, shadow) · deep sea blue
  `#123A5A` (secondary) · teal glow `#109E9A` (secondary) · warm amber band `#F2A541`
  (accent).
- **Light:** the color *is* the light: glowing bands with soft falloff.
- **Medium & texture:** very smooth gradients with fine grain to prevent banding; no
  hard edges.
- **Shots:** flat frontal (no camera).
- **Composition:** the brightest band away from the text zone; the quiet area under the
  headline; color moving diagonally or rising from the bottom.
- **Staging depth:** flat — where each band sits as a frame share, the dark share, the
  brightest band placed for emphasis, the quiet zone; no camera, no objects.
- **Type:** confident sans, white on dark or ink on light.
- **Variants:**
  - *Soft light aurora* — pastel fields on near-white.
  - *Dark aurora* — glowing bands on near-black, like northern lights.
  - *Grainy gradient* — heavier visible grain, more tactile, fewer hues.
- **Engines:** any family; describe the hues, where each band sits and how much of the
  frame stays dark. Nano Banana holds near-black best; flux-class lifts it toward gray
  (both observed, small sample, 2026). Downscaling does not cure banding: add fine grain
  or dither *after* the final resize, export at high quality or lossless, and check the
  exported WebP or AVIF, since compression brings bands back. Or rebuild the gradient in
  CSS and keep only the grain as an image.
- **Slop risks:** the default purple-blue-pink blend, banding, a bright band right
  under the headline.
