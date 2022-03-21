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
import { ChatRoom, ChatMessage, ChatImage } from '@/interfaces/models'
import { MemberExtInputs, ChatMessageInputs } from '@/interfaces/form/inputs'
import { ChatLayout } from '@/layouts'
import Custom403Page from '@/pages/403'
import Custom404Page from '@/pages/404'
import { ChatDetailTitle, SilentBar } from '@/components/molecules'
import { ChatMessageRow } from '@/components/organisms'
import {
  ChatMessageForm,
  ChatRoomForm,
  ChatReportForm,
} from '@/components/template'
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
import { useAuth, useChatMessage } from '@/hooks'

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
  const { auth } = useAuth()
  const userId = auth.user.id
  const [responseError, setResponseError] = useState<any | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [silentMessage, setSilentMessage] = useState<ChatMessage | null>(null)
  const fixedMember: MemberExtInputs[] = []
  const scrollRef = useRef<HTMLElement>(null)

  const chatRoomId = useMemo(() => {
    return router.query.id !== undefined ? Number(router.query.id) : undefined
  }, [router])

  const handleSentMsg = async () => {
    scrollToLatest()
    await read()
  }
  const scrollToLatest = () => {
    if (!!scrollRef) {
      scrollRef!.current!.scrollTop = scrollRef!.current!.scrollHeight
      setSilentMessage(null)
    }
  }

  const {
    chatRoom,
    setChatRoom,
    updateLastReads,
    save,
    deleteMessage,
    deleteChatRoom,
    replaceUpdateMessage,
    replaceDeleteMessage,
    addNewMessage,
    read,
  } = useChatMessage({
    chatRoomId,
    init: handleSentMsg,
  })

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

  useEffect(() => {
    if (auth.isLogin) {
      listenMessageSent(
        ({ message, flag }: { message: ChatMessage; flag: string }) => {
          if (
            message.chat_room_id === chatRoomId &&
            !mine(message.created_by.id, userId)
          ) {
            if (flag === 'update') {
              replaceUpdateMessage(message)
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
          message.chat_room_id === chatRoomId &&
          !mine(message.created_by.id, userId)
        ) {
          replaceDeleteMessage(message.id)
        }
      })
    }
  }, [auth, router])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      listenMessageRead(({ readUser, chatRoomId }) => {
        if (isMounted) {
          updateLastReads({ readUser, chatRoomId })
        }
      })
    }

    return () => {
      isMounted = false
    }
  }, [])

  // チャットルーム更新
  const handleEdit = () => {
    setFormOpen(true)
  }

  const handleSuccess = (updateChatRoom: ChatRoom) => {
    setChatRoom(updateChatRoom)
  }

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
      created_by: userId,
      previews: [],
    },
  })

  // チャットメッセージ操作（更新・削除）
  const [updateMsgInput, setUpdateMsgInput] = useState<ChatMessageInputs>({
    body: '',
    created_by: userId,
    previews: [],
    delete_flags: [],
  })

  const [msgFormOpen, setMsgFormOpen] = useState<boolean>(false)

  const chatMessages = useMemo(
    () => (chatRoom === null ? [] : chatRoom.messages),
    [chatRoom]
  )

  const handleMsgUpdateForm = (id?: number | string, index?: number) => {
    const updateMsg = index !== undefined ? chatMessages[index] : null
    if (updateMsg !== null) {
      setUpdateMsgInput({
        id: updateMsg.id,
        body: updateMsg.body,
        created_by: updateMsg.created_by.id,
        previews: updateMsg.images.map((image: ChatImage | null) =>
          image === null ? null : `${STORAGE_URL}/` + image.file_path
        ),
        delete_flags: [],
        image_ids: updateMsg.images.map((image: ChatImage | null) =>
          image === null ? null : image.id
        ),
      })
      setMsgFormOpen(true)
    }
  }

  const handleModalForm = () => {
    setUpdateMsgInput({
      id: undefined,
      body: getValues('body'),
      created_by: userId,
      previews: [],
      delete_flags: [],
      image_ids: undefined,
    })
    setMsgFormOpen(true)
  }

  const saveSimpleMessage = async (data: ChatMessageInputs) => {
    const messageSubmitData = new FormData()
    messageSubmitData.append('body', data.body)
    messageSubmitData.append('created_by', String(userId))
    await save(messageSubmitData).then(() => {
      handleMsgSuccess()
    })
  }

  const handleAfterStore = () => {
    reset()
    scrollToLatest()
  }

  const handleMsgSuccess = useCallback(() => {
    if (!updateMsgInput.id) {
      return handleAfterStore()
    }
  }, [updateMsgInput])

  // チャット報告
  const [reportFormOpen, setReportFormOpen] = useState<boolean>(false)
  const [chatMessageId, setChatMessageId] = useState<number>(0)
  const handleReportForm = (id?: number | string, index?: number) => {
    if (typeof id === 'number') {
      setChatMessageId(id)
    }
    setReportFormOpen(true)
  }
  const handleAfterReport = () => {
    setChatMessageId(0)
  }

  return (
    <ChatLayout
      title={!!chatRoom ? chatRoom.name : ''}
      sideNone
      mainNone={false}
      activeRoom={chatRoom}
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
              chatRoom={chatRoom}
              icon={<MeetingRoomIcon />}
              classes={classes}
              deleteChatRoom={deleteChatRoom}
              onEdit={handleEdit}
              editable={chatRoom !== null ? chatRoom.can_edit : false}
            />
          </div>
          <ChatRoomForm
            chatRoom={chatRoom}
            dialogTitle={
              chatRoom !== null ? chatRoom.name : 'チャットルームの編集'
            }
            fixedMember={fixedMember}
            open={formOpen}
            setOpen={setFormOpen}
            onSuccess={handleSuccess}
          />
          <ChatReportForm
            open={reportFormOpen}
            setOpen={setReportFormOpen}
            id={chatMessageId}
            onSuccess={handleAfterReport}
          />
          <ChatMessageForm
            defaultValues={updateMsgInput}
            open={msgFormOpen}
            setOpen={setMsgFormOpen}
            req={save}
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
                        mine={mine(message!.created_by.id, userId)}
                        onEdit={handleMsgUpdateForm}
                        onDelete={deleteMessage}
                        onReport={handleReportForm}
                        index={index}
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
                onClick={handleModalForm}
              >
                <PanoramaOutlinedIcon />
              </IconButton>
            </Tooltip>
            <div className={classes.msgForm}>
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
                sub={silentMessage.created_by.full_name + 'さん'}
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
