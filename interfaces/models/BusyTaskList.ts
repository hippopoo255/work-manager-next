import { TaskStatusFlag } from '@/interfaces/enums/TaskStatusFlag'
import { Task } from '.'
export type BusyTaskList = {
  [k in TaskStatusFlag]: Task[]
}
