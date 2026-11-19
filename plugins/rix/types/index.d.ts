/** The live context window as the band shows it; `isEstimate` after a compaction, until the next turn measures it. */
export type ContextFill = { tokens: number | null; window: number; percent: number | null; isEstimate?: boolean }

/** How Rix feels between turns, shown by the band above the prompt. */
export type Mood = 'idle' | 'happy' | 'oops' | 'sleep'

/** The tool call running now. */
export type ActiveTool = { tool: string; id: string }

/** A compaction waiting for the turn to end, under way, just done, or neither. */
export type Compacting = 'no' | 'queued' | 'busy' | 'done'

/** What one compaction freed, drawn by the success row it placed in the chat. */
export type CompactNote = { before: number | null; after: number; window: number }

declare module 'claude-code' {
  interface PluginState {
    'rix': {
      context: ContextFill | null
      activeTool: ActiveTool | null
      mood: Mood
      moodSeed: number
      compacting: Compacting
      warned: number
      notes: Record<string, CompactNote>
      trick: number
    }
  }
}
