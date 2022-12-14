import axios, { AxiosResponse } from 'axios'
import { defaultSuccessHandler, defaultErrorHandler } from './handler'
import { API_STAGE_URL } from '~/config'
import { cognitoUser } from '~/libs/auth'

export const client = (baseURL: string = API_STAGE_URL) =>
  axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

const defaultClient = client()

defaultClient.interceptors.request.use(async (config) => {
  if (
    config.headers !== undefined &&
    config.headers.Authorization === undefined
  ) {
    const jwt = await cognitoUser.getJwt()
    config.headers.Authorization = jwt
  }
  return config
})

defaultClient.interceptors.response.use(
  (response) => defaultSuccessHandler(response),
  (error) => defaultErrorHandler(error)
)

export default defaultClient
