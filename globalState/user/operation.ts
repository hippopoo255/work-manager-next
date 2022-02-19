import { loginAction, logoutAction, currentUserAction } from './action'
import {
  LoginInputs,
  SignupInputs,
  AccountVerificationInputs,
} from '@/interfaces/form/inputs'
import { laravelAuth, cognitoAuth, Auth0 } from '@/lib/auth'
import { UserAction } from '@/interfaces/action/UserAction'
import { User } from '@/interfaces/models'
import { requestUri, getRequest } from '@/api'

export const duplicateEmailCount = async (
  email: SignupInputs['email']
): Promise<number> => {
  return await getRequest<User[]>(
    requestUri.user.list + `?email=${email}&likely=0&slim=1`
  )
    .then(
      (userList) => userList.filter((user) => !!user.email_verified_at).length
    )
    .catch((err) => {
      throw err
    })
}

export const currentUser = async (
  dispatch: React.Dispatch<UserAction>,
  currentAuthorPath: string = requestUri.currentUser
): Promise<User | ''> => {
  const loggedInUser = (await cognitoAuth.currentUser(currentAuthorPath)) as
    | User
    | ''

  if (loggedInUser === '') {
    dispatch(currentUserAction(loggedInUser))
  } else {
    dispatch(currentUserAction({ ...loggedInUser }))
  }
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
): Promise<User | ''> => {
  const loggedInUser = await cognitoAuth.signin({
    login_id,
    password,
  })
  if (loggedInUser !== '') {
    dispatch(loginAction(loggedInUser))
  }
  return loggedInUser
  // =====================
  // const loggedInUser = await laravelAuth.login({ login_id, password }).catch((err) => {
  //   const errBody: { [k: string]: string[] } = err.data.errors
  //   throw errBody
  // })
  // dispatch(loginAction(loggedInUser))
  // return loggedInUser
  // =====================
}

export const logout = async (
  dispatch: React.Dispatch<UserAction>
): Promise<null> => {
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

export const testLogin = async (
  dispatch: React.Dispatch<UserAction>
): Promise<User | ''> => {
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
  duplicateEmailCount,
}
