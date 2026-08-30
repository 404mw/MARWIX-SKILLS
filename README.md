# MARWIX Skills

**Whatever you don't decide, the model decides.**

Specialized agent skills that work your project's way instead of the model's. Each one
reads your project's own docs for the rules, shows you every decision it made and where
each came from, and stops to ask rather than filling a blank with something plausible.
One install, nothing to configure — and they get more accurate the more your project
already documents.

## Skills

| Skill | What it's for |
|---|---|
| [`mw-image-prompt`](#mw-image-prompt) | Turns a vague ask into a finished image brief, then the prompt that follows from it. Writes prompts; never generates. |
| [`mw-image-gen`](#mw-image-gen) | Runs a prompt against fal.ai, saves each result with the settings that made it, converts approved masters to web formats. Decides nothing creative. |

Both ship together in one plugin, `mw-image`.

## Install

### Claude Code

```
/plugin marketplace add 404mw/MARWIX-SKILLS
/plugin install mw-image@mw-skills
```

`/plugin marketplace update` picks up changes later.

Prefer them as personal skills instead of a plugin, or want your agent to do it? Paste
this to any agent with file access:

> Clone `https://github.com/404mw/MARWIX-SKILLS` into a temporary directory. Copy the
> folders `plugins/mw-image/skills/mw-image-prompt` and
> `plugins/mw-image/skills/mw-image-gen` into `~/.claude/skills/`, creating that
> directory if it doesn't exist. Copy them whole and change nothing inside them. If
> either folder is already there, tell me before overwriting. Then delete the clone and
> list what you installed.

### OpenAI Codex

Clone the repo, add each skill to `~/.codex/config.toml`, restart Codex:

```toml
[[skills.config]]
path = "/path/to/MARWIX-SKILLS/plugins/mw-image/skills/mw-image-prompt/SKILL.md"
enabled = true

[[skills.config]]
path = "/path/to/MARWIX-SKILLS/plugins/mw-image/skills/mw-image-gen/SKILL.md"
enabled = true
```

Or paste this to Codex and let it do the whole thing:

> Clone `https://github.com/404mw/MARWIX-SKILLS` to `~/mw-skills/MARWIX-SKILLS` — if that
> directory already exists, run `git pull` there instead of cloning. **Codex stores
> absolute paths to this location, so it must not be moved or deleted afterwards.**
>
> Then add a `[[skills.config]]` entry to `~/.codex/config.toml` for each of
> `~/mw-skills/MARWIX-SKILLS/plugins/mw-image/skills/mw-image-prompt/SKILL.md` and
> `~/mw-skills/MARWIX-SKILLS/plugins/mw-image/skills/mw-image-gen/SKILL.md`, written as
> absolute paths, each with `enabled = true`. Leave every existing entry in that file
> untouched. Show me the diff, then remind me to restart Codex.

`mw-image-gen` runs local Node and Python scripts, so Codex's sandbox will ask for
approval before executing them.

### Claude.ai, Claude Desktop, mobile

Skills upload as a `.zip`. Download the one you want, then go to
**Settings → Skills → upload**:

- [**`mw-image-prompt.zip`**](https://github.com/404mw/MARWIX-SKILLS/releases/latest/download/mw-image-prompt.zip)
- [**`mw-image-gen.zip`**](https://github.com/404mw/MARWIX-SKILLS/releases/latest/download/mw-image-gen.zip)

Those links always serve the newest release; [Releases](https://github.com/404mw/MARWIX-SKILLS/releases) lists every
version. For `mw-image-gen`, code execution also has to be enabled under
**Settings → Capabilities**.

Prefer to build it yourself from the current source? Clone the repo and zip the skill
folder — `plugins/mw-image/skills/<skill-name>`.

### ChatGPT

No skill upload exists. Paste a `SKILL.md`'s contents into a project's custom
instructions — same behaviour, minus the automatic triggering.


## Requirements

`mw-image-prompt` has none. It is plain Markdown and runs anywhere an agent can read
instructions. These are `mw-image-gen`'s:

| Requirement | Why |
|---|---|
| `FAL_KEY` in your environment, **and a spend cap set at fal.ai** | The script reads the key from the environment itself and refuses it as an argument. The cap is yours to set — see the note under `mw-image-gen` |
| Node.js 18+ | The generation script uses native `fetch`; no npm dependencies |
| [`uv`](https://docs.astral.sh/uv/) | Runs the WebP/AVIF conversion; resolves Python 3.10+ and Pillow automatically |

## Using them

**Name the skill and there's nothing to guess:**

```
/mw-image-prompt   a hero background for the docs page
/mw-image-gen      run the prompt above
```

Naming it removes the ambiguity whether or not your client registers it as a command.
The `mw-` prefix exists so the bare name doesn't collide with anything else you have;
`/mw-image:mw-image-prompt` is the namespaced form.

They also fire on their own from an ordinary request — "I need a cover image for the
launch" reaches `mw-image-prompt` — but that is a judgement the model makes, and it can
miss. If it matters, name the skill.

**On Windows via Git Bash**, a leading `/` gets rewritten into a path by MSYS. Type the
command in Claude Code directly, or use `//mw-image-prompt`.

## The skills

### `mw-image-prompt`

**What it does.** Takes what you asked for — however little that is — and finishes it
into a brief: purpose, mode, subject, style source, camera, lighting, palette, in-image
text, ratio, engine, references, and the checklist that gates shipping. Every line is
tagged with where it came from — your words, your project's docs, or a proposal you can
accept in one word. Only then does it write the prompt.

**Why it works that way.** Whatever the prompt leaves undecided, the image model
decides, and a model's defaults are nobody's taste. That is where generic AI output
comes from — not a weak model, an unfinished prompt.

It also brings no style of its own, deliberately. Palette, mood, banned elements and
recurring characters come from your project's documentation at runtime, so one install
produces different work in different repos and never makes your project look like
someone else's. If your project documents nothing, it asks you. It does not improvise a
style.

**Example usage**

```
> something for the launch post
```
No subject yet, so it asks what you already have — a screenshot, two versions, a
number, a broken output — before writing anything.

```
> a background for the pricing section, text will sit on top
```
Catches that "text on top" changes the job: reserves the space your copy needs and drops
the atmosphere effects that would fight it.

```
> two images attached — our founder's portrait, and the product on a white background.
> LinkedIn launch cover, he's holding it, same dark editorial look as the rest of the site.
```
Each reference gets exactly one named role, and the prompt says so out loud:

- **The portrait carries identity only** — face, bone structure, features. Camera height,
  framing, pose, lighting and wardrobe are all stated explicitly in the prompt, because
  whatever it leaves unstated gets copied from the photo, selfie geometry included. It
  will ask how the likeness may be used before writing anything.
- **The product is placed as-is** — never redrawn from memory, which is where subtle
  wrong-logo and wrong-proportion errors come from.
- **The look comes from your brand docs**, not from either image. "Same as the site" is
  resolved by reading the site's documented palette and mood, not by guessing from the
  attachments.

### `mw-image-gen`

**What it does.** Takes a finished prompt, calls the fal.ai endpoint it names, saves
every image beside a JSON sidecar recording model, settings, seed and request id, then
converts approved masters to WebP/AVIF. It chooses nothing — engine, size and prompt all
arrive from upstream.

**Why it works that way.** Generation spends your money, so it runs only on an explicit
request and states model, size, count and estimated cost before each batch. If something
it needs is missing it stops and names it, rather than substituting a default size or a
probably-fine model and billing you for the guess.

> **One honest note.** That cost gate is an instruction the agent follows, not a lock in
> the code — the script has no spending check of its own. Set a spend cap at fal.ai too,
> and treat the skill's discipline as a second line rather than the only one.

**Example usage**

```
> generate it
```
States what it is about to run and what that costs, then waits. One approval covers one
stated batch, not the session.

```
> convert the approved ones
```
Writes web formats beside the masters. The originals stay.

## Free, and staying that way

Published under MIT with no paid tier and no held-back version. There is no premium
edition of this and there isn't going to be — the licence makes that a promise rather
than an intention.

**Prices and endpoints age.** The engine reference carries per-model costs, and the
skill treats them as routing hints rather than quotes — it states when a figure was
last verified every time it uses one, and *offers* to fetch current numbers from the
provider instead of asserting stale ones. An offer, because checking costs you several
web lookups in time and tokens.

Where it has a filesystem, it will also offer to save what it found to
`.mw-image/engine-prices.md` and look there first next time, so the lookup happens once
rather than every session. A saved price is still a saved price: it states the fetch
date every time it quotes one, and offers a fresh lookup before any final-tier render,
where a wrong number becomes a wrong decision. In a chat UI there is no filesystem and
none of this applies. No file stays accurate forever. The provider's own model page
always will.

## Licence

MIT — see [LICENSE](LICENSE). Each plugin carries its own copy, so the terms travel with
it when installed alone.

## Contributing

Issues are welcome, especially for engine changes, dead endpoints and prices that have
moved. Those age fastest and are the easiest thing to help with.

The guardrails are the product. If a skill stopped and asked you something, that is the
feature working — a pull request adding a default or a fallback so it "just decides"
will be declined. Open an issue before changing behaviour.

To work on a skill locally without installing it:

```bash
claude --plugin-dir plugins/mw-image     # session-only; /reload-plugins picks up edits
claude plugin validate .                 # run from the repo root before opening a PR
```

Contact: hello@marwix.dev
