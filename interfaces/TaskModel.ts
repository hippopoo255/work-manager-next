import { UserModel, Priority, Progress } from './'
export interface TaskModel {
  readonly id: number
  body: string
  time_limit: string
  created_at: string
  owner: UserModel
  created_by: UserModel
  priority: Priority
  progress: Progress
  [k: string]: any
}
