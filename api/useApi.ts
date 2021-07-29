import axios, { AxiosResponse } from 'axios'
import Router from 'next/router'
import { useState, useEffect } from 'react'

export let httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

const useApi = <T>(
  axiosFunc: () => Promise<AxiosResponse<T>>,
  initialState: T,
  handleError: ((err: AxiosResponse) => void) | null = null
): T => {
  const [data, setData] = useState<T>(initialState)
  useEffect(() => {
    const func = async () => {
      const res = await axiosFunc().catch((err): AxiosResponse => {
        return err.response
      })
      if (res.status !== 200) {
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
