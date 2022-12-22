import { AuthAction, ACTION_TYPE } from './types'
import { User } from '~/schema/generated/@types'

export const signInAction = (signedInUser: User): AuthAction => ({
  type: ACTION_TYPE.SIGN_IN,
  payload: signedInUser,
})

export const signOutAction = (): AuthAction => ({
  type: ACTION_TYPE.SIGN_OUT,
})

export const currentUserAction = (currentUser: User | null): AuthAction => ({
  type: ACTION_TYPE.CURRENT_USER,
  payload: currentUser,
})
