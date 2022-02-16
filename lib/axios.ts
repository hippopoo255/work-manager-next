import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_STAGE_URL } from '@/lib/util'

export const httpClient = (baseURL: string = API_STAGE_URL): AxiosInstance =>
  axios.create({
    baseURL,
  })
