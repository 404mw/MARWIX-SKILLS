---
name: mw-image-gen
description: Execute AI image generation or editing by calling fal.ai - the execution half of the mw-image-prompt pipeline. Use ONLY when the user explicitly asks to generate, render, or edit an image now ("generate it", "run the prompt", "make the image", "image-gen this"); never trigger from general talk about images, prompts, or art direction (writing prompts is the mw-image-prompt skill's job), and never call the API without stating the cost and getting the user's go-ahead first.
argument-hint: "[prompt deliverable, prompt file, or asset to generate]"
---

Execute image generation against fal.ai: take a prompt deliverable, call the endpoint
it names, save images plus JSON sidecars, convert approved masters to web formats.
This skill decides nothing creative: engine, size, prompt, and iteration doctrine come
from upstream (a prompt-authoring skill such as `mw-image-prompt`, otherwise the user).
It is portable: no project facts, no credentials, no default sizes.

## Hard gates (all three, every time)

1. **Explicit request only.** Generation spends the user's money. Run only when the
   user has explicitly asked to generate/edit an image in this conversation. An
   approved plan that includes generation counts; "here's a prompt" alone does not.
2. **Cost statement before every batch.** Before each script run, state: model, size,
   count, and estimated cost (unit price from [references/endpoints.md](references/endpoints.md);
   for megapixel-priced models compute from the exact locked dimensions). Wait for the
   user's go-ahead. One approval covers one stated batch, not the session.
3. **The key stays in the environment, and this skill runs locally.** The script reads
   `FAL_KEY` from env itself. Never ask for the key, accept it as an argument, echo it,
   or write it to any file. If the user pastes a key into chat, tell them to store it as
   an env var instead, and that a pasted key now lives in that conversation's history and
   should be rotated at once.
   **In a hosted chat interface with no local environment** — a web or mobile client
   where the only way to supply a key would be to type it into the conversation - do not
   proceed. Say that generation belongs on their own machine, that pasting a key into a
   hosted chat puts it somewhere they cannot retract it, and offer the prompt-writing
   half instead. Never accept a key as a workaround for a missing environment.

## First run — setting up the key

If `FAL_KEY` is missing, walk the user through this instead of stopping at the error.
Never carry out step 2 for them, and never ask them to paste the key into the chat.

1. **Create a key** at `https://fal.ai/dashboard/keys`. `API` scope is enough; `ADMIN`
   is not needed and should not be used here.
2. **Put it in the environment**, never in a file this skill can read:
   - Windows: `setx FAL_KEY "<key>"`
   - macOS/Linux: add `export FAL_KEY="<key>"` to `~/.zshrc` or `~/.bashrc`
   Then open a new terminal, or restart the app. A process that is already running keeps
   the environment it started with, so an in-place edit will not reach it.
3. **Fund it small.** fal bills prepaid credits and has no spend-cap setting, so the
   credit balance is the only hard ceiling that exists. Say this plainly: gate 2 above
   is an instruction this skill follows; the balance is the part that cannot be argued
   with. When credits run out the account locks and requests are rejected.
4. **Confirm it is set without revealing it.** `node -e "process.exit(process.env.FAL_KEY?0:1)"`
   exits 0 when present. Report set/not-set only — never echo the value, not even
   truncated.

## Procedure

1. **Assemble the locked inputs.** From the prompt deliverable (preferred) or the
   user: exact fal endpoint id, generation size (pixel `WxH`, or aspect + resolution
   for the nano-banana family), full prompt text including negative constraints,
   count, and output location. Missing engine or size means routing wasn't finished:
   if a prompt-writing skill exists, complete its deliverable first; otherwise ask.
   Never substitute a default size or a "probably fine" model.
2. **State the cost and get approval** (gate 2).
3. **Write the prompt to a file** (scratchpad or the output dir), then run:

   ```
   node <skill-dir>/scripts/generate.mjs --model <fal-id> --prompt-file <path> \
        --size WxH --count N --out <dir>
   ```

   Nano-banana family: `--aspect W:H --resolution 0.5K|1K|2K|4K` instead of `--size`.
   Edits: the `/edit` endpoint id plus `--image <path-or-url>` (input image), prompt
   file contains the edit instruction with its full preserve list.
   Param quirks per endpoint: [references/endpoints.md](references/endpoints.md).
4. **Report and record.** Each image gets a `.json` sidecar (params, seed, request
   id) written automatically. Tell the user the file paths and seeds; a seed worth
   reusing belongs in the deliverable/notes, since sidecars stay next to the images.
5. **Iterate by editing, not re-rolling.** Near-misses go through the matching
   `/edit` endpoint with a preserve-list edit instruction (the prompt-writing skill's
   doctrine governs how those are written). Stop-loss: five failed edits means the
   prompt is wrong; hand back to prompt-writing instead of paying for edit six.
6. **Convert approved masters** when the user approves an image for use. Formats,
   qualities, and any downscale come from the host project's asset contract, never
   from this skill:

   ```
   uv run <skill-dir>/scripts/convert.py --input <file-or-dir> --formats webp,avif \
          --quality 82 [--resize WxH] [--out-dir <dir>]
   ```

## Verify before reporting done

A generation run fails quietly: a short batch looks like a finished one, and a missing
sidecar only hurts months later. Run this before telling the user the batch is done.

1. **Count.** The number of images returned equals the number named in the approved
   cost statement. A partial return is a failure, not a result - say which index is
   missing rather than presenting the survivors as the batch.
2. **Spend.** Actual cost matches the estimate that was approved. If it exceeded,
   report it before generating anything else; one approval covered one stated batch.
3. **Sidecars.** Every saved image has its `.json` beside it, carrying params, seed
   and request id. An image without a sidecar cannot be reproduced or re-edited later.
4. **Dimensions.** Output size and ratio match what the brief specified, not what the
   engine defaulted to. Engines silently substitute their nearest supported size.
5. **Conversions.** Every converted master still has its original beside it. Convert
   adds a format; it never replaces the master.

## When it fails

| Symptom | Meaning | Fix |
|---|---|---|
| `FAL_KEY is not set` | env var missing in this process | walk them through **First run — setting up the key** above; a var set in another window needs a restart to reach this one |
| `401` | key invalid or revoked | user checks/rotates the key in the fal dashboard |
| `422` + validation detail | wrong params for this endpoint family | check the endpoint's row and family rule in [references/endpoints.md](references/endpoints.md) |
| `404` | endpoint id wrong | re-verify the id with the probe procedure in endpoints.md |
| `uv: command not found` / `'uv' is not recognized` | `uv` isn't installed | install `uv` (https://docs.astral.sh/uv/) before running the conversion step |
| AVIF save error | Pillow without AVIF | needs `pillow>=11.2`; uv resolves it from the script's inline metadata |

## Host-project contract

The host provides: the routing law (which engine and size per asset, typically via an
`mw-image-prompt` deliverable grounded in the project's art-direction docs), the output
location for masters and converted files, and the conversion spec (formats,
qualities, naming). `FAL_KEY` must exist in the environment, funded at a level the user
chose deliberately. If any of these are missing, stop and say which one.
