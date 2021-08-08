import { User, Priority, Progress } from './'
export interface Task {
  readonly id: number
  body: string
  time_limit: string
  created_at: string
  owner: User
  created_by: User
  priority: Priority
  progress: Progress
  [k: string]: any
}
