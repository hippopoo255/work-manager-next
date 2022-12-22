/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** return document folder by id */
  get: {
    reqHeaders?:
      | {
          Authorization?: string | undefined
          Origin?: string | undefined
        }
      | undefined

    status: 200
    /** 200 response */
    resBody: Types.DocumentFolder[]

    resHeaders: {
      'Access-Control-Allow-Origin': string
      'Access-Control-Allow-Credentials': string
    }
  }

  options: {
    status: 200
    /** 200 response */
    resBody: Types.Empty

    resHeaders: {
      'Access-Control-Expose-Headers': string
      'Access-Control-Allow-Origin': string
      'Access-Control-Allow-Methods': string
      'Access-Control-Allow-Credentials': string
      'Access-Control-Max-Age': string
      'Access-Control-Allow-Headers': string
    }
  }

  /** update document folder */
  put: {
    reqHeaders?:
      | {
          Origin?: string | undefined
          Authorization?: string | undefined
          'X-HTTP-Method-Override'?: string | undefined
        }
      | undefined

    status: 200
    /** OK */
    resBody: Types.DocumentFolder

    resHeaders: {
      'Access-Control-Allow-Origin': string
      'Access-Control-Allow-Credentials': string
    }

    reqBody: Types.DocumentFolderForm
  }
}
