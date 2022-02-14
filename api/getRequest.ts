import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { API_STAGE_URL } from '@/lib/util'
import { defaultErrorHandler } from './util'
import { httpClient } from '@/lib/axios'

const getRequest = async <T = any>(
  path: string,
  onError?: (err: AxiosResponse) => void,
  config?: AxiosRequestConfig,
  baseURL: string = API_STAGE_URL
) => {
  const response = await httpClient(baseURL)
    .get<T>(path, { ...config })
    .then((res: AxiosResponse<T>) => {
      return res
    })
    .catch((err: AxiosError<T>) => {
      return err.response || ({ status: 500, data: {} } as AxiosResponse<T>)
    })

  if (response.status >= 400) {
    !!onError ? onError(response) : defaultErrorHandler(response)
  }

  return response.data
}

export default getRequest
