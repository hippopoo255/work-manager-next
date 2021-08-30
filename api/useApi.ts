import { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'
import { defaultErrorHandler } from '@/lib/axios'
import { DependencyList } from 'react'
const useApi = <T>(
  axiosFunc: Promise<T>,
  initialState: T,
  dependencies: DependencyList | undefined = [],
  term: boolean = true
): T => {
  const [data, setData] = useState<T>(initialState)

  useEffect(() => {
    if (term) {
      const func = async () => {
        const res = await axiosFunc.then((res: T) => {
          setData(res)
        })
      }
      func()
    }
  }, dependencies)
  return data
}

export default useApi
