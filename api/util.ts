import { AxiosResponse } from 'axios'
import router from 'next/router'

export const defaultErrorHandler = (err: AxiosResponse) => {
  switch (err.status) {
    case 401:
      router.push('/login')
      throw err
    case 403:
      router.push('/403', router.router?.asPath)
      throw err
    case 404:
      router.push('/404', router.router?.asPath)
      throw err
    // case 422:
    //   return err
    default:
      throw err
  }
}
