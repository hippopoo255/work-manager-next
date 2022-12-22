import type { AspidaClient } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './_id@string'
import type { Methods as Methods2 } from './_id@string/bookmark'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/meeting_record'
  const PATH1 = '/bookmark'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'
  const OPTIONS = 'OPTIONS'

  return {
    _id: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        bookmark: {
          /**
           * bookmark meeting record
           * @returns 200 response
           */
          put: (option: {
            body: Methods2['put']['reqBody']
            headers?: Methods2['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods2['put']['resBody'],
              Methods2['put']['resHeaders'],
              Methods2['put']['status']
            >(prefix, `${prefix0}${PATH1}`, PUT, option).json(),
          /**
           * bookmark meeting record
           * @returns 200 response
           */
          $put: (option: {
            body: Methods2['put']['reqBody']
            headers?: Methods2['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods2['put']['resBody'],
              Methods2['put']['resHeaders'],
              Methods2['put']['status']
            >(prefix, `${prefix0}${PATH1}`, PUT, option)
              .json()
              .then((r) => r.body),
          /**
           * preflight
           * @returns OK
           */
          options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods2['options']['resBody'],
              Methods2['options']['resHeaders'],
              Methods2['options']['status']
            >(prefix, `${prefix0}${PATH1}`, OPTIONS, option).json(),
          /**
           * preflight
           * @returns OK
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods2['options']['resBody'],
              Methods2['options']['resHeaders'],
              Methods2['options']['status']
            >(prefix, `${prefix0}${PATH1}`, OPTIONS, option)
              .json()
              .then((r) => r.body),
          /**
           * @returns Created
           */
          post: (option: {
            body: Methods2['post']['reqBody']
            headers?: Methods2['post']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods2['post']['resBody'],
              Methods2['post']['resHeaders'],
              Methods2['post']['status']
            >(prefix, `${prefix0}${PATH1}`, POST, option).json(),
          /**
           * @returns Created
           */
          $post: (option: {
            body: Methods2['post']['reqBody']
            headers?: Methods2['post']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods2['post']['resBody'],
              Methods2['post']['resHeaders'],
              Methods2['post']['status']
            >(prefix, `${prefix0}${PATH1}`, POST, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH1}`,
        },
        /**
         * return meeting record by id
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
          >(prefix, prefix0, GET, option).json(),
        /**
         * return meeting record by id
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
          >(prefix, prefix0, GET, option)
            .json()
            .then((r) => r.body),
        /**
         * update meeting record
         * @returns 200 response
         */
        put: (option: {
          body: Methods1['put']['reqBody']
          headers?: Methods1['put']['reqHeaders'] | undefined
          config?: T | undefined
        }) =>
          fetch<
            Methods1['put']['resBody'],
            Methods1['put']['resHeaders'],
            Methods1['put']['status']
          >(prefix, prefix0, PUT, option).json(),
        /**
         * update meeting record
         * @returns 200 response
         */
        $put: (option: {
          body: Methods1['put']['reqBody']
          headers?: Methods1['put']['reqHeaders'] | undefined
          config?: T | undefined
        }) =>
          fetch<
            Methods1['put']['resBody'],
            Methods1['put']['resHeaders'],
            Methods1['put']['status']
          >(prefix, prefix0, PUT, option)
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
          >(prefix, prefix0, OPTIONS, option).json(),
        /**
         * preflight
         * @returns OK
         */
        $options: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods1['options']['resBody'],
            Methods1['options']['resHeaders'],
            Methods1['options']['status']
          >(prefix, prefix0, OPTIONS, option)
            .json()
            .then((r) => r.body),
        /**
         * delete meeting record
         * @returns OK
         */
        delete: (
          option?:
            | {
                query?: Methods1['delete']['query'] | undefined
                headers?: Methods1['delete']['reqHeaders'] | undefined
                config?: T | undefined
              }
            | undefined
        ) =>
          fetch<
            Methods1['delete']['resBody'],
            Methods1['delete']['resHeaders'],
            Methods1['delete']['status']
          >(prefix, prefix0, DELETE, option).json(),
        /**
         * delete meeting record
         * @returns OK
         */
        $delete: (
          option?:
            | {
                query?: Methods1['delete']['query'] | undefined
                headers?: Methods1['delete']['reqHeaders'] | undefined
                config?: T | undefined
              }
            | undefined
        ) =>
          fetch<
            Methods1['delete']['resBody'],
            Methods1['delete']['resHeaders'],
            Methods1['delete']['status']
          >(prefix, prefix0, DELETE, option)
            .json()
            .then((r) => r.body),
        $path: (
          option?:
            | { method: 'delete'; query: Methods1['delete']['query'] }
            | undefined
        ) =>
          `${prefix}${prefix0}${
            option && option.query ? `?${dataToURLString(option.query)}` : ''
          }`,
      }
    },
    /**
     * return meeting record
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
     * return meeting record
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
     * @returns 200 response
     */
    options: (option?: { config?: T | undefined } | undefined) =>
      fetch<
        Methods0['options']['resBody'],
        Methods0['options']['resHeaders'],
        Methods0['options']['status']
      >(prefix, PATH0, OPTIONS, option).json(),
    /**
     * @returns 200 response
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
     * post meeting record
     * @returns Created
     */
    post: (option: {
      body: Methods0['post']['reqBody']
      headers?: Methods0['post']['reqHeaders'] | undefined
      config?: T | undefined
    }) =>
      fetch<
        Methods0['post']['resBody'],
        Methods0['post']['resHeaders'],
        Methods0['post']['status']
      >(prefix, PATH0, POST, option).json(),
    /**
     * post meeting record
     * @returns Created
     */
    $post: (option: {
      body: Methods0['post']['reqBody']
      headers?: Methods0['post']['reqHeaders'] | undefined
      config?: T | undefined
    }) =>
      fetch<
        Methods0['post']['resBody'],
        Methods0['post']['resHeaders'],
        Methods0['post']['status']
      >(prefix, PATH0, POST, option)
        .json()
        .then((r) => r.body),
    $path: (
      option?:
        | { method?: 'get' | undefined; query: Methods0['get']['query'] }
        | undefined
    ) =>
      `${prefix}${PATH0}${
        option && option.query ? `?${dataToURLString(option.query)}` : ''
      }`,
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
