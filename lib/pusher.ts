import Echo from 'laravel-echo'
import { ChatMessage, User } from '@/interfaces/models'
import { PUSHER_URL } from '@/lib/util'

declare global {
  interface Window {
    Echo: Echo
    Pusher: any
  }
}

type Callback<T> = (d: T) => void
type ReadData = { readUser: User; chatRoomId: number }

export const listenMessageSent = (callback: Callback<ChatMessage>) => {
  window.Pusher = require('pusher-js')

  window.Echo = new Echo({
    broadcaster: 'pusher',
    host: PUSHER_URL,
    key: process.env.NEXT_PUBLIC_MIX_PUSHER_APP_KEY,
    cluster: process.env.NEXT_PUBLIC_MIX_PUSHER_APP_CLUSTER,
    forceTLS: true,
  })
  window.Echo.channel('chat').listen(
    'MessageSent',
    (data: { message: ChatMessage }) => {
      callback(data.message)
    }
  )
}

export const listenMessageRead = (callback: Callback<ReadData>) => {
  window.Pusher = require('pusher-js')

  window.Echo = new Echo({
    broadcaster: 'pusher',
    host: PUSHER_URL,
    key: process.env.NEXT_PUBLIC_MIX_PUSHER_APP_KEY,
    cluster: process.env.NEXT_PUBLIC_MIX_PUSHER_APP_CLUSTER,
    forceTLS: true,
  })
  window.Echo.channel('chat').listen('MessageRead', (data: ReadData) => {
    callback(data)
  })
}
