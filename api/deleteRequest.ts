import axios, { AxiosResponse } from 'axios'
import { API_URL } from '@/lib/util'

let httpClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const deleteRequest = async (
  path: string,
  handleError: ((err: AxiosResponse) => unknown) | null = null
): Promise<null> => {
  const axiosFunc: () => Promise<AxiosResponse<null>> = () => {
    return httpClient.delete(path)
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
export default deleteRequest
