import { AxiosResponse } from 'axios'
import { defaultErrorHandler, httpClient } from '@/lib/axios'

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
    handleError ? handleError(res) : defaultErrorHandler(res)
    return res
  } else {
    return res.data
  }
}
export default getRequest
