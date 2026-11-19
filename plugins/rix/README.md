# Rix

**You can't manage a context window you can't see.**

Claude Code tells you the context is full when it's about to compact it for you. `rix` is a
mod that keeps the number in front of you the whole time: a strip above the prompt with the
tokens loaded, a bar that changes colour as the context fills, a nudge at each step, and a
Compact button for when you'd rather choose the moment yourself.

Rix, the MARWIX mascot, walks along the top of the strip and reacts to what's happening.
If you're here for the strip, `/rix hide` puts him away for good.

## Install

In Claude Code in a terminal:

```
/plugin install rix --marketplace 404mw/MARWIX-SKILLS
```

Answer `y` to add the marketplace, then pick a scope. In the desktop app's Code tab, where
`/plugin` doesn't run: click **+** next to the prompt box, then **Plugins**, **Add marketplace**
with `404mw/MARWIX-SKILLS`, then **Add plugin**. More in the
[repository README](../../README.md#mods).

## Contents

- [The context strip](#the-context-strip)
- [Rix](#rix-1)
- [Hiding Rix](#hiding-rix)
- [Where it draws](#where-it-draws)
- [Licence](#licence)
- [Layout](#layout)

## The context strip

*The context window, always in view.*

- **The count.** Tokens loaded out of the window and the share used: `Context 86.9k / 200k tokens · 43%`.
  After a compaction it shows `~` until the next reply measures it again.
- **The bar and background.** They change colour at each step: 20%, 33%, 50%, 75% and 90%.
  From 75% the bar pulses.
- **A toast at each step**, once on the way up, re-armed when the context drops back:
  "a good moment to /compact soon" at 20%, "best time to /compact" at 50%, "compact now,
  before auto-compact" at 75%.
- **Compact, in one click.** The button appears from 20%; below that there's nothing worth
  compacting. It runs `/compact` exactly as if you typed it. Pressed while Claude is working, it
  queues until the turn ends.
- **What was freed.** After any compaction (the button, `/compact` or auto-compact), a row in
  the chat says how much: `520k → ~86.9k tokens (52% → 9%) · freed 433k`.

## Rix

He walks the length of the strip and does a trick at each end. He also shows what's going on:

- **Working.** He acts out the running tool: typing for an edit, running for a command,
  scanning for a search.
- **Turn finished or failed.** He hops when a turn ends, shakes when a tool call fails, and
  naps after three quiet minutes.
- **Context filling.** From 20% he carries a pack, a bigger one from 33%. From 50% he
  worries, then sounds the alarm, then panics at 90%.
- **Compacting.** He sweeps up while a compaction runs.

## Hiding Rix

```
/rix hide     # strip only, from now on
/rix show     # bring him back
/rix          # switch
```

That changes the **Show Rix** setting, which is also in `/config` in the terminal, so the choice
holds in every session. Hidden, he isn't drawn at all: the strip, the toasts, the button and
the freed-tokens row stay as they are.

## Where it draws

| Where | What you get |
|---|---|
| Claude Code desktop app | Rix's lane, the coloured strip, the Compact button, the freed-tokens row with Rix |
| Claude Code in a terminal | One line: `Context 86.9k / 200k tokens · 43% (86,912)`, coloured by step; the freed-tokens row |
| Claude.ai, Claude Desktop chat, mobile | Nothing: mods run in Claude Code only |

It also sets the app's accent colour to Rix's violet. The desktop app doesn't paint mod themes
yet; when it does, that's what you'll see.

Some things a mod can't reach, so it doesn't try: the tool-call rows and the running dots in the
chat, and the new-session screen. Those stay Claude Code's own.

## Licence

The code is MIT. **Rix and the MARWIX name and logo are not**: they are all rights reserved.
You may install and use the plugin as published. If you copy or fork the code, take Rix's
drawings out first and give your version another name. The details are in [LICENSE](LICENSE).

## Layout

```
rix/
├── .claude-plugin/plugin.json   manifest, with the "Show Rix" setting
├── hooks/
│   ├── hooks.json               names the hooks module
│   ├── register.tsx             the strip, the button, /rix, and what Rix reacts to
│   ├── context.ts               the steps, colours, fill bar and toasts
│   └── rix.ts                   Rix's drawings and poses (not MIT; see LICENSE)
├── types/index.d.ts             the state the mod keeps per session
├── tests/rix.test.tsx           claude plugin test plugins/rix
└── tsconfig.json
```
