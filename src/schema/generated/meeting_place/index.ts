/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  /** return meeting place list */
  get: {
    reqHeaders?:
      | {
          Origin?: string | undefined
          Authorization?: string | undefined
        }
      | undefined

    status: 200
    /** 200 response */
    resBody: Types.MeetingPlace[]

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
}
