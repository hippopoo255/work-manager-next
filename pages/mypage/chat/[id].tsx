import { GetStaticProps, GetStaticPaths } from 'next'
import clsx from 'clsx'
import React, { useState, useMemo, useEffect, useRef } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  TextField,
  IconButton,
} from '@material-ui/core'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import SendIcon from '@material-ui/icons/Send'
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined'
import { useRouter } from 'next/router'
import { putRequest, getRequest, requestUri, postRequest } from '@/api'
import { httpClient } from '@/api/useApi'
import { ChatRoom, ChatMessage } from '@/interfaces/models'
import {
  MemberExtInputs,
  ChatRoomInputs,
  ChatMessageInputs,
} from '@/interfaces/form/inputs'
import { ChatRoomSubmit, ChatMessageSubmit } from '@/interfaces/form/submit'
import { ChatLayout } from '@/layouts'
import Custom403Page from '@/pages/403'
import Custom404Page from '@/pages/404'
import { ChatDetailTitle } from '@/components/molecules'
import { ConfirmDialog, CustomMenuBox } from '@/components/organisms'
import { ChatMessageForm, ChatRoomForm } from '@/components/template'
import { drawerWidth } from '@/lib/util'
import styles from '@/assets/stylesheets/pages/ChatDetail.module.scss'
import { useForm, Controller } from 'react-hook-form'
import { chatRoomListWidth, postTiming } from '@/lib/util'
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
      [theme.breakpoints.up('sm')]: {
        paddingLeft: drawerWidth,
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: drawerWidth + chatRoomListWidth,
        maxWidth: drawerWidth + chatRoomListWidth + 640,
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
        padding: theme.spacing(1),
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
    },
    titleSub: {
      flexShrink: 0,
    },
    body: {
      flexGrow: 1,
      flexShrink: 1,
      padding: theme.spacing(1),
      overflowY: 'scroll',
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
    msgItem: {
      gap: theme.spacing(2),
      maxWidth: 320,
      [theme.breakpoints.up('sm')]: {
        maxWidth: 450,
      },
      paddingTop: 24,
    },
    myMsgItem: {
      justifyContent: 'flex-end',
      marginLeft: 'auto',
    },
    msgAvatar: {
      minWidth: theme.spacing(5),
      marginTop: theme.spacing(3),
      flexShrink: 0,
    },
    horizontal: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    between: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: `0 4px`,
    },
    msgUserName: {
      color: theme.palette.text.hint,
      fontWeight: theme.typography.fontWeightBold,
    },
    msgTime: {
      color: theme.palette.text.hint,
      fontFamily: theme.typography.caption.fontFamily,
      fontSize: theme.typography.caption.fontSize,
      fontWeight: theme.typography.fontWeightBold,
    },
    msgBody: {
      position: 'relative',
      '& .MuiTypography-body1': {
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    msgUpdate: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      transform: 'translate3d(0, 100%, 0)',
      pointerEvents: 'none',
      color: theme.palette.text.hint,
      fontFamily: theme.typography.caption.fontFamily,
      fontSize: theme.typography.caption.fontSize,
      alignSelf: 'flex-end',
      order: 0,
      flexShrink: 0,
    },
    msgMenu: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      transform: 'translate3d(-100%, 0, 0)',
    },
    nothing: {
      color: theme.palette.text.disabled,
    },
    none: {
      display: 'none',
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
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const chatRoomId = router.query.id
  const fixedMember: MemberExtInputs[] = []
  const scrollRef = useRef<HTMLElement>(null)
  const scrollToLatest = () => {
    if (!!scrollRef) {
      scrollRef!.current!.scrollTop = scrollRef!.current!.scrollHeight
    }
  }

  useEffect(() => {
    const fetchChatRoom = async () => {
      if (chatRoomId !== undefined) {
        await getRequest<ChatRoom>(
          requestUri.chatRoom.id + chatRoomId,
          (err) => {
            setResponseError(err)
            throw err
          }
        )
          .then((data) => {
            setChatRoom(data)
            setTimeout(() => {
              scrollToLatest()
            }, 300)
          })
          .catch((err) => {
            if (err.status === 401) {
              router.push('/login')
            }
          })
      }
    }
    fetchChatRoom()
  }, [chatRoomId])

  const title = useMemo(
    () => (chatRoom !== null ? chatRoom.name : ''),
    [chatRoom]
  )

  const chatMessages = useMemo(
    () => (chatRoom === null ? [] : chatRoom.messages),
    [chatRoom]
  )

  // チャットルーム更新
  const saveReq = async (submitData: ChatRoomSubmit) =>
    await putRequest<ChatRoom, ChatRoomSubmit>(
      `${requestUri.chatRoom.put}${chatRoomId}`,
      submitData,
      (err) => {
        console.error(err)
        throw err
      }
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
    await httpClient
      .delete(requestUri.chatRoom.delete + chatRoomId)
      .then(() => {
        setConfirmLoading(true)
        setConfirmOpen(false)
        router.push('/mypage/chat')
      })
      .catch((err) => {
        setConfirmLoading(true)
        console.error(err.response)
      })
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
    },
  })

  const saveMessage = async (data: ChatMessageInputs) => {
    const messageSubmitData = {
      body: data.body,
      written_by: userId,
    }

    await postRequest<ChatMessage, ChatMessageSubmit>(
      `/chat_room/${chatRoomId}/message`,
      messageSubmitData,
      (err) => {
        console.error(err)
        throw err
      }
    ).then((newMessage: ChatMessage) => {
      reset()
      setChatRoom((prev) => {
        if (prev !== null) {
          return {
            ...prev,
            messages: prev.messages.concat([newMessage]),
          }
        } else {
          return null
        }
      })
      scrollToLatest()
    })
  }

  // チャットメッセージ操作（更新・削除）
  const [updateMsgInput, setUpdateMsgInput] = useState<ChatMessageInputs>({
    body: '',
    written_by: userId,
  })
  const [msgFormOpen, setMsgFormOpen] = useState<boolean>(false)

  const msgMenuOptions = [
    {
      text: '編集',
      onClick: (id: number) => handleMsgUpdateForm(id),
    },
    {
      text: '削除',
      onClick: (id: number) => deleteMessage(id),
      danger: true,
    },
  ]
  const handleMsgUpdateForm = (id: number) => {
    const updateMsg = chatMessages.find((m) => m!.id! === id)
    if (updateMsg !== null) {
      setUpdateMsgInput({
        id: updateMsg!.id!,
        body: updateMsg!.body!,
        written_by: userId,
      })
      setMsgFormOpen(true)
    }
  }
  const updateMessage = async (submitData: ChatMessageSubmit, id: number) =>
    await putRequest<ChatMessage, ChatMessageSubmit>(
      `/chat_room/${chatRoomId}/message/${id}`,
      submitData,
      (err) => {
        console.error(err)
        throw err
      }
    )

  const handleAfterUpdate = (updateMessage: ChatMessage) => {
    setChatRoom((prev) => {
      if (prev !== null) {
        const index = prev.messages.findIndex(
          (msg) => msg!.id! === updateMessage.id
        )
        prev.messages.splice(index, 1, updateMessage)
        return {
          ...prev,
          messages: prev.messages,
        }
      } else {
        return null
      }
    })
  }

  const deleteMessage = async (id: number) => {
    await httpClient
      .delete(`/chat_room/${chatRoomId}/message/${id}`)
      .then(() => {
        setChatRoom((prev) => {
          if (prev !== null) {
            const index = prev.messages.findIndex((msg) => msg!.id! === id)
            prev.messages.splice(index, 1)
            return {
              ...prev,
              messages: prev.messages,
            }
          } else {
            return null
          }
        })
      })
      .catch((err) => {
        console.error(err.response)
      })
  }

  return (
    <ChatLayout
      title={!!chatRoom ? chatRoom.name : ''}
      sideNone
      mainNone={false}
      supplyUserId={setUserId}
      activeRoom={activeRoom}
    >
      {responseError !== null && responseError.status === 403 && (
        <Custom403Page />
      )}
      {responseError !== null && responseError.status === 404 && (
        <Custom404Page />
      )}

      {responseError === null && (
        <div className={classes.root}>
          <div className={classes.head}>
            <ChatDetailTitle
              title={title}
              icon={<MeetingRoomIcon />}
              classes={classes}
              onEdit={handleEdit}
              onTrash={handleConfirm}
              editable={chatRoom !== null ? chatRoom.editable : false}
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
              chatRoom !== null ? chatRoom.name : 'チャットルームの更新'
            }
          />
          <ChatMessageForm
            defaultValues={updateMsgInput}
            open={msgFormOpen}
            setOpen={setMsgFormOpen}
            req={updateMessage}
            onSuccess={handleAfterUpdate}
            dialogTitle={
              chatRoom !== null ? chatRoom.name : 'チャットメッセージの更新'
            }
          />
          <Divider />
          <section ref={scrollRef} className={classes.body}>
            <List>
              {chatMessages.length > 0 ? (
                chatMessages.map((message, index) => (
                  <ListItem
                    key={`message_${message?.id}`}
                    alignItems={'flex-start'}
                    className={clsx(classes.msgItem, {
                      [classes.myMsgItem]: message?.mine,
                    })}
                  >
                    <ListItemAvatar
                      className={clsx(classes.msgAvatar, {
                        [classes.none]: message?.mine,
                      })}
                    >
                      <Avatar alt={`Avatar n°${message?.id}`} />
                    </ListItemAvatar>
                    <div>
                      <div className={classes.between}>
                        <span>
                          <Typography
                            className={clsx(classes.msgUserName, {
                              [classes.none]: message?.mine,
                            })}
                            variant="caption"
                            display="block"
                          >
                            {message?.written_by.full_name}
                          </Typography>
                        </span>
                        <span className={classes.msgTime}>
                          {postTiming(new Date(message?.created_at!))}
                        </span>
                      </div>
                      <ListItemText
                        className={clsx([classes.msgBody, styles.msgBody], {
                          [styles.mine]: message?.mine,
                        })}
                      >
                        <small
                          className={clsx(classes.msgUpdate, {
                            [classes.none]:
                              message?.created_at === message?.updated_at,
                          })}
                        >
                          {'（編集済）'}
                        </small>
                        <span
                          className={clsx(classes.msgMenu, {
                            [classes.none]: !message?.mine,
                          })}
                        >
                          <CustomMenuBox
                            options={msgMenuOptions}
                            small
                            horizon
                            id={message?.id!}
                          />
                        </span>
                        {message?.body}
                      </ListItemText>
                      <div className={classes.horizontal}>
                        {/* <span>リアクションボタン</span> */}
                      </div>
                    </div>
                  </ListItem>
                ))
              ) : (
                <Typography
                  variant="body1"
                  className={classes.nothing}
                  gutterBottom
                >
                  トーク履歴はありません
                </Typography>
              )}
            </List>
          </section>
          <Divider />
          <form className={classes.tail} onSubmit={handleSubmit(saveMessage)}>
            <IconButton color={'inherit'} className={classes.panoramaIcon}>
              <PanoramaOutlinedIcon />
            </IconButton>
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
        </div>
      )}
    </ChatLayout>
  )
}

export default ChatDetail
