import { AuthAction, ACTION_TYPE, AuthState } from './types'
import { User } from '~/schema/generated/@types'
import initialState from '~/stores/initialState'

export const authReducer = (
  state: AuthState = { ...initialState.auth },
  action: AuthAction
) => {
  switch (action.type) {
    case ACTION_TYPE.SIGN_IN:
      return {
        user: { ...action.payload },
        isSignedIn: true,
      }
    case ACTION_TYPE.SIGN_OUT:
      return { ...initialState.auth }
    case ACTION_TYPE.CURRENT_USER:
      return userOrEmpty(action.payload)
    default:
      return { ...state }
  }
}

const userOrEmpty = (currentUser: User | null): AuthState =>
  currentUser === null
    ? { ...initialState.auth }
    : { user: { ...currentUser }, isSignedIn: true }
