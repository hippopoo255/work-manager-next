/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** return author task */
  get: {
    reqHeaders?:
      | {
          Authorization?: string | undefined
          Origin?: string | undefined
        }
      | undefined

    query?:
      | {
          page?: string | undefined
          status?: string | undefined
          order_by?: string | undefined
          sort_key?: string | undefined
          progress_id?: string | undefined
          priority_id?: string | undefined
        }
      | undefined

    status: 200
    /** 200 response */
    resBody: Types.TaskPage

    resHeaders: {
      'Access-Control-Allow-Origin': string
      'Access-Control-Allow-Credentials': string
    }
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

  /** delete task */
  delete: {
    reqHeaders?:
      | {
          Authorization?: string | undefined
          Origin?: string | undefined
        }
      | undefined

    query?:
      | {
          page?: string | undefined
          status?: string | undefined
          sort_key?: string | undefined
          order_by?: string | undefined
          priority_id?: string | undefined
          progress_id?: string | undefined
        }
      | undefined

    status: 200
    /** OK */
    resBody: Types.TaskPage

    resHeaders: {
      'Access-Control-Allow-Credentials': string
      'Access-Control-Allow-Origin': string
    }

    reqBody: Types.TaskDeleteForm
  }
}
