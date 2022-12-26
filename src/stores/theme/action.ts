import { ThemeAction, ACTION_TYPE, ThemeState } from './types'

export const setAction = (context: ThemeState): ThemeAction => ({
  type: ACTION_TYPE.SET,
  payload: {
    ...context,
  },
})

export const clearAction = (): ThemeAction => ({
  type: ACTION_TYPE.CLEAR,
})
