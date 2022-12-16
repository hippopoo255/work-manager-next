import { AxiosResponse, AxiosError } from 'axios'

/**
 * 成功レスポンスのハンドリング
 * エラー、サクセスどちらもAxiosPromise<T,D>を返すよう統一(エラーの場合はオプショナル)
 * まだ方針未定のため、responseをPromiseしているだけ
 * @param AxiosError<T, D>
 * @returns
 */
export const defaultSuccessHandler = <T = any, D = any>(
  response: AxiosResponse<T, D>
) => Promise.resolve(response)

/**
 * エラーレスポンスのハンドリング
 * エラー、サクセスどちらもAxiosPromise<T,D>を返すよう統一(エラーの場合はオプショナル)
 * ステータスに応じたエラーハンドリング
 * @param AxiosError<T, D>
 * @returns
 */
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
