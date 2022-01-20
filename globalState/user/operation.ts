import { loginAction, logoutAction, currentUserAction } from './action'
import {
  LoginInputs,
  SignupInputs,
  AccountVerificationInputs,
} from '@/interfaces/form/inputs'
import { laravelAuth, cognitoAuth, Auth0 } from '@/lib/auth'
import { UserAction } from '@/interfaces/action/UserAction'
import { User } from '@/interfaces/models'
import { requestUri } from '@/api'

export const currentUser = async (
  dispatch: React.Dispatch<UserAction>,
  currentAuthorPath: string = requestUri.currentUser
) => {
  const loggedInUser = (await cognitoAuth.currentUser(currentAuthorPath)) as
    | User
    | ''
  dispatch(currentUserAction(loggedInUser))
  return loggedInUser
  // =====================
  // const loggedInUser = await laravelAuth.currentUser()
  // dispatch(currentUserAction(loggedInUser))
  // return loggedInUser
  // =====================
}

export const login = async (
  { login_id, password }: LoginInputs,
  dispatch: React.Dispatch<UserAction>
) => {
  const loggedInUser = (await cognitoAuth.signin({
    login_id,
    password,
  })) as User
  dispatch(loginAction(loggedInUser))
  return loggedInUser
  // cognitoで詰まったら↓のLaravel認証に戻す
  // =====================
  // const loggedInUser = await laravelAuth.login({ login_id, password }).catch((err) => {
  //   const errBody: { [k: string]: string[] } = err.data.errors
  //   throw errBody
  // })
  // dispatch(loginAction(loggedInUser))
  // return loggedInUser
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
  const newAccount = await cognitoAuth.signup(data)
  return newAccount
}

export const testLogin = async (dispatch: React.Dispatch<UserAction>) => {
  const loggedInUser = await cognitoAuth.testSignin()
  if (!!loggedInUser) {
    dispatch(loginAction(loggedInUser))
  }
  return loggedInUser
  // =================
  // const loggedInUser = await laravelAuth.testLogin().catch((err) => {
  //   const errBody: { [k: string]: string[] } = err.data.errors
  //   throw errBody
  // })
  // dispatch(loginAction(loggedInUser))
  // return loggedInUser
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
