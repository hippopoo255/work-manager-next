import { AxiosRequestConfig } from 'axios'
import { useCallback, useEffect, useMemo } from 'react'
import { useAuthContext } from '../auth'
import { fetch } from '~/libs/http_clients/axios'

const useFetch = () => {
  const { auth } = useAuthContext()

  const config = useMemo(() => {
    const jwt = auth.user.jwt
    const c = {
      headers: {
        Authorization: jwt ?? '',
      },
    }
    return { ...c }
  }, [auth.isSignedIn])

  const get = async <T = any, D = any>(
    path: string,
    options?: AxiosRequestConfig<D>
  ) => {
    return await exec<T>(path, { ...config, ...options })
  }

  const post = useCallback(
    async <T = any, D = any>(
      path: string,
      data: D,
      options?: AxiosRequestConfig<D>
    ) => {
      return await exec<T>(path, {
        ...config,
        data,
        method: 'POST',
        ...options,
      })
    },
    [config]
  )

  const put = useCallback(
    async <T = any, D = any>(
      path: string,
      data: D,
      options?: AxiosRequestConfig<D>
    ) => {
      return await exec<T>(path, { ...config, data, method: 'PUT', ...options })
    },
    [config]
  )

  const remove = useCallback(
    async <T = any, D = any>(
      path: string,
      data?: D,
      options?: AxiosRequestConfig<D>
    ) => {
      return await exec<T>(path, {
        ...config,
        data,
        method: 'DELETE',
        ...options,
      })
    },

    [config]
  )

  const exec = async <T = any, D = any>(
    path: string,
    specifiedConfig?: AxiosRequestConfig<D>
  ) => await fetch<T>(path, { ...config, ...specifiedConfig })

  return {
    get,
    post,
    put,
    remove,
    auth,
  }
}

export default useFetch
