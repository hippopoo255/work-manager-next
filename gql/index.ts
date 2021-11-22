import { useState, useEffect, DependencyList } from 'react'
import { AxiosResponse } from 'axios'
import { graphqlRequest } from '@/api'
import { GraphQlData, GraphQlError } from '@/api/graphqlRequest'

export const useQuery = <T = any>(
  query: string,
  initialVal: T,
  dependencies: DependencyList | undefined = [],
  execJudge: boolean = true
) => {
  const [data, setData] = useState<T>(initialVal)

  useEffect(() => {
    let unmounted = false
    if (!unmounted) {
      const init = async () => {
        if (execJudge) {
          await graphqlRequest<T>(query)
            .then((res: AxiosResponse<GraphQlData<T>>) => {
              if (res.data.errors !== undefined) {
                throw res.data.errors
              }
              if (res.data.data !== null) {
                setData({ ...res.data.data })
              }
            })
            .catch((err: GraphQlError[]) => {
              console.error(`error!:`, err)
            })
        }
      }
      init()
    }
    return () => {
      unmounted = true
    }
  }, dependencies)

  return { data, setData }
}

export const execMutation = async <T>(query: string) => {
  const res: AxiosResponse<GraphQlData<T>> = await graphqlRequest<T>(
    query
  ).catch((err) => {
    throw new Error(err)
  })
  if (res.data?.errors !== undefined) {
    console.error('エラー!!!!', res.data.errors)
  }
  return res.data.data
}
