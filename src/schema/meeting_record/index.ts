/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  /** return meeting record */
  get: {
    reqHeaders?:
      | {
          Authorization?: string | undefined
          Origin?: string | undefined
        }
      | undefined

    query?:
      | {
          keyword?: string | undefined
          sort_key?: string | undefined
          meeting_date?: string | undefined
          count?: string | undefined
          order_by?: string | undefined
          only_bookmark?: string | undefined
          page?: string | undefined
          only_me?: string | undefined
        }
      | undefined

    status: 200
    /** 200 response */
    resBody: Types.MeetingRecordPage[]

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

  /** post meeting record */
  post: {
    reqHeaders?:
      | {
          Authorization?: string | undefined
          Origin?: string | undefined
        }
      | undefined

    status: 201
    /** Created */
    resBody: Types.MeetingRecord

    resHeaders: {
      'Access-Control-Allow-Credentials': string
      'Access-Control-Allow-Origin': string
    }

    reqBody: Types.MeetingRecordForm
  }
}
