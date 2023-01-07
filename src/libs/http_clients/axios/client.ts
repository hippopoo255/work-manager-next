import axios, { AxiosRequestConfig } from 'axios'
import { defaultSuccessHandler, defaultErrorHandler } from './handler'
import { API_STAGE_URL } from '~/config/app'

export const client = (
  baseURL: string = API_STAGE_URL,
  config?: AxiosRequestConfig
) =>
  axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...config?.headers,
    },
  })

const defaultClient = client()

defaultClient.interceptors.request.use((config?: AxiosRequestConfig) => {
  return config
})

defaultClient.interceptors.response.use(
  (response) => defaultSuccessHandler(response),
  (error) => defaultErrorHandler(error)
)

export default defaultClient
