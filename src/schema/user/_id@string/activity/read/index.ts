/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  /** update activity read */
  put: {
    reqHeaders?:
      | {
          Authorization?: string | undefined
          Origin?: string | undefined
          'X-HTTP-Method-Override'?: string | undefined
        }
      | undefined

    status: 200
    /** 200 response */
    resBody: Types.Activity

    resHeaders: {
      'Access-Control-Allow-Origin': string
      'Access-Control-Allow-Credentials': string
    }

    reqBody: Types.Empty
  }

  /** preflight */
  options: {
    status: 200
    /** OK */
    resBody: Types.Empty

    resHeaders: {
      'Access-Control-Allow-Origin': string
      'Access-Control-Allow-Credentials': string
      'Access-Control-Allow-Methods': string
      'Access-Control-Allow-Headers': string
    }
  }
}
