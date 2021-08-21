import axios, { AxiosResponse } from 'axios'
import { API_URL } from '@/lib/util'

let httpClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const postRequest = async <T, U>(
  path: string,
  data: U,
  handleError: ((err: AxiosResponse) => unknown) | null = null
): Promise<T> => {
  const axiosFunc: () => Promise<AxiosResponse<T>> = () => {
    return httpClient.post(path, data)
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
export default postRequest
