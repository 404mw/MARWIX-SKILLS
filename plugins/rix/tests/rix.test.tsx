import { expect, mock, test } from 'claude-code/testing'

import { RIX_TRICKS, rixSvg } from '../hooks/rix'

const BAND = {
  plugin: 'rix',
  component: 'AbovePrompt',
  requestId: 'above-prompt',
  props: {
    hasSurvey: false,
    isCollapsed: false,
    isWorking: false,
    maxRows: 10,
    bodyColumns: 80,
    scroll: { offset: 0, bodyRows: 10 },
    view: {},
  },
} as const

type BandProps = { [K in keyof typeof BAND.props]: (typeof BAND.props)[K] extends boolean ? boolean : (typeof BAND.props)[K] }

// What the engine adds to a command typed at the prompt.
const TYPED = { origin: { kind: 'composer' }, presentation: { isFullscreen: false, columns: 80 } } as const

// The test runtime has timers; the mod's types leave them out.
const wait = (ms: number) =>
  new Promise<void>(resolve => (globalThis as unknown as { setTimeout: (f: () => void, ms: number) => void }).setTimeout(resolve, ms))

const SPINNER = {
  plugin: 'rix',
  component: 'Spinner',
  requestId: 'main',
  props: { word: 'Thinking', message: null, suffix: '…', mode: 'thinking' },
} as const

const TOOL = {
  plugin: 'rix',
  component: 'ToolUse',
  requestId: 'toolu_1',
  props: {
    tool_use_id: 'toolu_1',
    tool: 'Edit',
    input: { file_path: 'C:\\x\\hooks\\register.tsx', old_string: 'a', new_string: 'b' },
    isRunning: true,
    isErrored: false,
    isInterrupted: false,
    isExpanded: false,
  },
} as const

test('tool rows are the app\'s own, running or not: no second status row', async ($, on) => {
  on('ui.render', ($, e) => {
    const { Text } = $.ui.resolve(e)

    return <Text>engine</Text>
  })

  for (const isRunning of [true, false]) {
    const row = await $.ui.mount({ ...TOOL, surface: 'desktop', props: { ...TOOL.props, isRunning } })
    expect((await row.find({ type: 'Text' }))?.text).toBe('engine')
    expect(await row.find({ type: 'Svg' })).toBeUndefined()
    await row.unmount()
  }
})

test('the band shows the context tokens; the working line is the app\'s own', async ($, on) => {
  on('theme.set', () => ({ value: { isDrawn: true, requestId: 'theme' } }))
  on('ui.render', { component: 'Spinner' }, ($, e) => {
    const { Text } = $.ui.resolve(e)

    return <Text>engine</Text>
  })
  on('session.usage', () => ({
    value: { startedAt: 0, context: { tokens: 45213, window: 200000, percent: 23 }, rateLimits: [] },
  }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('command.register', (_, e) => ({ value: { command: e.name } }) as never)

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })

  for (const surface of ['terminal', 'desktop'] as const) {
    const band = await $.ui.mount({ ...BAND, surface })
    expect((await band.find({ type: 'Text', text: /45\.2k/ }))?.text).toBe('45.2k')
    expect(await band.find({ type: 'Text', text: /200k tokens · 23%/ })).toBeDefined()
    await band.unmount()

    const spinner = await $.ui.mount({ ...SPINNER, surface })
    expect((await spinner.find({ type: 'Text' }))?.text).toBe('engine')
    expect(await spinner.find({ type: 'Svg' })).toBeUndefined()
    await spinner.unmount()
  }
})

test('Rix shakes when a tool call fails, hops when a turn ends, naps when left alone', async ($, on) => {
  const clock = mock.clock(on)
  on('tool.call', () => ({ deny: 'not allowed' }))
  on('turn.complete', () => ({ text: 'done' }))

  const alt = async () => {
    const band = await $.ui.mount({ ...BAND, surface: 'desktop' })
    const svg = await band.find({ type: 'Svg' })
    await band.unmount()
    return svg?.props.alt
  }

  await $.tool.call({ tool: 'Bash', command: 'false' })
  expect(await alt()).toBe('Rix, oops')
  await clock.advance(3_100)
  expect(await alt()).toBe('Rix, stroll')

  // A subagent's turn ending is not the person's: no hop.
  const turn = { answer: 'done', durationMs: 1000, isAborted: false, turnId: 't1', reason: 'answer' } as const
  await $.turn.complete({ ...turn, agentId: 'a1' })
  expect(await alt()).toBe('Rix, stroll')

  await $.turn.complete(turn)
  expect(await alt()).toBe('Rix, happy')
  await clock.advance(4_100)
  expect(await alt()).toBe('Rix, stroll')
  await clock.advance(3 * 60_000)
  expect(await alt()).toBe('Rix, sleep')
})

test('the context bar\'s Rix acts out each running tool, then lets go', async ($, on) => {
  const seen: Record<string, { alt: unknown; source: string }> = {}
  // Stands for the tool running: the bar is looked at while it does.
  on('tool.call', async (_, e) => {
    const bar = await $.ui.mount({ ...BAND, surface: 'desktop', props: { ...BAND.props, isWorking: true } })
    const svg = await bar.find({ type: 'Svg' })
    seen[e.tool] = { alt: svg?.props.alt, source: String(svg?.props.source) }
    await bar.unmount()
    return { result: {} } as never
  })

  await $.tool.call({ tool: 'Edit', file_path: '/x.ts', old_string: 'a', new_string: 'b' } as never)
  await $.tool.call({ tool: 'Bash', command: 'ls' })
  await $.tool.call({ tool: 'Grep', pattern: 'x' } as never)

  // Typing moves the arms, a command moves the feet, a search sweeps the eyes.
  expect(seen.Edit?.alt).toBe('Rix, type')
  expect(seen.Edit?.source).toContain('translate(-7 7)')
  expect(seen.Bash?.alt).toBe('Rix, run')
  expect(seen.Bash?.source).toContain('keyTimes="0;0.25;0.5;1"')
  expect(seen.Grep?.alt).toBe('Rix, scan')
  expect(seen.Grep?.source).toContain('-6 0;6 0')

  // Done: back to his own mood.
  const bar = await $.ui.mount({ ...BAND, surface: 'desktop' })
  expect((await bar.find({ type: 'Svg' }))?.props.alt).toBe('Rix, stroll')
  await bar.unmount()
})

test('Rix reacts to how full the context is, toasts each step once, and compacts in one click', async ($, on) => {
  mock.clock(on)
  const toasts: string[] = []
  let compactions = 0
  on('ui.toast', (_, e) => {
    toasts.push(e.text)
    return { value: undefined }
  })
  on('command.run', (_, e) => {
    if (e.command === 'compact') compactions += 1
    return { text: '' }
  })
  on('session.measure', (_, e) => ({ changed: e.changed }))

  const measure = (percent: number) =>
    $.session.measure({
      context: { tokens: percent * 10_000, window: 1_000_000, percent },
      rateLimits: [],
      changed: ['context'],
    })
  const band = async () => {
    const ui = await $.ui.mount({ ...BAND, surface: 'desktop' })
    const alt = (await ui.find({ type: 'Svg' }))?.props.alt
    await ui.unmount()
    return { alt }
  }

  await measure(10)
  expect((await band()).alt).toBe('Rix, stroll')
  await measure(22)
  expect((await band()).alt).toBe('Rix, stroll with pack')
  await measure(35)
  expect((await band()).alt).toBe('Rix, stroll with bigpack')
  await measure(52)
  expect((await band()).alt).toBe('Rix, warn')
  await measure(53)
  await measure(80)
  expect((await band()).alt).toBe('Rix, alarm')
  await measure(93)
  expect((await band()).alt).toBe('Rix, panic')

  // One toast per step on the way up, none twice, none at 90%.
  const steps = () => toasts.filter(t => t.startsWith('Context'))
  expect(steps().length).toBe(4)
  expect(steps()[2]).toContain('best time to /compact')

  const ui = await $.ui.mount({ ...BAND, surface: 'desktop' })
  await ui.press({ key: 'compact' })
  expect(compactions).toBe(1)
  // The press always says what happened.
  expect(toasts).toContain('Compacting the conversation…')
  await ui.unmount()

  // The context drops after compacting: relief, and the steps re-arm.
  await measure(5)
  expect((await band()).alt).toBe('Rix, sweep')
  await measure(21)
  expect(steps().length).toBe(5)
})

test('the button runs /compact as if typed, which the desktop app needs', async ($, on) => {
  mock.clock(on)
  const toasts: string[] = []
  const submitted: string[] = []
  on('ui.toast', (_, e) => {
    toasts.push(e.text)
    return { value: undefined }
  })
  on('command.run', (_, e) => {
    submitted.push(`/${e.command}`)
    return { text: '' }
  })
  on('session.measure', (_, e) => ({ changed: e.changed }))
  await $.session.measure({ context: { tokens: 300_000, window: 1_000_000, percent: 30 }, rateLimits: [], changed: ['context'] })

  const ui = await $.ui.mount({ ...BAND, surface: 'desktop' })
  await ui.press({ key: 'compact' })
  await ui.unmount()

  expect(submitted).toEqual(['/compact'])
  expect(toasts.some(t => t.startsWith('Compaction did not run'))).toBe(false)
})

test('pressed mid-turn, the button stands down until the queued compaction is done', async ($, on) => {
  mock.clock(on)
  on('ui.toast', () => ({ value: undefined }))
  let release = () => {}
  let runs = 0
  // Stands for the engine holding /compact until the turn ends.
  on('command.run', () => {
    runs += 1
    return new Promise(resolve => {
      release = () => resolve({ text: '' })
    })
  })
  on('turn.complete', () => ({ text: 'done' }))
  on('session.measure', (_, e) => ({ changed: e.changed }))
  await $.session.measure({ context: { tokens: 300_000, window: 1_000_000, percent: 30 }, rateLimits: [], changed: ['context'] })

  const working = { ...BAND, surface: 'desktop', props: { ...BAND.props, isWorking: true } } as const
  const settle = () => wait(20)
  const ui = await $.ui.mount(working)
  // The press settles only once /compact has run, so it is left to run while the band is read.
  const pressed = ui.press({ key: 'compact' })
  await settle()

  // Queued: no button to press, a dim note in its place, Rix still at the turn.
  expect(await ui.find({ type: 'Button' })).toBeUndefined()
  expect(await ui.find({ type: 'Text', text: /Compact queued…/ })).toBeDefined()
  expect((await ui.find({ type: 'Svg' }))?.props.alt).toBe('Rix, work')

  // The turn ends: it runs, and the button is still down.
  await $.turn.complete({ answer: 'ok', durationMs: 1, isAborted: false, turnId: 't', reason: 'answer' })
  await settle()
  expect(await ui.find({ type: 'Text', text: /Compacting…/ })).toBeDefined()
  expect(await ui.find({ type: 'Button' })).toBeUndefined()

  release()
  await pressed
  expect(runs).toBe(1)
  expect(await ui.find({ type: 'Button' })).toBeDefined()
  await ui.unmount()
})

test('after a compaction the strip counts what is left, without waiting for a turn', async ($, on) => {
  mock.clock(on)
  on('ui.toast', () => ({ value: undefined }))
  on('session.measure', (_, e) => ({ changed: e.changed }))
  on('session.usage', (_, e) => ({
    value: {
      startedAt: 0,
      context: {
        tokens: 520_000,
        window: 1_000_000,
        percent: 52,
        ...(e?.breakdown ? { breakdown: { totalTokens: 86_900 } as never } : {}),
      },
      rateLimits: [],
    },
  }))
  on('command.run', () => ({ text: 'Compacted' }))
  const placed: string[] = []
  on('ui.place', (_, e) => {
    placed.push(e.id)
    return { value: { isPlaced: true, requestId: `row-${e.id}` } }
  })

  await $.session.measure({ context: { tokens: 520_000, window: 1_000_000, percent: 52 }, rateLimits: [], changed: ['context'] })
  const band = async () => {
    const ui = await $.ui.mount({ ...BAND, surface: 'desktop' })
    const count = (await ui.find({ type: 'Text', text: /k$/ }))?.text
    const tail = (await ui.find({ type: 'Text', text: /tokens/ }))?.text
    await ui.unmount()
    return { count, tail }
  }
  expect((await band()).count).toBe('520k')

  // Typed /compact: the plugin's hook counts again once the command is done.
  await $.command.run({ command: 'compact', args: '', ...TYPED })
  const after = await band()
  expect(after.count).toBe('~86.9k')
  expect(after.tail).toContain('9%')

  // One success row in the chat, saying what was freed.
  expect(placed.length).toBe(1)
  const row = await $.ui.mount({
    plugin: 'rix',
    component: 'Placed',
    requestId: `row-${placed[0]}`,
    surface: 'desktop',
    props: { id: placed[0]!, plugin: 'rix' },
  })
  expect(await row.find({ type: 'Text', text: /Context compacted/ })).toBeDefined()
  expect((await row.find({ type: 'Text', text: /freed/ }))?.text).toBe('520k → ~86.9k tokens (52% → 9%) · freed 433k')
  expect((await row.find({ type: 'Svg' }))?.props.alt).toBe('Rix, sweep')
  await row.unmount()

  // Counting the same compaction again posts no second row.
  await $.command.run({ command: 'compact', args: '', ...TYPED })
  expect(placed.length).toBe(1)

  // The next turn's measure is exact again.
  await $.session.measure({ context: { tokens: 90_000, window: 1_000_000, percent: 9 }, rateLimits: [], changed: ['context'] })
  expect((await band()).count).toBe('90.0k')
})

test('no Compact button under 20%: it shows from the first step', async ($, on) => {
  on('session.measure', (_, e) => ({ changed: e.changed }))
  const button = async (percent: number) => {
    await $.session.measure({ context: { tokens: percent * 10_000, window: 1_000_000, percent }, rateLimits: [], changed: ['context'] })
    const ui = await $.ui.mount({ ...BAND, surface: 'desktop' })
    const found = await ui.find({ type: 'Button' })
    await ui.unmount()
    return found
  }

  expect(await button(5)).toBeUndefined()
  expect(await button(19)).toBeUndefined()
  expect(await button(20)).toBeDefined()
  expect(await button(60)).toBeDefined()
  // Compacted back under 20%: it goes again.
  expect(await button(8)).toBeUndefined()
})

test('idle, Rix strolls the stage above the strip, a new pair of tricks each stroll', async ($, on) => {
  const clock = mock.clock(on)
  on('theme.set', () => ({ value: { isDrawn: true, requestId: 'theme' } }))
  on('session.usage', () => ({ value: { startedAt: 0, context: { tokens: 0, window: 200000, percent: 0 }, rateLimits: [] } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('command.register', (_, e) => ({ value: { command: e.name } }) as never)

  const stage = async (props: Partial<BandProps> = {}) => {
    const band = await $.ui.mount({ ...BAND, surface: 'desktop', props: { ...BAND.props, ...props } })
    const svg = await band.find({ type: 'Svg' })
    await band.unmount()
    return { alt: String(svg?.props.alt), source: String(svg?.props.source) }
  }

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const first = await stage()
  expect(first.alt).toBe('Rix, stroll')
  // A lane as wide as the band (80 cells here), him walking it there and back, facing his way.
  expect(first.source).toContain('width="560" height="44"')
  expect(first.source).toContain('values="0;511;511;0;0"')
  expect(first.source).toContain('scale(-1 1)')

  // Slow: 34 seconds there and back, most of it walking.
  expect(first.source).toContain('dur="34s"')
  expect(first.source).toContain('keyTimes="0;0.34;0.5;0.84;1"')
  // He never turns round in place, flat or in 3D: only the walk back faces him the other way.
  expect(first.source).not.toContain('type="rotate" values="0 50 50')
  expect(first.source).not.toContain('0.06 1;-1 1')

  await clock.advance(34_100)
  expect((await stage()).source).not.toBe(first.source)

  // At work he stops strolling.
  expect((await stage({ isWorking: true })).alt).toBe('Rix, work')
})

test('the strip\'s background and fill bar follow the context, step by step', async ($, on) => {
  on('session.measure', (_, e) => ({ changed: e.changed }))
  on('ui.toast', () => ({ value: undefined }))
  const strip = async (percent: number) => {
    await $.session.measure({ context: { tokens: percent * 10_000, window: 1_000_000, percent }, rateLimits: [], changed: ['context'] })
    const band = await $.ui.mount({ ...BAND, surface: 'desktop' })
    const boxes = await band.findAll({ type: 'Box' })
    const svgs = await band.findAll({ type: 'Svg' })
    await band.unmount()
    const tinted = boxes.find(b => b.props.backgroundColor !== undefined)
    return { background: String(tinted?.props.backgroundColor), bar: svgs[1], svgs }
  }

  const low = await strip(10)
  const mid = await strip(52)
  const high = await strip(80)
  expect(low.background.startsWith('#B69CFF')).toBe(true)
  expect(mid.background).not.toBe(low.background)
  expect(high.background).not.toBe(mid.background)
  // The coloured bar fills to the share used, pulsing from 75%.
  expect(String(mid.bar?.props.alt)).toBe('52% of the context used')
  expect(String(mid.bar?.props.source)).toContain('width="52%"')
  expect(String(high.bar?.props.source)).toContain('values="1;0.55;1"')
  expect(String(low.bar?.props.source)).not.toContain('values="1;0.55;1"')
  // Both drawings are sized exactly, markup and element alike, so neither frame can scroll.
  expect(mid.svgs[0]?.props.width).toBe(560)
  expect(mid.svgs[0]?.props.height).toBe(44)
  expect(mid.bar?.props.width).toBe(410)
  expect(mid.bar?.props.height).toBe(10)
  expect(String(mid.bar?.props.source)).toContain('width="410" height="10"')
})

test('with "Show Rix" off the strip stands alone, the compaction note too', { options: { showRix: false } }, async ($, on) => {
  on('session.measure', (_, e) => ({ changed: e.changed }))
  on('ui.toast', () => ({ value: undefined }))
  await $.session.measure({ context: { tokens: 520_000, window: 1_000_000, percent: 52 }, rateLimits: [], changed: ['context'] })

  const band = await $.ui.mount({ ...BAND, surface: 'desktop' })
  const svgs = await band.findAll({ type: 'Svg' })
  // Only the fill bar: no lane, no Rix.
  expect(svgs.length).toBe(1)
  expect(String(svgs[0]?.props.alt)).toBe('52% of the context used')
  expect(await band.find({ type: 'Text', text: /^Context$/ })).toBeDefined()
  expect(await band.find({ type: 'Button' })).toBeDefined()
  await band.unmount()
})

test('/rix flips the "Show Rix" setting, and says when there is nothing to change', async ($, on) => {
  const rows = [
    {
      key: 'rix.showRix',
      label: 'Show Rix',
      kind: 'toggle',
      value: true,
      provider: { plugin: 'rix', tier: 'plugin' },
      isLocked: false,
    },
  ]
  const set: unknown[] = []
  on('config.list', () => ({ value: rows }) as never)
  on('config.set', (_, e) => {
    set.push([e.key, e.value])
    return { value: e.value }
  })
  on('command.run', () => ({ text: 'engine' }))

  expect((await $.command.run({ command: 'rix', args: 'show', ...TYPED })).text).toBe('Rix is already out.')
  expect(set).toEqual([])
  expect((await $.command.run({ command: 'rix', args: 'dance', ...TYPED })).text).toContain('Usage')
  expect((await $.command.run({ command: 'rix', args: '', ...TYPED })).text).toBe('Rix is hidden. /rix brings him back.')
  expect((await $.command.run({ command: 'rix', args: 'HIDE', ...TYPED })).text).toBe('Rix is hidden. /rix brings him back.')
  expect(set).toEqual([
    ['rix.showRix', false],
    ['rix.showRix', false],
  ])
})

test('every trick and his walk draw a whole Rix', async () => {
  expect(RIX_TRICKS.length).toBe(6)
  for (const t of [...RIX_TRICKS, 'walk' as const, 'idle' as const, 'happy' as const]) {
    for (const seed of [0, 1, 2, 3, 4, 5, 6, 7]) {
      const svg = rixSvg(t, `trick-${seed}`)
      expect(svg.startsWith('<svg')).toBe(true)
      expect(svg).not.toContain('undefined')
      // No turning round, flat or 3D, in any trick or mood.
      expect(svg).not.toContain('-360 50 50')
      expect(svg).not.toContain('0.06 1;-1 1')
    }
  }
})
