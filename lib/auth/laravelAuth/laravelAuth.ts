import { LoginInputs } from '@/interfaces/form/inputs'
import { postRequest, getRequest, requestUri } from '@/api'
import { User } from '@/interfaces/models'

const currentUser = async () =>
  await getRequest<User | ''>(requestUri.currentUser)

const login = async ({ login_id, password }: LoginInputs) => {
  const loginData: FormData = new FormData()
  loginData.append('login_id', login_id)
  loginData.append('password', password)
  const user = await postRequest<User, FormData>(requestUri.login, loginData)
  return user
}

const logout = async () => await postRequest<null, {}>(requestUri.logout, {})

const testLogin = async () =>
  await postRequest<User, {}>(requestUri.testLogin, {})

const laravelAuth = {
  currentUser,
  login,
  logout,
  testLogin,
}

export default laravelAuth
