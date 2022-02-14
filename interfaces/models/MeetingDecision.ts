import { User, Task } from '.'

export interface MeetingDecision {
  readonly id: number
  decided_by: User
  created_by: User
  subject: string
  body: string
  tasks: Task[]
  created_at: string
  [k: string]: any
}
