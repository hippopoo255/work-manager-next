import { loginAction, logoutAction, currentUserAction } from './action'
import {
  LoginInputs,
  SignupInputs,
  AccountVerificationInputs,
} from '@/interfaces/form/inputs'
import { laravelAuth, cognitoAuth, Auth0 } from '@/lib/auth'
import { UserAction } from '@/interfaces/action/UserAction'
import { CognitoErrorMessageType } from '@/lib/auth/cognito/cognitoAuth'

export const currentUser = async (dispatch: React.Dispatch<UserAction>) => {
  cognitoAuth.currentUser()
  // =====================
  // const res = await laravelAuth.currentUser()
  // dispatch(currentUserAction(res))
  // return res
  // =====================
}

export const login = async (
  { login_id, password }: LoginInputs,
  dispatch: React.Dispatch<UserAction>
) => {
  // cognitoAuth.signout()
  cognitoAuth.signin({ login_id, password })
  // await cognitoAuth.signout()
  // cognitoAuth.verifyUser({ login_id, verificationCode: '553300' })
  // ここでUserTypeのオブジェクトを作る
  // TODO: cognitoで詰まったら↓のLaravel認証に戻す
  // =====================
  // const user = await laravelAuth.login({ login_id, password }).catch((err) => {
  //   const errBody: { [k: string]: string[] } = err.data.errors
  //   throw errBody
  // })
  // dispatch(loginAction(user))
  // return user
  // =====================
}

export const logout = async (dispatch: React.Dispatch<UserAction>) => {
  cognitoAuth.signout()
  dispatch(logoutAction())
  // =====================
  // await laravelAuth.logout().then(() => {
  //   dispatch(logoutAction())
  // })
  // =====================
}

export const signup = async (data: SignupInputs) => {
  await cognitoAuth.signup(data)
}

export const testLogin = async (dispatch: React.Dispatch<UserAction>) => {
  // =================
  // const user = await laravelAuth.testLogin().catch((err) => {
  //   const errBody: { [k: string]: string[] } = err.data.errors
  //   throw errBody
  // })
  // dispatch(loginAction(user))
  // return user
  // =================
}

export const verifyUser = async (
  data: AccountVerificationInputs,
  onSuccess: (result: any) => void,
  onError: (errCode: CognitoErrorMessageType) => void
) => {
  return await cognitoAuth.verifyUser(data, onSuccess, onError)
}

export const authOperation = {
  currentUser,
  login,
  logout,
  signup,
  testLogin,
  verifyUser,
}
