# WIP: `mw-image-direction` (temporary)

> Temporary planning note. Delete it once the skill ships. It sits at the repo root,
> outside `plugins/`, so the release workflow never packs it into a skill zip.
> Status on 2026-10-02: **first full draft written, committed locally, not pushed.**

## What was built

`plugins/mw-image/skills/mw-image-direction/`

- `SKILL.md` — rules, direction-vs-docs precedence, the six-step flow: read what's
  settled → plain-words interview → shortlist three contrasting directions (optional
  sketch round with cost) → two or three shot options → readback with a style block →
  hand off to `mw-image-prompt` and offer to save `docs/art-direction.md`.
- `references/catalog.md` — the index: shortlisting axes, feelings → directions, all 46
  directions with variants, and the generic AI looks every direction avoids.
- `references/directions/*.md` — 46 directions, about 137 variants, in seven files:
  photo (12), graphic (8), surface (2), dimensional (6), illustrated (8), mixed (3),
  eras (7). Every entry: feels, use for, not for, palette, light, medium & texture,
  shots, composition, type, variants, engine notes, slop risks.
- `references/shots.md` — 20 shot recipes, how to build two or three contrasting
  options, rotation for series.
- `references/composition.md` — grids (thirds, phi, center axis, diagonals, spiral,
  column, modular), subject positioning, alignment with text and UI, text-safe and
  crop-safe zones, layers and depth.
- `references/vocabulary.md` — shot sizes, heights and angles, lens feel, light
  quality, portrait lighting patterns, color temperature, pose, expression, gaze,
  hands, motion.

## The owner's list → the library

All 20 kept, umbrellas split into variants: Glass morphism, Vector art, Maximalism,
Minimalism, Aurora, Hand written (→ Hand-drawn), Swiss design, Y2K, Pixel art, Clay,
Cyberpunk, Pop art, Retro (→ five decades), Collage, Surreal, Futuristic (→ clean
sci-fi / retro-futurism / solarpunk), Bohemian, Graffiti, Editorial (→ Editorial
fashion photo, Editorial ink illustration, Type-led editorial), Victorian.

Added from research to cover the gaps: 12 photographic directions, Print, Brutalist,
Soft 3D, Isometric, Low-poly, Miniature, Paper craft, Watercolor, Painterly, Anime and
manga, Children's book, Technical, Art Deco.

## Changes in `mw-image-prompt`

- Fixed eye-level / straight-on / 85mm default removed (`brief.md` Camera row,
  `scenes.md`, `identity.md`); it now proposes two or three framings or uses the chosen
  shot. The passport-style reference builder in `identity.md` keeps its straight-on
  setup on purpose.
- With no look anywhere, it suggests `mw-image-direction` and switches only on a yes.
- A chosen direction (`[direction]` tag) outranks docs on look; docs keep technical
  limits and content bans.

## Also changed

READMEs (root and plugin), `plugin.json` 2.0.0 → 2.1.0, marketplace 1.3.0 → 1.4.0,
evals: `evals/mw-image-direction/` (7 behaviour, 14 trigger) and two new
`mw-image-prompt` evals for the camera default and direction precedence.

## Next moves

1. **Owner review** of the library entries, especially the engine notes and slop risks.
2. Run the evals with `skill-creator` (`evals/README.md`).
3. On the owner's go: push, open a PR, then tag a release so the zip is built.
4. Delete this file.
