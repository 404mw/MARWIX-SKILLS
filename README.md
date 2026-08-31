# MARWIX Skills

**Whatever you don't decide, the model decides.**

Claude can't make images, and no agent arrives with taste. These two skills add both.

I have been using these on my own work for months — this is that pair, hardened for
release rather than written for it. They work your project's way instead of the model's:
each one reads your project's own docs for the rules, shows you every decision it made and
where it came from, and stops to ask rather than filling a blank with something
plausible. One install, nothing to configure. Free, MIT, no paid
version held back.

## Skills

| Skill | What it's for |
|---|---|
| [`mw-image-prompt`](plugins/mw-image/README.md#mw-image-prompt) | **Gives your agent art direction.** Turns "something for the launch post" into a locked brief — subject, style, camera, palette, banned elements — then the prompt that follows from it. Writes prompts; never generates. |
| [`mw-image-gen`](plugins/mw-image/README.md#mw-image-gen) | **Gives your agent the ability to generate images.** Runs a prompt against fal.ai, saves each result with the settings that made it, converts approved masters to web formats. Decides nothing creative. |

Both ship together in one plugin, `mw-image`.

## Install

### Claude Code

```
/plugin marketplace add 404mw/MARWIX-SKILLS
/plugin install mw-image@mw-skills
```

`/plugin marketplace update` picks up changes later.

### Every other CLI and IDE

These are plain Agent Skills, so any client that reads the format runs them. Clone once,
then link both skills into whichever directory your client reads:

```bash
git clone https://github.com/404mw/MARWIX-SKILLS ~/.marwix-skills
S=~/.marwix-skills/plugins/mw-image/skills
mkdir -p ~/.agents/skills                        # <- your client's path, from the table
ln -s $S/mw-image-prompt $S/mw-image-gen ~/.agents/skills/
```

| Directory | Clients that read it |
|---|---|
| `~/.agents/skills` | Codex · Gemini CLI · OpenCode · Pi |
| `~/.claude/skills` | Claude Code (as a personal skill) · OpenCode · GitHub Copilot · Kimi |
| `~/.gemini/antigravity/skills` | Antigravity |
| `~/.copilot/skills` | GitHub Copilot in VS Code |
| `~/.cline/skills` | Cline |
| `~/.kimi/skills` | Kimi |
| `~/.kiro/skills` | Kiro |
| `~/.openclaw/skills` | OpenClaw |
| `~/.hermes/skills` | Hermes |
| `~/.trae/skills` | Trae |
| `~/.vibe/skills` | Mistral Vibe |
| `~/.nanobot/workspace/skills` | Nanobot |

The first two rows cover most people — each is read by four different clients. Gemini
CLI also takes `~/.gemini/skills`; Antigravity, Trae and Kiro read `.agents/skills` or
their own `.<client>/skills` inside a workspace too. Restart the client afterwards.

**Updating is one command:** `git -C ~/.marwix-skills pull`. The symlinks pick it up and
nothing needs reinstalling. On Windows, copy the folders instead of linking unless
Developer Mode is on.

`mw-image-gen` runs local Node and Python scripts, so a sandboxed client will ask for
approval before executing them.

Or paste this to any agent with file access and let it do the whole thing:

> Clone `https://github.com/404mw/MARWIX-SKILLS` to `~/.marwix-skills` — if that
> directory already exists, `git pull` there instead. Then symlink
> `plugins/mw-image/skills/mw-image-prompt` and `plugins/mw-image/skills/mw-image-gen`
> into the skills directory this client reads, creating it if needed. Copy instead if
> symlinks aren't available here. Change nothing inside the folders, and tell me before
> overwriting anything already installed. Then say what you installed, where, and how to
> update it.

### Claude.ai, Claude Desktop, mobile

Download a skill and upload it at **Settings → Skills**:

- [**`mw-image-prompt.zip`**](https://github.com/404mw/MARWIX-SKILLS/releases/latest/download/mw-image-prompt.zip)
- [**`mw-image-gen.zip`**](https://github.com/404mw/MARWIX-SKILLS/releases/latest/download/mw-image-gen.zip)

Those links always serve the newest release; [Releases](https://github.com/404mw/MARWIX-SKILLS/releases)
lists every version.

`mw-image-prompt` is the one to use here. **Don't run `mw-image-gen` from a hosted chat**
— it would mean pasting your fal key into it; see [the key warning](#never-paste-keys-into-a-chat).

### ChatGPT

Skills are a **workspace** feature — Business, Enterprise, Edu and Healthcare. Free,
Plus and Pro don't have them; there, paste a `SKILL.md`'s contents into a project's
custom instructions and invoke it by hand.

Where you do have them: **Skills → Create → Upload**, and pick the `.zip` above or the
unzipped folder. Invoke with `@mw-image-prompt`.

Use `mw-image-prompt` there — it needs nothing but the conversation. **Don't run
`mw-image-gen` from a hosted chat.** Doing so means putting your fal key into someone
else's interface; see [the key warning](#never-paste-keys-into-a-chat). Generate
locally.

## Requirements

`mw-image-prompt` has none. It is plain Markdown and runs anywhere an agent can read
instructions. These are `mw-image-gen`'s:

| Requirement | What to do |
|---|---|
| **`FAL_KEY` in your environment** | Create a key at [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys) — `API` scope is enough. Windows: `setx FAL_KEY "<key>"`. macOS/Linux: add `export FAL_KEY="<key>"` to `~/.zshrc` or `~/.bashrc`. Open a new terminal afterwards; a running process keeps the environment it started with. The script reads the key from the environment and refuses it as an argument. |
| **A small credit balance** | fal bills prepaid credits and has no spend-cap setting, so the balance *is* your ceiling. Fund it with what you'd be willing to lose to one bad batch. |
| Node.js 18+ | The generation script uses native `fetch`; no npm dependencies. |
| [`uv`](https://docs.astral.sh/uv/) | Runs the WebP/AVIF conversion; resolves Python 3.10+ and Pillow automatically. |

### Never paste keys into a chat

`mw-image-gen` runs **locally**. The key lives in your operating system's environment, the
script reads it from there, and it goes to fal.ai and nowhere else — the skill never asks
for it, echoes it, or writes it to a file.

Anything typed into a hosted chat — ChatGPT, Claude.ai, any web interface — becomes part of
that conversation's stored history. That goes for every secret, not just this one. If you
do it anyway, rotate at [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys) straight
away.

```bash
setx FAL_KEY "<key>"        # Windows — then open a new terminal
export FAL_KEY="<key>"      # macOS/Linux — add to ~/.zshrc or ~/.bashrc
```

Better still, keep it in your OS credential store or a secrets manager — Windows Credential
Manager, macOS Keychain, `pass`, 1Password CLI, `direnv` — and export `FAL_KEY` from there.

Your keys are yours to manage; this project can't do it for you and doesn't try.

## Using them

**Name the skill and there's nothing to guess:**

```
/mw-image-prompt   a hero background for the docs page
/mw-image-gen      run the prompt above
```

The prefix differs by client: `/name` in most, `$name` in Codex, `@name` in ChatGPT,
`/skill:name` in Kimi and Pi. **If none of them is recognised, just say it in words** —
"use the mw-image-prompt skill for this" works everywhere. The `mw-` prefix keeps the
bare name from colliding with anything else you have; `/mw-image:mw-image-prompt` is the
namespaced form in Claude Code.

They also fire on their own from an ordinary request — "I need a cover image for the
launch" reaches `mw-image-prompt` — but that is a judgement the model makes, and it can
miss. If it matters, name the skill.

**On Windows via Git Bash**, a leading `/` gets rewritten into a path by MSYS. Type the
command in Claude Code directly, or use `//mw-image-prompt`.

## What they actually do

The full write-up lives in [the plugin's own README](plugins/mw-image/README.md) so that it travels with the
plugin when that is installed on its own. Straight to a section:

- [**`mw-image-prompt`**](plugins/mw-image/README.md#mw-image-prompt) — what a locked brief contains, why the
  skill brings no style of its own, and what it does when your project documents nothing.
- [**`mw-image-gen`**](plugins/mw-image/README.md#mw-image-gen) — the cost gate, the JSON sidecar written
  beside every image, and why it makes no creative decisions.
- [**Using them**](plugins/mw-image/README.md#using-them) — the invocation prefix for each client, and the
  fallback when none is recognised.
- [**Examples — from four words to a full brief**](plugins/mw-image/README.md#examples--from-four-words-to-a-full-brief)
  — the same skill against four different amounts of information:
  - [Most vague](plugins/mw-image/README.md#most-vague--a-message-not-a-picture) — *"something for the launch
    post."* Writes nothing; asks what material you already have, because a concept built
    from your own material can't be generically wrong.
  - [Vague, but placed](plugins/mw-image/README.md#vague-but-placed--it-knows-where-it-goes) — *"a hero image
    for the docs site."* Placement implies most of the brief; it proposes all of it and
    asks only about the two or three lines it genuinely can't infer.
  - [Specific](plugins/mw-image/README.md#specific--youve-made-the-calls) — *"…text will sit on top, keep it
    dark."* Your constraints become law, the text zone gets reserved, and a clash with
    your brand docs is reported rather than silently resolved.
  - [Fully specified, with references](plugins/mw-image/README.md#fully-specified-with-references--the-most-it-can-be-given)
    — two images attached. Each gets exactly one named role, because whatever the prompt
    leaves unstated gets copied from the photo by default.
  - [Then generation](plugins/mw-image/README.md#then-generation) — model, size, count and cost stated up
    front; then it waits for you.
- [**Requirements**](plugins/mw-image/README.md#requirements) — what `mw-image-gen` needs, in short.

## Free, and staying that way

Published under MIT with no paid tier and no held-back version. There is no premium
edition of this and there isn't going to be — the licence makes that a promise rather
than an intention.

**Prices and endpoints age.** The engine reference carries per-model costs, and the
skill treats them as routing hints rather than quotes: it says when a figure was last
verified every time it uses one, and *offers* to fetch current numbers instead of
asserting stale ones. An offer, because checking costs you several web lookups.

Where it can write files it will also offer to save what it found to
`.mw-image/engine-prices.md` and look there first next time, so the lookup happens once
rather than every session. A saved price still states its fetch date, and a fresh lookup
is re-offered before any final-tier render, where a wrong number becomes a wrong
decision. No file stays accurate forever. The provider's own model page does.

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
