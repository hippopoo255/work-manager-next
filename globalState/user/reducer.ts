import * as Action from './action'
import initialState from '@/globalState/store/initialState'
import { UserAction, ActionType } from '@/interfaces/action/UserAction'
import { User } from '@/interfaces/models'
import { UserState } from '@/interfaces/state'

export const userReducer = (
  state: UserState = { user: initialState.user, isLogin: false },
  action: UserAction
) => {
  switch (action.type) {
    case ActionType.Login:
      return {
        user: { ...action.payload },
        isLogin: true,
      }
    case ActionType.Logout:
      return {
        user: { ...initialState.user },
        isLogin: false,
      }
    case ActionType.CurrentUser:
      return userOrEmpty(action.payload)
    default:
      return { ...state }
  }
}

const userOrEmpty = (currentUser: User | ''): UserState =>
  currentUser === ''
    ? { user: { ...initialState.user }, isLogin: false }
    : { user: { ...currentUser }, isLogin: true }
