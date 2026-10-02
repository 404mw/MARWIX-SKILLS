# WIP: `mw-image-direction` (temporary)

> Temporary planning note. Delete it once the skill ships. It sits at the repo root,
> outside `plugins/`, so the release workflow never packs it into a skill zip.
> Status on 2026-10-02: **paused while design samples are collected.**

## The problem

When the user gives no style, `mw-image-prompt` falls back to the same camera and pose
every time. It hard-codes one default in three places:

- `plugins/mw-image/skills/mw-image-prompt/references/brief.md:35`: Camera row
  defaults to "eye-level straight-on; ~85mm compression for people"
- `.../references/scenes.md:35-36`: "eye-level straight-on is the default for people"
- `.../references/identity.md:89`: "Default: camera at eye level, straight on, ~85mm
  portrait compression"

It also has no taste of its own by design (README: "no style of its own"). A user who
has no idea what they want gets a plain look with the same eye-level 85mm framing.

## Decisions so far

1. **Build a new skill, `mw-image-direction`,** in the `mw-image` plugin, next to
   `mw-image-prompt` and `mw-image-gen`.
2. **What it decides:** the look (style, palette, lighting, texture) **and** the
   shot: camera height and angle, shot size, lens feel, pose and expression, where the
   subject sits in the frame, and how the scene splits into layers. Each direction
   carries its own shot language. The skill offers **2–3 shot options** instead of one
   default.
3. **Audience:** all three. The owner on their own projects, public plugin users, and
   clients or non-designers with no visual vocabulary. The interview does the heavy
   lifting.
4. **Flow when the user has no idea:**
   1. A few quick questions: who sees it, the feeling in three words, what it must
      never look like.
   2. Shortlist 3 contrasting directions from the library, each with a one-line reason.
   3. *Optional sketch round:* render the same subject in all 3 directions, cheaply.
      Offered with the cost stated up front, and run through `mw-image-gen` only on a
      yes. Text-only is the default.
   4. Read back the chosen look and shot options in chat, the same way
      `mw-image-prompt` reads back its brief.
5. **No "direction card" handoff.** In one conversation the agent already holds every
   decision, so `mw-image-prompt` uses them straight from context. At the end, the
   skill makes a one-line offer: *"Save this look to `docs/art-direction.md` so future
   sessions reuse it?"* No means nothing is saved. Saving matters only for:
   - a new conversation, which starts empty;
   - long sessions, where older context gets condensed;
   - the exact style paragraph that a series pastes word for word into every prompt.
6. **Vocabulary lives only in `mw-image-direction`:** shot sizes, camera angles, lens
   feel, named lighting setups (Rembrandt, butterfly, split, rim), pose and expression
   terms. It goes in one place. It is *not* added to `mw-image-prompt` as the original
   summary proposed.
7. **Direction vs. project docs:** the direction controls the **look**: style,
   palette, lighting, camera, pose, composition. Project docs keep control only of
   **hard technical limits**: exact sizes and formats, the layer and naming scheme the
   code expects, and legally banned content (e.g. "never show competitor logos").
   Docs have little to no say over the result otherwise. *(Proposed by the agent; the
   owner has not objected.)*
8. **Library entries use one fixed layout:**
   - what it communicates, when to use it and when not to
   - palette logic, lighting
   - camera, pose and composition defaults (the shot language)
   - medium and texture
   - type pairing for promotional work
   - notes per engine family: diffusion/flux, Nano Banana, GPT-Image, **Midjourney**
     (V8.2 is now in the roster since v1.3.0, so `--s`/`--raw`/`--sref` notes are valid)
   - slop risks
   - described by attributes, never "in the style of [living artist]"

## Changes needed in `mw-image-prompt`

- **Handoff:** when no style is documented and the user has none in mind, it
  *suggests* switching to `mw-image-direction` and asks permission first. It never
  switches on its own. This touches the Style source row in `brief.md:34`, which today
  offers "two or three concrete directions as `[proposed]` options".
- **Remove the fixed camera default** in `brief.md:35`, `scenes.md:35-36` and
  `identity.md:89`:
  - if a direction was chosen, camera and pose come from it;
  - if not, propose 2–3 contrasting framings in the brief readback.
- **Keep** the straight-on setup in the reference-photo builder
  (`identity.md:57-60`). That is a passport-style reference sheet, where flat and
  neutral is the point.
- **Rewrite the "docs win" rule** (e.g. `scenes.md:130`, SKILL.md "Rules from" row) so
  docs win only on technical limits once a direction is in play.
- **README:** add `mw-image-direction` to the plugin README and the root README. Reword
  the "no style of its own" line: it still holds for `mw-image-prompt`, and taste
  comes from the new skill only when asked.

## Open

- **The direction list.** The owner is collecting design samples and will send their
  own list. That replaces the proposed starting 17 (editorial minimal, Swiss/grid,
  warm 70s film, cinematic noir, high-key product studio, documentary, risograph, flat
  vector, isometric 3D, claymation, brutalist, retro-futurist, painterly gouache,
  technical blueprint, collage, soft pastel 3D, ink-line editorial). Rough is fine;
  each one gets written into the fixed layout above.

## Next moves

1. **Owner:** collect design samples and send the direction list, rough is fine.
   Samples help: each entry's palette, lighting and shot language can be read off them.
2. **Build `mw-image-direction`:**
   - `SKILL.md`: trigger, interview, shortlist, optional sketch round, readback, save
     offer
   - `references/directions/*.md` or one file per group: library entries, loaded on
     demand
   - `references/vocabulary.md`: camera, lighting, pose, placement and layer terms
   - `references/shots.md`: how to turn a direction into 2–3 shot options
3. **Edit `mw-image-prompt`** as listed above.
4. **Docs and release:** READMEs, `plugin.json` version bump, evals if the repo's
   `evals/` covers mw-image, then a version tag so the release workflow builds the new
   skill zip.
5. **Delete this file.**
