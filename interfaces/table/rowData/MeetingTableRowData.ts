import { TableRowData } from '@/interfaces/table'
import React from 'react'

export interface MeetingTableRowData extends TableRowData {
  is_pin?: React.ReactNode
  title: JSX.Element
  meeting_date: string
  place_id: string
  summary: string
  created_at: string
  created_by: string
  id: number
  is_editable: boolean
}
