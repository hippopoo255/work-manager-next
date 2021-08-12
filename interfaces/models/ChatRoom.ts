import { User, ChatMessage } from '.'
export interface ChatRoom {
  readonly id: number
  name: string
  editable: boolean
  members: User[]
  created_by: User
  messages: (ChatMessage | null)[]
  created_at: string
}
