import { AxiosResponse } from 'axios'
import { defaultErrorHandler, httpClient } from '@/lib/axios'

export type Config = {
  headers: {
    'X-HTTP-Method-Override': 'PUT'
    'Content-Type'?: 'multipart/form-data'
  }
}

const putRequest = async <T, U>(
  path: string,
  data: U,
  handleError: ((err: AxiosResponse) => unknown) | null = null,
  config: Config = {
    headers: {
      'X-HTTP-Method-Override': 'PUT',
    },
  }
): Promise<T> => {
  const axiosFunc: () => Promise<AxiosResponse<T>> = () => {
    return httpClient.post(path, data, config)
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
export default putRequest
