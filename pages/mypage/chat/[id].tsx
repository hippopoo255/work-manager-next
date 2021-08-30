import { GetStaticProps, GetStaticPaths } from 'next'
import clsx from 'clsx'
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Divider,
  List,
  ListItem,
  Tooltip,
  Typography,
  TextField,
  IconButton,
} from '@material-ui/core'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import SendIcon from '@material-ui/icons/Send'
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined'
import { useRouter } from 'next/router'
import {
  putRequest,
  getRequest,
  postRequest,
  deleteRequest,
  requestUri,
} from '@/api'
import {
  ChatRoom,
  ChatMessage,
  User,
  LastRead,
  ChatImage,
} from '@/interfaces/models'
import {
  MemberExtInputs,
  ChatRoomInputs,
  ChatMessageInputs,
} from '@/interfaces/form/inputs'
import { ChatRoomSubmit, ChatMessageSubmit } from '@/interfaces/form/submit'
import { ChatLayout } from '@/layouts'
import Custom403Page from '@/pages/403'
import Custom404Page from '@/pages/404'
import { ChatDetailTitle, SilentBar } from '@/components/molecules'
import {
  ChatMessageRow,
  ConfirmDialog,
  CustomMenuBox,
} from '@/components/organisms'
import { ChatMessageForm, ChatRoomForm } from '@/components/template'
import { useForm, Controller } from 'react-hook-form'
import {
  drawerWidth,
  drawerClosingWidth,
  chatRoomListWidth,
  chatMainWidth,
  mine,
  STORAGE_URL,
} from '@/lib/util'
import {
  listenMessageSent,
  listenMessageRead,
  listenMessageDelete,
} from '@/lib/pusher'
import { deletedMessage } from '@/lib/initialData'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxHeight: '100%',
      position: 'fixed',
      top: 64,
      left: 0,
      bottom: 0,
      [theme.breakpoints.up('sm')]: {
        position: 'initial',
        top: 'initial',
        left: 'initial',
        bottom: 'initial',
        height: '100%',
      },
    },
    head: {
      position: 'fixed',
      left: 0,
      zIndex: 1,
      width: '100%',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up('md')]: {
        paddingLeft: drawerClosingWidth + chatRoomListWidth,
        maxWidth: drawerClosingWidth + chatRoomListWidth + chatMainWidth,
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: drawerWidth + chatRoomListWidth,
        maxWidth: drawerWidth + chatRoomListWidth + chatMainWidth,
      },
    },
    adjustSidebarSize: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up('md')]: {
        paddingLeft: drawerWidth + chatRoomListWidth,
        maxWidth: drawerWidth + chatRoomListWidth + chatMainWidth,
      },
    },
    top: {
      padding: `12px ${theme.spacing(2)}px`,
      margin: 0,
      background: 'white',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.body1.fontSize,
      width: '100%',
      flexShrink: 0,
      boxShadow: theme.shadows[2],
      [theme.breakpoints.down('sm')]: {
        padding: `12px ${theme.spacing(1)}px`,
      },
    },
    titleList: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0),
      gap: theme.spacing(1),
    },
    titleMain: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      fontWeight: theme.typography.fontWeightBold,
    },
    titleSub: {
      flexShrink: 0,
    },
    body: {
      flexGrow: 1,
      flexShrink: 1,
      padding: '8px 0',
      overflowY: 'scroll',
      overflowX: 'hidden',
      marginTop: theme.spacing(8),
    },
    tail: {
      flexShrink: 0,
      minHeight: theme.spacing(5),
      display: 'flex',
    },
    msgForm: {
      flexGrow: 1,
      height: '100%',
      width: '100%',
      margin: '0 5px',
    },
    msgField: {
      '& .MuiInputBase-multiline': {
        padding: '13px 0',
      },
    },
    panoramaIcon: {
      flexShrink: 0,
      alignSelf: 'center',
    },
    sendIcon: {
      flexShrink: 0,
      background: theme.palette.primary.main,
      borderRadius: 0,
      color: 'white',
      maxHeight: theme.spacing(6),
      alignSelf: 'flex-end',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
      '&[disabled]': {
        background: theme.palette.action.disabledBackground,
      },
    },
    allow: {
      flexShrink: 0,
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },

    nothing: {
      color: theme.palette.text.disabled,
    },
    none: {
      display: 'none',
    },
    sentMsgBar: {
      position: 'absolute',
      left: 0,
      bottom: 48,
      width: '100%',
      cursor: 'pointer',
      [theme.breakpoints.up('md')]: {
        paddingLeft: drawerClosingWidth + chatRoomListWidth,
        maxWidth: drawerClosingWidth + chatRoomListWidth + chatMainWidth,
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: drawerWidth + chatRoomListWidth,
        maxWidth: drawerWidth + chatRoomListWidth + chatMainWidth,
      },
    },
  })
)

const ChatDetail = () => {
  const classes = useStyles()
  const router = useRouter()
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null)
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null)
  const [userId, setUserId] = useState<number>(0)
  const [responseError, setResponseError] = useState<any | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [silentMessage, setSilentMessage] = useState<ChatMessage | null>(null)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const fixedMember: MemberExtInputs[] = []
  const scrollRef = useRef<HTMLElement>(null)

  const scrollToLatest = () => {
    if (!!scrollRef) {
      scrollRef!.current!.scrollTop = scrollRef!.current!.scrollHeight
      setSilentMessage(null)
    }
  }
  const cantScroll = useCallback(() => {
    if (scrollRef === null || scrollRef === undefined) {
      return false
    } else if (scrollRef.current === null) {
      return false
    } else {
      return (
        scrollRef.current.scrollHeight - scrollRef.current.scrollTop <=
        scrollRef.current.offsetHeight
      )
    }
  }, [scrollRef])

  const getChatRoomId = useCallback(
    () => (router.query.id !== undefined ? Number(router.query.id) : undefined),
    [router]
  )

  useEffect(() => {
    const fetchChatRoom = async () => {
      if (router.query.id !== undefined) {
        await getRequest<ChatRoom>(
          requestUri.chatRoom.id + router.query.id,
          (err) => {
            setResponseError(err)
            throw err
          }
        )
          .then((data) => {
            setChatRoom(data)
            handleSentMsg()
          })
          .catch((err) => {
            if (err.status === 401) {
              router.push('/login')
            }
          })
      }
    }
    fetchChatRoom()
  }, [router])

  useEffect(() => {
    if (userId > 0) {
      listenMessageSent(
        ({ message, flag }: { message: ChatMessage; flag: string }) => {
          if (
            message.chat_room_id === getChatRoomId() &&
            !mine(message.written_by.id, userId)
          ) {
            if (flag === 'update') {
              addUpdateMessage(message)
            } else {
              const isBottom = cantScroll()
              addNewMessage(message)
              isBottom ? handleSentMsg() : setSilentMessage(message)
            }
          }
        }
      )

      listenMessageDelete((message: ChatMessage) => {
        if (
          message.chat_room_id === getChatRoomId() &&
          !mine(message.written_by.id, userId)
        ) {
          replaceDeleteMessage(message.id)
        }
      })
    }
  }, [userId, getChatRoomId])

  useEffect(() => {
    listenMessageRead(({ readUser, chatRoomId }) => {
      setChatRoom((prev: any) => {
        if (prev === null) {
          return null
        }
        const i = prev.last_reads.findIndex((lastRead: LastRead | null) => {
          return lastRead === null ? false : lastRead.member_id === readUser.id
        })
        if (i !== -1) {
          // 既読したユーザが最後に読んだメッセージのメッセージID
          const lastMessageId = prev.last_reads[i].last_message_id
          const newMessages = prev.messages.map((message: ChatMessage) => {
            if (message.id <= lastMessageId) {
            } else if (!mine(readUser.id, message!.written_by.id)) {
              message!.chat_message_reads.push(readUser)
            } else {
            }
            return message
          })
          // 最後に読んだメッセージIDを更新して、同一ユーザの既読表記重複を避ける
          prev.last_reads[i].last_message_id = prev.messages.slice(-1)[0].id
          return {
            ...prev,
            messages: newMessages,
          }
        } else {
          const newMessages = prev.messages.map((message: ChatMessage) => {
            if (!mine(readUser.id, message.written_by.id)) {
              message.chat_message_reads.push(readUser)
            }
            return message
          })
          return {
            ...prev,
            messages: newMessages,
          }
        }
      })
    })
  }, [])

  const handleSentMsg = async () => {
    scrollToLatest()
    await read()
  }

  const read = useCallback(async () => {
    const chatRoomId = getChatRoomId()
    await postRequest<ChatRoom, {}>(
      requestUri.chatRoom.read + `${chatRoomId}/read`,
      {}
    )
  }, [getChatRoomId, router])

  const title = useMemo(
    () => (chatRoom !== null ? chatRoom.name : ''),
    [chatRoom]
  )

  const chatMessages = useMemo(
    () => (chatRoom === null ? [] : chatRoom.messages),
    [chatRoom]
  )

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

  const addUpdateMessage = (targetMessage: ChatMessage) => {
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

  const replaceDeleteMessage = (id: number) => {
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

  // チャットルーム更新
  const saveReq = async (submitData: ChatRoomSubmit) =>
    await putRequest<ChatRoom, ChatRoomSubmit>(
      `${requestUri.chatRoom.put}${getChatRoomId()}`,
      submitData
    )

  const handleEdit = () => {
    setFormOpen(true)
  }

  const handleSuccess = (updateChatRoom: ChatRoom) => {
    setChatRoom(updateChatRoom)
    setActiveRoom(updateChatRoom)
  }

  const handleConfirm = () => {
    setConfirmOpen(true)
  }
  // チャットルーム削除
  const handleDelete = async () => {
    setConfirmLoading(true)
    await deleteRequest(requestUri.chatRoom.delete + getChatRoomId()).then(
      () => {
        setConfirmLoading(false)
        setConfirmOpen(false)
        router.push('/mypage/chat')
      }
    )
  }

  const defaultValues: ChatRoomInputs = useMemo(
    () => ({
      created_by: chatRoom !== null ? chatRoom.created_by.id : userId,
      name: chatRoom !== null ? chatRoom.name : '',
      members:
        chatRoom !== null
          ? chatRoom.members.map((member) => ({
              id: member.id,
              full_name: member.full_name,
              is_editable: member.option.is_editable,
              shared_by: member.option.shared_by,
            }))
          : [],
    }),
    [chatRoom]
  )

  // チャットメッセージの新規投稿
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm<ChatMessageInputs>({
    mode: 'onChange',
    defaultValues: {
      body: '',
      written_by: userId,
      previews: [],
    },
  })

  const saveSimpleMessage = async (data: ChatMessageInputs) => {
    const messageSubmitData = new FormData()
    messageSubmitData.append('body', data.body)
    messageSubmitData.append('written_by', String(userId))
    await storeMessage(messageSubmitData).then((newMessage: ChatMessage) => {
      handleAfterStore(newMessage)
    })
  }

  // チャットメッセージ操作（更新・削除）
  const [updateMsgInput, setUpdateMsgInput] = useState<ChatMessageInputs>({
    body: '',
    written_by: userId,
    previews: [],
    delete_flags: [],
  })

  const [msgFormOpen, setMsgFormOpen] = useState<boolean>(false)

  const handleMsgUpdateForm = useCallback(
    (id: number) => {
      const updateMsg = chatMessages.find((m) => m!.id! === id)
      if (updateMsg !== null) {
        setUpdateMsgInput({
          id: updateMsg!.id!,
          body: updateMsg!.body!,
          written_by: updateMsg!.written_by.id,
          previews:
            updateMsg !== undefined
              ? updateMsg.images.map((image: ChatImage | null) =>
                  image === null ? null : `${STORAGE_URL}/` + image.file_path
                )
              : [],
          delete_flags: [],
          image_ids:
            updateMsg !== undefined
              ? updateMsg.images.map((image: ChatImage | null) =>
                  image === null ? null : image.id
                )
              : [],
        })
        setMsgFormOpen(true)
      }
    },
    [userId, setUpdateMsgInput, setMsgFormOpen, chatMessages]
  )

  const handleImageForm = () => {
    setUpdateMsgInput({
      id: 0,
      body: getValues('body'),
      written_by: userId,
      previews: [],
      delete_flags: [],
      image_ids: undefined,
    })
    setMsgFormOpen(true)
  }

  const storeMessage = async (messageSubmitData: FormData, id: number = 0) =>
    await postRequest<ChatMessage, ChatMessageSubmit>(
      `/chat_room/${getChatRoomId()}/message`,
      messageSubmitData
    )

  const handleAfterStore = (responseMessage: ChatMessage) => {
    reset()
    addNewMessage(responseMessage)
    scrollToLatest()
  }

  const updateMessage = async (submitData: ChatMessageSubmit, id: number) =>
    await putRequest<ChatMessage, ChatMessageSubmit>(
      `/chat_room/${getChatRoomId()}/message/${id}`,
      submitData
    )

  const handleAfterUpdate = (responseMessage: ChatMessage) => {
    setChatRoom((prev) => {
      if (prev !== null) {
        const index = prev.messages.findIndex(
          (msg) => msg!.id! === responseMessage.id
        )
        prev.messages.splice(index, 1, responseMessage)
        return {
          ...prev,
          messages: prev.messages,
        }
      } else {
        return null
      }
    })
  }

  const msgReq = useCallback(
    async (submitData: ChatMessageSubmit, id: number) => {
      if (updateMsgInput.id! > 0) {
        return await updateMessage(submitData, id)
      } else {
        return await storeMessage(submitData, id)
      }
    },
    [updateMsgInput, getChatRoomId]
  )

  const handleMsgSuccess = useCallback(
    (responseMessage: ChatMessage) => {
      if (updateMsgInput.id! > 0) {
        return handleAfterUpdate(responseMessage)
      } else {
        return handleAfterStore(responseMessage)
      }
    },
    [updateMsgInput]
  )

  const deleteMessage = async (id: number) => {
    await deleteRequest(`/chat_room/${getChatRoomId()}/message/${id}`).then(
      () => {
        replaceDeleteMessage(id)
      }
    )
  }
  return (
    <ChatLayout
      title={!!chatRoom ? chatRoom.name : ''}
      sideNone
      mainNone={false}
      supplyUserId={setUserId}
      activeRoom={activeRoom}
      onToggle={setSidebarOpen}
    >
      {responseError !== null && responseError.status === 403 && (
        <Custom403Page />
      )}
      {responseError !== null && responseError.status === 404 && (
        <Custom404Page />
      )}

      {responseError === null && (
        <div className={classes.root}>
          <div
            className={clsx(classes.head, {
              [classes.adjustSidebarSize]: sidebarOpen,
            })}
          >
            <ChatDetailTitle
              title={title}
              icon={<MeetingRoomIcon />}
              classes={classes}
              onEdit={handleEdit}
              onTrash={handleConfirm}
              editable={chatRoom !== null ? chatRoom.can_edit : false}
            />
          </div>
          <ConfirmDialog
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onExec={handleDelete}
            loading={confirmLoading}
            isCircular
          />
          <ChatRoomForm
            defaultValues={defaultValues}
            fixedMember={fixedMember}
            sharedBy={userId}
            open={formOpen}
            setOpen={setFormOpen}
            req={saveReq}
            onSuccess={handleSuccess}
            dialogTitle={
              chatRoom !== null ? chatRoom.name : 'チャットルームの編集'
            }
          />
          <ChatMessageForm
            defaultValues={updateMsgInput}
            open={msgFormOpen}
            setOpen={setMsgFormOpen}
            req={msgReq}
            onSuccess={handleMsgSuccess}
            dialogTitle={'チャットメッセージの投稿'}
          />
          <Divider />
          <section ref={scrollRef} className={classes.body}>
            <List>
              {chatRoom !== null && chatRoom!.messages.length > 0 ? (
                chatMessages.map((message, index) => (
                  <ListItem key={`message_${message?.id}`}>
                    {message !== null && (
                      <ChatMessageRow
                        message={message}
                        mine={mine(message!.written_by.id, userId)}
                        onEdit={handleMsgUpdateForm}
                        onDelete={deleteMessage}
                      />
                    )}
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <Typography
                    variant="body1"
                    className={classes.nothing}
                    gutterBottom
                  >
                    トーク履歴はありません
                  </Typography>
                </ListItem>
              )}
            </List>
          </section>
          <Divider />
          <form
            className={classes.tail}
            onSubmit={handleSubmit(saveSimpleMessage)}
          >
            <Tooltip title={'画像のアップロード'}>
              <IconButton
                color={'inherit'}
                className={classes.panoramaIcon}
                onClick={handleImageForm}
              >
                <PanoramaOutlinedIcon />
              </IconButton>
            </Tooltip>
            <div
              style={{ width: '100%', height: '100%' }}
              className={classes.msgForm}
            >
              <Controller
                name="body"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'メッセージの入力は必須です',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={4}
                    placeholder={'メッセージ'}
                    error={!!errors.body}
                    className={classes.msgField}
                  />
                )}
              />
            </div>
            <IconButton
              color={'default'}
              type="submit"
              disabled={getValues('body') === ''}
              className={classes.sendIcon}
            >
              <SendIcon />
            </IconButton>
          </form>
          {silentMessage !== null && (
            <div className={classes.sentMsgBar}>
              <SilentBar
                main={silentMessage.body}
                sub={silentMessage.written_by.full_name + 'さん'}
                onClick={handleSentMsg}
              />
            </div>
          )}
        </div>
      )}
    </ChatLayout>
  )
}

export default ChatDetail
