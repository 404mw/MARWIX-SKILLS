# mw-image-prompt — Deciding what the image is of

Load this when the brief's *subject + the one action* row cannot be filled from the
user's words or any documented rules: the job is a concept decision before it is a
prompt job. The result goes into the batch as the subject question, with options.

**This file decides what the image is _of_. It never decides how it looks, how it is
staged, or how it stops a scroll** — that is the mode file's law (scenes.md,
social.md), and nothing here overrides it. A concept that survives this file still
has to survive the mode's doctrine afterwards.

## Material first — the question before any idea

Do not derive the concept from the topic. Ask what the user already has: a
screenshot, two versions of a thing, a bill, a log, a number, a broken output.
**The material chooses the move; the topic does not.** A topic reasoned about in
isolation produces an illustration of the topic — the robot at the laptop, the
glowing brain — which is what an unaided model produces and what every competing
account already posted.

In the batch, ask for material and, in the same question, offer two or three
directions so the user has something to react to: the moves below that their likely
material could support, and a metaphor option as the fallback. If they have no
material, the directions are what they pick from. Never invent material — moves 1–3
need the real thing (SKILL.md, *Honest evidence*).

## The six moves — evidence before invention

Take the first one the user's material can actually support:

| | Move | Shows | Needs |
|---|---|---|---|
| 1 | **The artifact** | the thing that was made, unretouched | something was made |
| 2 | **The diff** | two states together: before/after, with/without, cheap/expensive | two states |
| 3 | **The receipt** | the bill, the log, the number in its context | evidence that proves instead of claiming |
| 4 | **The map** | the pipeline, the decision, the system laid out spatially | a process worth seeing |
| 5 | **The failure** | the ugly output, the thing that broke | willingness to show it |
| 6 | **The metaphor** | the abstract made physical | nothing above survived |

The order is not a quality ranking — it is **evidence before invention.** Moves 1–3
show things that exist and so cannot be generically wrong. Moves 4–6 are
constructions, and a construction can be generic. Metaphor is where you land when
the material gives you nothing, never where you start.

## When the artifact is itself a generated image

Move 1 does not terminate if the thing made is an image — that image needed a
concept too. Pass the concept question **down** to the inner image and run this file
on it. The outer frame then becomes a *staging* decision rather than a concept one —
the result on a device, as a grid, beside the prompt that made it — and staging
belongs to the mode file.

## Two moves that sharpen a chosen concept

- **The curiosity gap.** Show the *moment before or after* the interesting thing,
  never the thing itself — the viewer's brain completes the story, and completing it
  requires reading the post.
- **Absurd juxtaposition.** One impossible element in an otherwise grounded scene.
  Not five impossible things — one.

## Subtract, then test

Strip everything that is not the one idea: one subject, never a collage.

Then the **caption test — remove the caption. If the image stops meaning anything,
the concept is decoration and is rejected.** This test only rejects; it never ranks
what survives. Ranking survivors for attention is the mode file's job, and a concept
that is legible but visually dull is one the mode file then has to stage.

## Return this

Into the batch, in the brief's own vocabulary: **purpose & placement · mode · subject
+ the one action · in-image text (or none)** — the subject row as a question with two
or three options, each naming its move and the material behind it, so a rejected
concept can be re-run against a different move instead of re-invented from nothing.

---

**Working when:** the concept names material the user already has, and the caption
test is applied before any prompt exists. **Not working if:** the move chosen is
consistently metaphor — that means the material question is not being asked, or is
being asked too late to matter.
