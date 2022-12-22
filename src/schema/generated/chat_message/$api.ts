import type { AspidaClient } from 'aspida'
import type { Methods as Methods0 } from './_id@string/report'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/chat_message'
  const PATH1 = '/report'
  const POST = 'POST'
  const OPTIONS = 'OPTIONS'

  return {
    _id: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        report: {
          /**
           * post chat report
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
            >(prefix, `${prefix0}${PATH1}`, POST, option).json(),
          /**
           * post chat report
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
            >(prefix, `${prefix0}${PATH1}`, POST, option)
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
            >(prefix, `${prefix0}${PATH1}`, OPTIONS, option).json(),
          /**
           * @returns 200 response
           */
          $options: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods0['options']['resBody'],
              Methods0['options']['resHeaders'],
              Methods0['options']['status']
            >(prefix, `${prefix0}${PATH1}`, OPTIONS, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH1}`,
        },
      }
    },
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
