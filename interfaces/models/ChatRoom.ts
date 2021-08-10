import { User, ChatMessage } from '.'
export interface ChatRoom {
  readonly id: number
  name: string
  editable: boolean
  members: User[]
  messages: (ChatMessage | null)[]
  created_at: string
}
