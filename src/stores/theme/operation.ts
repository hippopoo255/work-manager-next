import { setAction, clearAction } from './action'
import { ThemeAction, ThemeState } from './types'

const set = (
  dispatch: React.Dispatch<ThemeAction>,
  theme: ThemeState
): ThemeState => {
  dispatch(setAction(theme))
  return theme
}

const clear = (dispatch: React.Dispatch<ThemeAction>): null => {
  dispatch(clearAction())
  return null
}

export const themeOperation = {
  set,
  clear,
}
