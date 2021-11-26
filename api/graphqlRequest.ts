import axios, { AxiosResponse } from 'axios'
import { APP_SYNC_URL, APP_SYNC_KEY } from '@/lib/util'

export type GraphQlError = {
  data?: any
  errorInfo?: any
  errorType?: string
  locations: { line: number; column: number; sourceName: null | string }[]
  message: string
  path: null | string | string[]
}
export type GraphQlData<T> = {
  data: T | null
  errors?: GraphQlError
}

const graphqlRequest = async <T = any>(
  query: string
): Promise<AxiosResponse<GraphQlData<T>>> =>
  await axios.post(
    APP_SYNC_URL,
    { query },
    {
      headers: {
        'x-api-key': APP_SYNC_KEY,
      },
    }
  )

export default graphqlRequest
