import { User, ChatMessage, ReportCategory } from '.'

export interface ChatReport {
  readonly id: number
  created_by: User
  chat_message: ChatMessage
  report_category: ReportCategory
  is_report: boolean
  [k: string]: string | number | boolean | User | ChatMessage | ReportCategory
}
