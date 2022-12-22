export const ACTION_TYPE = {
  SET: 'SET',
  CLEAR: 'CLEAR',
} as const

export const STATUS_CATEGORY = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
} as const

export type ActionType = typeof ACTION_TYPE[keyof typeof ACTION_TYPE]
export type StatusCategoryType =
  typeof STATUS_CATEGORY[keyof typeof STATUS_CATEGORY]

interface Set {
  type: Extract<ActionType, 'SET'>
  payload: StatusState
}
interface Clear {
  type: Extract<ActionType, 'CLEAR'>
}

export type StatusAction = Set | Clear

export interface StatusState {
  message?: string | { [key: string]: string[] }
  statusCode?: number
  category?: StatusCategoryType
}
