import React, { useCallback, useState } from 'react'
import { ChatRoom, ChatMessage, LastRead } from '@/interfaces/models'
import { ChatMessageSubmit } from '@/interfaces/form/submit'
import { useAuth, useRestApi, useInitialConnector } from '@/hooks'
import { mine, API_DIRECT_URL } from '@/lib/util'
import { requestUri } from '@/api'
import { ReadData } from '@/lib/pusher'
import { deletedMessage } from '@/lib/initialData'

type Props = {
  chatRoomId?: number
  init?: Function
}

const useChatMessage = ({ chatRoomId, init }: Props) => {
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null)
  const { putMethod, postMethod, deleteMethod } = useRestApi()
  const { auth } = useAuth()

  useInitialConnector<ChatRoom>({
    path: requestUri.chatRoom.id.replace('{id}', String(chatRoomId)),
    onSuccess: (data) => {
      setChatRoom((prev) => ({
        ...prev,
        ...data,
      }))
      if (!!init) {
        init()
      }
    },
    depend: chatRoomId,
    condition: chatRoomId !== undefined,
  })

  const addNewMessage = (targetMessage: ChatMessage) => {
    setChatRoom((prev) => {
      if (prev !== null) {
        return {
          ...prev,
          messages: prev.messages.concat([targetMessage]),
        }
      } else {
        return null
      }
    })
  }

  const replaceUpdateMessage = (targetMessage: ChatMessage) => {
    setChatRoom((prev) => {
      if (prev !== null) {
        const newMessages = [...prev.messages]
        const index = newMessages.findIndex(
          (msg) => msg !== null && msg.id === targetMessage.id
        )
        newMessages.splice(index, 1, targetMessage)
        return {
          ...prev,
          messages: newMessages,
        }
      } else {
        return null
      }
    })
  }

  const replaceDeleteMessage = (id?: number | string) => {
    setChatRoom((prev) => {
      if (prev !== null) {
        const newMessages = [...prev.messages]
        const index = newMessages.findIndex(
          (msg) => msg !== null && msg.id === id
        )
        const targetMessage = newMessages[index]
        if (targetMessage !== null) {
          newMessages.splice(index, 1, deletedMessage(targetMessage))
        }
        return {
          ...prev,
          messages: newMessages,
        }
      } else {
        return null
      }
    })
  }

  const update = useCallback(
    async (inputs: ChatMessageSubmit, id: number) => {
      const path = requestUri.chatMessage.put
        .replace('{chat_room_id}', String(chatRoomId))
        .replace('{id}', String(id))
      return await putMethod<ChatMessage, ChatMessageSubmit>(
        path,
        inputs,
        undefined,
        undefined,
        API_DIRECT_URL
      ).then((res) => {
        replaceUpdateMessage(res)
        return res
      })
    },
    [auth, chatRoom]
  )

  const store = useCallback(
    async (inputs: ChatMessageSubmit) => {
      const path = requestUri.chatMessage.post.replace(
        '{chat_room_id}',
        String(chatRoomId)
      )
      return await postMethod<ChatMessage, ChatMessageSubmit>(
        path,
        inputs,
        undefined,
        undefined,
        API_DIRECT_URL
      ).then((res) => {
        addNewMessage(res)
        return res
      })
    },
    [auth, chatRoom]
  )

  const save = useCallback(
    async (inputs: ChatMessageSubmit, id?: number) => {
      if (id === undefined) {
        return await store(inputs)
      } else {
        return await update(inputs, id)
      }
    },
    [auth, chatRoom]
  )

  const deleteMessage = async (id?: number | string) => {
    const path = requestUri.chatMessage.put
      .replace('{chat_room_id}', String(chatRoomId))
      .replace('{id}', String(id))
    await deleteMethod(path).then(() => {
      replaceDeleteMessage(id)
    })
  }

  const deleteChatRoom = async () =>
    await deleteMethod(
      requestUri.chatRoom.delete.replace('{id}', String(chatRoomId))
    )

  const read = useCallback(async () => {
    if (chatRoomId) {
      await postMethod<ChatRoom, {}>(
        requestUri.chatRoom.read.replace('{id}', String(chatRoomId)),
        {}
      )
    }
  }, [auth, chatRoomId])

  const updateLastReads = ({ readUser, chatRoomId }: ReadData) => {
    // chatRoom.last_readsの更新
    setChatRoom((prevChatRoom: any) => {
      if (prevChatRoom === null) {
        return null
      }
      // - チャットルームができたタイミング
      // - 新しくチャットルームに招待されたタイミング
      const i = prevChatRoom.last_reads.findIndex(
        (lastRead: LastRead | null) => {
          return lastRead === null ? false : lastRead.member_id === readUser.id
        }
      )
      // 過去に既読したことがある場合(chatRoom.last_readsに今回既読したユーザに関するレコードがある場合)
      if (i !== -1) {
        // 既読したユーザが最後に読んだメッセージのメッセージID
        const lastMessageId = prevChatRoom.last_reads[i].last_message_id
        const newMessages = prevChatRoom.messages.map(
          (message: ChatMessage) => {
            if (
              message.id > lastMessageId &&
              !mine(readUser.id, message!.created_by.id)
            ) {
              const index = message.chat_message_reads.findIndex((read) => {
                read.member_id === readUser.id
              })
              if (index === -1) {
                message!.chat_message_reads.push(readUser)
              }
            }
            return message
          }
        )
        // 最後に読んだメッセージIDを更新して、同一ユーザの既読表記重複を避ける
        prevChatRoom.last_reads[i].last_message_id =
          prevChatRoom.messages.slice(-1)[0].id
        return {
          ...prevChatRoom,
          messages: newMessages,
        }
      } else {
        // 今回の既読が初めての場合(chatRoom.last_readsに今回既読したユーザに関するレコードがない場合)
        const newMessages = prevChatRoom.messages.map(
          (message: ChatMessage) => {
            if (!mine(readUser.id, message.created_by.id)) {
              message.chat_message_reads.push(readUser)
            }
            return message
          }
        )
        return {
          ...prevChatRoom,
          messages: newMessages,
        }
      }
    })
  }

  return {
    save,
    deleteMessage,
    deleteChatRoom,
    chatRoom,
    setChatRoom,
    updateLastReads,
    replaceUpdateMessage,
    replaceDeleteMessage,
    addNewMessage,
    read,
  }
}

export default useChatMessage
