export interface TaskInputs {
  body: string
  time_limit: Date
  progress_id: number
  priority_id: number
  [k: string]: string | number | Date
}
