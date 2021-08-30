import { SearchInputs, SelectBox } from '@/interfaces/form/inputs'
import { SortParam } from '@/interfaces/table'
export type Pager<T, U extends SearchInputs = SearchInputs> = {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
  year_month?: SelectBox[]
  query_params?: { [k in keyof U | keyof SortParam<any>]: string }
}
