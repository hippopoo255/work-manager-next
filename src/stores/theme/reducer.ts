import { ThemeAction, ACTION_TYPE, ThemeState } from './types'
import initialState from '~/stores/initialState'

export const themeReducer = (
  state: ThemeState = { ...initialState.theme },
  action: ThemeAction
) => {
  switch (action.type) {
    case ACTION_TYPE.SET:
      return { ...state, ...action.payload }
    case ACTION_TYPE.CLEAR:
      return { ...initialState.theme }
    default:
      return state
  }
}
