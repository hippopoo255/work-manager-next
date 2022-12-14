import type { AspidaClient } from 'aspida'
import type { Methods as Methods0 } from './unread/recently'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/author/chat_message/unread/recently'
  const GET = 'GET'
  const OPTIONS = 'OPTIONS'

  return {
    unread: {
      recently: {
        /**
         * return unread message list
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
         * return unread message list
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
        $path: () => `${prefix}${PATH0}`,
      },
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
