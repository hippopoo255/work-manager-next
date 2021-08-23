import { User } from '.'

export interface ChatMessageRead {
  readonly id: number
  chat_message_id: number
  user: User
  created_at: string
}
