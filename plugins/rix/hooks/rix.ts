// Rix as an animated, extruded SVG: a pose for each thing happening in the session, a face to
// match, and a prop or hat picked at random for each moment (the same pick for the same moment,
// so a redraw never swaps it). Every animation is SMIL, so it plays in an image or a frame alike.

export const VIOLET = '#B69CFF'

const C = {
  violet: VIOLET,
  depth: ['#46348A', '#5641A3', '#684FBC', '#7C62D4'], // back to front
  cream: '#F6F2FF',
  ink: '#2A2140',
  yellow: '#FFD66B',
  pink: '#FF8FB1',
  cyan: '#7FD8FF',
  coral: '#FF7A7A',
  orange: '#FFA24C',
  gray: '#A8A2BD',
  cloud: '#8C86A3',
  blue: '#7FA8FF',
  white: '#FFFFFF',
  coffee: '#7A4E2D',
}

/** What Rix is doing. */
export type RixPose =
  | 'idle' // between turns
  | 'work' // waiting on the model
  | 'think' // thinking
  | 'talk' // writing the reply
  | 'type' // editing a file
  | 'run' // running a command or an agent
  | 'scan' // reading or searching files
  | 'surf' // fetching from the web or a connector
  | 'happy' // a turn just finished
  | 'oops' // a tool call failed
  | 'sleep' // nothing for a while
  | 'nudge' // context past 20%: glances at the counter, a small backpack on
  | 'heavy' // past 33%: a bigger backpack, wobbling under it
  | 'warn' // past 50%: a worried look and a sign pointing at the button
  | 'alarm' // past 75%: pinned under a toppling stack of boxes, a red light flashing
  | 'panic' // past 90%: squashed flat under the pile, dizzy
  | 'sweep' // compacting, and just after: sweeping up with a broom
  | 'walk' // strolling along the top of the context strip
  // Tricks, done at each end of his stroll:
  | 'wave' // hopping and waving hello, a speech bubble over his head
  | 'juggle' // three balls in the air, arms bobbing
  | 'bounce' // a big jump, squashing on landing
  | 'cheer' // arms up and down, hopping on the spot
  | 'dance' // a moonwalk shuffle with headphones on
  | 'magic' // top hat and wand, stars trailing

/** What the context is weighing on him, drawn whatever his pose. */
export type RixLoad = 'pack' | 'bigpack' | 'boxes' | null

// ---------------------------------------------------------------------------------------------
// SMIL helpers

const R = 'repeatCount="indefinite"'
const anim = (attr: string, values: string, dur: string, extra = '') =>
  `<animate attributeName="${attr}" values="${values}" dur="${dur}" ${R} ${extra}/>`
const tr = (values: string, dur: string, extra = '') =>
  `<animateTransform attributeName="transform" type="translate" values="${values}" dur="${dur}" ${R} ${extra}/>`
const rot = (values: string, dur: string, extra = '') =>
  `<animateTransform attributeName="transform" type="rotate" values="${values}" dur="${dur}" ${R} ${extra}/>`
const scl = (values: string, dur: string, extra = '') =>
  `<animateTransform attributeName="transform" type="scale" values="${values}" dur="${dur}" ${R} ${extra}/>`
/** A group placed at `x y`, its children animated by `motion` around that point. */
const at = (x: number, y: number, motion: string, body: string) =>
  `<g transform="translate(${x} ${y})"><g>${motion}${body}</g></g>`

// ---------------------------------------------------------------------------------------------
// Faces: the eyes are cut out of the body, so each shape is drawn black in its mask.

type Eye = 'open' | 'wide' | 'squint' | 'closed' | 'happy' | 'x' | 'star' | 'heart' | 'spiral'

const blinkOf = (y: number, h: number, dur: string) =>
  anim('height', `${h};${h};1.5;${h}`, dur, 'keyTimes="0;0.93;0.96;1"') +
  anim('y', `${y};${y};${y + h / 2};${y}`, dur, 'keyTimes="0;0.93;0.96;1"')

const starPoints = (cx: number, cy: number, r: number, inner: number) =>
  Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2
    const d = i % 2 === 0 ? r : inner
    return `${(cx + Math.cos(a) * d).toFixed(1)},${(cy + Math.sin(a) * d).toFixed(1)}`
  }).join(' ')

const eyeShape = (kind: Eye, cx: number, cy: number, blink: string | null): string => {
  switch (kind) {
    case 'open':
      return `<rect x="${cx - 7}" y="${cy - 7}" width="14" height="14">${blink ? blinkOf(cy - 7, 14, blink) : ''}</rect>`
    case 'wide':
      return `<rect x="${cx - 9}" y="${cy - 9}" width="18" height="18">${blink ? blinkOf(cy - 9, 18, blink) : ''}</rect>`
    case 'squint':
      return `<rect x="${cx - 8}" y="${cy - 1}" width="16" height="5"/>`
    case 'closed':
      return `<rect x="${cx - 8}" y="${cy + 1}" width="16" height="3"/>`
    case 'happy':
      return `<path d="M${cx - 8} ${cy + 4}L${cx} ${cy - 4}L${cx + 8} ${cy + 4}" fill="none" stroke="#000" stroke-width="4.5"/>`
    case 'x':
      return `<path d="M${cx - 6} ${cy - 6}L${cx + 6} ${cy + 6}M${cx + 6} ${cy - 6}L${cx - 6} ${cy + 6}" stroke="#000" stroke-width="4"/>`
    case 'star':
      return `<g transform="translate(${cx} ${cy})"><g>${scl('1;0.75;1', '0.6s')}<polygon points="${starPoints(0, 0, 10, 4.2)}"/></g></g>`
    case 'heart':
      return `<g transform="translate(${cx} ${cy})"><g>${scl('1;0.8;1', '0.5s')}<path d="M0 8L-8 0A4.5 4.5 0 0 1 0 -5A4.5 4.5 0 0 1 8 0Z"/></g></g>`
    case 'spiral':
      return `<g transform="translate(${cx} ${cy})"><g>${rot('0;360', '0.9s')}<path d="M0 -6A6 6 0 1 1 -6 0" fill="none" stroke="#000" stroke-width="3"/><rect x="-1.5" y="-1.5" width="3" height="3"/></g></g>`
  }
}

type Face = { left: Eye; right: Eye; look?: string; sweep?: string; blink?: string; brows?: 'worried' }

/** Brows cut above the eyes: `worried` raises their inner ends. */
const browsOf = (kind: 'worried' | undefined) =>
  kind === 'worried'
    ? `<path d="M22 39L37 33M63 33L78 39" fill="none" stroke="#000" stroke-width="3.5"/>`
    : ''

// ---------------------------------------------------------------------------------------------
// Props held in the right hand: drawn with the hand at 0 0, reaching up and right.

type Hand =
  | 'pencil'
  | 'brush'
  | 'rocket'
  | 'bolt'
  | 'gear'
  | 'binoculars'
  | 'flashlight'
  | 'globe'
  | 'antenna'
  | 'bulb'
  | 'megaphone'
  | 'popper'
  | 'balloon'
  | 'trophy'
  | 'mug'
  | 'yoyo'
  | 'umbrella'
  | 'sign'
  | 'broom'
  | 'wand'

const gearPoints = (() => {
  const pts: string[] = []
  for (let i = 0; i < 16; i += 1) {
    const a = (Math.PI / 8) * i
    const r1 = i % 2 === 0 ? 10 : 7.5
    const a1 = a - Math.PI / 20
    const a2 = a + Math.PI / 20
    pts.push(`${(Math.cos(a1) * r1).toFixed(1)},${(Math.sin(a1) * r1).toFixed(1)}`)
    pts.push(`${(Math.cos(a2) * r1).toFixed(1)},${(Math.sin(a2) * r1).toFixed(1)}`)
  }
  return pts.join(' ')
})()

const hands: Record<Hand, string> = {
  pencil:
    `<g>${rot('-60;-35;-60', '0.32s')}` +
    `<rect x="0" y="-3.5" width="20" height="7" fill="${C.yellow}"/>` +
    `<rect x="-5" y="-3.5" width="5" height="7" fill="${C.pink}"/>` +
    `<rect x="-1" y="-3.5" width="2" height="7" fill="${C.gray}"/>` +
    `<polygon points="20,-3.5 28,0 20,3.5" fill="${C.cream}"/>` +
    `<polygon points="25.4,-1.2 28,0 25.4,1.2" fill="${C.ink}"/></g>`,
  brush:
    `<g>${rot('-50;-25;-50', '0.45s')}` +
    `<rect x="-4" y="-2.5" width="18" height="5" fill="${C.ink}"/>` +
    `<rect x="14" y="-3.5" width="4" height="7" fill="${C.gray}"/>` +
    `<path d="M18 -4Q26 -4 30 0Q26 4 18 4Z" fill="${C.pink}"/></g>` +
    [0, 1, 2]
      .map(
        i =>
          `<circle cx="${24 + i * 3}" cy="${-14 - i * 4}" r="${1.6 - i * 0.3}" fill="${[C.pink, C.yellow, C.cyan][i]}" opacity="0">` +
          anim('opacity', '0;1;0', '0.9s', `begin="${i * 0.3}s"`) +
          '</circle>',
      )
      .join(''),
  rocket:
    `<g>${tr('0 0;0.7 -0.5;-0.7 0.5;0 0', '0.16s')}` +
    `<path d="M4 -8V-26Q9 -38 14 -26V-8Z" fill="${C.cream}"/>` +
    `<circle cx="9" cy="-21" r="3" fill="${C.cyan}" stroke="${C.ink}" stroke-width="1.2"/>` +
    `<polygon points="4,-15 -1,-6 4,-8" fill="${C.pink}"/><polygon points="14,-15 19,-6 14,-8" fill="${C.pink}"/>` +
    at(9, -8, scl('1 1;1 1.7;1 0.9;1 1.5;1 1', '0.25s'), `<polygon points="-4,0 4,0 0,9" fill="${C.orange}"/><polygon points="-2,0 2,0 0,5" fill="${C.yellow}"/>`) +
    '</g>',
  bolt: at(
    2,
    -34,
    anim('opacity', '1;0.3;1;1', '0.5s'),
    `<polygon points="8,0 18,0 12,11 19,11 4,30 8,16 1,16" fill="${C.yellow}" stroke="${C.orange}" stroke-width="1.2"/>`,
  ),
  gear: at(12, -14, rot('0;360', '1.6s'), `<polygon points="${gearPoints}" fill="${C.cream}"/><circle r="3.5" fill="${C.depth[0]}"/>`),
  binoculars:
    `<g>${rot('-10;10;-10', '2.4s')}` +
    `<rect x="0" y="-17" width="9" height="15" rx="2" fill="${C.ink}"/><rect x="11" y="-17" width="9" height="15" rx="2" fill="${C.ink}"/>` +
    `<rect x="8" y="-13" width="4" height="5" fill="${C.gray}"/>` +
    `<circle cx="4.5" cy="-17" r="3.6" fill="${C.cyan}"/><circle cx="15.5" cy="-17" r="3.6" fill="${C.cyan}"/>` +
    `<circle cx="3.4" cy="-18.2" r="1.2" fill="${C.white}"/><circle cx="14.4" cy="-18.2" r="1.2" fill="${C.white}"/></g>`,
  flashlight:
    `<g>${rot('-35;5;-35', '2.4s')}` +
    `<polygon points="22,-4 62,-24 62,20 22,4" fill="${C.yellow}" opacity="0.3">${anim('opacity', '0.15;0.4;0.15', '0.8s')}</polygon>` +
    `<rect x="0" y="-3" width="16" height="6" fill="${C.ink}"/><polygon points="16,-3 22,-5.5 22,5.5 16,3" fill="${C.gray}"/></g>`,
  globe:
    `<line x1="0" y1="0" x2="8" y2="-7" stroke="${C.gray}" stroke-width="2.5"/>` +
    at(
      13,
      -17,
      rot('-12;12;-12', '3s'),
      `<circle r="10" fill="${C.cyan}"/>` +
        `<ellipse rx="10" ry="3.5" fill="none" stroke="#2F6FA8" stroke-width="1.2"/>` +
        `<ellipse rx="10" ry="10" fill="none" stroke="#2F6FA8" stroke-width="1.2">${anim('rx', '10;0.5;10', '1.4s')}</ellipse>` +
        `<ellipse cx="0" cy="-2" rx="3" ry="2.2" fill="#5BC48A">${anim('cx', '-7;7', '1.4s')}${anim('opacity', '0;1;1;0', '1.4s')}</ellipse>`,
    ),
  antenna:
    `<line x1="0" y1="0" x2="5" y2="-12" stroke="${C.gray}" stroke-width="2.5"/>` +
    at(5, -14, rot('-15;10;-15', '2s'), `<path d="M-9 -4Q2 8 14 -8Z" fill="${C.cream}"/><line x1="2" y1="1" x2="9" y2="-10" stroke="${C.ink}" stroke-width="1.5"/><circle cx="9" cy="-10" r="2" fill="${C.pink}"/>`) +
    [0, 1, 2]
      .map(
        i =>
          `<path d="M${20 + i * 5} ${-34 - i * 4}A${6 + i * 5} ${6 + i * 5} 0 0 1 ${20 + i * 5} ${-14 + i * 4}" transform="rotate(-35 14 -24)" fill="none" stroke="${C.cyan}" stroke-width="2" opacity="0">` +
          anim('opacity', '0;1;0', '1.2s', `begin="${i * 0.3}s"`) +
          '</path>',
      )
      .join(''),
  bulb: at(
    12,
    -24,
    '',
    `<circle r="15" fill="${C.yellow}" opacity="0.2">${anim('opacity', '0.08;0.4;0.08', '1.1s')}</circle>` +
      [0, 1, 2, 3, 4, 5]
        .map(i => {
          const a = (Math.PI / 3) * i - Math.PI / 2
          const x1 = (Math.cos(a) * 11).toFixed(1)
          const y1 = (Math.sin(a) * 11).toFixed(1)
          const x2 = (Math.cos(a) * 15).toFixed(1)
          const y2 = (Math.sin(a) * 15).toFixed(1)
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.yellow}" stroke-width="2">${anim('opacity', '1;0.2;1', '0.55s', `begin="${i * 0.09}s"`)}</line>`
        })
        .join('') +
      `<circle r="8" fill="${C.yellow}"/><rect x="-4" y="7" width="8" height="5" fill="${C.gray}"/>` +
      `<path d="M-3 -1L0 2.5L3 -1" stroke="${C.orange}" fill="none" stroke-width="1.5"/>`,
  ),
  megaphone:
    `<g>${rot('-18;-6;-18', '0.7s')}` +
    `<polygon points="0,-3 6,-5 24,-15 24,9 6,1 0,-1" fill="${C.cream}"/><rect x="22" y="-15" width="3.5" height="24" fill="${C.pink}"/>` +
    [0, 1, 2]
      .map(
        i =>
          `<path d="M${30 + i * 5} ${-12 - i * 3}Q${35 + i * 6} -3 ${30 + i * 5} ${6 + i * 3}" fill="none" stroke="${C.cream}" stroke-width="2" opacity="0">` +
          anim('opacity', '0;1;0', '0.7s', `begin="${i * 0.2}s"`) +
          '</path>',
      )
      .join('') +
    '</g>',
  popper:
    `<g>${rot('-5;-30;-5', '1.1s')}` +
    `<polygon points="-2,2 3,4 19,-16 12,-21" fill="${C.pink}"/>` +
    `<path d="M3 -5L8 -1M7 -10L12 -6M11 -15L16 -11" stroke="${C.yellow}" stroke-width="2"/></g>` +
    [
      [10, -26, C.yellow],
      [26, -22, C.cyan],
      [18, -36, C.pink],
      [30, -34, C.cream],
      [4, -34, C.cyan],
      [24, -10, C.yellow],
    ]
      .map(
        ([dx, dy, col], i) =>
          `<rect x="14" y="-18" width="3" height="5" fill="${col}" opacity="0">` +
          tr(`0 0;${dx} ${dy}`, '1.1s', `begin="${(i * 0.08).toFixed(2)}s"`) +
          anim('opacity', '1;1;0', '1.1s', `begin="${(i * 0.08).toFixed(2)}s"`) +
          '</rect>',
      )
      .join(''),
  balloon:
    `<path d="M0 0Q4 -8 0 -14Q-4 -20 2 -24" stroke="${C.cream}" fill="none" stroke-width="1"/>` +
    at(
      2,
      -35,
      tr('0 0;1.5 -2.5;0 0', '1.6s'),
      `<ellipse rx="8.5" ry="10.5" fill="${C.pink}"/><ellipse cx="-3" cy="-4" rx="2" ry="3.2" fill="${C.white}" opacity="0.7"/><polygon points="-1.8,10.2 1.8,10.2 0,13" fill="${C.pink}"/>`,
    ),
  trophy: at(
    0,
    -4,
    tr('0 0;0 -4;0 0', '0.5s'),
    `<path d="M2 -26H22L19 -14Q12 -9 5 -14Z" fill="${C.yellow}"/>` +
      `<circle cx="1" cy="-21" r="3.5" fill="none" stroke="${C.yellow}" stroke-width="2"/><circle cx="23" cy="-21" r="3.5" fill="none" stroke="${C.yellow}" stroke-width="2"/>` +
      `<rect x="10.5" y="-11" width="3" height="4" fill="${C.yellow}"/><rect x="6" y="-7" width="12" height="3.5" fill="${C.orange}"/>` +
      `<rect x="6" y="-25" width="3" height="10" fill="${C.white}" opacity="0">${anim('opacity', '0;0.8;0', '1s')}${tr('0 0;9 0', '1s')}</rect>`,
  ),
  mug:
    `<rect x="2" y="-14" width="13" height="13" rx="1.5" fill="${C.cream}"/>` +
    `<path d="M15 -11h3a3 3 0 0 1 0 7h-3" fill="none" stroke="${C.cream}" stroke-width="2"/>` +
    `<rect x="3" y="-13" width="11" height="2.5" fill="${C.coffee}"/>` +
    [0, 1]
      .map(
        i =>
          `<path d="M${6 + i * 5} -17q-2 -3 0 -6q2 -3 0 -6" fill="none" stroke="${C.white}" stroke-width="1.4" opacity="0">` +
          tr('0 0;0 -6', '1.8s', `begin="${i * 0.9}s"`) +
          anim('opacity', '0;0.8;0', '1.8s', `begin="${i * 0.9}s"`) +
          '</path>',
      )
      .join(''),
  yoyo:
    `<line x1="0" y1="0" x2="0" y2="4" stroke="${C.cream}" stroke-width="1">${anim('y2', '4;26;4', '1.2s')}</line>` +
    `<circle cx="0" cy="4" r="5" fill="${C.pink}">${anim('cy', '4;26;4', '1.2s')}</circle>` +
    `<circle cx="0" cy="4" r="1.8" fill="${C.cream}">${anim('cy', '4;26;4', '1.2s')}</circle>`,
  umbrella: at(
    0,
    0,
    rot('-6;6;-6', '1.4s'),
    `<line x1="0" y1="0" x2="-10" y2="-50" stroke="${C.ink}" stroke-width="2"/>` +
      `<path d="M-40 -46Q-10 -78 20 -46Q12.5 -51 5 -46Q-2.5 -51 -10 -46Q-17.5 -51 -25 -46Q-32.5 -51 -40 -46Z" fill="${C.cyan}"/>` +
      `<path d="M-10 -62Q-14 -54 -10 -46Q-6 -54 -10 -62Z" fill="${C.blue}"/>`,
  ),
  // A placard on a stick, waved, its arrow pointing right at the Compact button.
  sign: at(
    0,
    0,
    rot('-8;6;-8', '0.8s'),
    `<rect x="2" y="-40" width="3" height="40" fill="${C.ink}"/>` +
      `<rect x="-8" y="-58" width="38" height="20" rx="2.5" fill="${C.cream}" stroke="${C.orange}" stroke-width="2"/>` +
      `<text x="11" y="-44.5" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="8.5" fill="${C.ink}">COMPACT</text>` +
      `<polygon points="31,-52 31,-44 37,-48" fill="${C.orange}">${tr('0 0;3 0;0 0', '0.5s')}</polygon>`,
  ),
  // A broom swept along the floor, dust puffing where it brushes.
  broom:
    at(
      0,
      0,
      rot('15;-15;15', '0.6s'),
      `<rect x="-1.5" y="0" width="3" height="30" fill="${C.coffee}" transform="rotate(-25)"/>` +
        `<polygon points="10,26 20,24 26,40 6,42" fill="${C.yellow}"/>` +
        `<path d="M10 33L23 32M9 37L24 36" stroke="${C.orange}" stroke-width="1.4"/>`,
    ) +
    [0, 1, 2]
      .map(
        i =>
          `<circle cx="${18 + i * 6}" cy="40" r="${2.5 + i}" fill="${C.gray}" opacity="0">` +
          tr(`0 0;${6 + i * 3} -${4 + i * 2}`, '0.6s', `begin="${i * 0.2}s"`) +
          anim('opacity', '0.8;0', '0.6s', `begin="${i * 0.2}s"`) +
          '</circle>',
      )
      .join(''),
  // A magic wand flicked, stars popping off its tip.
  wand:
    `<g>${rot('-30;15;-30', '0.9s')}` +
    `<line x1="0" y1="0" x2="15" y2="-21" stroke="${C.yellow}" stroke-width="3.2"/>` +
    `<line x1="12" y1="-16.8" x2="15" y2="-21" stroke="${C.white}" stroke-width="3.2"/></g>` +
    (
      [
        [20, -30, C.yellow, 0],
        [30, -20, C.cyan, 0.3],
        [12, -38, C.pink, 0.6],
      ] as const
    )
      .map(([x, y, col, b]) => at(x, y, scl('0;1.3;0', '0.9s', `begin="${b}s"`), `<polygon points="${starPoints(0, 0, 5, 1.8)}" fill="${col}"/>`))
      .join(''),
}

// ---------------------------------------------------------------------------------------------
// Loads: what the context weighs on him. Packs sit behind him; boxes stack on his head.

const PACK = '#C7864B'
const PACK_DARK = '#9A5F2E'
const BOX = '#D2A86F'
const BOX_DARK = '#A97F48'

const box = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${BOX}" stroke="${BOX_DARK}" stroke-width="1.5"/>` +
  `<rect x="${x + w / 2 - 2}" y="${y}" width="4" height="${h}" fill="${BOX_DARK}" opacity="0.6"/>`

const loads: Record<Exclude<RixLoad, null>, { behind: string; front: string }> = {
  pack: {
    behind:
      `<rect x="-12" y="18" width="30" height="40" rx="6" fill="${PACK}"/>` +
      `<rect x="-12" y="18" width="30" height="12" rx="6" fill="${PACK_DARK}"/>` +
      `<rect x="-8" y="40" width="12" height="12" rx="2" fill="${PACK_DARK}"/>`,
    front: `<path d="M12 22L20 64" stroke="${PACK_DARK}" stroke-width="3.5"/>`,
  },
  bigpack: {
    behind:
      `<rect x="-24" y="0" width="46" height="66" rx="9" fill="${PACK}"/>` +
      `<rect x="-24" y="0" width="46" height="16" rx="8" fill="${PACK_DARK}"/>` +
      `<rect x="-19" y="34" width="18" height="18" rx="3" fill="${PACK_DARK}"/>` +
      `<rect x="-14" y="-12" width="6" height="16" rx="2" fill="${C.cream}" transform="rotate(-15 -11 4)"/>` +
      `<circle cx="10" cy="-4" r="6" fill="${C.pink}"/>`,
    front: `<path d="M12 18L22 66M30 14L36 40" stroke="${PACK_DARK}" stroke-width="4"/>`,
  },
  boxes: {
    behind: '',
    front:
      box(24, -4, 52, 14) +
      box(30, -18, 40, 14) +
      `<g transform="translate(36 -30)"><g>${rot('0 0 12;-14 0 12;-6 0 12;-18 0 12;0 0 12', '1.6s')}${box(0, 0, 28, 12)}</g></g>` +
      `<g transform="translate(64 -34)">` +
      `<circle r="11" fill="${C.coral}" opacity="0.3">${anim('opacity', '0;0.5;0', '0.5s')}</circle>` +
      `<path d="M-6 4A6 6 0 0 1 6 4Z" fill="${C.coral}">${anim('fill', `${C.coral};#FFD0D0;${C.coral}`, '0.5s')}</path>` +
      `<rect x="-7" y="4" width="14" height="3" fill="${C.gray}"/></g>`,
  },
}

// ---------------------------------------------------------------------------------------------
// Hats: on top of his head, centred over the M.

type Head = 'propeller' | 'party' | 'crown' | 'nightcap' | 'headphones' | 'tophat'

const heads: Record<Head, string> = {
  propeller:
    `<path d="M34 10Q50 -6 66 10Z" fill="${C.cyan}"/><path d="M42 4Q50 -2 58 4" fill="none" stroke="${C.pink}" stroke-width="2.5"/>` +
    `<rect x="49" y="-7" width="2" height="7" fill="${C.ink}"/>` +
    `<ellipse cx="50" cy="-8" rx="13" ry="2.6" fill="${C.pink}">${anim('rx', '13;1;13', '0.28s')}</ellipse>` +
    `<circle cx="50" cy="-8" r="1.8" fill="${C.yellow}"/>`,
  party: at(
    50,
    8,
    rot('-8;8;-8', '1s'),
    `<polygon points="-11,0 11,0 0,-27" fill="${C.pink}"/>` +
      `<polygon points="-7.3,-9 7.3,-9 5.8,-13 -5.8,-13" fill="${C.yellow}"/><polygon points="-3.6,-18 3.6,-18 2.4,-21 -2.4,-21" fill="${C.yellow}"/>` +
      `<circle cx="0" cy="-28" r="3.6" fill="${C.yellow}"/>`,
  ),
  crown: at(
    50,
    6,
    tr('0 0;0 -1.5;0 0', '0.5s'),
    `<polygon points="-24,4 -24,-9 -14,-1 -6,-13 0,-3 6,-13 14,-1 24,-9 24,4" fill="${C.yellow}"/>` +
      `<circle cx="-10" cy="0" r="2" fill="${C.pink}"/><circle cx="0" cy="0" r="2.4" fill="${C.cyan}"/><circle cx="10" cy="0" r="2" fill="${C.pink}"/>` +
      `<polygon points="${starPoints(-6, -13, 3, 1)}" fill="${C.white}" opacity="0">${anim('opacity', '0;1;0;0', '1.4s')}</polygon>`,
  ),
  nightcap: at(
    0,
    0,
    rot('-2 50 8;3 50 8;-2 50 8', '3s'),
    `<path d="M24 10Q50 -16 72 2Q88 12 94 28L88 28Q80 14 68 10Z" fill="${C.blue}"/>` +
      `<path d="M50 -1Q60 -2 68 3M60 -2Q72 2 80 12" fill="none" stroke="${C.white}" stroke-width="2" opacity="0.6"/>` +
      `<rect x="22" y="6" width="50" height="6" rx="3" fill="${C.white}"/><circle cx="92" cy="31" r="4.5" fill="${C.white}"/>`,
  ),
  headphones: at(
    0,
    0,
    tr('0 0;0 -1;0 0', '0.35s'),
    `<path d="M3 38Q50 -30 97 38" fill="none" stroke="${C.ink}" stroke-width="4"/>` +
      `<rect x="-4" y="32" width="10" height="20" rx="3" fill="${C.pink}"/><rect x="94" y="32" width="10" height="20" rx="3" fill="${C.pink}"/>`,
  ),
  // A magician's hat, tipped now and then.
  tophat: at(
    50,
    8,
    rot('0;0;-12;0;0', '2s', 'keyTimes="0;0.6;0.7;0.8;1"'),
    `<rect x="-17" y="-4" width="34" height="5" rx="1.5" fill="${C.ink}"/>` +
      `<rect x="-11" y="-28" width="22" height="25" fill="${C.ink}"/>` +
      `<rect x="-11" y="-10" width="22" height="4" fill="${C.pink}"/>`,
  ),
}

// ---------------------------------------------------------------------------------------------
// Effects over his head.

type Above = 'dots' | 'thought' | 'notes' | 'sparkles' | 'storm' | 'sweat' | 'moon' | 'hello' | 'juggle'

const above: Record<Above, string> = {
  dots: [0, 1, 2]
    .map(
      i =>
        `<circle cx="${90 + i * 10}" cy="-6" r="3.2" fill="${C.cream}" opacity="0">` +
        anim('opacity', '0;1;1;0', '1.5s', `begin="${i * 0.25}s" keyTimes="0;0.3;0.8;1"`) +
        '</circle>',
    )
    .join(''),
  thought:
    `<circle cx="108" cy="6" r="2.5" fill="${C.cream}"/><circle cx="108" cy="-3" r="3.5" fill="${C.cream}"/>` +
    at(
      110,
      -22,
      tr('0 0;0 -2;0 0', '2s'),
      `<circle cx="-8" cy="2" r="8" fill="${C.cream}"/><circle cx="2" cy="-4" r="10" fill="${C.cream}"/><circle cx="11" cy="3" r="7" fill="${C.cream}"/><rect x="-10" y="2" width="22" height="8" rx="4" fill="${C.cream}"/>` +
        `<text x="1" y="5" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="15" fill="${C.depth[1]}">?${anim('opacity', '1;0.4;1', '1s')}</text>`,
    ),
  notes: [
    ['♪', 84, C.pink],
    ['♫', 100, C.yellow],
    ['♪', 114, C.cyan],
  ]
    .map(
      ([glyph, x, col], i) =>
        `<text x="${x}" y="4" font-family="Arial, sans-serif" font-size="16" fill="${col}" opacity="0">${glyph}` +
        tr('0 0;4 -26', '1.8s', `begin="${i * 0.6}s"`) +
        anim('opacity', '0;1;0', '1.8s', `begin="${i * 0.6}s"`) +
        '</text>',
    )
    .join(''),
  sparkles: [
    [-6, 4, C.yellow, 0],
    [108, -6, C.cyan, 0.3],
    [96, 30, C.pink, 0.6],
    [10, -14, C.cream, 0.9],
  ]
    .map(
      ([x, y, col, begin]) =>
        at(
          Number(x),
          Number(y),
          scl('0;1.2;0', '1.2s', `begin="${begin}s"`),
          `<polygon points="${starPoints(0, 0, 6, 1.6).split(' ').filter((_, i) => i % 1 === 0).join(' ')}" fill="${col}"/>`,
        ),
    )
    .join(''),
  storm:
    at(
      50,
      -22,
      tr('-3 0;3 0;-3 0', '2s'),
      `<circle cx="-12" cy="2" r="9" fill="${C.cloud}"/><circle cx="2" cy="-5" r="12" fill="${C.cloud}"/><circle cx="15" cy="2" r="8" fill="${C.cloud}"/><rect x="-20" y="2" width="42" height="9" rx="4.5" fill="${C.cloud}"/>` +
        [-12, -2, 8, 18]
          .map(
            (x, i) =>
              `<line x1="${x}" y1="14" x2="${x - 2}" y2="20" stroke="${C.cyan}" stroke-width="2" opacity="0">` +
              tr('0 0;-4 24', '0.7s', `begin="${i * 0.17}s"`) +
              anim('opacity', '1;1;0', '0.7s', `begin="${i * 0.17}s"`) +
              '</line>',
          )
          .join('') +
        `<polygon points="4,8 10,8 6,15 11,15 1,26 4,17 0,17" fill="${C.yellow}" opacity="0">${anim('opacity', '0;0;1;0;1;0', '2.2s')}</polygon>`,
    ),
  sweat: `<path d="M96 14Q92 21 96 23Q100 21 96 14Z" fill="${C.cyan}">${tr('0 0;0 10', '1s')}${anim('opacity', '1;1;0', '1s')}</path>`,
  moon:
    at(108, -20, tr('0 0;0 -2;0 0', '3s'), `<path d="M0 -9A9 9 0 1 0 9 4A7 7 0 1 1 0 -9Z" fill="${C.yellow}"/>`) +
    (
      [
        [88, -30, 0],
        [124, -6, 0.7],
        [96, -8, 1.4],
      ] as const
    )
      .map(([x, y, b]) => at(x, y, scl('0.3;1;0.3', '1.4s', `begin="${b}s"`), `<polygon points="${starPoints(0, 0, 3.5, 1.2)}" fill="${C.cream}"/>`))
      .join('') +
    [0, 1, 2]
      .map(i => {
        const s = 6 + i * 2
        const x = 78 + i * 9
        const y = 4 - i * 8
        const pts = [
          [x, y], [x + s, y], [x + s, y + 2], [x + 3, y + s - 2], [x + s, y + s - 2],
          [x + s, y + s], [x, y + s], [x, y + s - 2], [x + s - 3, y + 2], [x, y + 2],
        ]
        return `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${C.cream}" opacity="0">${anim('opacity', '0;1;0', '3s', `begin="${i}s"`)}</polygon>`
      })
      .join(''),
  // A speech bubble that pops up to say hi.
  hello: at(
    112,
    -26,
    scl('0;1.15;1;1;0', '2.4s', 'keyTimes="0;0.12;0.2;0.85;1"'),
    `<rect x="-17" y="-11" width="34" height="20" rx="6" fill="${C.cream}"/>` +
      `<polygon points="-12,8 -4,8 -16,16" fill="${C.cream}"/>` +
      `<text x="0" y="4.5" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="12" fill="${C.depth[1]}">HI!</text>`,
  ),
  // Three balls thrown up over his head and caught, round and round.
  juggle: [C.pink, C.yellow, C.cyan]
    .map(
      (col, i) =>
        `<circle r="5.5" fill="${col}">` +
        `<animateMotion path="M16 14Q50 -84 84 14Q50 -2 16 14Z" dur="1.5s" begin="-${(i * 0.5).toFixed(1)}s" ${R}/>` +
        '</circle>',
    )
    .join(''),
}

// ---------------------------------------------------------------------------------------------
// Poses: how he moves, which faces suit, and what he may hold, wear and show.

type Pose = {
  body?: string // on the whole of him
  shadow?: string // on the ground shadow (its rx)
  faces: Face[]
  hands: (Hand | null)[]
  heads?: (Head | null)[]
  aboves?: (Above | null)[]
  armLeft?: string
  armRight?: string
  footLeft?: string
  footRight?: string
  load?: RixLoad // what he carries in this pose, unless the caller names one
  frame?: string // a fixed transform on the whole of him (the squash)
}

const blink = '3.6s'
const HOP_TIMES = 'keyTimes="0;0.25;0.5;1"'

const poses: Record<RixPose, Pose> = {
  idle: {
    body: rot('-2 50 92;2 50 92;-2 50 92', '3s'),
    faces: [{ left: 'open', right: 'open', blink: '4.5s' }, { left: 'open', right: 'happy' }, { left: 'happy', right: 'happy' }],
    hands: ['mug', 'yoyo', 'balloon', null],
    heads: [null, null, 'propeller'],
  },
  work: {
    body: tr('0 0;0 -4;0 0', '0.9s'),
    shadow: anim('rx', '34;30;34', '0.9s'),
    faces: [{ left: 'open', right: 'open', blink }],
    hands: ['gear', null],
    heads: ['propeller', null],
  },
  think: {
    body: tr('0 0;0 -2;0 0', '1.8s'),
    faces: [
      { left: 'open', right: 'open', look: '7 -7', blink: '4s' },
      { left: 'squint', right: 'open', look: '7 -7' },
    ],
    hands: ['bulb', null, null],
    aboves: ['thought', 'dots'],
  },
  talk: {
    body: tr('0 0;0 -3;0 0', '0.7s'),
    faces: [{ left: 'happy', right: 'happy' }, { left: 'open', right: 'open', blink }],
    armRight: rot('0 94 53;-25 94 53;0 94 53', '0.7s'),
    hands: ['megaphone', null],
    heads: ['headphones', null],
    aboves: ['notes', null],
  },
  type: {
    body: tr('0 0;0 -1.5;0 0', '0.3s'),
    faces: [{ left: 'open', right: 'open', look: '-7 7' }, { left: 'squint', right: 'squint', look: '-7 7' }],
    armLeft: tr('0 0;0 -6;0 0', '0.3s'),
    armRight: tr('0 0;0 -6;0 0', '0.3s', 'begin="0.15s"'),
    hands: ['pencil', 'brush'],
    aboves: [null, 'sparkles'],
  },
  run: {
    body: tr('0 0;0 -3;0 0', '0.4s'),
    shadow: anim('rx', '34;31;34', '0.4s'),
    faces: [{ left: 'wide', right: 'wide', blink }, { left: 'squint', right: 'squint' }],
    footLeft: tr('0 0;0 -6;0 0;0 0', '0.8s', HOP_TIMES),
    footRight: tr('0 0;0 0;0 -6;0 0', '0.8s', 'keyTimes="0;0.5;0.75;1"'),
    armLeft: tr('0 -3;0 3;0 -3', '0.8s'),
    hands: ['rocket', 'bolt', 'gear'],
    heads: [null, null, 'propeller'],
  },
  scan: {
    body: rot('-3 50 88;3 50 88;3 50 88;-3 50 88;-3 50 88', '2.4s', 'keyTimes="0;0.35;0.5;0.85;1"'),
    faces: [{ left: 'open', right: 'open', sweep: tr('-6 0;6 0;6 0;-6 0;-6 0', '2.4s', 'keyTimes="0;0.35;0.5;0.85;1"') }],
    hands: ['binoculars', 'flashlight', null],
  },
  surf: {
    body: tr('0 0;0 -2;0 0', '1.4s'),
    faces: [
      { left: 'open', right: 'open', sweep: tr('-5 -3;5 -3;-5 -3', '3s'), blink },
      { left: 'wide', right: 'wide', look: '6 -6' },
    ],
    hands: ['globe', 'antenna'],
  },
  happy: {
    body: tr('0 0;0 -12;0 0;0 0', '1s', HOP_TIMES),
    shadow: anim('rx', '34;22;34;34', '1s', HOP_TIMES),
    faces: [{ left: 'happy', right: 'happy' }, { left: 'star', right: 'star' }, { left: 'heart', right: 'heart' }],
    armLeft: rot('0 6 53;35 6 53;0 6 53;0 6 53', '1s', HOP_TIMES),
    armRight: rot('0 94 53;-30 94 53;0 94 53;0 94 53', '1s', HOP_TIMES),
    hands: ['popper', 'balloon', 'trophy'],
    heads: ['crown', 'party', null],
    aboves: ['sparkles'],
  },
  oops: {
    body: tr('-3 0;3 0;-3 0;3 0;0 0;0 0', '1.4s', 'keyTimes="0;0.1;0.2;0.3;0.4;1"'),
    faces: [{ left: 'x', right: 'x' }, { left: 'spiral', right: 'spiral' }, { left: 'squint', right: 'x' }],
    hands: ['umbrella', null],
    aboves: ['storm', 'sweat'],
  },
  sleep: {
    body: tr('0 0;0 1.5;0 0', '3s'),
    shadow: anim('rx', '34;35;34', '3s'),
    faces: [{ left: 'closed', right: 'closed' }],
    hands: [null],
    heads: ['nightcap', null],
    aboves: ['moon'],
  },
  nudge: {
    body: rot('-1 50 92;1 50 92;-1 50 92', '3s'),
    faces: [
      { left: 'open', right: 'open', sweep: tr('0 0;0 0;6 7;6 7;0 0', '4s', 'keyTimes="0;0.3;0.4;0.8;1"'), blink: '4.5s' },
    ],
    hands: [null],
    load: 'pack',
  },
  heavy: {
    body: rot('-4 50 92;4 50 92;-4 50 92', '1.4s'),
    faces: [{ left: 'squint', right: 'open' }, { left: 'open', right: 'open', look: '6 6', blink }],
    footLeft: tr('0 0;0 -4;0 0;0 0', '1.4s', HOP_TIMES),
    footRight: tr('0 0;0 0;0 -4;0 0', '1.4s', 'keyTimes="0;0.5;0.75;1"'),
    hands: [null],
    aboves: ['sweat', null],
    load: 'bigpack',
  },
  warn: {
    body: tr('0 0;0 -2;0 0', '0.8s'),
    faces: [{ left: 'wide', right: 'wide', brows: 'worried', blink }],
    hands: ['sign'],
    aboves: ['sweat', null],
  },
  alarm: {
    body: tr('-1.5 0;1.5 0;-1.5 0', '0.18s'),
    faces: [{ left: 'wide', right: 'wide', brows: 'worried' }],
    armLeft: rot('0 6 53;40 6 53;35 6 53;40 6 53', '0.4s'),
    armRight: rot('0 94 53;-40 94 53;-35 94 53;-40 94 53', '0.4s'),
    hands: [null],
    aboves: ['sweat'],
    load: 'boxes',
  },
  panic: {
    body: scl('1 1;1.03 0.97;1 1', '0.5s'),
    frame: 'translate(50 92) scale(1.14 0.62) translate(-50 -92)',
    shadow: anim('rx', '40;42;40', '0.5s'),
    faces: [{ left: 'spiral', right: 'spiral' }],
    hands: [null],
    aboves: ['sweat'],
    load: 'boxes',
  },
  sweep: {
    body: tr('0 0;0 -5;0 0;0 0', '0.8s', HOP_TIMES),
    shadow: anim('rx', '34;28;34;34', '0.8s', HOP_TIMES),
    faces: [{ left: 'happy', right: 'happy' }, { left: 'open', right: 'happy' }],
    hands: ['broom'],
    aboves: ['sparkles'],
  },
  wave: {
    body: tr('0 0;0 -6;0 0;0 0', '1.2s', HOP_TIMES),
    shadow: anim('rx', '34;28;34;34', '1.2s', HOP_TIMES),
    faces: [{ left: 'happy', right: 'happy' }, { left: 'open', right: 'happy' }, { left: 'open', right: 'open', blink }],
    armRight: rot('-25 94 53;-75 94 53;-40 94 53;-75 94 53;-25 94 53', '1.2s'),
    hands: [null],
    heads: [null, 'propeller', 'party'],
    aboves: ['hello'],
  },
  juggle: {
    body: tr('0 0;0 -2;0 0', '0.75s'),
    faces: [{ left: 'open', right: 'open', look: '0 -6' }, { left: 'wide', right: 'wide', look: '0 -6' }],
    armLeft: rot('0 6 53;30 6 53;0 6 53', '0.75s'),
    armRight: rot('-30 94 53;0 94 53;-30 94 53', '0.75s'),
    hands: [null],
    aboves: ['juggle'],
  },
  bounce: {
    // Straight up and down, never turning: a crouch, the jump, a squash on landing.
    body: tr('0 0;0 0;0 -20;0 -20;0 0;0 0', '1.8s', 'keyTimes="0;0.15;0.35;0.55;0.75;1"'),
    shadow: anim('rx', '34;34;20;20;34;34', '1.8s', 'keyTimes="0;0.15;0.35;0.55;0.75;1"'),
    armLeft: rot('0 6 53;0 6 53;40 6 53;40 6 53;0 6 53;0 6 53', '1.8s', 'keyTimes="0;0.15;0.35;0.55;0.75;1"'),
    armRight: rot('0 94 53;0 94 53;-40 94 53;-40 94 53;0 94 53;0 94 53', '1.8s', 'keyTimes="0;0.15;0.35;0.55;0.75;1"'),
    faces: [{ left: 'star', right: 'star' }, { left: 'happy', right: 'happy' }, { left: 'wide', right: 'wide' }],
    hands: [null],
    aboves: ['sparkles', null],
  },
  cheer: {
    body: tr('0 0;0 -6;0 0;0 0', '1.2s', HOP_TIMES),
    shadow: anim('rx', '34;28;34;34', '1.2s', HOP_TIMES),
    faces: [{ left: 'happy', right: 'happy' }, { left: 'star', right: 'star' }],
    armLeft: rot('0 6 53;40 6 53;0 6 53;0 6 53', '1.2s', HOP_TIMES),
    armRight: rot('0 94 53;-40 94 53;0 94 53;0 94 53', '1.2s', HOP_TIMES),
    hands: [null, 'balloon', 'trophy'],
    heads: ['party', 'crown', null],
    aboves: ['sparkles'],
  },
  dance: {
    body: tr('-8 0;8 0;-8 0', '1.6s') + `<animateTransform attributeName="transform" type="rotate" values="-5 50 92;5 50 92;-5 50 92;5 50 92;-5 50 92" dur="1.6s" additive="sum" ${R}/>`,
    faces: [{ left: 'happy', right: 'happy' }, { left: 'squint', right: 'squint' }],
    footLeft: tr('0 0;0 -6;0 0;0 0', '0.8s', HOP_TIMES),
    footRight: tr('0 0;0 0;0 -6;0 0', '0.8s', 'keyTimes="0;0.5;0.75;1"'),
    armLeft: rot('0 6 53;35 6 53;0 6 53', '0.8s'),
    armRight: rot('-35 94 53;0 94 53;-35 94 53', '0.8s'),
    hands: [null],
    heads: ['headphones'],
    aboves: ['notes'],
  },
  walk: {
    body: tr('0 0;0 -3;0 0', '0.75s'),
    shadow: anim('rx', '34;31;34', '0.75s'),
    faces: [
      { left: 'open', right: 'open', look: '4 0', blink },
      { left: 'happy', right: 'happy' },
      { left: 'open', right: 'happy', look: '4 0' },
    ],
    footLeft: tr('0 0;0 -6;0 0;0 0', '1.5s', HOP_TIMES),
    footRight: tr('0 0;0 0;0 -6;0 0', '1.5s', 'keyTimes="0;0.5;0.75;1"'),
    armLeft: rot('-12 6 53;12 6 53;-12 6 53', '1.5s'),
    armRight: rot('12 94 53;-12 94 53;12 94 53', '1.5s'),
    hands: [null, 'balloon', 'mug', 'yoyo'],
    heads: [null, null, 'propeller', 'party'],
  },
  magic: {
    body: tr('0 0;0 -3;0 0', '0.9s'),
    faces: [{ left: 'star', right: 'star' }, { left: 'open', right: 'squint', blink }],
    armRight: rot('0 94 53;-20 94 53;0 94 53', '0.9s'),
    hands: ['wand'],
    heads: ['tophat'],
    aboves: ['sparkles', null],
  },
}

// ---------------------------------------------------------------------------------------------
// Picking: the same seed always makes the same picks.

const hash = (text: string) => {
  let h = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const pick = <T>(list: readonly T[], seed: string, salt: string): T => list[hash(`${seed}:${salt}`) % list.length] as T

// ---------------------------------------------------------------------------------------------
// Drawing him: each part is stacked layers, darker and further back, for depth.

const FEET_L = '<polygon points="18.5,82.5 33.5,82.5 26,90"/>'
const FEET_R = '<polygon points="64.5,84.5 79.5,84.5 72,92"/>'
const STRIPS =
  '<polygon points="6,30 28,8 48,28 6,70"/>' +
  '<polygon points="74,10 90,26 33,83 19,83 10,74"/>' +
  '<polygon points="94,70 79,85 65,85 52,72 94,30"/>'
const ARM_L = '<rect x="-4" y="50" width="10" height="6"/>'
const ARM_R = '<rect x="94" y="50" width="10" height="6"/>'

const extrude = (shapes: string, isFlat: boolean) =>
  isFlat
    ? ''
    : C.depth.map((fill, i) => {
        const d = ((C.depth.length - i) * 1.3).toFixed(1)
        return `<g transform="translate(${d} ${d})" fill="${fill}">${shapes}</g>`
      }).join('')

/**
 * `load` puts what the context weighs on him over any pose; absent, the pose's own. `uid` names
 * his eye mask, so several of him in one drawing keep their own faces; `isMirrored` faces him left.
 */
export type RixOptions = { isStill?: boolean; isFlat?: boolean; load?: RixLoad; uid?: string; isMirrored?: boolean }

/** Rix in a pose as an SVG document. `seed` picks his face, prop, hat and effect for the moment. */
export const rixSvg = (pose: RixPose, seed: string | number = 0, options: RixOptions = {}): string => {
  const p = poses[pose]
  const s = String(seed)
  const mask = `rix-eyes-${options.uid ?? 'one'}`
  const a = (x: string | undefined) => (options.isStill || x === undefined ? '' : x)
  const flat = options.isFlat === true

  const face = pick(p.faces, s, 'face')
  const hand = pick(p.hands, s, 'hand')
  const head = p.heads ? pick(p.heads, s, 'head') : null
  const over = p.aboves ? pick(p.aboves, s, 'above') : null

  const blinkDur = options.isStill ? null : (face.blink ?? null)
  const eyes =
    `<g transform="translate(${face.look ?? '0 0'})"><g>${a(face.sweep)}` +
    eyeShape(face.left, 30, 50, blinkDur) +
    eyeShape(face.right, 70, 50, blinkDur) +
    browsOf(face.brows) +
    '</g></g>'
  const load = options.load !== undefined ? options.load : (p.load ?? null)
  const carried = load === null ? null : loads[load]

  // The eyes are holes in his face with a dark backing, so they read at any size.
  const sockets = `<g fill="${C.ink}">${eyes.replace(/"#000"/g, `"${C.ink}"`)}</g>`
  const strip = `${extrude(STRIPS, flat)}${sockets}<g mask="url(#${mask})" fill="${C.violet}">${STRIPS}</g>`
  const part = (motion: string | undefined, shapes: string, extra = '') =>
    `<g>${a(motion)}${extrude(shapes, flat)}<g fill="${C.violet}">${shapes}</g>${extra}</g>`

  const handProp = hand === null ? '' : `<g transform="translate(103 53)">${options.isStill ? hands[hand].replace(/<animate[^>]*\/>/g, '') : hands[hand]}</g>`
  const strip0 = (x: string) => (options.isStill ? x.replace(/<animate[^>]*\/>/g, '') : x)

  const moving =
    `<g>${a(p.body)}` +
    (carried === null ? '' : strip0(carried.behind)) +
    part(p.footLeft, FEET_L) +
    part(p.footRight, FEET_R) +
    strip +
    (carried === null ? '' : strip0(carried.front)) +
    part(p.armLeft, ARM_L) +
    part(p.armRight, ARM_R, handProp) +
    (head === null || load === 'boxes' ? '' : strip0(heads[head])) +
    (over === null ? '' : strip0(above[over])) +
    '</g>'
  const body = p.frame === undefined ? moving : `<g transform="${p.frame}">${moving}</g>`

  const turning = body
  // Mirrored about his middle (x 56 in the view box), shadow and all.
  const facing = (x: string) => (options.isMirrored === true ? `<g transform="translate(112 0) scale(-1 1)">${x}</g>` : x)

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-28 -48 168 150">` +
    `<defs><mask id="${mask}" maskUnits="userSpaceOnUse" x="-30" y="-60" width="200" height="180">` +
    `<rect x="-30" y="-60" width="200" height="180" fill="#fff"/>${eyes}</mask></defs>` +
    facing(`<ellipse cx="52" cy="97" rx="34" ry="3.6" fill="#000" opacity="0.28">${a(p.shadow)}</ellipse>` + turning) +
    '</svg>'
  )
}

/** The pose for a running tool call, by what the tool does. */
export const toolPose = (tool: string): RixPose => {
  switch (tool) {
    case 'Edit':
    case 'MultiEdit':
    case 'Write':
    case 'NotebookEdit':
      return 'type'
    case 'Bash':
    case 'PowerShell':
    case 'Agent':
    case 'Monitor':
      return 'run'
    case 'Read':
    case 'Grep':
    case 'Glob':
    case 'ToolSearch':
    case 'LSP':
      return 'scan'
    case 'WebFetch':
    case 'WebSearch':
      return 'surf'
    case 'Skill':
    case 'AskUserQuestion':
      return 'think'
    default:
      return tool.startsWith('mcp__') ? 'surf' : 'work'
  }
}

// ---------------------------------------------------------------------------------------------
// The stage: a lane as wide as the band, on top of the context strip, Rix walking it end to end.
// Sized in pixels by the caller, the same in the markup and the element, so its frame never scrolls.

const RIX_W = 49
const RIX_H = 44
/** The stage's height in CSS pixels; the caller sizes its width to the band. */
export const STAGE_H = 44
/** One stroll there and back, a trick at each end. */
export const STROLL_S = 34

const stageOpen = (width: number) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${STAGE_H}" viewBox="0 0 ${width} ${STAGE_H}" style="display:block">`
/** Him as a nested drawing at `x` on the stage. */
const placed = (svg: string, x = '0') =>
  svg.replace(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox=',
    `<svg x="${x}" y="${STAGE_H - RIX_H}" width="${RIX_W}" height="${RIX_H}" overflow="visible" viewBox=`,
  )

/** Rix in one pose, standing at the left of a stage `width` pixels wide. */
export const rixStill = (pose: RixPose, seed: string | number, options: RixOptions, width: number): string =>
  `${stageOpen(width)}${placed(rixSvg(pose, seed, options), '0')}</svg>`

/**
 * Rix strolling a stage `width` pixels wide: walks right, does the first trick, walks back facing
 * left, does the second. All one SMIL timeline, so it plays on its own; `load` rides on his back.
 */
export const rixStroll = (tricks: readonly [RixPose, RixPose], seed: string, load: RixLoad, width: number): string => {
  const end = Math.max(0, width - RIX_W)
  // Walking takes most of it, slowly: about 55 pixels a second across a 620-pixel lane.
  const times = 'keyTimes="0;0.34;0.5;0.84;1"'
  const dur = `dur="${STROLL_S}s"`
  const shown = (values: string, svg: string) =>
    `<g opacity="0"><animate attributeName="opacity" values="${values}" ${times} calcMode="discrete" ${dur} ${R}/>${placed(svg)}</g>`
  return (
    stageOpen(width) +
    `<svg x="0" y="0" width="${RIX_W}" height="${STAGE_H}" overflow="visible">` +
    `<animate attributeName="x" values="0;${end};${end};0;0" ${times} ${dur} ${R}/>` +
    shown('1;0;0;0;0', rixSvg('walk', seed, { load, uid: 'right' })) +
    shown('0;1;0;0;0', rixSvg(tricks[0], `${seed}:a`, { load, uid: 'a' })) +
    shown('0;0;1;0;0', rixSvg('walk', seed, { load, uid: 'left', isMirrored: true })) +
    shown('0;0;0;1;0', rixSvg(tricks[1], `${seed}:b`, { load, uid: 'b' })) +
    '</svg></svg>'
  )
}

/** The tricks he does at the ends of his stroll. */
export const RIX_TRICKS: readonly RixPose[] = ['wave', 'juggle', 'bounce', 'cheer', 'dance', 'magic']

/** Every pose, for previews and tests. */
export const RIX_POSES: readonly RixPose[] = Object.keys(poses) as RixPose[]
