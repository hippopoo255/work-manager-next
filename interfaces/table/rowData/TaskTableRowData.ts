import { TableRowData } from '@/interfaces/table'
import React from 'react'

export interface TaskTableRowData extends TableRowData {
  body: string
  priority_id: string
  progress_id: React.ReactNode
  time_limit: React.ReactNode
  created_by: string
  created_at: string
  id: number
  is_editable: boolean
}
