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
import { ConfirmDialog } from '@/components/organisms'
import { ChatRoomForm } from '@/components/template'
import styles from '@/assets/stylesheets/pages/ChatDetail.module.scss'
import { useForm, Controller } from 'react-hook-form'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
    },
    top: {
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      margin: 0,
      background: 'white',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.body1.fontSize,
      width: '100%',
      flexShrink: 0,
      boxShadow: theme.shadows[2],
    },
    head: {
      position: 'fixed',
      zIndex: 1,
      width: '100%',
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
      padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(
        1
      )}px`,
      overflowY: 'scroll',
      marginTop: theme.spacing(8),
    },
    tail: {
      flexShrink: 0,
      height: theme.spacing(5),
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
        padding: '10px 0',
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
      // maxWidth: 350,
    },
    myMsgItem: {
      justifyContent: 'flex-end',
    },
    msgAvatar: {
      minWidth: theme.spacing(5),
      marginTop: theme.spacing(3),
      flexShrink: 0,
    },
    none: {
      display: 'none',
    },
    msgUserName: {
      color: theme.palette.text.hint,
      fontWeight: theme.typography.fontWeightBold,
    },
    msgBody: {
      '& .MuiTypography-body1': {
        fontSize: theme.typography.body2.fontSize,

        fontWeight: theme.typography.fontWeightBold,
      },
    },
    nothing: {
      color: theme.palette.text.disabled,
    },
  })
)

const ChatDetail = () => {
  const classes = useStyles()
  const router = useRouter()
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null)
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

  const handleSuccess = (newChatRoom: ChatRoom) => {
    setChatRoom(newChatRoom)
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
      created_by: 1,
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
  const sharedBy = 1

  // チャットメッセージの送信
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
    },
  })
  const saveMessage = async (data: ChatMessageInputs) => {
    const messageSubmitData = {
      body: data.body,
      written_by: 1,
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

  return (
    <ChatLayout
      title={!!chatRoom ? chatRoom.name : ''}
      sideNone
      mainNone={false}
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
            sharedBy={sharedBy}
            open={formOpen}
            setOpen={setFormOpen}
            req={saveReq}
            onSuccess={handleSuccess}
            dialogTitle={
              chatRoom !== null ? chatRoom.name : 'チャットルームを更新'
            }
          />
          <Divider />
          <section ref={scrollRef} className={classes.body}>
            <List>
              {chatMessages.length > 0 ? (
                chatMessages.map((message) => (
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
                      <Typography
                        className={clsx(classes.msgUserName, {
                          [classes.none]: message?.mine,
                        })}
                        variant="caption"
                        display="block"
                      >
                        {message?.written_by.full_name}
                      </Typography>
                      <ListItemText
                        className={clsx([classes.msgBody, styles.msgBody], {
                          [styles.mine]: message?.mine,
                        })}
                      >
                        {message?.body}
                      </ListItemText>
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
