import { AxiosRequestConfig } from 'axios'
import { useMemo } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import * as swr__internal from 'swr/_internal'
import { useAuthContext } from '../auth'

const useSwr = <D = any>(
  path: string,
  config?: AxiosRequestConfig,
  swrConfig?: Partial<
    swr__internal.PublicConfiguration<any, any, swr__internal.BareFetcher<any>>
  >,
  requiredAuth: boolean = true
) => {
  const { mutate } = useSWRConfig()
  const { auth } = useAuthContext()
  const authConfig = useMemo(() => {
    const headers = {
      ...config?.headers,
      Authorization: auth.user.jwt ?? '',
    }

    return {
      ...config,
      headers,
    }
  }, [auth, config])

  const { data, error, isValidating } = useSWR<D>(
    [path, authConfig, !requiredAuth || auth.isSignedIn],
    { ...swrConfig }
  )
  const fetch = () => mutate(path)
  return {
    data,
    error,
    fetch,
    isValidating,
  }
}

export default useSwr
