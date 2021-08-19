import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { API_URL } from '@/lib/util'

export let httpClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const useApi = <T>(
  axiosFunc: () => Promise<AxiosResponse<T>>,
  initialState: T,
  handleError: ((err: AxiosResponse) => void) | null = null
): T => {
  const [data, setData] = useState<T>(initialState)
  const router = useRouter()

  useEffect(() => {
    const func = async () => {
      const res = await axiosFunc().catch((err): AxiosResponse => {
        if (err.response.status === 401) {
          router.push('/login')
        }
        return err.response
      })
      if (res.status >= 400) {
        handleError ? handleError(res) : console.error(res)
      } else {
        setData(res.data)
      }
    }
    func()
  }, [])
  return data
}

export default useApi
