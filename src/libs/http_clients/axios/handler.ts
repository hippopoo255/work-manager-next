import { AxiosResponse, AxiosError } from 'axios'
import { i18n, I18n } from 'next-i18next'

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
  let message = ''
  switch (error.response?.status) {
    case 401:
      message = i18n?.t('error.unAuthorized') ?? 'unAuthorized'
      break
    case 403:
      message = i18n?.t('error.forbidden') ?? 'forbidden'
      break
    case 404:
      message = i18n?.t('error.notFound') ?? 'No data was found'
      break
    case 422:
      message = i18n?.t('error.invalid') ?? 'Invalid data'
      break
    case 500:
      message = i18n?.t('error.serverError') ?? 'Server error'
      break
    default:
      message = i18n?.t('error.serverError') ?? 'Server error'
      break
  }
  return Promise.reject({
    ...error.response,
    data: {
      ...error.response?.data,
      message,
    },
  })
}
