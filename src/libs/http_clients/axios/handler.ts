import { AxiosResponse, AxiosError } from 'axios'

export const defaultSuccessHandler = <T = any, D = any>(
  response: AxiosResponse<T, D>
) => Promise.resolve(response)

export const defaultErrorHandler = <T = any, D = any>(
  error: AxiosError<T, D>
) => {
  switch (error.response?.status) {
    case 401:
      // なにかする
      break
    case 403:
      // なにかする
      break
    case 404:
      // なにかする
      break
    case 422:
      // なにかする
      break
    case 500:
      // なにかする
      break
    default:
      // なにかする
      break
  }
  return Promise.reject(error.response)
}
