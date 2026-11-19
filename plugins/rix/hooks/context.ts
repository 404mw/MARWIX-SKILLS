// How full the context is, in the steps Rix reacts to: what he carries, what colour the count
// takes, and what he says when it crosses a step.
import type { RixLoad, RixPose } from './rix'

/** 0 under 20%, then 20%, 33%, 50%, 75% and 90%. */
export type Level = 0 | 1 | 2 | 3 | 4 | 5

const STEPS = [20, 33, 50, 75, 90] as const

export const levelOf = (percent: number | null): Level => {
  if (percent === null) return 0
  let level = 0
  for (const step of STEPS) if (percent >= step) level += 1
  return level as Level
}

/** The count's colour at each step: violet, then yellow through to red. */
export const countColor = (level: Level, violet: string): string =>
  [violet, '#FFD66B', '#FFB84C', '#FF9440', '#FF6B6B', '#FF4D4D'][level] ?? violet

/** The strip's background at each step: its count colour, faint, a little stronger as it fills. */
export const stripBackground = (level: Level, violet: string): string =>
  `${countColor(level, violet)}${['14', '1A', '22', '2A', '33', '40'][level] ?? '14'}`

/** The fill bar's height in CSS pixels; the caller gives its width, the same in markup and element. */
export const BAR_H = 10

/**
 * The fill bar under the count, `width` pixels wide: the share used in a gradient from violet to
 * the step's colour, a tick at each step, a shimmer running along it, pulsing from 75%.
 */
export const fillBar = (percent: number | null, level: Level, violet: string, width: number): string => {
  const p = Math.max(0, Math.min(100, percent ?? 0))
  const tint = countColor(level, violet)
  const ticks = [20, 33, 50, 75]
    .map(step => `<rect x="${step}%" y="0" width="1.5" height="${BAR_H}" fill="${p >= step ? '#ffffff' : tint}" opacity="${p >= step ? 0.55 : 0.45}"/>`)
    .join('')
  const pulse = level >= 4 ? '<animate attributeName="opacity" values="1;0.55;1" dur="0.9s" repeatCount="indefinite"/>' : ''
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${BAR_H}" viewBox="0 0 ${width} ${BAR_H}" style="display:block">` +
    `<defs><linearGradient id="fill-tint" x1="0" x2="1"><stop offset="0" stop-color="${violet}"/><stop offset="1" stop-color="${tint}"/></linearGradient>` +
    `<clipPath id="fill-clip"><rect x="0" y="2" width="${p}%" height="6" rx="3"/></clipPath></defs>` +
    `<rect x="0" y="2" width="100%" height="6" rx="3" fill="${tint}" opacity="0.25"/>` +
    `<g clip-path="url(#fill-clip)"><rect x="0" y="2" width="${p}%" height="6" fill="url(#fill-tint)">${pulse}</rect>` +
    `<rect y="2" width="14%" height="6" fill="#ffffff" opacity="0.3"><animate attributeName="x" values="-14%;${p}%" dur="2.4s" repeatCount="indefinite"/></rect></g>` +
    ticks +
    '</svg>'
  )
}

/** What he carries below 50%, over whatever mood he is in. */
export const loadOf = (level: Level): RixLoad => (level === 1 ? 'pack' : level === 2 ? 'bigpack' : null)

/** The pose that takes over from 50% up, or with his mood idle from 20%. */
export const levelPose = (level: Level, isIdle: boolean): RixPose | null =>
  level >= 5 ? 'panic' : level === 4 ? 'alarm' : level === 3 ? 'warn' : isIdle && level === 2 ? 'heavy' : isIdle && level === 1 ? 'nudge' : null

/** The toast for crossing a step; none for 90%, where auto-compact is about to take over. */
export const toastFor = (level: Level, percent: number): string | null => {
  switch (level) {
    case 1:
      return `Context at ${percent}%: a good moment to /compact soon`
    case 2:
      return `Context at ${percent}% used`
    case 3:
      return `Context at ${percent}%: best time to /compact`
    case 4:
      return `Context at ${percent}%: compact now, before auto-compact`
    default:
      return null
  }
}
