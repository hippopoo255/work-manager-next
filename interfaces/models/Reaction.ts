import { FacialExpression, User } from '.'

export interface Reaction {
  readonly id: number
  chat_message_id: number
  user: User
  facial_expression: FacialExpression
}
