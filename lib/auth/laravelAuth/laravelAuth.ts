import { LoginInputs, ForgotPasswordInputs } from '@/interfaces/form/inputs'
import { postRequest, getRequest, requestUri } from '@/api'
import { User } from '@/interfaces/models'
import { AxiosResponse } from 'axios'

const currentUser = async () =>
  await getRequest<User | ''>(requestUri.currentUser)

const forgotPassword = async (data: ForgotPasswordInputs) => {
  const response = await postRequest<
    {
      data: string
      message: string
    },
    ForgotPasswordInputs
  >(requestUri.forgotPassword, data).catch((err: AxiosResponse) => {
    if (err.status === 422) {
      const errBody: { [k: string]: string[] } = err.data.errors
      throw errBody
    }
    throw err
  })

  return response
}

const login = async ({ login_id, password }: LoginInputs) => {
  const user = await postRequest<User, LoginInputs>(requestUri.login, {
    login_id,
    password,
  })
  return user
}

const logout = async () => await postRequest<null, {}>(requestUri.logout, {})

const testLogin = async () =>
  await postRequest<User, {}>(requestUri.testLogin, {})

const laravelAuth = {
  currentUser,
  forgotPassword,
  login,
  logout,
  testLogin,
}

export default laravelAuth
