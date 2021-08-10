import { User, ChatImage } from '.'

export interface ChatMessage {
  readonly id: number
  body: string
  written_by: User
  to: User | null
  images: (ChatImage | null)[]
  created_at: string
  mine: boolean
  [k: string]: any
}
