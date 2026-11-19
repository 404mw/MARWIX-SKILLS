import { atom, read, update } from 'claude-code'
import type { Register, SessionContextUsage, SessionUsage, ThemeColors, Timer } from 'claude-code'

import type { ActiveTool, CompactNote, Compacting, ContextFill, Mood } from '../types'
import { BAR_H, countColor, fillBar, levelOf, levelPose, loadOf, stripBackground, toastFor } from './context'
import type { Level } from './context'
import { RIX_TRICKS, STAGE_H, STROLL_S, VIOLET, rixStill, rixStroll, rixSvg, toolPose } from './rix'
import type { RixLoad, RixPose } from './rix'

// Rix's colour, from the MARWIX brand's accent.
const VIOLET_DEEP = '#9F82F5'
const VIOLET_LIGHT_MODE = '#8E6FF0'
const VIOLET_LIGHT_MODE_DEEP = '#7A5BE0'

const context = atom({ plugin: 'rix', key: 'context' } as const, null)
// The tool call running now, which the context bar's Rix acts out.
const activeTool = atom({ plugin: 'rix', key: 'activeTool' } as const, null)
// How Rix feels between turns: the band above the prompt shows it.
const mood = atom({ plugin: 'rix', key: 'mood' } as const, 'idle')
// A fresh roll each time his mood changes: it picks his face, prop and hat for that mood.
const moodSeed = atom({ plugin: 'rix', key: 'moodSeed' } as const, 0)
// A compaction under way (`busy`) or just done (`done`): he sweeps up.
const compacting = atom({ plugin: 'rix', key: 'compacting' } as const, 'no')
// The highest context step already toasted; it drops back with the context, re-arming the toasts.
const warned = atom({ plugin: 'rix', key: 'warned' } as const, 0)
// What each compaction freed, by the id of the success row it placed in the chat.
const notes = atom({ plugin: 'rix', key: 'notes' } as const, {})
// Which pair of tricks his stroll shows, moved on by a timer once per stroll.
const trick = atom({ plugin: 'rix', key: 'trick' } as const, 0)

const HAPPY_MS = 4_000
const OOPS_MS = 3_000
const SLEEP_AFTER_MS = 3 * 60_000
const RELIEF_MS = 4_000
// A drop this large between two measures is a compaction, whoever ran it.
const COMPACTED_DROP = 10
// Pixels per band cell on the desktop, on the low side: the lane must not outgrow the strip.
const CELL_PX = 7
// The timer that picks new tricks for each stroll.
let trickTimer: Timer | null = null

// Bumped by every prompt and turn end, so a mood timer from an older one does nothing.
let generation = 0
const roll = () => Math.floor(Math.random() * 1_000_000)

// The desktop's accent tokens, swapped from Claude's clay to Rix's violet. The app reports it
// does not paint mod themes yet; this takes effect once it does.
const theme: ThemeColors = {
  v: 1,
  label: 'Rix',
  inputs: {
    dark: { 'accent-brand': VIOLET, 'brand-000': VIOLET_DEEP, 'brand-100': VIOLET, 'brand-200': VIOLET },
    light: {
      'accent-brand': VIOLET_LIGHT_MODE,
      'brand-000': VIOLET_LIGHT_MODE_DEEP,
      'brand-100': VIOLET_LIGHT_MODE,
      'brand-200': VIOLET_LIGHT_MODE,
    },
  },
}

const fillOf = (c: SessionContextUsage): ContextFill => ({
  tokens: c.tokens ?? null,
  window: c.window,
  percent: c.percent ?? null,
})

// After a compaction the measured figure is the last response's, stale until the next turn: count
// what the context holds now (estimated locally, as /context does), or take the compaction's own.
const recounted = (usage: SessionUsage | null, window: number, tokensAfter?: number): ContextFill | null => {
  const tokens = usage?.context.breakdown?.totalTokens ?? tokensAfter
  if (tokens === undefined) return null
  const size = usage?.context.window ?? window
  return { tokens, window: size, percent: Math.min(100, Math.round((tokens / size) * 100)), isEstimate: true }
}

// How long after a compaction resolves to count again, so the transcript has been swapped.
const RECOUNT_MS = 500

// The count after a compaction, and the success note to post when it is that compaction's first
// count: several hooks count the same one, and only the first to see the drop says so. A count
// already estimated is a compaction already announced, unless it shrank again by a fifth.
const afterCompaction = (
  before: ContextFill | null,
  usage: SessionUsage | null,
  tokensAfter?: number,
): { fill: ContextFill; note: CompactNote | null } | null => {
  const fill = recounted(usage, before?.window ?? 200_000, tokensAfter)
  if (fill === null || fill.tokens === null) return null
  const was = before?.tokens ?? null
  if (was !== null && fill.tokens >= was) return null
  const isFresh = was === null || before?.isEstimate !== true || fill.tokens < was * 0.8
  return { fill, note: isFresh ? { before: was, after: fill.tokens, window: fill.window } : null }
}

const noteText = (note: CompactNote): string => {
  const pct = (n: number) => `${Math.round((n / note.window) * 100)}%`
  return note.before === null
    ? `~${compact(note.after)} tokens left (${pct(note.after)})`
    : `${compact(note.before)} → ~${compact(note.after)} tokens (${pct(note.before)} → ${pct(note.after)}) · freed ${compact(note.before - note.after)}`
}

const compact = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
    : n >= 1_000
      ? `${(n / 1_000).toFixed(n >= 100_000 ? 0 : 1)}k`
      : String(n)

// What the stage's Rix does: a compaction first, then a failed tool, then the context's step from
// 50% up, then the turn running, then his mood. Idle, he strolls the stage doing tricks, from 20%
// with the context's load on his back.
type Act = { pose: RixPose; load: RixLoad | undefined } | { stroll: true; load: RixLoad }
const bandAct = (feeling: Mood, isWorking: boolean, level: Level, sweeping: Compacting, running: ActiveTool | null): Act => {
  // Queued behind a turn, he keeps at the turn; he sweeps once the compaction runs.
  if (sweeping === 'busy' || sweeping === 'done') return { pose: 'sweep', load: null }
  if (feeling === 'oops') return { pose: 'oops', load: loadOf(level) }
  if (level >= 3) return { pose: levelPose(level, false) ?? 'warn', load: undefined }
  if (running !== null) return { pose: toolPose(running.tool), load: loadOf(level) }
  if (isWorking) return { pose: 'work', load: loadOf(level) }
  if (feeling === 'happy' || feeling === 'sleep') return { pose: feeling, load: loadOf(level) }
  return { stroll: true, load: loadOf(level) }
}

// The `/rix` command's words for each setting.
const RIX_ARGS: Record<string, boolean> = { show: true, on: true, hide: false, off: false }

export const register: Register = (on, options) => {
  // The "Show Rix" setting (userConfig `showRix`): off, the strip stands alone. A change in the
  // config menu or by /rix reloads this module with the new value.
  const showRix = options.showRix !== false

  on('session.start', async ($, e, next) => {
    await $.theme.set({ colors: theme })
    await $.command.register({
      name: 'rix',
      description: showRix ? 'Hide Rix above the context strip' : 'Show Rix above the context strip',
      argumentHint: '[show|hide]',
    })
    const usage = await $.session.usage()
    await update($, context, () => fillOf(usage.context))
    await update($, mood, () => 'idle')
    await update($, compacting, () => 'no')
    // No toasts for a step already reached when the session (or this mod) starts.
    await update($, warned, () => levelOf(usage.context.percent ?? null))

    // Two new tricks for each stroll, while he is out.
    trickTimer?.cancel()
    trickTimer = null
    if (showRix) {
      await update($, trick, () => roll())
      trickTimer = $.clock.every(STROLL_S * 1000, () => {
        void update($, trick, t => t + 2)
      })
    }

    return next(e)
  })

  // /rix shows or hides him (with no word, the other way round). It changes the "Show Rix"
  // setting, so the choice holds in every session from then on.
  on('command.run', { command: 'rix' }, async ($, e) => {
    const word = e.args.trim().toLowerCase()
    const want = word === '' ? !showRix : RIX_ARGS[word]
    if (want === undefined) return { text: 'Usage: /rix show, /rix hide, or /rix alone to switch.' }
    if (want === showRix) return { text: want ? 'Rix is already out.' : 'Rix is already hidden.' }

    // The setting's row, as the config menu names it: `<plugin>.showRix`.
    const row = (await $.config.list()).find(
      r => r.key.endsWith('.showRix') && (r.provider.plugin === 'rix' || r.provider.plugin.startsWith('rix@')),
    )
    if (row === undefined) return { text: 'The "Show Rix" setting was not found, so nothing changed.' }
    const set = await $.config.set({ key: row.key, value: want })
    if (set.deny !== undefined) return { text: `Rix stays as he is: ${set.deny}` }

    return { text: want ? 'Rix is back above the context strip.' : 'Rix is hidden. /rix brings him back.' }
  })

  on('session.measure', async ($, e, next) => {
    if (!e.changed.includes('context')) return next(e)

    const before = await read($, context)
    const fill = fillOf(e.context)
    await update($, context, () => fill)

    // A big drop is a compaction (the button, /compact or auto): a moment of relief.
    if (before?.percent != null && fill.percent != null && fill.percent <= before.percent - COMPACTED_DROP) {
      await update($, compacting, () => 'done')
      $.clock.after(RELIEF_MS, () => {
        void update($, compacting, c => (c === 'done' ? 'no' : c))
      })
    }

    // Each step toasts once on the way up, and re-arms when the context drops back below it.
    const level = levelOf(fill.percent)
    const toasted = await read($, warned)
    if (level > toasted) {
      const text = toastFor(level, fill.percent ?? 0)
      if (text !== null) $.ui.toast(text)
    }
    if (level !== toasted) await update($, warned, () => level)

    return next(e)
  })

  // Any compaction of the main conversation but the background precompute: he sweeps while it
  // runs, and the strip shows what is left once it is done.
  on('session.compact', async ($, e, next) => {
    if (e.trigger === 'precompute' || e.agentId !== undefined) return next(e)

    await update($, compacting, () => 'busy')
    try {
      const result = await next(e)
      const isSkipped = 'skip' in result && result.skip !== undefined
      await update($, compacting, () => (isSkipped ? 'no' : 'done'))
      $.clock.after(RELIEF_MS, () => {
        void update($, compacting, c => (c === 'done' ? 'no' : c))
      })
      if (!isSkipped) {
        const tokensAfter = 'tokensAfter' in result ? result.tokensAfter : undefined
        $.clock.after(RECOUNT_MS, async () => {
          const usage = await $.session.usage({ breakdown: 'summary' }).catch(() => null)
          const counted = afterCompaction(await read($, context), usage, tokensAfter)
          if (counted === null) return
          const { fill, note } = counted
          await update($, context, () => fill)
          await update($, warned, w => Math.min(w, levelOf(fill.percent)))
          if (note === null) return
          // A success row in the chat; where none can be placed, a notice line says it.
          const id = `compacted-${roll()}`
          await update($, notes, n => ({ ...n, [id]: note }))
          const placed = await $.ui.place({ id }).catch(() => ({ isPlaced: false as const }))
          if (!placed.isPlaced) $.ui.log(`✓ Context compacted: ${noteText(note)}`)
        })
      }
      return result
    } catch (error) {
      await update($, compacting, () => 'no')
      throw error
    }
  })

  // /compact typed in the prompt: count again once the whole command is done.
  on('command.run', { command: 'compact' }, async ($, e, next) => {
    const result = await next(e)
    const usage = await $.session.usage({ breakdown: 'summary' }).catch(() => null)
    const counted = afterCompaction(await read($, context), usage)
    if (counted !== null) {
      const { fill, note } = counted
      await update($, context, () => fill)
      await update($, warned, w => Math.min(w, levelOf(fill.percent)))
      if (note !== null) {
        const id = `compacted-${roll()}`
        await update($, notes, n => ({ ...n, [id]: note }))
        const placed = await $.ui.place({ id }).catch(() => ({ isPlaced: false as const }))
        if (!placed.isPlaced) $.ui.log(`✓ Context compacted: ${noteText(note)}`)
      }
    }
    return result
  })

  // A new prompt wakes him.
  on('prompt.submit', async ($, e, next) => {
    generation += 1
    await update($, mood, () => 'idle')
    await update($, moodSeed, () => roll())

    return next(e)
  })

  // A turn done: a happy hop, then rest, then a nap if nothing else comes.
  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    // The turn a queued compaction waited for is over: it runs now.
    if (e.agentId === undefined) await update($, compacting, c => (c === 'queued' ? 'busy' : c))
    // A subagent's turn or an aborted one is no reason to celebrate.
    if (e.agentId !== undefined || e.isAborted || e.reason !== 'answer') return result
    const mine = (generation += 1)
    await update($, mood, m => (m === 'oops' ? m : 'happy'))
    await update($, moodSeed, () => roll())
    $.clock.after(HAPPY_MS, () => {
      if (mine === generation) void update($, mood, m => (m === 'happy' ? 'idle' : m))
    })
    $.clock.after(SLEEP_AFTER_MS, () => {
      if (mine === generation) {
        void update($, mood, () => 'sleep')
        void update($, moodSeed, () => roll())
      }
    })

    return result
  })

  // Each tool call: the context bar's Rix acts it out while it runs, and shakes when it fails.
  on('tool.call', async ($, e, next) => {
    const id = e.tool_use_id
    await update($, activeTool, () => ({ tool: e.tool, id }))

    try {
      const result = await next(e)
      if (result.deny !== undefined || result.isError === true) {
        await update($, mood, () => 'oops')
        await update($, moodSeed, () => roll())
        $.clock.after(OOPS_MS, () => {
          void update($, mood, m => (m === 'oops' ? 'idle' : m))
        })
      }

      return result
    } finally {
      await update($, activeTool, a => (a?.id === id ? null : a))
    }
  })

  // The working line and the tool rows are the app's own: it keeps its own status and running
  // mark there whatever a mod draws, so Rix stays on his stage above the context strip.

  // The success row a compaction placed in the chat: Rix with his broom and what was freed.
  on('ui.render', { component: 'Placed' }, async ($, e, next) => {
    if (e.props.plugin !== 'rix') return next(e)
    const note = (await read($, notes))[e.props.id]
    if (note === undefined) return next(e)

    if (e.surface === 'desktop' || e.surface === 'vscode') {
      const { Box, Svg, Text } = $.ui.resolve(e)

      return (
        <Box flexDirection="row" alignItems="center" gap={1}>
          {showRix ? (
            <Svg source={rixSvg('sweep', e.props.id)} alt="Rix, sweep" width={44} height={40} isInteractive />
          ) : null}
          <Text color={VIOLET} weight="semibold" size="footnote">
            ✓ Context compacted
          </Text>
          <Text dimColor size="footnote">
            {noteText(note)}
          </Text>
        </Box>
      )
    }

    if (e.surface === 'terminal') {
      const { Box, Text } = $.ui.resolve(e)

      return (
        <Box flexDirection="row">
          <Text color={VIOLET}>{showRix ? '◢◤ ' : ''}✓ Context compacted </Text>
          <Text dimColor>{noteText(note)}</Text>
        </Box>
      )
    }

    return next(e)
  })

  // The band above the prompt: Rix's mood and the tokens loaded in the session's context.
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) {
      return next(e)
    }

    const fill = await read($, context)
    const feeling = await read($, mood)
    const seed = await read($, moodSeed)
    const sweeping = await read($, compacting)
    const level = levelOf(fill?.percent ?? null)
    const running = await read($, activeTool)
    const shown = await read($, trick)
    const act = bandAct(feeling, e.props.isWorking, level, sweeping, running)
    // A stroll's two tricks, by the timer's count; a running tool's prop by its own id.
    const pair = [RIX_TRICKS[shown % RIX_TRICKS.length] ?? 'wave', RIX_TRICKS[(shown + 1) % RIX_TRICKS.length] ?? 'dance'] as const
    // The band's width in pixels, from its cells (89 measured in the desktop app), kept a little
    // under so the lane never runs past the strip's edge.
    const stageWidth = Math.max(200, Math.min(1600, Math.floor(e.props.bodyColumns * CELL_PX)))
    // Hidden, he is not drawn at all.
    const stage = !showRix
      ? ''
      : 'stroll' in act
        ? rixStroll(pair, `stroll-${shown}`, act.load, stageWidth)
        : rixStill(
            act.pose,
            running !== null && act.pose === toolPose(running.tool) ? running.id : seed,
            act.load === undefined ? {} : { load: act.load },
            stageWidth,
          )
    const alt = 'stroll' in act ? `Rix, stroll${act.load === null ? '' : ` with ${act.load}`}` : `Rix, ${act.pose}`
    const tint = countColor(level, VIOLET)
    // `~` until the next turn measures what a compaction left.
    const tokens = fill?.tokens == null ? '—' : `${fill.isEstimate === true ? '~' : ''}${compact(fill.tokens)}`
    const exact = fill?.tokens == null ? '' : ` (${fill.tokens.toLocaleString('en-US')})`
    const tail = fill ? ` / ${compact(fill.window)} tokens${fill.percent == null ? '' : ` · ${fill.percent}%`}` : ' tokens'

    if (e.surface === 'desktop') {
      const { Box, Button, Svg, Text } = $.ui.resolve(e)
      // Queued behind a turn or running: the button stands down until it is done.
      const isPending = sweeping === 'queued' || sweeping === 'busy'
      // Under 20% there is nothing worth compacting: no button until the first step.
      const isOffered = level >= 1
      // One click compacts, as /compact does. Every outcome says so in a toast, so a press that
      // goes nowhere is never silent: the press itself or the refusal.
      const compactNow = async () => {
        // A second press while one waits or runs does nothing.
        const now = await read($, compacting)
        if (now === 'queued' || now === 'busy') return
        $.ui.toast(e.props.isWorking ? 'Compacting once this turn ends…' : 'Compacting the conversation…')
        // A call skips its own plugin's hooks, so the state is set here too.
        await update($, compacting, () => (e.props.isWorking ? 'queued' : 'busy'))
        // Runs /compact exactly as if typed, queued until the session is idle: the desktop app
        // and other SDK hosts compact only that way, refusing $.session.compact.
        try {
          await $.command.run({ command: 'compact' })
          await update($, compacting, c => (c === 'queued' || c === 'busy' ? 'done' : c))
          $.clock.after(RELIEF_MS, () => {
            void update($, compacting, c => (c === 'done' ? 'no' : c))
          })
          // The measured figure stays the last response's until the next turn: count it now.
          const usage = await $.session.usage({ breakdown: 'summary' }).catch(() => null)
          const counted = afterCompaction(await read($, context), usage)
          if (counted !== null) {
            const { fill, note } = counted
            await update($, context, () => fill)
            await update($, warned, w => Math.min(w, levelOf(fill.percent)))
            if (note !== null) {
              const id = `compacted-${roll()}`
              await update($, notes, n => ({ ...n, [id]: note }))
              const placed = await $.ui.place({ id }).catch(() => ({ isPlaced: false as const }))
              if (!placed.isPlaced) $.ui.log(`✓ Context compacted: ${noteText(note)}`)
            }
          }
        } catch (error) {
          $.ui.toast(`Compaction did not run: ${error instanceof Error ? error.message : String(error)}`)
          await update($, compacting, () => 'no')
        }
      }

      // The bar spans the strip's text column: the lane's width less the Compact button's room.
      const barWidth = Math.max(120, stageWidth - 150)

      // Rix's lane on top, the strip under it. Every drawing is sized exactly, so none scrolls,
      // and the whole is a few rows of the twelve the band may take.
      return (
        <Box flexDirection="column">
          {/* Rix's lane: he walks the top of the strip end to end, a trick at each end. */}
          {showRix ? <Svg source={stage} alt={alt} width={stageWidth} height={STAGE_H} isInteractive /> : null}
          {/* The strip: tinted by how full the context is, its fill bar in the count's colour. */}
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
            paddingX={1}
            borderStyle="round"
            borderColor={tint}
            backgroundColor={stripBackground(level, VIOLET)}
          >
            <Box flexDirection="column" flexShrink={1}>
              <Box flexDirection="row" alignItems="center" gap={1}>
                <Text dimColor size="footnote">
                  Context
                </Text>
                <Text color={tint} weight="semibold" size="footnote">
                  {level >= 5 ? '⚠ ' : ''}
                  {tokens}
                </Text>
                <Text dimColor size="footnote" wrap="truncate-end">
                  {tail}
                </Text>
              </Box>
              {/* The coloured fill bar, sized exactly so its frame never scrolls. */}
              <Svg
                source={fillBar(fill?.percent ?? null, level, VIOLET, barWidth)}
                alt={`${fill?.percent ?? 0}% of the context used`}
                width={barWidth}
                height={BAR_H}
                isInteractive
              />
            </Box>
            {isPending || isOffered ? (
              <Box flexDirection="column" justifyContent="center" alignSelf="center">
                {isPending ? (
                  // Disabled: no Button to press, just where it stands.
                  <Text key="compact-pending" dimColor size="footnote">
                    {sweeping === 'queued' ? 'Compact queued…' : 'Compacting…'}
                  </Text>
                ) : (
                  <Button
                    key="compact"
                    label="Compact"
                    variant={level >= 3 ? 'primary' : 'secondary'}
                    onPress={() => void compactNow()}
                  />
                )}
              </Box>
            ) : null}
          </Box>
        </Box>
      )
    }

    if (e.surface === 'terminal') {
      const { Box, Text } = $.ui.resolve(e)

      return (
        <Box flexDirection="row">
          <Text dimColor>Context </Text>
          <Text color={tint} bold>
            {level >= 5 ? '⚠ ' : ''}
            {tokens}
          </Text>
          <Text dimColor>
            {tail}
            {exact}
          </Text>
        </Box>
      )
    }

    return next(e)
  })
}
