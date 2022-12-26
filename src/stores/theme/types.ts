export const ACTION_TYPE = {
  SET: 'SET',
  CLEAR: 'CLEAR',
} as const

export type ModeCategory = 'dark' | 'light'
export type ActionType = typeof ACTION_TYPE[keyof typeof ACTION_TYPE]

interface Set {
  type: Extract<ActionType, 'SET'>
  payload: ThemeState
}
interface Clear {
  type: Extract<ActionType, 'CLEAR'>
}

export type ThemeAction = Set | Clear

export interface ThemeState {
  mode: ModeCategory
}
