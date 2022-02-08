import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import router from 'next/router'
import { API_STAGE_URL } from '@/lib/util'

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

export const httpClient = (baseURL: string = API_STAGE_URL): AxiosInstance =>
  axios.create({
    baseURL,
  })
