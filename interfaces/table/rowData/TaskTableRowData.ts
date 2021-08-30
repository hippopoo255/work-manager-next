import { TableRowData } from '@/interfaces/table'

export interface TaskTableRowData extends TableRowData {
  body: string
  priority_id: string
  progress_id: string
  time_limit: string
  created_by: string
  created_at: string
  id: number
  is_editable: boolean
}
