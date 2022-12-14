import type { AspidaClient } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './busy'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/author/task'
  const PATH1 = '/author/task/busy'
  const GET = 'GET'
  const DELETE = 'DELETE'
  const OPTIONS = 'OPTIONS'

  return {
    busy: {
      /**
       * return author busy task
       * @returns 200 response
       */
      get: (
        option?:
          | {
              headers?: Methods1['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods1['get']['resBody'],
          Methods1['get']['resHeaders'],
          Methods1['get']['status']
        >(prefix, PATH1, GET, option).json(),
      /**
       * return author busy task
       * @returns 200 response
       */
      $get: (
        option?:
          | {
              headers?: Methods1['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods1['get']['resBody'],
          Methods1['get']['resHeaders'],
          Methods1['get']['status']
        >(prefix, PATH1, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * preflight
       * @returns OK
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods1['options']['resBody'],
          Methods1['options']['resHeaders'],
          Methods1['options']['status']
        >(prefix, PATH1, OPTIONS, option).json(),
      /**
       * preflight
       * @returns OK
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods1['options']['resBody'],
          Methods1['options']['resHeaders'],
          Methods1['options']['status']
        >(prefix, PATH1, OPTIONS, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
    /**
     * return author task
     * @returns 200 response
     */
    get: (
      option?:
        | {
            query?: Methods0['get']['query'] | undefined
            headers?: Methods0['get']['reqHeaders'] | undefined
            config?: T | undefined
          }
        | undefined
    ) =>
      fetch<
        Methods0['get']['resBody'],
        Methods0['get']['resHeaders'],
        Methods0['get']['status']
      >(prefix, PATH0, GET, option).json(),
    /**
     * return author task
     * @returns 200 response
     */
    $get: (
      option?:
        | {
            query?: Methods0['get']['query'] | undefined
            headers?: Methods0['get']['reqHeaders'] | undefined
            config?: T | undefined
          }
        | undefined
    ) =>
      fetch<
        Methods0['get']['resBody'],
        Methods0['get']['resHeaders'],
        Methods0['get']['status']
      >(prefix, PATH0, GET, option)
        .json()
        .then((r) => r.body),
    /**
     * preflight
     * @returns OK
     */
    options: (option?: { config?: T | undefined } | undefined) =>
      fetch<
        Methods0['options']['resBody'],
        Methods0['options']['resHeaders'],
        Methods0['options']['status']
      >(prefix, PATH0, OPTIONS, option).json(),
    /**
     * preflight
     * @returns OK
     */
    $options: (option?: { config?: T | undefined } | undefined) =>
      fetch<
        Methods0['options']['resBody'],
        Methods0['options']['resHeaders'],
        Methods0['options']['status']
      >(prefix, PATH0, OPTIONS, option)
        .json()
        .then((r) => r.body),
    /**
     * delete task
     * @returns OK
     */
    delete: (option: {
      body: Methods0['delete']['reqBody']
      query?: Methods0['delete']['query'] | undefined
      headers?: Methods0['delete']['reqHeaders'] | undefined
      config?: T | undefined
    }) =>
      fetch<
        Methods0['delete']['resBody'],
        Methods0['delete']['resHeaders'],
        Methods0['delete']['status']
      >(prefix, PATH0, DELETE, option).json(),
    /**
     * delete task
     * @returns OK
     */
    $delete: (option: {
      body: Methods0['delete']['reqBody']
      query?: Methods0['delete']['query'] | undefined
      headers?: Methods0['delete']['reqHeaders'] | undefined
      config?: T | undefined
    }) =>
      fetch<
        Methods0['delete']['resBody'],
        Methods0['delete']['resHeaders'],
        Methods0['delete']['status']
      >(prefix, PATH0, DELETE, option)
        .json()
        .then((r) => r.body),
    $path: (
      option?:
        | { method?: 'get' | undefined; query: Methods0['get']['query'] }
        | { method: 'delete'; query: Methods0['delete']['query'] }
        | undefined
    ) =>
      `${prefix}${PATH0}${
        option && option.query ? `?${dataToURLString(option.query)}` : ''
      }`,
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
