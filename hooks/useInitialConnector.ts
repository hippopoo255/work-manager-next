import { useEffect, useState } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useAuth } from '.'
import { useRestApi } from '@/hooks'

type Props<T> = {
  path: string
  onSuccess?: (res: T) => void
  onError?: (err: AxiosResponse) => void
  specifiedConfig?: AxiosRequestConfig
  canGuest?: boolean
  condition?: boolean
  depend?: any
}

const useInitialConnector = <T = any>({
  path,
  onSuccess,
  onError,
  canGuest = false,
  condition = true,
  depend,
}: Props<T>) => {
  const { auth, config } = useAuth()
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(true)
  const { getMethod } = useRestApi()

  const defaultSuccessHandler = (res: T) => {
    setData(res)
  }
  const dependencies = [auth]
  if (depend !== undefined) {
    dependencies.push(depend)
  }
  useEffect(() => {
    setLoading(true)
    let unmounted = true
    if ((canGuest || auth.isLogin) && condition && unmounted) {
      const init = async () => {
        const res = await getMethod<T>(path, onError).finally(() => {
          setLoading(false)
        })
        !!onSuccess ? onSuccess(res) : defaultSuccessHandler(res)
      }
      init()
    }

    return () => {
      unmounted = false
    }
  }, [auth, depend || ''])

  return {
    data,
    loading,
    setLoading,
  }
}

export default useInitialConnector
