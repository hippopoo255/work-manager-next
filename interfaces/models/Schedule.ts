import { User } from '.'

export interface Schedule {
  readonly id: number
  created_by: User
  title: string
  start: string
  end: string
  is_public: boolean
  can_edit: boolean
  color: string
  memo: string
  created_at: string
  shared_members: User[]
  [k: string]: any
}
