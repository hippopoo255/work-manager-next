import { StatusAction, ACTION_TYPE, StatusState } from './types'

export const setAction = (status: StatusState): StatusAction => ({
  type: ACTION_TYPE.SET,
  payload: status,
})

export const clearAction = (): StatusAction => ({
  type: ACTION_TYPE.CLEAR,
})
