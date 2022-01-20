import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { API_STAGE_URL } from '@/lib/util'
import { defaultErrorHandler } from './util'

const deleteRequest = async <T = null>(
  path: string,
  config?: AxiosRequestConfig,
  onError?: (err: AxiosResponse) => AxiosResponse | void,
  baseURL: string = API_STAGE_URL
): Promise<T> => {
  const httpClient: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
  })

  const response = await httpClient.delete(path, config).catch((err) => {
    return err.response
  })

  if (response.status >= 400) {
    !!onError
      ? onError(response)
      : () => {
          try {
            defaultErrorHandler(response)
          } catch (err) {
            return err
          }
        }
    return response
  }
  return response.data
}

export default deleteRequest
