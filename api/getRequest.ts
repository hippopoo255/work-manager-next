import axios, { AxiosResponse } from 'axios'
import { API_URL } from '@/lib/util'

let httpClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const getRequest = async <T>(
  path: string,
  handleError: ((err: AxiosResponse) => unknown) | null = null
): Promise<T> => {
  const axiosFunc: () => Promise<AxiosResponse<T>> = () => {
    return httpClient.get(path)
  }

  const res = await axiosFunc().catch((err) => {
    return err.response
  })

  if (res.status >= 400) {
    handleError ? handleError(res) : console.error(res)
    return res
  } else {
    return res.data
  }
}
export default getRequest
