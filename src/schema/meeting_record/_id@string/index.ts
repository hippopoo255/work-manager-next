/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** return meeting record by id */
  get: {
    reqHeaders?:
      | {
          Authorization?: string | undefined
          Origin?: string | undefined
        }
      | undefined

    status: 200
    /** 200 response */
    resBody: Types.MeetingRecord

    resHeaders: {
      'Access-Control-Allow-Origin': string
      'Access-Control-Allow-Credentials': string
    }
  }

  /** update meeting record */
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
    resBody: Types.MeetingRecord

    resHeaders: {
      'Access-Control-Allow-Origin': string
      'Access-Control-Allow-Credentials': string
    }

    reqBody: Types.MeetingRecordForm
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

  /** delete meeting record */
  delete: {
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
    /** OK */
    resBody: Types.MeetingRecordPage

    resHeaders: {
      'Access-Control-Allow-Credentials': string
      'Access-Control-Allow-Origin': string
    }
  }
}
