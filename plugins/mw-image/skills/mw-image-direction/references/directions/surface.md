# Directions — Surfaces and gradients

Two directions that mostly live *behind* things: backgrounds, hero art under live text,
UI-adjacent scenes. Shot recipe names refer to [shots.md](../shots.md); grid and safe
zone terms to [composition.md](../composition.md).

**For both:** these are usually production assets with text or UI on top. Reserve the
text zone first, keep it low-contrast and calm, and check text contrast against the
busiest part of the background, not the average. If the live UI is CSS, a real CSS
gradient or `backdrop-filter` may beat a generated image; say so.

## Contents

- Glass morphism
- Aurora

---

## Glass morphism

**Feels:** light, layered, modern tech. **Use for:** app and SaaS heroes, feature cards,
product UI scenes, OS-style marketing. **Not for:** warm, handmade or heritage briefs.

- **Palette:** a colorful blurred backdrop (two or three saturated hues) seen through
  frosted panels; panels near-white or near-clear with a thin bright edge.
- **Light:** soft environmental light; a crisp specular highlight along the top edge of
  each panel; a soft drop shadow beneath.
- **Medium & texture:** frosted translucency (the backdrop blurred through the glass),
  subtle noise to stop banding, rounded corners.
- **Shots:** flat frontal, three-quarter product (panels tilted 10–20°), isometric.
- **Composition:** two to four overlapping panels at different depths; the frontmost
  sharpest; colored shapes behind for the glass to blur.
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
- **Light:** the color *is* the light: glowing bands with soft falloff.
- **Medium & texture:** very smooth gradients with fine grain to prevent banding; no
  hard edges.
- **Shots:** flat frontal (no camera).
- **Composition:** the brightest band away from the text zone; the quiet area under the
  headline; color moving diagonally or rising from the bottom.
- **Type:** confident sans, white on dark or ink on light.
- **Variants:**
  - *Soft light aurora* — pastel fields on near-white.
  - *Dark aurora* — glowing bands on near-black, like northern lights.
  - *Grainy gradient* — heavier visible grain, more tactile, fewer hues.
- **Engines:** any family; describe the hues, where each band sits and how much of the
  frame stays dark. Nano Banana holds near-black best; flux-class lifts it toward gray.
  Generate larger than needed and scale down to hide banding.
- **Slop risks:** the default purple-blue-pink blend, banding, a bright band right
  under the headline.
