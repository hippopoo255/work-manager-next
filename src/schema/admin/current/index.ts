/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** return current admin */
  get: {
    reqHeaders?:
      | {
          Authorization?: string | undefined
          Origin?: string | undefined
        }
      | undefined

    status: 200
    /** 200 response */
    resBody: Types.Admin

    resHeaders: {
      'Access-Control-Allow-Credentials': string
      'Access-Control-Allow-Origin': string
      'Access-Control-Max-Age': string
    }
  }

  options: {
    status: 200
    /** 200 response */
    resBody: Types.Empty

    resHeaders: {
      'Access-Control-Allow-Origin': string
      'Access-Control-Allow-Methods': string
      'Access-Control-Allow-Credentials': string
      'Access-Control-Max-Age': string
      'Access-Control-Allow-Headers': string
    }
  }
}
