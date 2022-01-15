import { loginAction, logoutAction, currentUserAction } from './action'
import {
  LoginInputs,
  SignupInputs,
  AccountVerificationInputs,
} from '@/interfaces/form/inputs'
import { laravelAuth, cognitoAuth, Auth0 } from '@/lib/auth'
import { UserAction } from '@/interfaces/action/UserAction'
import { User } from '@/interfaces/models'

export const currentUser = async (dispatch: React.Dispatch<UserAction>) => {
  const user = (await cognitoAuth.currentUser()) as User | ''
  dispatch(currentUserAction(user))
  return user
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
  const user = (await cognitoAuth.signin({ login_id, password })) as User
  dispatch(loginAction(user))
  return user
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
  const responseNull = await cognitoAuth.signout()
  dispatch(logoutAction())
  return responseNull
  // =====================
  // await laravelAuth.logout().then(() => {
  //   dispatch(logoutAction())
  // })
  // =====================
}

export const signup = async (data: SignupInputs) => {
  const user = await cognitoAuth.signup(data)
  return user
}

export const testLogin = async (dispatch: React.Dispatch<UserAction>) => {
  const user = await cognitoAuth.testSignin()
  dispatch(loginAction(user))
  return user
  // =================
  // const user = await laravelAuth.testLogin().catch((err) => {
  //   const errBody: { [k: string]: string[] } = err.data.errors
  //   throw errBody
  // })
  // dispatch(loginAction(user))
  // return user
  // =================
}

export const verifyUser = async (data: AccountVerificationInputs) => {
  return await cognitoAuth.verifyUser(data)
}

export const authOperation = {
  currentUser,
  login,
  logout,
  signup,
  testLogin,
  verifyUser,
}
