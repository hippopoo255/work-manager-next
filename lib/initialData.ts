import { ChatMessage } from '@/interfaces/models'

export const deletedMessage = (originalMessage: ChatMessage) => ({
  ...originalMessage,
  body: 'このメッセージは削除されました',
  images: [],
  reactions: [],
  chat_message_reads: [],
  isDelete: true,
})
