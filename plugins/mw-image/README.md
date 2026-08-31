# MW Image Skills

**Whatever the prompt doesn't decide, the engine decides — and the engine's habits are
nobody's taste.**

Claude can't make images, and no agent arrives with taste. These two skills add both —
one gives your agent art direction, the other the ability to generate. Either works
alone; together they are the pipeline. Used on my own work for months before release.

Install, requirements, the key warning and the chat-UI bundles:
[repository README](../../README.md).

## Contents

- [`mw-image-prompt`](#mw-image-prompt) — decides what the image is, then writes the prompt
- [`mw-image-gen`](#mw-image-gen) — runs the prompt against fal.ai
- [Using them](#using-them) — invocation per client
- [Examples — from four words to a full brief](#examples--from-four-words-to-a-full-brief)
  - [Most vague — a message, not a picture](#most-vague--a-message-not-a-picture)
  - [Vague, but placed — it knows where it goes](#vague-but-placed--it-knows-where-it-goes)
  - [Specific — you've made the calls](#specific--youve-made-the-calls)
  - [Fully specified, with references](#fully-specified-with-references--the-most-it-can-be-given)
  - [Then generation](#then-generation)
- [Requirements](#requirements)
- [Layout](#layout)


## `mw-image-prompt`

*Decides what the image is, then writes the prompt.*

Takes what you asked for, however little that is, and finishes it into a brief:
purpose, mode, subject, style source, camera, lighting, palette, in-image text, ratio,
engine, references, and the checklist that gates shipping. Every line is tagged with
where it came from — your words, your project's docs, or a proposal you can accept in
one word. Only then is a prompt written.

It brings **no style of its own**, deliberately. Palette, mood, banned elements and
recurring characters all come from your project's documentation at runtime, so one
install produces different work in different repos. If your project documents nothing,
it asks you. It does not improvise a style.

It writes prompts and never generates.

## `mw-image-gen`

*Runs the prompt against fal.ai.*

Takes a finished prompt, calls the endpoint it names, saves every image beside a JSON
sidecar recording model, settings, seed and request id, then converts approved masters
to WebP/AVIF. It chooses nothing — engine, size and prompt all arrive from upstream.

Generation spends your money, so it runs only on an explicit request and states model,
size, count and estimated cost before each batch. If something it needs is missing, it
stops and names it rather than substituting a default and billing you for the guess.

> **One honest note.** That cost gate is an instruction the agent follows, not a lock in
> the code — the script has no spending check of its own. fal bills prepaid credits and
> has no spend-cap setting, so your balance is the real ceiling. Keep it small.


## Using them

**Name the skill and there's nothing to guess:**

```
/mw-image-prompt   a hero background for the docs page
/mw-image-gen      run the prompt above
```

The prefix differs by client: `/name` in most, `$name` in Codex, `@name` in ChatGPT,
`/skill:name` in Kimi and Pi. **If none is recognised, just say it in words** — "use the
mw-image-prompt skill for this" works everywhere. The `mw-` prefix keeps the bare name
from colliding with anything else you have; `/mw-image:mw-image-prompt` is the
namespaced form in Claude Code.

They also fire on their own from an ordinary request — "I need a cover image for the
launch" reaches `mw-image-prompt` — but that is a judgement the model makes, and it can
miss. If it matters, name the skill.

**On Windows via Git Bash**, a leading `/` gets rewritten into a path by MSYS. Type the
command in Claude Code directly, or use `//mw-image-prompt`.

## Examples — from four words to a full brief

The skill's job is to close the gap between what you said and what an image needs. How
much it asks depends entirely on how much you left open.

### Most vague — a message, not a picture

```
> something for the launch post
```

**It stops before writing anything.** "Launch post" names what the image is *for*, never
what it is *of*, and a model asked to fill that blank produces the glowing-terminal-in-space
that every other account posted this week. So it asks what you already have: a screenshot,
a before and after, a number, an ugly output the thing fixes. A concept built from your
material can't be generically wrong; one reasoned from the topic alone usually is.

### Vague, but placed — it knows where it goes

```
> a hero image for the docs site
```

**It proposes the whole brief and asks you to correct it.** Placement is enough to derive
most of the rest: docs hero means production asset, means live HTML text over the top,
means a reserved quiet zone and no baked-in words. It reads your project's docs for palette
and mood, tags every line with where it came from — `[user]`, `[doc]`, `[proposed]` — and
asks only about the ones it genuinely can't infer. Usually two or three.

### Specific — you've made the calls

```
> a background for the pricing section, text will sit on top, keep it dark
```

**It takes your three constraints as law and fills the rest around them.** "Text on top"
changes the composition, not just the mood: it reserves the space your copy needs and drops
the atmosphere effects that would fight it. And if "dark" contradicts what your brand docs
say, it tells you that instead of silently picking a winner.

### Fully specified, with references — the most it can be given

```
> two images attached — our founder's portrait, and the product on a white background.
> LinkedIn launch cover, he's holding it, same dark editorial look as the rest of the site.
```

**Now it's mostly bookkeeping, and that's where the errors live.** Each reference gets
exactly one named role, stated in the prompt:

- **The portrait carries identity only** — face, bone structure, features. Camera height,
  framing, pose, lighting and wardrobe are all stated explicitly, because whatever the
  prompt leaves unstated gets copied from the photo, selfie geometry included. It asks how
  the likeness may be used before writing anything.
- **The product is placed as-is**, never redrawn from memory — that is where subtle
  wrong-proportion and wrong-logo errors come from.
- **The look comes from your brand docs**, not from either image. "Same as the site" is
  resolved by reading the documented palette and mood, not guessed from the attachments.

### Then generation

```
> generate it
```

States the model, size, count and estimated cost, then waits. One approval covers one
stated batch, not the session.

```
> convert the approved ones
```

Writes WebP/AVIF beside the masters. The originals stay.

## Requirements

`mw-image-prompt` has none — plain Markdown, runs anywhere an agent reads instructions.

`mw-image-gen` runs **locally** and needs `FAL_KEY` in the environment, Node.js 18+, and
[`uv`](https://docs.astral.sh/uv/) for the WebP/AVIF conversion. Create the key at
[fal.ai/dashboard/keys](https://fal.ai/dashboard/keys) (`API` scope), set it with `setx
FAL_KEY "<key>"` on Windows or `export FAL_KEY="<key>"` in your shell profile, then open
a new terminal — a running process keeps the environment it started with. Fund the
account with a small credit balance; fal is prepaid and has no spend-cap setting, so
that balance is your ceiling.

**Never paste the key into a hosted chat** — ChatGPT, Claude.ai, any web interface. It
becomes part of that conversation's stored history and you cannot retract it; rotate at
[fal.ai/dashboard/keys](https://fal.ai/dashboard/keys) if you ever do. Keep it in your OS
credential store or a secrets manager and export `FAL_KEY` from there. This project takes
no responsibility for keys exposed by pasting them into a third-party interface.

## Layout

```
.claude-plugin/plugin.json      this plugin's manifest
skills/<skill-name>/SKILL.md    skills, auto-discovered
```

MIT — see [LICENSE](LICENSE).
