import { User, ChatImage, ChatMessageRead, Reaction } from '.'

export interface ChatMessage {
  readonly id: number
  body: string
  created_by: User
  to: User | null
  images: (ChatImage | null)[]
  reactions: (Reaction | null)[]
  chat_message_reads: User[]
  created_at: string
  mine?: boolean
  isUpdate?: boolean
  [k: string]: any
}
