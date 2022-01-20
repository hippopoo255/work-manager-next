import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import router from 'next/router'
import { API_URL, API_STAGE_URL } from '@/lib/util'

export const defaultErrorHandler = (err: AxiosResponse) => {
  console.error(err)
  console.log(router)
  return false
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
