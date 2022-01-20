import { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { API_STAGE_URL } from '@/lib/util'
import { postRequest } from '.'

const putRequest = async <T, U>(
  path: string,
  data: U,
  onError?: (err: AxiosResponse) => AxiosResponse | void,
  config?: AxiosRequestConfig,
  baseURL: string = API_STAGE_URL
): Promise<T> => {
  const headers = {
    ...config?.headers,
    'X-HTTP-Method-Override': 'PUT',
  }
  const putConfig = {
    ...config,
    headers,
  }
  return await postRequest<T, U>(path, data, onError, { ...putConfig }, baseURL)
}

export default putRequest
