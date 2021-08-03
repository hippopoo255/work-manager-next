import { User } from '.'

export interface Schedule {
  readonly id: number
  scheduled_by: User
  content: string
  start_date: string
  end_date: string
  is_public: boolean
  color: string
  memo: string
  created_at: string
  shared_memners: User[]
  [k: string]: any
}
