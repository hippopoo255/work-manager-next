import type { AspidaClient } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './_id@string'
import type { Methods as Methods2 } from './_id@string/message'
import type { Methods as Methods3 } from './_id@string/message/_chat_message_id@string'
import type { Methods as Methods4 } from './_id@string/read'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/chat_room'
  const PATH1 = '/message'
  const PATH2 = '/read'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'
  const OPTIONS = 'OPTIONS'

  return {
    _id: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        message: {
          _chat_message_id: (val2: string) => {
            const prefix2 = `${prefix0}${PATH1}/${val2}`

            return {
              /**
               * update chat message
               * @returns 200 response
               */
              put: (option: {
                body: Methods3['put']['reqBody']
                headers?: Methods3['put']['reqHeaders'] | undefined
                config?: T | undefined
              }) =>
                fetch<
                  Methods3['put']['resBody'],
                  Methods3['put']['resHeaders'],
                  Methods3['put']['status']
                >(prefix, prefix2, PUT, option).json(),
              /**
               * update chat message
               * @returns 200 response
               */
              $put: (option: {
                body: Methods3['put']['reqBody']
                headers?: Methods3['put']['reqHeaders'] | undefined
                config?: T | undefined
              }) =>
                fetch<
                  Methods3['put']['resBody'],
                  Methods3['put']['resHeaders'],
                  Methods3['put']['status']
                >(prefix, prefix2, PUT, option)
                  .json()
                  .then((r) => r.body),
              /**
               * preflight
               * @returns OK
               */
              options: (option?: { config?: T | undefined } | undefined) =>
                fetch<
                  Methods3['options']['resBody'],
                  Methods3['options']['resHeaders'],
                  Methods3['options']['status']
                >(prefix, prefix2, OPTIONS, option).json(),
              /**
               * preflight
               * @returns OK
               */
              $options: (option?: { config?: T | undefined } | undefined) =>
                fetch<
                  Methods3['options']['resBody'],
                  Methods3['options']['resHeaders'],
                  Methods3['options']['status']
                >(prefix, prefix2, OPTIONS, option)
                  .json()
                  .then((r) => r.body),
              /**
               * delete chat message
               * @returns No Content
               */
              delete: (
                option?:
                  | {
                      headers?: Methods3['delete']['reqHeaders'] | undefined
                      config?: T | undefined
                    }
                  | undefined
              ) =>
                fetch<
                  Methods3['delete']['resBody'],
                  Methods3['delete']['resHeaders'],
                  Methods3['delete']['status']
                >(prefix, prefix2, DELETE, option).json(),
              /**
               * delete chat message
               * @returns No Content
               */
              $delete: (
                option?:
                  | {
                      headers?: Methods3['delete']['reqHeaders'] | undefined
                      config?: T | undefined
                    }
                  | undefined
              ) =>
                fetch<
                  Methods3['delete']['resBody'],
                  Methods3['delete']['resHeaders'],
                  Methods3['delete']['status']
                >(prefix, prefix2, DELETE, option)
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix2}`,
            }
          },
          /**
           * post chat message
           * @returns 201 response
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
           * post chat message
           * @returns 201 response
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
          /**
           * @returns 200 response
           */
          options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods2['options']['resBody'],
              Methods2['options']['resHeaders'],
              Methods2['options']['status']
            >(prefix, `${prefix0}${PATH1}`, OPTIONS, option).json(),
          /**
           * @returns 200 response
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods2['options']['resBody'],
              Methods2['options']['resHeaders'],
              Methods2['options']['status']
            >(prefix, `${prefix0}${PATH1}`, OPTIONS, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH1}`,
        },
        read: {
          /**
           * post chat read
           * @returns 201 response
           */
          post: (option: {
            body: Methods4['post']['reqBody']
            headers?: Methods4['post']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods4['post']['resBody'],
              Methods4['post']['resHeaders'],
              Methods4['post']['status']
            >(prefix, `${prefix0}${PATH2}`, POST, option).json(),
          /**
           * post chat read
           * @returns 201 response
           */
          $post: (option: {
            body: Methods4['post']['reqBody']
            headers?: Methods4['post']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods4['post']['resBody'],
              Methods4['post']['resHeaders'],
              Methods4['post']['status']
            >(prefix, `${prefix0}${PATH2}`, POST, option)
              .json()
              .then((r) => r.body),
          /**
           * @returns 200 response
           */
          options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods4['options']['resBody'],
              Methods4['options']['resHeaders'],
              Methods4['options']['status']
            >(prefix, `${prefix0}${PATH2}`, OPTIONS, option).json(),
          /**
           * @returns 200 response
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods4['options']['resBody'],
              Methods4['options']['resHeaders'],
              Methods4['options']['status']
            >(prefix, `${prefix0}${PATH2}`, OPTIONS, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH2}`,
        },
        /**
         * return chat room by id
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
         * return chat room by id
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
         * update chat room data
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
         * update chat room data
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
         * delete chat room
         * @returns No Content
         */
        delete: (
          option?:
            | {
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
         * delete chat room
         * @returns No Content
         */
        $delete: (
          option?:
            | {
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
        $path: () => `${prefix}${prefix0}`,
      }
    },
    /**
     * return params
     * @returns 201 response
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
     * return params
     * @returns 201 response
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
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
