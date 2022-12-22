import type { AspidaClient } from 'aspida'
import type { Methods as Methods0 } from '.'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/organization'
  const POST = 'POST'
  const OPTIONS = 'OPTIONS'

  return {
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
     * post organization
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
     * post organization
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
