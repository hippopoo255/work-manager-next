import { AxiosResponse } from 'axios'
import { defaultErrorHandler, httpClient } from '@/lib/axios'

export type Config = {
  headers: {
    'Content-Type'?: 'multipart/form-data'
  }
}

const postRequest = async <T, U>(
  path: string,
  data: U,
  handleError: ((err: AxiosResponse) => unknown) | null = null,
  config?: Config
): Promise<T> => {
  const axiosFunc: () => Promise<AxiosResponse<T>> = () => {
    if (config !== undefined) {
      return httpClient.post(path, data, config)
    } else {
      return httpClient.post(path, data)
    }
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
export default postRequest
