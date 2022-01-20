import { useEffect, useCallback } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useAuth } from '@/hooks'
import { getRequest, postRequest, putRequest, deleteRequest } from '@/api'
import { API_STAGE_URL } from '@/lib/util'

type Props = {
  canGuest?: boolean
}

const useRestApi = () => {
  const { auth, config } = useAuth()

  const getMethod = async <T = any>(
    path: string,
    onError?: (err: AxiosResponse) => void,
    specifiedConfig?: AxiosRequestConfig,
    baseURL: string = API_STAGE_URL
  ) => {
    const mergedConfig = mergeConfig(specifiedConfig)
    return await getRequest<T>(path, onError, mergedConfig, baseURL)
  }

  const postMethod = async <T = any, U = any>(
    path: string,
    data: U,
    onError?: (err: AxiosResponse) => void,
    specifiedConfig?: AxiosRequestConfig,
    baseURL: string = API_STAGE_URL
  ) => {
    const mergedConfig = mergeConfig(specifiedConfig)
    return await postRequest<T, U>(path, data, onError, mergedConfig, baseURL)
  }

  const putMethod = async <T = any, U = any>(
    path: string,
    data: U,
    onError?: (err: AxiosResponse) => void,
    specifiedConfig?: AxiosRequestConfig,
    baseURL: string = API_STAGE_URL
  ) => {
    const mergedConfig = mergeConfig(specifiedConfig)
    return await putRequest<T, U>(path, data, onError, mergedConfig, baseURL)
  }

  const deleteMethod = async <T = null>(
    path: string,
    specifiedConfig?: AxiosRequestConfig,
    onError?: (err: AxiosResponse) => void,
    baseURL: string = API_STAGE_URL
  ) => {
    const mergedConfig = mergeConfig(specifiedConfig)
    return await deleteRequest<T>(path, mergedConfig, onError, baseURL)
  }

  const mergeConfig = (specifiedConfig?: AxiosRequestConfig) => {
    const headers = {
      ...specifiedConfig?.headers,
      Authorization: auth.user.jwt,
    }

    return { ...specifiedConfig, headers }
  }

  return {
    getMethod,
    postMethod,
    putMethod,
    deleteMethod,
    config,
  }
}

export default useRestApi
