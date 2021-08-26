import axios, { AxiosResponse } from 'axios'
import router from 'next/router'
import { API_URL } from '@/lib/util'

export const defaultErrorHandler = (err: AxiosResponse) => {
  console.error(err)
  switch (err.status) {
    case 401:
      router.push('/login')
      break
    case 403:
      router.push('/403', '/forbidden')
      break
    case 404:
      router.push('/404', '/notfound')
      break
    default:
      throw err
  }
}

export const httpClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})
