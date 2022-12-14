import type { AspidaClient } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './_id@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/document_folder'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const OPTIONS = 'OPTIONS'

  return {
    _id: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        /**
         * return document folder by id
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
         * return document folder by id
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
         * @returns 200 response
         */
        options: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods1['options']['resBody'],
            Methods1['options']['resHeaders'],
            Methods1['options']['status']
          >(prefix, prefix0, OPTIONS, option).json(),
        /**
         * @returns 200 response
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
         * update document folder
         * @returns OK
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
         * update document folder
         * @returns OK
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
        $path: () => `${prefix}${prefix0}`,
      }
    },
    /**
     * return document folder
     * @returns 200 response
     */
    get: (
      option?:
        | {
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
     * return document folder
     * @returns 200 response
     */
    $get: (
      option?:
        | {
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
     * post document folder
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
     * post document folder
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
    $path: () => `${prefix}${PATH0}`,
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
