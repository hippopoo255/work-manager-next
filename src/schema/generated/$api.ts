import type { AspidaClient } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './admin/current'
import type { Methods as Methods2 } from './author/chat_message/unread/recently'
import type { Methods as Methods3 } from './author/chat_room'
import type { Methods as Methods4 } from './author/meeting_record/recently'
import type { Methods as Methods5 } from './author/schedule/daily'
import type { Methods as Methods6 } from './author/task'
import type { Methods as Methods7 } from './author/task/busy'
import type { Methods as Methods8 } from './blog_asset'
import type { Methods as Methods9 } from './chat_message/_id@string/report'
import type { Methods as Methods10 } from './chat_room'
import type { Methods as Methods11 } from './chat_room/_id@string'
import type { Methods as Methods12 } from './chat_room/_id@string/message'
import type { Methods as Methods13 } from './chat_room/_id@string/message/_chat_message_id@string'
import type { Methods as Methods14 } from './chat_room/_id@string/read'
import type { Methods as Methods15 } from './document_folder'
import type { Methods as Methods16 } from './document_folder/_id@string'
import type { Methods as Methods17 } from './meeting_place'
import type { Methods as Methods18 } from './meeting_record'
import type { Methods as Methods19 } from './meeting_record/_id@string'
import type { Methods as Methods20 } from './meeting_record/_id@string/bookmark'
import type { Methods as Methods21 } from './organization'
import type { Methods as Methods22 } from './prefecture'
import type { Methods as Methods23 } from './priority'
import type { Methods as Methods24 } from './progress'
import type { Methods as Methods25 } from './report_category'
import type { Methods as Methods26 } from './schedule'
import type { Methods as Methods27 } from './schedule/_id@string'
import type { Methods as Methods28 } from './task'
import type { Methods as Methods29 } from './task/_id@string'
import type { Methods as Methods30 } from './user'
import type { Methods as Methods31 } from './user/_id@string/activity'
import type { Methods as Methods32 } from './user/_id@string/activity/read'
import type { Methods as Methods33 } from './user/_id@string/notify_validation'
import type { Methods as Methods34 } from './user/_id@string/profile'
import type { Methods as Methods35 } from './user/_id@string/schedule'
import type { Methods as Methods36 } from './user/_id@string/setting'
import type { Methods as Methods37 } from './user/current'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/admin/current'
  const PATH1 = '/author/chat_message/unread/recently'
  const PATH2 = '/author/chat_room'
  const PATH3 = '/author/meeting_record/recently'
  const PATH4 = '/author/schedule/daily'
  const PATH5 = '/author/task'
  const PATH6 = '/author/task/busy'
  const PATH7 = '/blog_asset'
  const PATH8 = '/chat_message'
  const PATH9 = '/report'
  const PATH10 = '/chat_room'
  const PATH11 = '/message'
  const PATH12 = '/read'
  const PATH13 = '/document_folder'
  const PATH14 = '/meeting_place'
  const PATH15 = '/meeting_record'
  const PATH16 = '/bookmark'
  const PATH17 = '/organization'
  const PATH18 = '/prefecture'
  const PATH19 = '/priority'
  const PATH20 = '/progress'
  const PATH21 = '/report_category'
  const PATH22 = '/schedule'
  const PATH23 = '/task'
  const PATH24 = '/user'
  const PATH25 = '/activity'
  const PATH26 = '/activity/read'
  const PATH27 = '/notify_validation'
  const PATH28 = '/profile'
  const PATH29 = '/setting'
  const PATH30 = '/user/current'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'
  const OPTIONS = 'OPTIONS'

  return {
    admin: {
      current: {
        /**
         * return current admin
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
          >(prefix, PATH0, GET, option).json(),
        /**
         * return current admin
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
          >(prefix, PATH0, GET, option)
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
          >(prefix, PATH0, OPTIONS, option).json(),
        /**
         * @returns 200 response
         */
        $options: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods1['options']['resBody'],
            Methods1['options']['resHeaders'],
            Methods1['options']['status']
          >(prefix, PATH0, OPTIONS, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
    },
    author: {
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
                    headers?: Methods2['get']['reqHeaders'] | undefined
                    config?: T | undefined
                  }
                | undefined
            ) =>
              fetch<
                Methods2['get']['resBody'],
                Methods2['get']['resHeaders'],
                Methods2['get']['status']
              >(prefix, PATH1, GET, option).json(),
            /**
             * return unread message list
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
              >(prefix, PATH1, GET, option)
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
              >(prefix, PATH1, OPTIONS, option).json(),
            /**
             * @returns 200 response
             */
            $options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods2['options']['resBody'],
                Methods2['options']['resHeaders'],
                Methods2['options']['status']
              >(prefix, PATH1, OPTIONS, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${PATH1}`,
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
                headers?: Methods3['get']['reqHeaders'] | undefined
                config?: T | undefined
              }
            | undefined
        ) =>
          fetch<
            Methods3['get']['resBody'],
            Methods3['get']['resHeaders'],
            Methods3['get']['status']
          >(prefix, PATH2, GET, option).json(),
        /**
         * return chat rooms author has joined
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
          >(prefix, PATH2, GET, option)
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
          >(prefix, PATH2, OPTIONS, option).json(),
        /**
         * @returns 200 response
         */
        $options: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods3['options']['resBody'],
            Methods3['options']['resHeaders'],
            Methods3['options']['status']
          >(prefix, PATH2, OPTIONS, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH2}`,
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
                  headers?: Methods4['get']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods4['get']['resBody'],
              Methods4['get']['resHeaders'],
              Methods4['get']['status']
            >(prefix, PATH3, GET, option).json(),
          /**
           * return author daily schedule
           * @returns 200 response
           */
          $get: (
            option?:
              | {
                  headers?: Methods4['get']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods4['get']['resBody'],
              Methods4['get']['resHeaders'],
              Methods4['get']['status']
            >(prefix, PATH3, GET, option)
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
            >(prefix, PATH3, OPTIONS, option).json(),
          /**
           * @returns 200 response
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods4['options']['resBody'],
              Methods4['options']['resHeaders'],
              Methods4['options']['status']
            >(prefix, PATH3, OPTIONS, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH3}`,
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
                  headers?: Methods5['get']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods5['get']['resBody'],
              Methods5['get']['resHeaders'],
              Methods5['get']['status']
            >(prefix, PATH4, GET, option).json(),
          /**
           * return author daily schedule
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
            >(prefix, PATH4, GET, option)
              .json()
              .then((r) => r.body),
          /**
           * @returns 200 response
           */
          options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods5['options']['resBody'],
              Methods5['options']['resHeaders'],
              Methods5['options']['status']
            >(prefix, PATH4, OPTIONS, option).json(),
          /**
           * @returns 200 response
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods5['options']['resBody'],
              Methods5['options']['resHeaders'],
              Methods5['options']['status']
            >(prefix, PATH4, OPTIONS, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH4}`,
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
                  headers?: Methods7['get']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods7['get']['resBody'],
              Methods7['get']['resHeaders'],
              Methods7['get']['status']
            >(prefix, PATH6, GET, option).json(),
          /**
           * return author busy task
           * @returns 200 response
           */
          $get: (
            option?:
              | {
                  headers?: Methods7['get']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods7['get']['resBody'],
              Methods7['get']['resHeaders'],
              Methods7['get']['status']
            >(prefix, PATH6, GET, option)
              .json()
              .then((r) => r.body),
          /**
           * preflight
           * @returns OK
           */
          options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods7['options']['resBody'],
              Methods7['options']['resHeaders'],
              Methods7['options']['status']
            >(prefix, PATH6, OPTIONS, option).json(),
          /**
           * preflight
           * @returns OK
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods7['options']['resBody'],
              Methods7['options']['resHeaders'],
              Methods7['options']['status']
            >(prefix, PATH6, OPTIONS, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH6}`,
        },
        /**
         * return author task
         * @returns 200 response
         */
        get: (
          option?:
            | {
                query?: Methods6['get']['query'] | undefined
                headers?: Methods6['get']['reqHeaders'] | undefined
                config?: T | undefined
              }
            | undefined
        ) =>
          fetch<
            Methods6['get']['resBody'],
            Methods6['get']['resHeaders'],
            Methods6['get']['status']
          >(prefix, PATH5, GET, option).json(),
        /**
         * return author task
         * @returns 200 response
         */
        $get: (
          option?:
            | {
                query?: Methods6['get']['query'] | undefined
                headers?: Methods6['get']['reqHeaders'] | undefined
                config?: T | undefined
              }
            | undefined
        ) =>
          fetch<
            Methods6['get']['resBody'],
            Methods6['get']['resHeaders'],
            Methods6['get']['status']
          >(prefix, PATH5, GET, option)
            .json()
            .then((r) => r.body),
        /**
         * preflight
         * @returns OK
         */
        options: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods6['options']['resBody'],
            Methods6['options']['resHeaders'],
            Methods6['options']['status']
          >(prefix, PATH5, OPTIONS, option).json(),
        /**
         * preflight
         * @returns OK
         */
        $options: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods6['options']['resBody'],
            Methods6['options']['resHeaders'],
            Methods6['options']['status']
          >(prefix, PATH5, OPTIONS, option)
            .json()
            .then((r) => r.body),
        /**
         * delete task
         * @returns OK
         */
        delete: (option: {
          body: Methods6['delete']['reqBody']
          query?: Methods6['delete']['query'] | undefined
          headers?: Methods6['delete']['reqHeaders'] | undefined
          config?: T | undefined
        }) =>
          fetch<
            Methods6['delete']['resBody'],
            Methods6['delete']['resHeaders'],
            Methods6['delete']['status']
          >(prefix, PATH5, DELETE, option).json(),
        /**
         * delete task
         * @returns OK
         */
        $delete: (option: {
          body: Methods6['delete']['reqBody']
          query?: Methods6['delete']['query'] | undefined
          headers?: Methods6['delete']['reqHeaders'] | undefined
          config?: T | undefined
        }) =>
          fetch<
            Methods6['delete']['resBody'],
            Methods6['delete']['resHeaders'],
            Methods6['delete']['status']
          >(prefix, PATH5, DELETE, option)
            .json()
            .then((r) => r.body),
        $path: (
          option?:
            | { method?: 'get' | undefined; query: Methods6['get']['query'] }
            | { method: 'delete'; query: Methods6['delete']['query'] }
            | undefined
        ) =>
          `${prefix}${PATH5}${
            option && option.query ? `?${dataToURLString(option.query)}` : ''
          }`,
      },
    },
    blog_asset: {
      /**
       * @returns 200 response
       */
      post: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods8['post']['resBody'],
          Methods8['post']['resHeaders'],
          Methods8['post']['status']
        >(prefix, PATH7, POST, option).json(),
      /**
       * @returns 200 response
       */
      $post: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods8['post']['resBody'],
          Methods8['post']['resHeaders'],
          Methods8['post']['status']
        >(prefix, PATH7, POST, option)
          .json()
          .then((r) => r.body),
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods8['options']['resBody'],
          Methods8['options']['resHeaders'],
          Methods8['options']['status']
        >(prefix, PATH7, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods8['options']['resBody'],
          Methods8['options']['resHeaders'],
          Methods8['options']['status']
        >(prefix, PATH7, OPTIONS, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH7}`,
    },
    chat_message: {
      _id: (val1: string) => {
        const prefix1 = `${PATH8}/${val1}`

        return {
          report: {
            /**
             * post chat report
             * @returns 201 response
             */
            post: (option: {
              body: Methods9['post']['reqBody']
              headers?: Methods9['post']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods9['post']['resBody'],
                Methods9['post']['resHeaders'],
                Methods9['post']['status']
              >(prefix, `${prefix1}${PATH9}`, POST, option).json(),
            /**
             * post chat report
             * @returns 201 response
             */
            $post: (option: {
              body: Methods9['post']['reqBody']
              headers?: Methods9['post']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods9['post']['resBody'],
                Methods9['post']['resHeaders'],
                Methods9['post']['status']
              >(prefix, `${prefix1}${PATH9}`, POST, option)
                .json()
                .then((r) => r.body),
            /**
             * @returns 200 response
             */
            options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods9['options']['resBody'],
                Methods9['options']['resHeaders'],
                Methods9['options']['status']
              >(prefix, `${prefix1}${PATH9}`, OPTIONS, option).json(),
            /**
             * @returns 200 response
             */
            $options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods9['options']['resBody'],
                Methods9['options']['resHeaders'],
                Methods9['options']['status']
              >(prefix, `${prefix1}${PATH9}`, OPTIONS, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH9}`,
          },
        }
      },
    },
    chat_room: {
      _id: (val1: string) => {
        const prefix1 = `${PATH10}/${val1}`

        return {
          message: {
            _chat_message_id: (val3: string) => {
              const prefix3 = `${prefix1}${PATH11}/${val3}`

              return {
                /**
                 * update chat message
                 * @returns 200 response
                 */
                put: (option: {
                  body: Methods13['put']['reqBody']
                  headers?: Methods13['put']['reqHeaders'] | undefined
                  config?: T | undefined
                }) =>
                  fetch<
                    Methods13['put']['resBody'],
                    Methods13['put']['resHeaders'],
                    Methods13['put']['status']
                  >(prefix, prefix3, PUT, option).json(),
                /**
                 * update chat message
                 * @returns 200 response
                 */
                $put: (option: {
                  body: Methods13['put']['reqBody']
                  headers?: Methods13['put']['reqHeaders'] | undefined
                  config?: T | undefined
                }) =>
                  fetch<
                    Methods13['put']['resBody'],
                    Methods13['put']['resHeaders'],
                    Methods13['put']['status']
                  >(prefix, prefix3, PUT, option)
                    .json()
                    .then((r) => r.body),
                /**
                 * preflight
                 * @returns OK
                 */
                options: (option?: { config?: T | undefined } | undefined) =>
                  fetch<
                    Methods13['options']['resBody'],
                    Methods13['options']['resHeaders'],
                    Methods13['options']['status']
                  >(prefix, prefix3, OPTIONS, option).json(),
                /**
                 * preflight
                 * @returns OK
                 */
                $options: (option?: { config?: T | undefined } | undefined) =>
                  fetch<
                    Methods13['options']['resBody'],
                    Methods13['options']['resHeaders'],
                    Methods13['options']['status']
                  >(prefix, prefix3, OPTIONS, option)
                    .json()
                    .then((r) => r.body),
                /**
                 * delete chat message
                 * @returns No Content
                 */
                delete: (
                  option?:
                    | {
                        headers?: Methods13['delete']['reqHeaders'] | undefined
                        config?: T | undefined
                      }
                    | undefined
                ) =>
                  fetch<
                    Methods13['delete']['resBody'],
                    Methods13['delete']['resHeaders'],
                    Methods13['delete']['status']
                  >(prefix, prefix3, DELETE, option).json(),
                /**
                 * delete chat message
                 * @returns No Content
                 */
                $delete: (
                  option?:
                    | {
                        headers?: Methods13['delete']['reqHeaders'] | undefined
                        config?: T | undefined
                      }
                    | undefined
                ) =>
                  fetch<
                    Methods13['delete']['resBody'],
                    Methods13['delete']['resHeaders'],
                    Methods13['delete']['status']
                  >(prefix, prefix3, DELETE, option)
                    .json()
                    .then((r) => r.body),
                $path: () => `${prefix}${prefix3}`,
              }
            },
            /**
             * post chat message
             * @returns 201 response
             */
            post: (option: {
              body: Methods12['post']['reqBody']
              headers?: Methods12['post']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods12['post']['resBody'],
                Methods12['post']['resHeaders'],
                Methods12['post']['status']
              >(prefix, `${prefix1}${PATH11}`, POST, option).json(),
            /**
             * post chat message
             * @returns 201 response
             */
            $post: (option: {
              body: Methods12['post']['reqBody']
              headers?: Methods12['post']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods12['post']['resBody'],
                Methods12['post']['resHeaders'],
                Methods12['post']['status']
              >(prefix, `${prefix1}${PATH11}`, POST, option)
                .json()
                .then((r) => r.body),
            /**
             * @returns 200 response
             */
            options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods12['options']['resBody'],
                Methods12['options']['resHeaders'],
                Methods12['options']['status']
              >(prefix, `${prefix1}${PATH11}`, OPTIONS, option).json(),
            /**
             * @returns 200 response
             */
            $options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods12['options']['resBody'],
                Methods12['options']['resHeaders'],
                Methods12['options']['status']
              >(prefix, `${prefix1}${PATH11}`, OPTIONS, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH11}`,
          },
          read: {
            /**
             * post chat read
             * @returns 201 response
             */
            post: (option: {
              body: Methods14['post']['reqBody']
              headers?: Methods14['post']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods14['post']['resBody'],
                Methods14['post']['resHeaders'],
                Methods14['post']['status']
              >(prefix, `${prefix1}${PATH12}`, POST, option).json(),
            /**
             * post chat read
             * @returns 201 response
             */
            $post: (option: {
              body: Methods14['post']['reqBody']
              headers?: Methods14['post']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods14['post']['resBody'],
                Methods14['post']['resHeaders'],
                Methods14['post']['status']
              >(prefix, `${prefix1}${PATH12}`, POST, option)
                .json()
                .then((r) => r.body),
            /**
             * @returns 200 response
             */
            options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods14['options']['resBody'],
                Methods14['options']['resHeaders'],
                Methods14['options']['status']
              >(prefix, `${prefix1}${PATH12}`, OPTIONS, option).json(),
            /**
             * @returns 200 response
             */
            $options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods14['options']['resBody'],
                Methods14['options']['resHeaders'],
                Methods14['options']['status']
              >(prefix, `${prefix1}${PATH12}`, OPTIONS, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH12}`,
          },
          /**
           * return chat room by id
           * @returns 200 response
           */
          get: (
            option?:
              | {
                  headers?: Methods11['get']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods11['get']['resBody'],
              Methods11['get']['resHeaders'],
              Methods11['get']['status']
            >(prefix, prefix1, GET, option).json(),
          /**
           * return chat room by id
           * @returns 200 response
           */
          $get: (
            option?:
              | {
                  headers?: Methods11['get']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods11['get']['resBody'],
              Methods11['get']['resHeaders'],
              Methods11['get']['status']
            >(prefix, prefix1, GET, option)
              .json()
              .then((r) => r.body),
          /**
           * update chat room data
           * @returns 200 response
           */
          put: (option: {
            body: Methods11['put']['reqBody']
            headers?: Methods11['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods11['put']['resBody'],
              Methods11['put']['resHeaders'],
              Methods11['put']['status']
            >(prefix, prefix1, PUT, option).json(),
          /**
           * update chat room data
           * @returns 200 response
           */
          $put: (option: {
            body: Methods11['put']['reqBody']
            headers?: Methods11['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods11['put']['resBody'],
              Methods11['put']['resHeaders'],
              Methods11['put']['status']
            >(prefix, prefix1, PUT, option)
              .json()
              .then((r) => r.body),
          /**
           * preflight
           * @returns OK
           */
          options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods11['options']['resBody'],
              Methods11['options']['resHeaders'],
              Methods11['options']['status']
            >(prefix, prefix1, OPTIONS, option).json(),
          /**
           * preflight
           * @returns OK
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods11['options']['resBody'],
              Methods11['options']['resHeaders'],
              Methods11['options']['status']
            >(prefix, prefix1, OPTIONS, option)
              .json()
              .then((r) => r.body),
          /**
           * delete chat room
           * @returns No Content
           */
          delete: (
            option?:
              | {
                  headers?: Methods11['delete']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods11['delete']['resBody'],
              Methods11['delete']['resHeaders'],
              Methods11['delete']['status']
            >(prefix, prefix1, DELETE, option).json(),
          /**
           * delete chat room
           * @returns No Content
           */
          $delete: (
            option?:
              | {
                  headers?: Methods11['delete']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods11['delete']['resBody'],
              Methods11['delete']['resHeaders'],
              Methods11['delete']['status']
            >(prefix, prefix1, DELETE, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        }
      },
      /**
       * return params
       * @returns 201 response
       */
      post: (option: {
        body: Methods10['post']['reqBody']
        headers?: Methods10['post']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods10['post']['resBody'],
          Methods10['post']['resHeaders'],
          Methods10['post']['status']
        >(prefix, PATH10, POST, option).json(),
      /**
       * return params
       * @returns 201 response
       */
      $post: (option: {
        body: Methods10['post']['reqBody']
        headers?: Methods10['post']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods10['post']['resBody'],
          Methods10['post']['resHeaders'],
          Methods10['post']['status']
        >(prefix, PATH10, POST, option)
          .json()
          .then((r) => r.body),
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods10['options']['resBody'],
          Methods10['options']['resHeaders'],
          Methods10['options']['status']
        >(prefix, PATH10, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods10['options']['resBody'],
          Methods10['options']['resHeaders'],
          Methods10['options']['status']
        >(prefix, PATH10, OPTIONS, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH10}`,
    },
    document_folder: {
      _id: (val1: string) => {
        const prefix1 = `${PATH13}/${val1}`

        return {
          /**
           * return document folder by id
           * @returns 200 response
           */
          get: (
            option?:
              | {
                  headers?: Methods16['get']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods16['get']['resBody'],
              Methods16['get']['resHeaders'],
              Methods16['get']['status']
            >(prefix, prefix1, GET, option).json(),
          /**
           * return document folder by id
           * @returns 200 response
           */
          $get: (
            option?:
              | {
                  headers?: Methods16['get']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods16['get']['resBody'],
              Methods16['get']['resHeaders'],
              Methods16['get']['status']
            >(prefix, prefix1, GET, option)
              .json()
              .then((r) => r.body),
          /**
           * @returns 200 response
           */
          options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods16['options']['resBody'],
              Methods16['options']['resHeaders'],
              Methods16['options']['status']
            >(prefix, prefix1, OPTIONS, option).json(),
          /**
           * @returns 200 response
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods16['options']['resBody'],
              Methods16['options']['resHeaders'],
              Methods16['options']['status']
            >(prefix, prefix1, OPTIONS, option)
              .json()
              .then((r) => r.body),
          /**
           * update document folder
           * @returns OK
           */
          put: (option: {
            body: Methods16['put']['reqBody']
            headers?: Methods16['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods16['put']['resBody'],
              Methods16['put']['resHeaders'],
              Methods16['put']['status']
            >(prefix, prefix1, PUT, option).json(),
          /**
           * update document folder
           * @returns OK
           */
          $put: (option: {
            body: Methods16['put']['reqBody']
            headers?: Methods16['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods16['put']['resBody'],
              Methods16['put']['resHeaders'],
              Methods16['put']['status']
            >(prefix, prefix1, PUT, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        }
      },
      /**
       * return document folder
       * @returns 200 response
       */
      get: (
        option?:
          | {
              headers?: Methods15['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods15['get']['resBody'],
          Methods15['get']['resHeaders'],
          Methods15['get']['status']
        >(prefix, PATH13, GET, option).json(),
      /**
       * return document folder
       * @returns 200 response
       */
      $get: (
        option?:
          | {
              headers?: Methods15['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods15['get']['resBody'],
          Methods15['get']['resHeaders'],
          Methods15['get']['status']
        >(prefix, PATH13, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods15['options']['resBody'],
          Methods15['options']['resHeaders'],
          Methods15['options']['status']
        >(prefix, PATH13, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods15['options']['resBody'],
          Methods15['options']['resHeaders'],
          Methods15['options']['status']
        >(prefix, PATH13, OPTIONS, option)
          .json()
          .then((r) => r.body),
      /**
       * post document folder
       * @returns Created
       */
      post: (option: {
        body: Methods15['post']['reqBody']
        headers?: Methods15['post']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods15['post']['resBody'],
          Methods15['post']['resHeaders'],
          Methods15['post']['status']
        >(prefix, PATH13, POST, option).json(),
      /**
       * post document folder
       * @returns Created
       */
      $post: (option: {
        body: Methods15['post']['reqBody']
        headers?: Methods15['post']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods15['post']['resBody'],
          Methods15['post']['resHeaders'],
          Methods15['post']['status']
        >(prefix, PATH13, POST, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH13}`,
    },
    meeting_place: {
      /**
       * return meeting place list
       * @returns 200 response
       */
      get: (
        option?:
          | {
              headers?: Methods17['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods17['get']['resBody'],
          Methods17['get']['resHeaders'],
          Methods17['get']['status']
        >(prefix, PATH14, GET, option).json(),
      /**
       * return meeting place list
       * @returns 200 response
       */
      $get: (
        option?:
          | {
              headers?: Methods17['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods17['get']['resBody'],
          Methods17['get']['resHeaders'],
          Methods17['get']['status']
        >(prefix, PATH14, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods17['options']['resBody'],
          Methods17['options']['resHeaders'],
          Methods17['options']['status']
        >(prefix, PATH14, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods17['options']['resBody'],
          Methods17['options']['resHeaders'],
          Methods17['options']['status']
        >(prefix, PATH14, OPTIONS, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH14}`,
    },
    meeting_record: {
      _id: (val1: string) => {
        const prefix1 = `${PATH15}/${val1}`

        return {
          bookmark: {
            /**
             * bookmark meeting record
             * @returns 200 response
             */
            put: (option: {
              body: Methods20['put']['reqBody']
              headers?: Methods20['put']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods20['put']['resBody'],
                Methods20['put']['resHeaders'],
                Methods20['put']['status']
              >(prefix, `${prefix1}${PATH16}`, PUT, option).json(),
            /**
             * bookmark meeting record
             * @returns 200 response
             */
            $put: (option: {
              body: Methods20['put']['reqBody']
              headers?: Methods20['put']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods20['put']['resBody'],
                Methods20['put']['resHeaders'],
                Methods20['put']['status']
              >(prefix, `${prefix1}${PATH16}`, PUT, option)
                .json()
                .then((r) => r.body),
            /**
             * preflight
             * @returns OK
             */
            options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods20['options']['resBody'],
                Methods20['options']['resHeaders'],
                Methods20['options']['status']
              >(prefix, `${prefix1}${PATH16}`, OPTIONS, option).json(),
            /**
             * preflight
             * @returns OK
             */
            $options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods20['options']['resBody'],
                Methods20['options']['resHeaders'],
                Methods20['options']['status']
              >(prefix, `${prefix1}${PATH16}`, OPTIONS, option)
                .json()
                .then((r) => r.body),
            /**
             * @returns Created
             */
            post: (option: {
              body: Methods20['post']['reqBody']
              headers?: Methods20['post']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods20['post']['resBody'],
                Methods20['post']['resHeaders'],
                Methods20['post']['status']
              >(prefix, `${prefix1}${PATH16}`, POST, option).json(),
            /**
             * @returns Created
             */
            $post: (option: {
              body: Methods20['post']['reqBody']
              headers?: Methods20['post']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods20['post']['resBody'],
                Methods20['post']['resHeaders'],
                Methods20['post']['status']
              >(prefix, `${prefix1}${PATH16}`, POST, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH16}`,
          },
          /**
           * return meeting record by id
           * @returns 200 response
           */
          get: (
            option?:
              | {
                  headers?: Methods19['get']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods19['get']['resBody'],
              Methods19['get']['resHeaders'],
              Methods19['get']['status']
            >(prefix, prefix1, GET, option).json(),
          /**
           * return meeting record by id
           * @returns 200 response
           */
          $get: (
            option?:
              | {
                  headers?: Methods19['get']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods19['get']['resBody'],
              Methods19['get']['resHeaders'],
              Methods19['get']['status']
            >(prefix, prefix1, GET, option)
              .json()
              .then((r) => r.body),
          /**
           * update meeting record
           * @returns 200 response
           */
          put: (option: {
            body: Methods19['put']['reqBody']
            headers?: Methods19['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods19['put']['resBody'],
              Methods19['put']['resHeaders'],
              Methods19['put']['status']
            >(prefix, prefix1, PUT, option).json(),
          /**
           * update meeting record
           * @returns 200 response
           */
          $put: (option: {
            body: Methods19['put']['reqBody']
            headers?: Methods19['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods19['put']['resBody'],
              Methods19['put']['resHeaders'],
              Methods19['put']['status']
            >(prefix, prefix1, PUT, option)
              .json()
              .then((r) => r.body),
          /**
           * preflight
           * @returns OK
           */
          options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods19['options']['resBody'],
              Methods19['options']['resHeaders'],
              Methods19['options']['status']
            >(prefix, prefix1, OPTIONS, option).json(),
          /**
           * preflight
           * @returns OK
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods19['options']['resBody'],
              Methods19['options']['resHeaders'],
              Methods19['options']['status']
            >(prefix, prefix1, OPTIONS, option)
              .json()
              .then((r) => r.body),
          /**
           * delete meeting record
           * @returns OK
           */
          delete: (
            option?:
              | {
                  query?: Methods19['delete']['query'] | undefined
                  headers?: Methods19['delete']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods19['delete']['resBody'],
              Methods19['delete']['resHeaders'],
              Methods19['delete']['status']
            >(prefix, prefix1, DELETE, option).json(),
          /**
           * delete meeting record
           * @returns OK
           */
          $delete: (
            option?:
              | {
                  query?: Methods19['delete']['query'] | undefined
                  headers?: Methods19['delete']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods19['delete']['resBody'],
              Methods19['delete']['resHeaders'],
              Methods19['delete']['status']
            >(prefix, prefix1, DELETE, option)
              .json()
              .then((r) => r.body),
          $path: (
            option?:
              | { method: 'delete'; query: Methods19['delete']['query'] }
              | undefined
          ) =>
            `${prefix}${prefix1}${
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
              query?: Methods18['get']['query'] | undefined
              headers?: Methods18['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods18['get']['resBody'],
          Methods18['get']['resHeaders'],
          Methods18['get']['status']
        >(prefix, PATH15, GET, option).json(),
      /**
       * return meeting record
       * @returns 200 response
       */
      $get: (
        option?:
          | {
              query?: Methods18['get']['query'] | undefined
              headers?: Methods18['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods18['get']['resBody'],
          Methods18['get']['resHeaders'],
          Methods18['get']['status']
        >(prefix, PATH15, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods18['options']['resBody'],
          Methods18['options']['resHeaders'],
          Methods18['options']['status']
        >(prefix, PATH15, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods18['options']['resBody'],
          Methods18['options']['resHeaders'],
          Methods18['options']['status']
        >(prefix, PATH15, OPTIONS, option)
          .json()
          .then((r) => r.body),
      /**
       * post meeting record
       * @returns Created
       */
      post: (option: {
        body: Methods18['post']['reqBody']
        headers?: Methods18['post']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods18['post']['resBody'],
          Methods18['post']['resHeaders'],
          Methods18['post']['status']
        >(prefix, PATH15, POST, option).json(),
      /**
       * post meeting record
       * @returns Created
       */
      $post: (option: {
        body: Methods18['post']['reqBody']
        headers?: Methods18['post']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods18['post']['resBody'],
          Methods18['post']['resHeaders'],
          Methods18['post']['status']
        >(prefix, PATH15, POST, option)
          .json()
          .then((r) => r.body),
      $path: (
        option?:
          | { method?: 'get' | undefined; query: Methods18['get']['query'] }
          | undefined
      ) =>
        `${prefix}${PATH15}${
          option && option.query ? `?${dataToURLString(option.query)}` : ''
        }`,
    },
    organization: {
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods21['options']['resBody'],
          Methods21['options']['resHeaders'],
          Methods21['options']['status']
        >(prefix, PATH17, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods21['options']['resBody'],
          Methods21['options']['resHeaders'],
          Methods21['options']['status']
        >(prefix, PATH17, OPTIONS, option)
          .json()
          .then((r) => r.body),
      /**
       * post organization
       * @returns Created
       */
      post: (option: {
        body: Methods21['post']['reqBody']
        headers?: Methods21['post']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods21['post']['resBody'],
          Methods21['post']['resHeaders'],
          Methods21['post']['status']
        >(prefix, PATH17, POST, option).json(),
      /**
       * post organization
       * @returns Created
       */
      $post: (option: {
        body: Methods21['post']['reqBody']
        headers?: Methods21['post']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods21['post']['resBody'],
          Methods21['post']['resHeaders'],
          Methods21['post']['status']
        >(prefix, PATH17, POST, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH17}`,
    },
    prefecture: {
      /**
       * return prefecture list
       * @returns 200 response
       */
      get: (
        option?:
          | {
              headers?: Methods22['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods22['get']['resBody'],
          Methods22['get']['resHeaders'],
          Methods22['get']['status']
        >(prefix, PATH18, GET, option).json(),
      /**
       * return prefecture list
       * @returns 200 response
       */
      $get: (
        option?:
          | {
              headers?: Methods22['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods22['get']['resBody'],
          Methods22['get']['resHeaders'],
          Methods22['get']['status']
        >(prefix, PATH18, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods22['options']['resBody'],
          Methods22['options']['resHeaders'],
          Methods22['options']['status']
        >(prefix, PATH18, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods22['options']['resBody'],
          Methods22['options']['resHeaders'],
          Methods22['options']['status']
        >(prefix, PATH18, OPTIONS, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH18}`,
    },
    priority: {
      /**
       * return priority list
       * @returns 200 response
       */
      get: (
        option?:
          | {
              headers?: Methods23['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods23['get']['resBody'],
          Methods23['get']['resHeaders'],
          Methods23['get']['status']
        >(prefix, PATH19, GET, option).json(),
      /**
       * return priority list
       * @returns 200 response
       */
      $get: (
        option?:
          | {
              headers?: Methods23['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods23['get']['resBody'],
          Methods23['get']['resHeaders'],
          Methods23['get']['status']
        >(prefix, PATH19, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods23['options']['resBody'],
          Methods23['options']['resHeaders'],
          Methods23['options']['status']
        >(prefix, PATH19, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods23['options']['resBody'],
          Methods23['options']['resHeaders'],
          Methods23['options']['status']
        >(prefix, PATH19, OPTIONS, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH19}`,
    },
    progress: {
      /**
       * return progress list
       * @returns 200 response
       */
      get: (
        option?:
          | {
              headers?: Methods24['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods24['get']['resBody'],
          Methods24['get']['resHeaders'],
          Methods24['get']['status']
        >(prefix, PATH20, GET, option).json(),
      /**
       * return progress list
       * @returns 200 response
       */
      $get: (
        option?:
          | {
              headers?: Methods24['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods24['get']['resBody'],
          Methods24['get']['resHeaders'],
          Methods24['get']['status']
        >(prefix, PATH20, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods24['options']['resBody'],
          Methods24['options']['resHeaders'],
          Methods24['options']['status']
        >(prefix, PATH20, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods24['options']['resBody'],
          Methods24['options']['resHeaders'],
          Methods24['options']['status']
        >(prefix, PATH20, OPTIONS, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH20}`,
    },
    report_category: {
      /**
       * return report categories
       * @returns 200 response
       */
      get: (
        option?:
          | {
              headers?: Methods25['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods25['get']['resBody'],
          Methods25['get']['resHeaders'],
          Methods25['get']['status']
        >(prefix, PATH21, GET, option).json(),
      /**
       * return report categories
       * @returns 200 response
       */
      $get: (
        option?:
          | {
              headers?: Methods25['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods25['get']['resBody'],
          Methods25['get']['resHeaders'],
          Methods25['get']['status']
        >(prefix, PATH21, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods25['options']['resBody'],
          Methods25['options']['resHeaders'],
          Methods25['options']['status']
        >(prefix, PATH21, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods25['options']['resBody'],
          Methods25['options']['resHeaders'],
          Methods25['options']['status']
        >(prefix, PATH21, OPTIONS, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH21}`,
    },
    schedule: {
      _id: (val1: string) => {
        const prefix1 = `${PATH22}/${val1}`

        return {
          /**
           * return schedule by id
           * @returns 200 response
           */
          get: (
            option?:
              | {
                  headers?: Methods27['get']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods27['get']['resBody'],
              Methods27['get']['resHeaders'],
              Methods27['get']['status']
            >(prefix, prefix1, GET, option).json(),
          /**
           * return schedule by id
           * @returns 200 response
           */
          $get: (
            option?:
              | {
                  headers?: Methods27['get']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods27['get']['resBody'],
              Methods27['get']['resHeaders'],
              Methods27['get']['status']
            >(prefix, prefix1, GET, option)
              .json()
              .then((r) => r.body),
          /**
           * @returns 200 response
           */
          options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods27['options']['resBody'],
              Methods27['options']['resHeaders'],
              Methods27['options']['status']
            >(prefix, prefix1, OPTIONS, option).json(),
          /**
           * @returns 200 response
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods27['options']['resBody'],
              Methods27['options']['resHeaders'],
              Methods27['options']['status']
            >(prefix, prefix1, OPTIONS, option)
              .json()
              .then((r) => r.body),
          /**
           * update schedule
           * @returns OK
           */
          put: (option: {
            body: Methods27['put']['reqBody']
            headers?: Methods27['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods27['put']['resBody'],
              Methods27['put']['resHeaders'],
              Methods27['put']['status']
            >(prefix, prefix1, PUT, option).json(),
          /**
           * update schedule
           * @returns OK
           */
          $put: (option: {
            body: Methods27['put']['reqBody']
            headers?: Methods27['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods27['put']['resBody'],
              Methods27['put']['resHeaders'],
              Methods27['put']['status']
            >(prefix, prefix1, PUT, option)
              .json()
              .then((r) => r.body),
          /**
           * delete schedule
           * @returns No Content
           */
          delete: (option: {
            body: Methods27['delete']['reqBody']
            headers?: Methods27['delete']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods27['delete']['resBody'],
              Methods27['delete']['resHeaders'],
              Methods27['delete']['status']
            >(prefix, prefix1, DELETE, option).json(),
          /**
           * delete schedule
           * @returns No Content
           */
          $delete: (option: {
            body: Methods27['delete']['reqBody']
            headers?: Methods27['delete']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods27['delete']['resBody'],
              Methods27['delete']['resHeaders'],
              Methods27['delete']['status']
            >(prefix, prefix1, DELETE, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        }
      },
      /**
       * return schedule
       * @returns 200 response
       */
      get: (
        option?:
          | {
              headers?: Methods26['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods26['get']['resBody'],
          Methods26['get']['resHeaders'],
          Methods26['get']['status']
        >(prefix, PATH22, GET, option).json(),
      /**
       * return schedule
       * @returns 200 response
       */
      $get: (
        option?:
          | {
              headers?: Methods26['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods26['get']['resBody'],
          Methods26['get']['resHeaders'],
          Methods26['get']['status']
        >(prefix, PATH22, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods26['options']['resBody'],
          Methods26['options']['resHeaders'],
          Methods26['options']['status']
        >(prefix, PATH22, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods26['options']['resBody'],
          Methods26['options']['resHeaders'],
          Methods26['options']['status']
        >(prefix, PATH22, OPTIONS, option)
          .json()
          .then((r) => r.body),
      /**
       * post schedule
       * @returns Created
       */
      post: (option: {
        body: Methods26['post']['reqBody']
        headers?: Methods26['post']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods26['post']['resBody'],
          Methods26['post']['resHeaders'],
          Methods26['post']['status']
        >(prefix, PATH22, POST, option).json(),
      /**
       * post schedule
       * @returns Created
       */
      $post: (option: {
        body: Methods26['post']['reqBody']
        headers?: Methods26['post']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods26['post']['resBody'],
          Methods26['post']['resHeaders'],
          Methods26['post']['status']
        >(prefix, PATH22, POST, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH22}`,
    },
    task: {
      _id: (val1: string) => {
        const prefix1 = `${PATH23}/${val1}`

        return {
          /**
           * update task
           * @returns 200 response
           */
          put: (option: {
            body: Methods29['put']['reqBody']
            headers?: Methods29['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods29['put']['resBody'],
              Methods29['put']['resHeaders'],
              Methods29['put']['status']
            >(prefix, prefix1, PUT, option).json(),
          /**
           * update task
           * @returns 200 response
           */
          $put: (option: {
            body: Methods29['put']['reqBody']
            headers?: Methods29['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods29['put']['resBody'],
              Methods29['put']['resHeaders'],
              Methods29['put']['status']
            >(prefix, prefix1, PUT, option)
              .json()
              .then((r) => r.body),
          /**
           * preflight
           * @returns OK
           */
          options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods29['options']['resBody'],
              Methods29['options']['resHeaders'],
              Methods29['options']['status']
            >(prefix, prefix1, OPTIONS, option).json(),
          /**
           * preflight
           * @returns OK
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods29['options']['resBody'],
              Methods29['options']['resHeaders'],
              Methods29['options']['status']
            >(prefix, prefix1, OPTIONS, option)
              .json()
              .then((r) => r.body),
          /**
           * delete meeting record
           * @returns OK
           */
          delete: (
            option?:
              | {
                  headers?: Methods29['delete']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods29['delete']['resBody'],
              Methods29['delete']['resHeaders'],
              Methods29['delete']['status']
            >(prefix, prefix1, DELETE, option).json(),
          /**
           * delete meeting record
           * @returns OK
           */
          $delete: (
            option?:
              | {
                  headers?: Methods29['delete']['reqHeaders'] | undefined
                  config?: T | undefined
                }
              | undefined
          ) =>
            fetch<
              Methods29['delete']['resBody'],
              Methods29['delete']['resHeaders'],
              Methods29['delete']['status']
            >(prefix, prefix1, DELETE, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        }
      },
      /**
       * return task
       * @returns 200 response
       */
      get: (
        option?:
          | {
              headers?: Methods28['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods28['get']['resBody'],
          Methods28['get']['resHeaders'],
          Methods28['get']['status']
        >(prefix, PATH23, GET, option).json(),
      /**
       * return task
       * @returns 200 response
       */
      $get: (
        option?:
          | {
              headers?: Methods28['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods28['get']['resBody'],
          Methods28['get']['resHeaders'],
          Methods28['get']['status']
        >(prefix, PATH23, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods28['options']['resBody'],
          Methods28['options']['resHeaders'],
          Methods28['options']['status']
        >(prefix, PATH23, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods28['options']['resBody'],
          Methods28['options']['resHeaders'],
          Methods28['options']['status']
        >(prefix, PATH23, OPTIONS, option)
          .json()
          .then((r) => r.body),
      /**
       * post task
       * @returns Created
       */
      post: (option: {
        body: Methods28['post']['reqBody']
        headers?: Methods28['post']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods28['post']['resBody'],
          Methods28['post']['resHeaders'],
          Methods28['post']['status']
        >(prefix, PATH23, POST, option).json(),
      /**
       * post task
       * @returns Created
       */
      $post: (option: {
        body: Methods28['post']['reqBody']
        headers?: Methods28['post']['reqHeaders'] | undefined
        config?: T | undefined
      }) =>
        fetch<
          Methods28['post']['resBody'],
          Methods28['post']['resHeaders'],
          Methods28['post']['status']
        >(prefix, PATH23, POST, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH23}`,
    },
    user: {
      _id: (val1: string) => {
        const prefix1 = `${PATH24}/${val1}`

        return {
          activity: {
            read: {
              /**
               * update activity read
               * @returns 200 response
               */
              put: (option: {
                body: Methods32['put']['reqBody']
                headers?: Methods32['put']['reqHeaders'] | undefined
                config?: T | undefined
              }) =>
                fetch<
                  Methods32['put']['resBody'],
                  Methods32['put']['resHeaders'],
                  Methods32['put']['status']
                >(prefix, `${prefix1}${PATH26}`, PUT, option).json(),
              /**
               * update activity read
               * @returns 200 response
               */
              $put: (option: {
                body: Methods32['put']['reqBody']
                headers?: Methods32['put']['reqHeaders'] | undefined
                config?: T | undefined
              }) =>
                fetch<
                  Methods32['put']['resBody'],
                  Methods32['put']['resHeaders'],
                  Methods32['put']['status']
                >(prefix, `${prefix1}${PATH26}`, PUT, option)
                  .json()
                  .then((r) => r.body),
              /**
               * preflight
               * @returns OK
               */
              options: (option?: { config?: T | undefined } | undefined) =>
                fetch<
                  Methods32['options']['resBody'],
                  Methods32['options']['resHeaders'],
                  Methods32['options']['status']
                >(prefix, `${prefix1}${PATH26}`, OPTIONS, option).json(),
              /**
               * preflight
               * @returns OK
               */
              $options: (option?: { config?: T | undefined } | undefined) =>
                fetch<
                  Methods32['options']['resBody'],
                  Methods32['options']['resHeaders'],
                  Methods32['options']['status']
                >(prefix, `${prefix1}${PATH26}`, OPTIONS, option)
                  .json()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix1}${PATH26}`,
            },
            /**
             * return activity on user
             * @returns 200 response
             */
            get: (
              option?:
                | {
                    headers?: Methods31['get']['reqHeaders'] | undefined
                    config?: T | undefined
                  }
                | undefined
            ) =>
              fetch<
                Methods31['get']['resBody'],
                Methods31['get']['resHeaders'],
                Methods31['get']['status']
              >(prefix, `${prefix1}${PATH25}`, GET, option).json(),
            /**
             * return activity on user
             * @returns 200 response
             */
            $get: (
              option?:
                | {
                    headers?: Methods31['get']['reqHeaders'] | undefined
                    config?: T | undefined
                  }
                | undefined
            ) =>
              fetch<
                Methods31['get']['resBody'],
                Methods31['get']['resHeaders'],
                Methods31['get']['status']
              >(prefix, `${prefix1}${PATH25}`, GET, option)
                .json()
                .then((r) => r.body),
            /**
             * @returns 200 response
             */
            options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods31['options']['resBody'],
                Methods31['options']['resHeaders'],
                Methods31['options']['status']
              >(prefix, `${prefix1}${PATH25}`, OPTIONS, option).json(),
            /**
             * @returns 200 response
             */
            $options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods31['options']['resBody'],
                Methods31['options']['resHeaders'],
                Methods31['options']['status']
              >(prefix, `${prefix1}${PATH25}`, OPTIONS, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH25}`,
          },
          notify_validation: {
            /**
             * update user notify validation
             * @returns 200 response
             */
            get: (
              option?:
                | {
                    headers?: Methods33['get']['reqHeaders'] | undefined
                    config?: T | undefined
                  }
                | undefined
            ) =>
              fetch<
                Methods33['get']['resBody'],
                Methods33['get']['resHeaders'],
                Methods33['get']['status']
              >(prefix, `${prefix1}${PATH27}`, GET, option).json(),
            /**
             * update user notify validation
             * @returns 200 response
             */
            $get: (
              option?:
                | {
                    headers?: Methods33['get']['reqHeaders'] | undefined
                    config?: T | undefined
                  }
                | undefined
            ) =>
              fetch<
                Methods33['get']['resBody'],
                Methods33['get']['resHeaders'],
                Methods33['get']['status']
              >(prefix, `${prefix1}${PATH27}`, GET, option)
                .json()
                .then((r) => r.body),
            /**
             * @returns 200 response
             */
            options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods33['options']['resBody'],
                Methods33['options']['resHeaders'],
                Methods33['options']['status']
              >(prefix, `${prefix1}${PATH27}`, OPTIONS, option).json(),
            /**
             * @returns 200 response
             */
            $options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods33['options']['resBody'],
                Methods33['options']['resHeaders'],
                Methods33['options']['status']
              >(prefix, `${prefix1}${PATH27}`, OPTIONS, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH27}`,
          },
          profile: {
            /**
             * プロフィールの更新
             * @returns 200 response
             */
            put: (option: {
              body: Methods34['put']['reqBody']
              headers?: Methods34['put']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods34['put']['resBody'],
                Methods34['put']['resHeaders'],
                Methods34['put']['status']
              >(prefix, `${prefix1}${PATH28}`, PUT, option, 'FormData').json(),
            /**
             * プロフィールの更新
             * @returns 200 response
             */
            $put: (option: {
              body: Methods34['put']['reqBody']
              headers?: Methods34['put']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods34['put']['resBody'],
                Methods34['put']['resHeaders'],
                Methods34['put']['status']
              >(prefix, `${prefix1}${PATH28}`, PUT, option, 'FormData')
                .json()
                .then((r) => r.body),
            /**
             * preflight
             * @returns OK
             */
            options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods34['options']['resBody'],
                Methods34['options']['resHeaders'],
                Methods34['options']['status']
              >(prefix, `${prefix1}${PATH28}`, OPTIONS, option).json(),
            /**
             * preflight
             * @returns OK
             */
            $options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods34['options']['resBody'],
                Methods34['options']['resHeaders'],
                Methods34['options']['status']
              >(prefix, `${prefix1}${PATH28}`, OPTIONS, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH28}`,
          },
          schedule: {
            /**
             * return schedule on user
             * @returns 200 response
             */
            get: (
              option?:
                | {
                    headers?: Methods35['get']['reqHeaders'] | undefined
                    config?: T | undefined
                  }
                | undefined
            ) =>
              fetch<
                Methods35['get']['resBody'],
                Methods35['get']['resHeaders'],
                Methods35['get']['status']
              >(prefix, `${prefix1}${PATH22}`, GET, option).json(),
            /**
             * return schedule on user
             * @returns 200 response
             */
            $get: (
              option?:
                | {
                    headers?: Methods35['get']['reqHeaders'] | undefined
                    config?: T | undefined
                  }
                | undefined
            ) =>
              fetch<
                Methods35['get']['resBody'],
                Methods35['get']['resHeaders'],
                Methods35['get']['status']
              >(prefix, `${prefix1}${PATH22}`, GET, option)
                .json()
                .then((r) => r.body),
            /**
             * @returns 200 response
             */
            options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods35['options']['resBody'],
                Methods35['options']['resHeaders'],
                Methods35['options']['status']
              >(prefix, `${prefix1}${PATH22}`, OPTIONS, option).json(),
            /**
             * @returns 200 response
             */
            $options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods35['options']['resBody'],
                Methods35['options']['resHeaders'],
                Methods35['options']['status']
              >(prefix, `${prefix1}${PATH22}`, OPTIONS, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH22}`,
          },
          setting: {
            /**
             * customize user settings
             * @returns 200 response
             */
            put: (option: {
              body: Methods36['put']['reqBody']
              headers?: Methods36['put']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods36['put']['resBody'],
                Methods36['put']['resHeaders'],
                Methods36['put']['status']
              >(prefix, `${prefix1}${PATH29}`, PUT, option).json(),
            /**
             * customize user settings
             * @returns 200 response
             */
            $put: (option: {
              body: Methods36['put']['reqBody']
              headers?: Methods36['put']['reqHeaders'] | undefined
              config?: T | undefined
            }) =>
              fetch<
                Methods36['put']['resBody'],
                Methods36['put']['resHeaders'],
                Methods36['put']['status']
              >(prefix, `${prefix1}${PATH29}`, PUT, option)
                .json()
                .then((r) => r.body),
            /**
             * preflight
             * @returns OK
             */
            options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods36['options']['resBody'],
                Methods36['options']['resHeaders'],
                Methods36['options']['status']
              >(prefix, `${prefix1}${PATH29}`, OPTIONS, option).json(),
            /**
             * preflight
             * @returns OK
             */
            $options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods36['options']['resBody'],
                Methods36['options']['resHeaders'],
                Methods36['options']['status']
              >(prefix, `${prefix1}${PATH29}`, OPTIONS, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH29}`,
          },
        }
      },
      current: {
        /**
         * return current auth object
         * @returns 200 response
         */
        get: (
          option?:
            | {
                headers?: Methods37['get']['reqHeaders'] | undefined
                config?: T | undefined
              }
            | undefined
        ) =>
          fetch<
            Methods37['get']['resBody'],
            Methods37['get']['resHeaders'],
            Methods37['get']['status']
          >(prefix, PATH30, GET, option).json(),
        /**
         * return current auth object
         * @returns 200 response
         */
        $get: (
          option?:
            | {
                headers?: Methods37['get']['reqHeaders'] | undefined
                config?: T | undefined
              }
            | undefined
        ) =>
          fetch<
            Methods37['get']['resBody'],
            Methods37['get']['resHeaders'],
            Methods37['get']['status']
          >(prefix, PATH30, GET, option)
            .json()
            .then((r) => r.body),
        /**
         * @returns 200 response
         */
        options: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods37['options']['resBody'],
            Methods37['options']['resHeaders'],
            Methods37['options']['status']
          >(prefix, PATH30, OPTIONS, option).json(),
        /**
         * @returns 200 response
         */
        $options: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods37['options']['resBody'],
            Methods37['options']['resHeaders'],
            Methods37['options']['status']
          >(prefix, PATH30, OPTIONS, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH30}`,
      },
      /**
       * 会議の参加者を入力するドロップダウンリスト等に使用
       * @returns 200 response
       */
      get: (
        option?:
          | {
              query?: Methods30['get']['query'] | undefined
              headers?: Methods30['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods30['get']['resBody'],
          Methods30['get']['resHeaders'],
          Methods30['get']['status']
        >(prefix, PATH24, GET, option).json(),
      /**
       * 会議の参加者を入力するドロップダウンリスト等に使用
       * @returns 200 response
       */
      $get: (
        option?:
          | {
              query?: Methods30['get']['query'] | undefined
              headers?: Methods30['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods30['get']['resBody'],
          Methods30['get']['resHeaders'],
          Methods30['get']['status']
        >(prefix, PATH24, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods30['options']['resBody'],
          Methods30['options']['resHeaders'],
          Methods30['options']['status']
        >(prefix, PATH24, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods30['options']['resBody'],
          Methods30['options']['resHeaders'],
          Methods30['options']['status']
        >(prefix, PATH24, OPTIONS, option)
          .json()
          .then((r) => r.body),
      $path: (
        option?:
          | { method?: 'get' | undefined; query: Methods30['get']['query'] }
          | undefined
      ) =>
        `${prefix}${PATH24}${
          option && option.query ? `?${dataToURLString(option.query)}` : ''
        }`,
    },
    /**
     * @returns 200 response
     */
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<
        Methods0['get']['resBody'],
        Methods0['get']['resHeaders'],
        Methods0['get']['status']
      >(prefix, '', GET, option).json(),
    /**
     * @returns 200 response
     */
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<
        Methods0['get']['resBody'],
        Methods0['get']['resHeaders'],
        Methods0['get']['status']
      >(prefix, '', GET, option)
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
      >(prefix, '', OPTIONS, option).json(),
    /**
     * @returns 200 response
     */
    $options: (option?: { config?: T | undefined } | undefined) =>
      fetch<
        Methods0['options']['resBody'],
        Methods0['options']['resHeaders'],
        Methods0['options']['status']
      >(prefix, '', OPTIONS, option)
        .json()
        .then((r) => r.body),
    $path: () => `${prefix}`,
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
