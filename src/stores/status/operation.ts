import { setAction, clearAction } from './action'
import { StatusAction, StatusState } from './types'

const set = (
  dispatch: React.Dispatch<StatusAction>,
  status: StatusState
): StatusState => {
  dispatch(setAction(status))
  return status
}

const clear = (dispatch: React.Dispatch<StatusAction>): null => {
  dispatch(clearAction())
  return null
}

export const statusOperation = {
  set,
  clear,
}
