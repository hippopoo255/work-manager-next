import { AxiosPromise, AxiosRequestConfig } from 'axios'
import defaultClient from './client'

export const fetch = <T = any, D = any>(
  key: string,
  config?: AxiosRequestConfig<D>
): AxiosPromise<T> => defaultClient(key, config)
