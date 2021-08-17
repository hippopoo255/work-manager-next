import { TableRowData } from '.'

export interface MeetingTableRowData extends TableRowData {
  title: JSX.Element
  meeting_date: string
  place_id: string
  summary: string
  created_at: string
  recorded_by: string
  id: number
  is_editable: boolean
}
