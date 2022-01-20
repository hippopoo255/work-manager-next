import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { API_STAGE_URL } from '@/lib/util'
import { defaultErrorHandler } from './util'

const postRequest = async <T, U>(
  path: string,
  data: U,
  onError?: (err: AxiosResponse) => AxiosResponse | void,
  config?: AxiosRequestConfig,
  baseURL: string = API_STAGE_URL
): Promise<T> => {
  const httpClient: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
  })

  const response = await httpClient
    .post(path, data, { ...config })
    .catch((err) => {
      return err.response
    })

  if (response.status >= 400) {
    !!onError ? onError(response) : defaultErrorHandler(response)
    // return response
  }

  return response.data
}

export default postRequest
