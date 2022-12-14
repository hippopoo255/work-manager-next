import type { AspidaClient } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './_id@string/activity'
import type { Methods as Methods2 } from './_id@string/activity/read'
import type { Methods as Methods3 } from './_id@string/notify_validation'
import type { Methods as Methods4 } from './_id@string/profile'
import type { Methods as Methods5 } from './_id@string/schedule'
import type { Methods as Methods6 } from './_id@string/setting'
import type { Methods as Methods7 } from './current'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/user'
  const PATH1 = '/activity'
  const PATH2 = '/activity/read'
  const PATH3 = '/notify_validation'
  const PATH4 = '/profile'
  const PATH5 = '/schedule'
  const PATH6 = '/setting'
  const PATH7 = '/user/current'
  const GET = 'GET'
  const PUT = 'PUT'
  const OPTIONS = 'OPTIONS'

  return {
    _id: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        activity: {
          read: {
            /**
             * update activity read
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
              >(prefix, `${prefix0}${PATH2}`, PUT, option).json(),
            /**
             * update activity read
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
              >(prefix, `${prefix0}${PATH2}`, PUT, option)
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
              >(prefix, `${prefix0}${PATH2}`, OPTIONS, option).json(),
            /**
             * preflight
             * @returns OK
             */
            $options: (option?: { config?: T | undefined } | undefined) =>
              fetch<
                Methods2['options']['resBody'],
                Methods2['options']['resHeaders'],
                Methods2['options']['status']
              >(prefix, `${prefix0}${PATH2}`, OPTIONS, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix0}${PATH2}`,
          },
          /**
           * return activity on user
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
            >(prefix, `${prefix0}${PATH1}`, GET, option).json(),
          /**
           * return activity on user
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
            >(prefix, `${prefix0}${PATH1}`, GET, option)
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
            >(prefix, `${prefix0}${PATH1}`, OPTIONS, option).json(),
          /**
           * @returns 200 response
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods1['options']['resBody'],
              Methods1['options']['resHeaders'],
              Methods1['options']['status']
            >(prefix, `${prefix0}${PATH1}`, OPTIONS, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH1}`,
        },
        notify_validation: {
          /**
           * update user notify validation
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
            >(prefix, `${prefix0}${PATH3}`, GET, option).json(),
          /**
           * update user notify validation
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
            >(prefix, `${prefix0}${PATH3}`, GET, option)
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
            >(prefix, `${prefix0}${PATH3}`, OPTIONS, option).json(),
          /**
           * @returns 200 response
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods3['options']['resBody'],
              Methods3['options']['resHeaders'],
              Methods3['options']['status']
            >(prefix, `${prefix0}${PATH3}`, OPTIONS, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH3}`,
        },
        profile: {
          /**
           * プロフィールの更新
           * @returns 200 response
           */
          put: (option: {
            body: Methods4['put']['reqBody']
            headers?: Methods4['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods4['put']['resBody'],
              Methods4['put']['resHeaders'],
              Methods4['put']['status']
            >(prefix, `${prefix0}${PATH4}`, PUT, option, 'FormData').json(),
          /**
           * プロフィールの更新
           * @returns 200 response
           */
          $put: (option: {
            body: Methods4['put']['reqBody']
            headers?: Methods4['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods4['put']['resBody'],
              Methods4['put']['resHeaders'],
              Methods4['put']['status']
            >(prefix, `${prefix0}${PATH4}`, PUT, option, 'FormData')
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
            >(prefix, `${prefix0}${PATH4}`, OPTIONS, option).json(),
          /**
           * preflight
           * @returns OK
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods4['options']['resBody'],
              Methods4['options']['resHeaders'],
              Methods4['options']['status']
            >(prefix, `${prefix0}${PATH4}`, OPTIONS, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH4}`,
        },
        schedule: {
          /**
           * return schedule on user
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
            >(prefix, `${prefix0}${PATH5}`, GET, option).json(),
          /**
           * return schedule on user
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
            >(prefix, `${prefix0}${PATH5}`, GET, option)
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
            >(prefix, `${prefix0}${PATH5}`, OPTIONS, option).json(),
          /**
           * @returns 200 response
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods5['options']['resBody'],
              Methods5['options']['resHeaders'],
              Methods5['options']['status']
            >(prefix, `${prefix0}${PATH5}`, OPTIONS, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH5}`,
        },
        setting: {
          /**
           * customize user settings
           * @returns 200 response
           */
          put: (option: {
            body: Methods6['put']['reqBody']
            headers?: Methods6['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods6['put']['resBody'],
              Methods6['put']['resHeaders'],
              Methods6['put']['status']
            >(prefix, `${prefix0}${PATH6}`, PUT, option).json(),
          /**
           * customize user settings
           * @returns 200 response
           */
          $put: (option: {
            body: Methods6['put']['reqBody']
            headers?: Methods6['put']['reqHeaders'] | undefined
            config?: T | undefined
          }) =>
            fetch<
              Methods6['put']['resBody'],
              Methods6['put']['resHeaders'],
              Methods6['put']['status']
            >(prefix, `${prefix0}${PATH6}`, PUT, option)
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
            >(prefix, `${prefix0}${PATH6}`, OPTIONS, option).json(),
          /**
           * preflight
           * @returns OK
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods6['options']['resBody'],
              Methods6['options']['resHeaders'],
              Methods6['options']['status']
            >(prefix, `${prefix0}${PATH6}`, OPTIONS, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH6}`,
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
              headers?: Methods7['get']['reqHeaders'] | undefined
              config?: T | undefined
            }
          | undefined
      ) =>
        fetch<
          Methods7['get']['resBody'],
          Methods7['get']['resHeaders'],
          Methods7['get']['status']
        >(prefix, PATH7, GET, option).json(),
      /**
       * return current auth object
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
        >(prefix, PATH7, GET, option)
          .json()
          .then((r) => r.body),
      /**
       * @returns 200 response
       */
      options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods7['options']['resBody'],
          Methods7['options']['resHeaders'],
          Methods7['options']['status']
        >(prefix, PATH7, OPTIONS, option).json(),
      /**
       * @returns 200 response
       */
      $options: (option?: { config?: T | undefined } | undefined) =>
        fetch<
          Methods7['options']['resBody'],
          Methods7['options']['resHeaders'],
          Methods7['options']['status']
        >(prefix, PATH7, OPTIONS, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH7}`,
    },
    /**
     * 会議の参加者を入力するドロップダウンリスト等に使用
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
     * 会議の参加者を入力するドロップダウンリスト等に使用
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
