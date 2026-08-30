# MW Image Skills

**Whatever the prompt doesn't decide, the engine decides — and the engine's habits are
nobody's taste.**

That is where generic AI imagery comes from: not a weak model, an unfinished prompt.
These two skills close it. Either works alone; together they are the pipeline.

Install, licence and the chat-UI bundles: [repository README](../../README.md).

## `mw-image-prompt` — decides what the image is, writes the prompt

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

## `mw-image-gen` — runs the prompt against fal.ai

Takes a finished prompt, calls the endpoint it names, saves every image beside a JSON
sidecar recording model, settings, seed and request id, then converts approved masters
to WebP/AVIF. It chooses nothing — engine, size and prompt all arrive from upstream.

Generation spends your money, so it runs only on an explicit request and states model,
size, count and estimated cost before each batch. If something it needs is missing, it
stops and names it rather than substituting a default and billing you for the guess.

> **One honest note.** That cost gate is an instruction the agent follows, not a lock in
> the code — the script has no spending check of its own. Set a spend cap at fal.ai too.


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

## Examples

```
> something for the launch post
```
No subject yet, so it asks what you already have — a screenshot, two versions, a number,
a broken output — before writing anything. A concept built from your material can't be
generically wrong; one reasoned from the topic alone usually is.

```
> a background for the pricing section, text will sit on top
```
Catches that "text on top" changes the job: reserves the space your copy needs and drops
the atmosphere effects that would fight it.

```
> two images attached — our founder's portrait, and the product on a white background.
> LinkedIn launch cover, he's holding it, same dark editorial look as the rest of the site.
```
Each reference gets exactly one named role, stated in the prompt:

- **The portrait carries identity only** — face, bone structure, features. Camera height,
  framing, pose, lighting and wardrobe are all stated explicitly, because whatever the
  prompt leaves unstated gets copied from the photo, selfie geometry included. It asks
  how the likeness may be used before writing anything.
- **The product is placed as-is**, never redrawn from memory — that is where subtle
  wrong-proportion and wrong-logo errors come from.
- **The look comes from your brand docs**, not from either image. "Same as the site" is
  resolved by reading the documented palette and mood, not guessed from the attachments.

```
> generate it
```
States what it is about to run and what that costs, then waits. One approval covers one
stated batch, not the session.

## Requirements

`mw-image-prompt` has none — plain Markdown, runs anywhere an agent reads instructions.
`mw-image-gen` needs `FAL_KEY` in the environment (with a spend cap set at fal.ai),
Node.js 18+, and [`uv`](https://docs.astral.sh/uv/) for the WebP/AVIF conversion.

## Layout

```
.claude-plugin/plugin.json      this plugin's manifest
skills/<skill-name>/SKILL.md    skills, auto-discovered
```

MIT — see [LICENSE](LICENSE).
