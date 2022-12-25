import { StatusAction, ACTION_TYPE, StatusState } from './types'
import initialState from '~/stores/initialState'

export const statusReducer = (
  state: StatusState = { ...initialState.status },
  action: StatusAction
) => {
  switch (action.type) {
    case ACTION_TYPE.SET:
      return {
        ...action.payload,
      }
    case ACTION_TYPE.CLEAR:
      return { ...initialState.status }
    default:
      return { ...initialState.status }
  }
}
