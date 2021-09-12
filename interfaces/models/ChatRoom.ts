import { User, ChatMessage, LastRead } from '.'
export interface ChatRoom {
  readonly id: number
  name: string
  can_edit: boolean
  members: User[]
  created_by: User
  latest_message_date: string
  messages: (ChatMessage | null)[]
  last_reads: (LastRead | null)[]
  unread_count: number
  created_at: string
}
