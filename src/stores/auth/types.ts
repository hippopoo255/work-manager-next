import { User } from '~/schema/generated/@types'

export const ACTION_TYPE = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  CURRENT_USER: 'CURRENT_USER',
} as const

export type ActionType = typeof ACTION_TYPE[keyof typeof ACTION_TYPE]

interface SignIn {
  type: Extract<ActionType, 'SIGN_IN'>
  payload: User
}

interface SignOut {
  type: Extract<ActionType, 'SIGN_OUT'>
}

interface CurrentUser {
  type: Extract<ActionType, 'CURRENT_USER'>
  payload: User | ''
}

export type AuthAction = SignIn | SignOut | CurrentUser

export interface AuthState {
  user: User
  isSignedIn: boolean
}
