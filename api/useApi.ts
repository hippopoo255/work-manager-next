import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { defaultErrorHandler, httpClient } from '@/lib/axios'

const useApi = <T>(
  axiosFunc: Promise<T>,
  initialState: T,
  handleError: ((err: AxiosResponse) => void) | null = null
): T => {
  const [data, setData] = useState<T>(initialState)

  useEffect(() => {
    const func = async () => {
      const res = await axiosFunc
        .then((res: T) => {
          setData(res)
        })
        .catch((err): AxiosResponse => {
          return err.response
        })
    }
    func()
  }, [])
  return data
}

export default useApi
