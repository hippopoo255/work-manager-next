import { User, Tag } from '.'

enum BlogStatus {
  Pending = 'pending',
  Done = 'done',
}
export interface Blog {
  readonly id: string
  title: string
  body: string
  status: BlogStatus
  created_at: string
  updated_at: string
  tags?: Tag[]
  writtenBy: User
}
