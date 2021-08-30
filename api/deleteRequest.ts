import { AxiosResponse } from 'axios'
import { defaultErrorHandler, httpClient } from '@/lib/axios'

const deleteRequest = async <T = null>(
  path: string,
  handleError: ((err: AxiosResponse) => unknown) | null = null,
  data: any = null
): Promise<T> => {
  const axiosFunc: () => Promise<AxiosResponse<null>> = () => {
    if (!!data) {
      return httpClient.delete(path, data)
    }
    return httpClient.delete(path)
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
export default deleteRequest
