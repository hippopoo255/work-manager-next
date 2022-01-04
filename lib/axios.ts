import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import router from 'next/router'
import { API_URL, API_STAGE_URL } from '@/lib/util'

export const defaultErrorHandler = (err: AxiosResponse) => {
  console.error(err)
  switch (err.status) {
    case 401:
      router.push('/login')
      throw err
    case 403:
      router.push('/403', '/forbidden')
      throw err
    case 404:
      router.push('/404', '/notfound')
      throw err
    default:
      throw err
  }
}

export const httpClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export const postRequestToApiGateway = async <T = any>(
  resource: string,
  data?: any,
  config?: AxiosRequestConfig,
  baseURL: string = API_STAGE_URL
) => {
  const httpClient: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
  })
  const d = await httpClient
    .post<T>(resource, data, { ...config })
    .then((res: AxiosResponse<T>) => {
      return res.data
    })
    .catch()
  return d
}
