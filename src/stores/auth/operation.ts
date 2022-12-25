import { signInAction, signOutAction, currentUserAction } from './action'
import { AuthAction, AuthState } from './types'
import { cognitoUser } from '~/libs/cognito/auth'
import {
  User,
  SignInInputs,
  SignUpInputs,
  AccountVerificationInputs,
} from '~/schema/generated/@types'

const currentUser = async (
  dispatch: React.Dispatch<AuthAction>,
  user?: AuthState['user']
): Promise<User | null> => {
  const signedInUser = user ?? (await cognitoUser.currentUser())
  if (signedInUser === null) {
    dispatch(currentUserAction(signedInUser))
  } else {
    dispatch(currentUserAction({ ...signedInUser }))
  }
  return signedInUser
  // =====================
  // const signedInUser = await laravelUser.currentUser()
  // dispatch(currentUserAction(signedInUser))
  // return signedInUser
  // =====================
}

const signIn = async (
  { user_id, password }: SignInInputs,
  dispatch: React.Dispatch<AuthAction>
): Promise<User | null> => {
  const signedInUser = await cognitoUser.signIn({
    user_id,
    password,
  })
  if (signedInUser !== null) {
    dispatch(signInAction({ ...signedInUser }))
  }
  return signedInUser
  // =====================
  // const signedInUser = await laravelUser.signIn({ user_id, password }).catch((err) => {
  //   const errBody: { [k: string]: string[] } = err.data.errors
  //   throw errBody
  // })
  // dispatch(signInAction(signedInUser))
  // return signedInUser
  // =====================
}

const signOut = async (dispatch: React.Dispatch<AuthAction>): Promise<null> => {
  const responseNull = await cognitoUser.signOut()
  dispatch(signOutAction())
  return responseNull
  // =====================
  // await laravelUser.signOut().then(() => {
  //   dispatch(signOutAction())
  // })
  // =====================
}

const signUp = async (data: SignUpInputs) => {
  const encodedUserName = await cognitoUser.signUp(data)
  return encodedUserName
}

const testSignIn = async (
  dispatch: React.Dispatch<AuthAction>
): Promise<User | null> => {
  const signedInUser = await cognitoUser.testSignIn()
  if (!!signedInUser) {
    dispatch(signInAction(signedInUser))
  }
  return signedInUser
  // =================
  // const signedInUser = await laravelUser.testSignIn().catch((err) => {
  //   const errBody: { [k: string]: string[] } = err.data.errors
  //   throw errBody
  // })
  // dispatch(signInAction(signedInUser))
  // return signedInUser
  // =================
}

const verifyUser = async (data: AccountVerificationInputs) => {
  return await cognitoUser.verifyUser(data)
}

export const authOperation = {
  currentUser,
  signIn,
  signOut,
  signUp,
  testSignIn,
  verifyUser,
}
