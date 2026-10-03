# MARWIX Skills

**Whatever you don't decide, the model decides.**

Claude can't make images. No agent arrives with taste. And an agent asked why a query is
slow will answer without ever looking at the plan.

These skills add the missing half. I have been using them on my own work for months —
hardened for release rather than written for it. They work your way instead of the
model's: each one follows your project's own docs where there are some, shows you every
decision it made and where it came from, and stops to ask rather than filling a blank
with something plausible. Built for and tested on Claude — Claude Code and Claude's
web, desktop and mobile apps. Free, MIT, no paid version held back.

## Skills

| Skill | Plugin | What it's for |
|---|---|---|
| [`mw-image-direction`](plugins/mw-image/README.md#mw-image-direction) | `mw-image` | **Gives your agent taste, on request.** When you don't know what an image should look like, it asks a few plain questions and shortlists three contrasting directions from a library of 46 — photography, flat graphic, 3D, illustration, mixed media, eras — then two or three shots instead of the same centered eye-level one, and stages each shot physically — real object sizes, camera geometry, light and shadows, and what the viewer must notice first. Decides the look; never generates. |
| [`mw-image-prompt`](plugins/mw-image/README.md#mw-image-prompt) | `mw-image` | **Plans the image with you.** Reasons about a rough idea like "something for the launch post", asks one batch of questions with its own suggestions, locks a brief — subject, style, camera, palette, banned elements — then writes the prompt for the model you use: ChatGPT, Gemini, Midjourney, FLUX and more. Writes prompts; never generates. |
| [`mw-image-gen`](plugins/mw-image/README.md#mw-image-gen) | `mw-image` | **Gives your agent the ability to generate images.** Runs a prompt against fal.ai or OpenAI, saves each result with the settings that made it, converts approved masters to web formats. Decides nothing creative. |
| [`mw-query-plan`](plugins/mw-query/README.md#mw-query-plan) | `mw-query` | **Makes your agent prove a query is slow before telling you how to fix it.** Diagnoses Postgres queries from the actual EXPLAIN plan — indexes, N+1, joins, keyset pagination — and marks the finding *provisional* when it hasn't got one. Postgres only; adapters for Prisma and Medusa. |

Install a plugin, get its skills. Neither depends on the other.

## Install

### Claude Code

```
/plugin marketplace add 404mw/MARWIX-SKILLS
/plugin install mw-image@mw-skills
/plugin install mw-query@mw-skills
```

Install either, or both. `/plugin marketplace update` picks up changes later.

Prefer personal skills to a marketplace? Clone once and link them into
`~/.claude/skills`:

```bash
git clone https://github.com/404mw/MARWIX-SKILLS ~/.marwix-skills
mkdir -p ~/.claude/skills
ln -s ~/.marwix-skills/plugins/*/skills/* ~/.claude/skills/
```

`git -C ~/.marwix-skills pull` updates them in place. On Windows, copy the folders
instead of linking unless Developer Mode is on.

`mw-image-gen` runs local Node and Python scripts, so Claude Code will ask for approval
before executing them.

### Claude.ai, Claude Desktop, mobile

Download a skill and upload it at **Settings → Skills**:

- [**`mw-image-direction.zip`**](https://github.com/404mw/MARWIX-SKILLS/releases/latest/download/mw-image-direction.zip)
- [**`mw-image-prompt.zip`**](https://github.com/404mw/MARWIX-SKILLS/releases/latest/download/mw-image-prompt.zip)
- [**`mw-image-gen.zip`**](https://github.com/404mw/MARWIX-SKILLS/releases/latest/download/mw-image-gen.zip)
- [**`mw-query-plan.zip`**](https://github.com/404mw/MARWIX-SKILLS/releases/latest/download/mw-query-plan.zip)

Those links always serve the newest release; [Releases](https://github.com/404mw/MARWIX-SKILLS/releases)
lists every version.

`mw-image-direction`, `mw-image-prompt` and `mw-query-plan` all work here — none needs
anything but the conversation, and you can paste a query and a plan straight in. **Don't run `mw-image-gen`
from a hosted chat** — it would mean pasting a provider key into it; see
[the key warning](#never-paste-keys-into-a-chat).

### Other agents

These are standard Agent Skills folders, so other clients that read the format may run
them — but only Claude is tested. Some clients take a single instruction file per skill,
which drops the reference files these skills load on demand; if you try one, copy the
whole skill folder, not just its `SKILL.md`.

## Requirements

`mw-image-direction` and `mw-image-prompt` have none. They are plain Markdown and work in
Claude Code and on Claude's web, desktop and mobile apps.

`mw-query-plan` needs no install either — but it needs **a Postgres database you can run
`EXPLAIN` against**, and it is Postgres-only by design. On MySQL, SQLite or SQL Server it
says so and stops rather than translating advice that doesn't transfer.

These are `mw-image-gen`'s. **Set at least one provider key after installing.** `mw-image-gen` reaches most of the
roster through fal, and the GPT-Image models either through fal or through OpenAI
directly. One key is enough to start — `FAL_KEY` covers every engine; `OPENAI_API_KEY`
only adds the direct path to GPT-Image.

| Requirement | What to do |
|---|---|
| **`FAL_KEY` in your environment** | Create a key at [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys) — `API` scope is enough. Windows: `setx FAL_KEY "<key>"`. macOS/Linux: add `export FAL_KEY="<key>"` to `~/.zshrc` or `~/.bashrc`. Open a new terminal afterwards; a running process keeps the environment it started with. The script reads the key from the environment and refuses it as an argument. |
| **`OPENAI_API_KEY`** *(optional)* | Only needed for `--provider openai`, which reaches GPT-Image-2.5 through OpenAI's own API instead of fal's hosted copy. Create a project key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys), then `setx OPENAI_API_KEY "<key>"` or `export OPENAI_API_KEY="<key>"`. Skip it entirely if you're happy on fal. |
| **A spend ceiling on whichever you use** | **fal** bills prepaid credits and has no spend-cap setting, so the balance *is* your ceiling — fund it with what you'd be willing to lose to one bad batch. **OpenAI** bills postpaid against a card, so an unset limit is no ceiling at all: set a monthly budget under *Settings → Limits* before the first run. An empty fal balance stops by itself; an OpenAI account doesn't. |
| Node.js 18+ | The generation script uses native `fetch`, `FormData` and `Blob`; no npm dependencies. |
| [`uv`](https://docs.astral.sh/uv/) | Runs the WebP/AVIF conversion; resolves Python 3.10+ and Pillow automatically. |

### Never paste keys into a chat

`mw-image-gen` runs **locally**. Keys live in your operating system's environment, the
script reads them from there, and each one goes to its own provider and nowhere else — the
skill never asks for a key, echoes it, or writes it to a file.

Anything typed into a hosted chat — Claude.ai or any other web interface — becomes part of
that conversation's stored history. That goes for every secret, not just these. If you do
it anyway, rotate immediately at [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys) or
[platform.openai.com/api-keys](https://platform.openai.com/api-keys).

```bash
# Windows — then open a new terminal
setx FAL_KEY "<key>"
setx OPENAI_API_KEY "<key>"          # only for --provider openai

# macOS/Linux — add to ~/.zshrc or ~/.bashrc
export FAL_KEY="<key>"
export OPENAI_API_KEY="<key>"        # only for --provider openai
```

Better still, keep them in your OS credential store or a secrets manager — Windows
Credential Manager, macOS Keychain, `pass`, 1Password CLI, `direnv` — and export from there.

Your keys are yours to manage; this project can't do it for you and doesn't try.

## Using them

**Name the skill and there's nothing to guess:**

```
/mw-image-direction  a look for our launch posts
/mw-image-prompt     a hero background for the docs page
/mw-image-gen        run the prompt above
```

`/mw-image:mw-image-prompt` is the namespaced form in Claude Code. In Claude.ai and the
desktop and mobile apps, say it in words — "use the mw-image-prompt skill for this".
The `mw-` prefix keeps the bare name from colliding with anything else you have.

They also fire on their own from an ordinary request — "I need a cover image for the
launch" reaches `mw-image-prompt` — but that is a judgement the model makes, and it can
miss. If it matters, name the skill.

**On Windows via Git Bash**, a leading `/` gets rewritten into a path by MSYS. Type the
command in Claude Code directly, or use `//mw-image-prompt`.

## What they actually do

Each plugin's full write-up lives in its own README, so it travels with the plugin when
that one is installed alone. Straight to a section:

### `mw-query` — [full write-up](plugins/mw-query/README.md)

- [**`mw-query-plan`**](plugins/mw-query/README.md#mw-query-plan) — the access-pattern
  questions it asks first, the cheap-to-expensive optimization ladder, and the four
  refusals that stop a guess reaching you dressed as a diagnosis.
- [**What changes in practice**](plugins/mw-query/README.md#what-changes-in-practice) — the
  same "why did this get slow?" answered with and without a plan, including the real
  EXPLAIN output that turns a plausible answer into a proven one.
- [**ORM adapters**](plugins/mw-query/README.md#orm-adapters) — what it knows about Prisma
  and Medusa, and what it deliberately refuses to claim about the ORMs it has no adapter for.
- [**Scope — Postgres only**](plugins/mw-query/README.md#scope--postgres-only) — why it stops
  at MySQL instead of translating.
- [**Host-project contract**](plugins/mw-query/README.md#host-project-contract) — the five
  things it needs from your repo, and what it does when each one is missing.

### `mw-image` — [full write-up](plugins/mw-image/README.md)

- [**`mw-image-direction`**](plugins/mw-image/README.md#mw-image-direction) — the interview, the 46
  directions, the shot options that replace the one default camera, the physical staging
  of each shot — sizes, light, emphasis — and why a chosen
  look outranks your docs on everything but technical limits.
- [**`mw-image-prompt`**](plugins/mw-image/README.md#mw-image-prompt) — how it plans with you from a rough
  idea, the models it writes for, and why it brings no style of its own.
- [**`mw-image-gen`**](plugins/mw-image/README.md#mw-image-gen) — the cost gate, the JSON sidecar written
  beside every image, and why it makes no creative decisions.
- [**Using them**](plugins/mw-image/README.md#using-them) — invocation in Claude Code and Claude.ai.
- [**Examples — from four words to a full brief**](plugins/mw-image/README.md#examples--from-four-words-to-a-full-brief)
  — the same skill against four different amounts of information:
  - [Most vague](plugins/mw-image/README.md#most-vague--a-message-not-a-picture) — *"something for the launch
    post."* Writes no prompt yet; asks what material you already have and offers directions
    built on it, because a concept built from your own material can't be generically wrong.
  - [Vague, but placed](plugins/mw-image/README.md#vague-but-placed--it-knows-where-it-goes) — *"a hero image
    for the docs site."* Placement implies most of the brief; it proposes all of it and
    asks only about the two or three lines it genuinely can't infer.
  - [Specific](plugins/mw-image/README.md#specific--youve-made-the-calls) — *"…text will sit on top, keep it
    dark."* Your constraints become law, the text zone gets reserved, and a clash with
    your brand docs is reported rather than silently resolved.
  - [Fully specified, with references](plugins/mw-image/README.md#fully-specified-with-references--the-most-it-can-be-given)
    — two images attached. Each gets exactly one named role, because whatever the prompt
    leaves unstated gets copied from the photo by default.
  - [Then generation](plugins/mw-image/README.md#then-generation) — paste it into your own tool, or with
    `mw-image-gen`: model, size, count and cost stated up front; then it waits for you.
- [**Requirements**](plugins/mw-image/README.md#requirements) — what `mw-image-gen` needs, in short.

## Free, and staying that way

Published under MIT with no paid tier and no held-back version. There is no premium
edition of this and there isn't going to be — the licence makes that a promise rather
than an intention.

**Prices and models age.** `mw-image-prompt`'s model roster carries dated, indicative
costs and treats them as routing hints rather than quotes: it says when a figure was
last verified, and sends you to the provider's own page — or *offers* a live lookup —
rather than asserting stale numbers.

`mw-image-gen` needs real numbers for its cost statements, so where it can write files
it offers to save a lookup to `.mw-image/engine-prices.md` and look there first next
time. A saved price still states its fetch date, and a fresh lookup is re-offered before
any final-tier batch, where a wrong number becomes a wrong decision. No file stays
accurate forever. The provider's own model page does.

## Licence

MIT — see [LICENSE](LICENSE). Each plugin carries its own copy, so the terms travel with
it when installed alone.

## Contributing

Issues are welcome, especially for model changes, dead endpoints and prices that have
moved. Those age fastest and are the easiest thing to help with.

The guardrails are the product. If a skill stopped and asked you something, that is the
feature working — a pull request adding a default or a fallback so it "just decides"
will be declined. Open an issue before changing behaviour.

To work on a skill locally without installing it:

```bash
claude --plugin-dir plugins/mw-image     # session-only; /reload-plugins picks up edits
claude plugin validate .                 # run from the repo root before opening a PR
```

Behaviour changes come with evals: [`evals/`](evals/README.md) holds the test prompts and
the expectations each skill must meet.

Contact: hello@marwix.dev
