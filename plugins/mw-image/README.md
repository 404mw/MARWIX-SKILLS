# MW Image Skills

**Whatever the prompt doesn't decide, the model decides — and the model's habits are
nobody's taste.**

Claude can't make images, and no agent arrives with taste. These two skills add both —
one plans the image with you and writes the prompt, the other generates it. Either
works alone; together they are the pipeline. Used on my own work for months before
release.

Install, requirements, the key warning and the Claude.ai bundles:
[repository README](../../README.md).

## Contents

- [`mw-image-prompt`](#mw-image-prompt) — plans the image with you, then writes the prompt
- [`mw-image-gen`](#mw-image-gen) — runs the prompt against fal.ai or OpenAI
- [Using them](#using-them) — invocation in Claude Code and Claude.ai
- [Examples — from four words to a full brief](#examples--from-four-words-to-a-full-brief)
  - [Most vague — a message, not a picture](#most-vague--a-message-not-a-picture)
  - [Vague, but placed — it knows where it goes](#vague-but-placed--it-knows-where-it-goes)
  - [Specific — you've made the calls](#specific--youve-made-the-calls)
  - [Fully specified, with references](#fully-specified-with-references--the-most-it-can-be-given)
  - [Then generation](#then-generation)
- [Requirements](#requirements)
- [Layout](#layout)


## `mw-image-prompt`

*Plans the image with you, then writes the prompt.*

Ideas arrive rough — a feeling, a placement, three words. The skill reasons about what
you said, then answers in one go: what it understood, a draft brief, and the few
questions only you can answer, each with its own recommendation and concrete options to
pick from. The brief covers purpose, mode, subject, style, camera, lighting, palette,
in-image text, where you'll generate, ratio, references, lock level, budget and the
checklist that gates shipping. Every line is tagged with where it came from — your
words, your project's docs, or a proposal you can accept in one word.

Then it writes the prompt **for the model you'll actually use**. ChatGPT
(GPT-Image-2.5), Gemini (Nano Banana), Midjourney, FLUX, Seedream, Ideogram, Recraft,
Qwen — each family wants a different encoding: sentences or labeled sections, a
negative field or positive restatement, parameters or settings. The brief stays the
same and the encoding changes. A model it doesn't know gets safe defaults, flagged as a
calibration pass.

It brings **no style of its own**, deliberately. If your project documents a brand kit
or art direction, it reads that and follows it; if not, you are the source, and it
offers directions rather than improvising a house look. When a result comes back, it
diagnoses the result first, then writes one edit with the full preserve list.

It plans and writes prompts. It never generates, and it works the same in Claude Code
and on Claude's web, desktop and mobile apps.

## `mw-image-gen`

*Runs the prompt against fal.ai or OpenAI.*

Takes a finished prompt, calls the endpoint for the model it names, saves every image
beside a JSON sidecar recording model, settings, seed and request id, then converts
approved masters to WebP/AVIF. It chooses nothing — model, size and prompt all arrive
from upstream.

Generation spends your money, so it runs only on an explicit request and states provider,
model, size, count and estimated cost before each batch. If something it needs is missing,
it stops and names it rather than substituting a default and billing you for the guess.

> **One honest note.** That cost gate is an instruction the agent follows, not a lock in
> the code — the script has no spending check of its own. On fal, prepaid credits with no
> spend-cap setting mean your balance is the real ceiling; keep it small. On OpenAI there
> is no such backstop — billing is postpaid against a card — so set a monthly limit in
> your account before the first run. That limit is the ceiling there, and nothing else is.


## Using them

**Name the skill and there's nothing to guess:**

```
/mw-image-prompt   a hero background for the docs page
/mw-image-gen      run the prompt above
```

`/mw-image:mw-image-prompt` is the namespaced form in Claude Code. In Claude.ai and the
desktop and mobile apps, say it in words — "use the mw-image-prompt skill for this".

They also fire on their own from an ordinary request — "I need a cover image for the
launch" reaches `mw-image-prompt` — but that is a judgement the model makes, and it can
miss. If it matters, name the skill.

**On Windows via Git Bash**, a leading `/` gets rewritten into a path by MSYS. Type the
command in Claude Code directly, or use `//mw-image-prompt`.

## Examples — from four words to a full brief

The skill's job is to close the gap between what you said and what an image needs. How
much it asks depends entirely on how much you left open. A complete worked example —
the batch, the answers and the deliverable, encoded for two different models — lives in
[`references/examples.md`](skills/mw-image-prompt/references/examples.md).

### Most vague — a message, not a picture

```
> something for the launch post
```

**It writes no prompt yet.** "Launch post" names what the image is *for*, never what it
is *of*, and a model asked to fill that blank produces the glowing-terminal-in-space
that every other account posted this week. So it says what it understood, asks what
material you already have — a screenshot, a before and after, a number, an ugly output
the thing fixes — and offers two or three concrete directions built on the kind of
material you're likely to have, so there is something to react to. A concept built
from your material can't be generically wrong; one reasoned from the topic alone
usually is.

### Vague, but placed — it knows where it goes

```
> a hero image for the docs site
```

**It proposes the whole brief and asks you to correct it.** Placement is enough to derive
most of the rest: docs hero means production asset, means live HTML text over the top,
means a reserved quiet zone and no baked-in words. If your project documents a palette
and mood it reads them; either way it tags every line with where it came from —
`[user]`, `[doc]`, `[proposed]` — and asks only about the ones it genuinely can't infer,
including which tool you'll generate with. Usually two or three questions.

### Specific — you've made the calls

```
> a background for the pricing section, text will sit on top, keep it dark
```

**It takes your three constraints as law and fills the rest around them.** "Text on top"
changes the composition, not just the mood: it reserves the space your copy needs and drops
the atmosphere effects that would fight it. And if "dark" contradicts what your brand docs
say, it tells you that instead of silently picking a winner. With nothing left that
changes the job, it goes straight to the prompt.

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
  resolved by reading the documented palette and mood — or, with no docs, by asking.

### Then generation

```
> generate it
```

In ChatGPT, Gemini or Midjourney you paste the prompt there. In Claude Code with
`mw-image-gen` installed, it states the model, size, count and estimated cost, then
waits. One approval covers one stated batch, not the session.

```
> convert the approved ones
```

Writes WebP/AVIF beside the masters. The originals stay.

## Requirements

`mw-image-prompt` has none — plain Markdown, works in Claude Code and on Claude's web,
desktop and mobile apps.

`mw-image-gen` runs **locally** and needs Node.js 18+, [`uv`](https://docs.astral.sh/uv/)
for the WebP/AVIF conversion, and **at least one provider key in the environment.**

- **`FAL_KEY`** — covers the whole roster. Create it at
  [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys) (`API` scope), then `setx FAL_KEY
  "<key>"` on Windows or `export FAL_KEY="<key>"` in your shell profile.
- **`OPENAI_API_KEY`** *(optional)* — only for `--provider openai`, which reaches
  GPT-Image-2.5 through OpenAI's own API rather than fal's hosted copy. Create a project
  key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys) and set it
  the same way. Skip it if you're happy generating on fal.

Open a new terminal afterwards — a running process keeps the environment it started with.

**Cap the spend, and note the two differ.** fal is prepaid with no spend-cap setting, so
the credit balance is your ceiling; fund it with what you'd lose to one bad batch. OpenAI
is postpaid against a card, so an unset limit is no ceiling at all — set a monthly budget
under *Settings → Limits* first. An empty fal balance stops by itself; an OpenAI account
does not.

**Never paste a key into a hosted chat** — Claude.ai or any other web interface. It
becomes part of that conversation's stored history and you cannot retract it; rotate at
[fal.ai/dashboard/keys](https://fal.ai/dashboard/keys) or
[platform.openai.com/api-keys](https://platform.openai.com/api-keys) if you ever do. Keep
keys in your OS credential store or a secrets manager and export from there. This project
takes no responsibility for keys exposed by pasting them into a third-party interface.

## Layout

```
.claude-plugin/plugin.json      this plugin's manifest
skills/<skill-name>/SKILL.md    skills, auto-discovered
```

MIT — see [LICENSE](LICENSE).
