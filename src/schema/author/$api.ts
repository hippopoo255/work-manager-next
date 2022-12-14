import type { AspidaClient } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './chat_message/unread/recently'
import type { Methods as Methods1 } from './chat_room'
import type { Methods as Methods2 } from './meeting_record/recently'
import type { Methods as Methods3 } from './schedule/daily'
import type { Methods as Methods4 } from './task'
import type { Methods as Methods5 } from './task/busy'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/author/chat_message/unread/recently'
  const PATH1 = '/author/chat_room'
  const PATH2 = '/author/meeting_record/recently'
  const PATH3 = '/author/schedule/daily'
  const PATH4 = '/author/task'
  const PATH5 = '/author/task/busy'
  const GET = 'GET'
  const DELETE = 'DELETE'
  const OPTIONS = 'OPTIONS'

  return {
    chat_message: {
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
    },
    chat_room: {
      /**
       * return chat rooms author has joined
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
       * return chat rooms author has joined
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
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods1['options']['resBody'],
          Methods1['options']['resHeaders'],
          Methods1['options']['status']
        >(prefix, PATH1, OPTIONS, option).json(),
      /**
       * @returns 200 response
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
    meeting_record: {
      recently: {
        /**
         * return author daily schedule
         * @returns 200 response
         */
        get: (
          option?:
            | {
                headers?: Methods2['get']['reqHeaders'] | undefined
                config?: T | undefined
              }
            | undefined
        ) =>
          fetch<
            Methods2['get']['resBody'],
            Methods2['get']['resHeaders'],
            Methods2['get']['status']
          >(prefix, PATH2, GET, option).json(),
        /**
         * return author daily schedule
         * @returns 200 response
         */
        $get: (
          option?:
            | {
                headers?: Methods2['get']['reqHeaders'] | undefined
                config?: T | undefined
              }
            | undefined
        ) =>
          fetch<
            Methods2['get']['resBody'],
            Methods2['get']['resHeaders'],
            Methods2['get']['status']
          >(prefix, PATH2, GET, option)
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
          >(prefix, PATH2, OPTIONS, option).json(),
        /**
         * @returns 200 response
         */
        $options: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods2['options']['resBody'],
            Methods2['options']['resHeaders'],
            Methods2['options']['status']
          >(prefix, PATH2, OPTIONS, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH2}`,
      },
    },
    schedule: {
      daily: {
        /**
         * return author daily schedule
         * @returns 200 response
         */
        get: (
          option?:
            | {
                headers?: Methods3['get']['reqHeaders'] | undefined
                config?: T | undefined
              }
            | undefined
        ) =>
          fetch<
            Methods3['get']['resBody'],
            Methods3['get']['resHeaders'],
            Methods3['get']['status']
          >(prefix, PATH3, GET, option).json(),
        /**
         * return author daily schedule
         * @returns 200 response
         */
        $get: (
          option?:
            | {
                headers?: Methods3['get']['reqHeaders'] | undefined
                config?: T | undefined
              }
            | undefined
        ) =>
          fetch<
            Methods3['get']['resBody'],
            Methods3['get']['resHeaders'],
            Methods3['get']['status']
          >(prefix, PATH3, GET, option)
            .json()
            .then((r) => r.body),
        /**
         * @returns 200 response
         */
        options: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods3['options']['resBody'],
            Methods3['options']['resHeaders'],
            Methods3['options']['status']
          >(prefix, PATH3, OPTIONS, option).json(),
        /**
         * @returns 200 response
         */
        $options: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods3['options']['resBody'],
            Methods3['options']['resHeaders'],
            Methods3['options']['status']
          >(prefix, PATH3, OPTIONS, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH3}`,
      },
    },
    task: {
      busy: {
        /**
         * return author busy task
         * @returns 200 response
         */
        get: (
          option?:
            | {
                headers?: Methods5['get']['reqHeaders'] | undefined
                config?: T | undefined
              }
            | undefined
        ) =>
          fetch<
            Methods5['get']['resBody'],
            Methods5['get']['resHeaders'],
            Methods5['get']['status']
          >(prefix, PATH5, GET, option).json(),
        /**
         * return author busy task
         * @returns 200 response
         */
        $get: (
          option?:
            | {
                headers?: Methods5['get']['reqHeaders'] | undefined
                config?: T | undefined
              }
            | undefined
        ) =>
          fetch<
            Methods5['get']['resBody'],
            Methods5['get']['resHeaders'],
            Methods5['get']['status']
          >(prefix, PATH5, GET, option)
            .json()
            .then((r) => r.body),
        /**
         * preflight
         * @returns OK
         */
        options: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods5['options']['resBody'],
            Methods5['options']['resHeaders'],
            Methods5['options']['status']
          >(prefix, PATH5, OPTIONS, option).json(),
        /**
         * preflight
         * @returns OK
         */
        $options: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods5['options']['resBody'],
            Methods5['options']['resHeaders'],
            Methods5['options']['status']
          >(prefix, PATH5, OPTIONS, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH5}`,
      },
      /**
       * return author task
       * @returns 200 response
       */
      get: (
        option?:
          | {
              query?: Methods4['get']['query'] | undefined
              headers?: Methods4['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods4['get']['resBody'],
          Methods4['get']['resHeaders'],
          Methods4['get']['status']
        >(prefix, PATH4, GET, option).json(),
      /**
       * return author task
       * @returns 200 response
       */
      $get: (
        option?:
          | {
              query?: Methods4['get']['query'] | undefined
              headers?: Methods4['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods4['get']['resBody'],
          Methods4['get']['resHeaders'],
          Methods4['get']['status']
        >(prefix, PATH4, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * preflight
       * @returns OK
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods4['options']['resBody'],
          Methods4['options']['resHeaders'],
          Methods4['options']['status']
        >(prefix, PATH4, OPTIONS, option).json(),
      /**
       * preflight
       * @returns OK
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods4['options']['resBody'],
          Methods4['options']['resHeaders'],
          Methods4['options']['status']
        >(prefix, PATH4, OPTIONS, option)
          .json()
          .then((r) => r.body),
      /**
       * delete task
       * @returns OK
       */
      delete: (option: {
        body: Methods4['delete']['reqBody']
        query?: Methods4['delete']['query'] | undefined
        headers?: Methods4['delete']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods4['delete']['resBody'],
          Methods4['delete']['resHeaders'],
          Methods4['delete']['status']
        >(prefix, PATH4, DELETE, option).json(),
      /**
       * delete task
       * @returns OK
       */
      $delete: (option: {
        body: Methods4['delete']['reqBody']
        query?: Methods4['delete']['query'] | undefined
        headers?: Methods4['delete']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods4['delete']['resBody'],
          Methods4['delete']['resHeaders'],
          Methods4['delete']['status']
        >(prefix, PATH4, DELETE, option)
          .json()
          .then((r) => r.body),
      $path: (
        option?:
          | { method?: 'get' | undefined; query: Methods4['get']['query'] }
          | { method: 'delete'; query: Methods4['delete']['query'] }
          | undefined
      ) =>
        `${prefix}${PATH4}${
          option && option.query ? `?${dataToURLString(option.query)}` : ''
        }`,
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
