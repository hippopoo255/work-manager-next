import React, { useCallback, useState } from 'react'
import { requestUri } from '@/api'
import { useInitialConnector, useRestApi } from '@/hooks'
import { ChatRoom } from '@/interfaces/models'
import { ChatRoomSubmit } from '@/interfaces/form/submit'
import useAuth from './useAuth'

const useChatRoom = () => {
  const { postMethod, putMethod } = useRestApi()
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const { auth } = useAuth()

  useInitialConnector<ChatRoom[]>({
    path: requestUri.chatRoom.findByOwner,
    onSuccess: (res) => setChatRooms((prev) => [...res]),
  })

  const store = useCallback(
    async (inputs: ChatRoomSubmit) => {
      return await postMethod<ChatRoom, ChatRoomSubmit>(
        requestUri.chatRoom.post,
        inputs
      )
    },
    [auth]
  )

  const update = useCallback(
    async (inputs: ChatRoomSubmit, id: number) => {
      return await putMethod<ChatRoom, ChatRoomSubmit>(
        requestUri.chatRoom.put.replace('{id}', String(id)),
        inputs
      )
    },
    [auth]
  )

  const save = useCallback(
    async (inputs: ChatRoomSubmit, id?: number) => {
      if (id === undefined) {
        return await store(inputs)
      } else {
        return await update(inputs, id)
      }
    },
    [auth]
  )

  return {
    chatRooms,
    setChatRooms,
    save,
    auth,
  }
}

export default useChatRoom
