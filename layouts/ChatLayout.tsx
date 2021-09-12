import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { MypageHeader as Header, Sidebar } from '@/components/organisms'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { getRequest, postRequest, requestUri } from '@/api'
import { ChatRoomList } from '@/components/organisms'
import { Box, TextField, Tooltip, IconButton } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import { chatRoomListWidth } from '@/lib/util'
// 検索バー
import Autocomplete from '@material-ui/lab/Autocomplete'
import { ChatRoomForm } from '@/components/template'
import { User, ChatRoom, ChatMessage } from '@/interfaces/models'
import { MemberExtInputs } from '@/interfaces/form/inputs'
import { ChatRoomSubmit } from '@/interfaces/form/submit'
import { SITE_TITLE, chatMainWidth } from '@/lib/util'
import { listenMessageSent, listenMessageRead } from '@/lib/pusher'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  main: {
    flexGrow: 1,
    marginTop: theme.spacing(8),
    padding: theme.spacing(0),
    height: `calc(100vh - ${theme.spacing(8)}px)`,
    overflowY: 'hidden',
  },
  chatSide: {
    width: '100%',
    height: '100%',
    overflowY: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    paddingTop: theme.spacing(8),

    [theme.breakpoints.up('md')]: {
      maxWidth: chatRoomListWidth,
      flexShrink: 0,
      borderRight: `1px solid ${theme.palette.divider}`,
      zIndex: 2,
    },
  },
  chatMain: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      maxWidth: chatMainWidth,
    },
  },
  chatHead: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    background: 'white',
    zIndex: 1,
  },
  sideBody: {
    height: '100%',
    overflowY: 'scroll',
  },
  keywordBox: {
    flexGrow: 1,
    width: '100%',
    height: theme.spacing(5),
    position: 'relative',
  },
  add: {
    flexShrink: 0,
  },
  none: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  field: {
    '& .MuiOutlinedInput-notchedOutline': {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 0,
      padding: '0 8px',
      overflow: 'hidden',
      position: 'absolute',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderRadius: 'inherit',
      pointerEvents: 'none',
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
      padding: 2,
    },
    '& legend': {
      display: 'none',
    },
  },
}))

export type Props = {
  children: React.ReactNode
  title?: string
  mainNone: boolean
  sideNone: boolean
  supplyUserId?: (id: number) => void
  activeRoom: ChatRoom | null
  onToggle?: ((isOpen: boolean) => void) | null
}

// eslint-disable-next-line react/display-name
const ChatLayout = React.memo(
  ({
    children,
    title,
    mainNone,
    sideNone,
    supplyUserId,
    activeRoom = null,
    onToggle = null,
  }: Props) => {
    const classes = useStyles()
    const router = useRouter()
    const [user, setUser] = useState<User | ''>('')
    const [open, setOpen] = useState<boolean>(false)
    const fixedMember: MemberExtInputs[] = []

    const chatRooms = useMemo(
      (): ChatRoom[] => (!!user ? user.chat_rooms! : []),
      [user]
    )

    const sharedBy = useMemo(() => (user !== '' ? user.id : 0), [user])
    const defaultValues = useMemo(
      () => ({
        created_by: user !== '' ? user.id : 0,
        name: '',
        members: [],
      }),
      [user]
    )

    const [mobileOpen, setMobileOpen] = useState(false)
    const [tabletOpen, setTabletOpen] = useState(false)
    const handleDrawerToggle = (flag: string) => {
      if (flag === 'mobile') {
        handleMobileDrawer()
      } else {
        handleFlexibleDrawer()
      }
    }
    const handleMobileDrawer = (specified: boolean | null = null) => {
      if (specified === null) {
        setMobileOpen(!mobileOpen)
      } else {
        setMobileOpen(specified)
      }
    }
    const handleFlexibleDrawer = (specified: boolean | null = null) => {
      if (specified === null) {
        setTabletOpen(!tabletOpen)
        if (onToggle !== null) {
          onToggle(!tabletOpen)
        }
      } else {
        setTabletOpen(specified)
      }
    }

    const handleRoomSelect = (
      event: React.ChangeEvent<{}>,
      newValue: ChatRoom | null
    ) => {
      if (newValue !== null) {
        router.push(`/mypage/chat/${newValue.id}`)
      }
    }

    const saveReq = async (submitData: ChatRoomSubmit) =>
      await postRequest<ChatRoom, ChatRoomSubmit>(
        requestUri.chatRoom.post,
        submitData,
        (err) => {
          console.error(err)
          throw err
        }
      )

    const handleAddIcon = () => {
      setOpen(true)
    }

    const handleSuccess = (chatRoom: ChatRoom) => {
      setUser((prev) => {
        if (prev !== '') {
          return {
            ...prev,
            chat_rooms: prev.chat_rooms.concat([chatRoom]),
          }
        } else {
          return ''
        }
      })
    }

    useEffect(() => {
      let unmounted = false
      const fetchCurrentUser = async () => {
        await getRequest<User | ''>(requestUri.currentUserWithChat).then(
          (newUser) => {
            if (newUser === '') {
              return false
            }
            if (!unmounted) {
              setUser(() => {
                newUser.chat_rooms.sort(
                  (p: ChatRoom, n: ChatRoom) =>
                    new Date(n.latest_message_date).getTime() -
                    new Date(p.latest_message_date).getTime()
                )
                return newUser
              })
            }
            if (!!supplyUserId) {
              supplyUserId(newUser.id)
            }
          }
        )
      }
      fetchCurrentUser()
      return () => {
        unmounted = true
      }
    }, [])

    useEffect(() => {
      if (activeRoom !== null) {
        setUser((prev: any) => {
          const rooms: ChatRoom[] = !!prev ? prev!.chat_rooms! : []
          const index = rooms.findIndex((room) => room.id === activeRoom.id)
          if (index !== 0) {
            rooms.splice(index, 1, activeRoom)
          }
          return {
            ...prev,
            chat_rooms: rooms,
          }
        })
      }
    }, [activeRoom])

    useEffect(() => {
      if (chatRooms.length > 0) {
        listenMessageSent(
          ({ message, flag }: { message: ChatMessage; flag: string }) => {
            if (flag === 'update') {
              return true
            }
            if (!!user && message.written_by.id !== user.id) {
              const index = chatRooms.findIndex(
                (chatRoom) => chatRoom.id === message.chat_room_id
              )
              if (index !== -1) {
                setUser((prev) => {
                  if (!!prev) {
                    const newRooms = chatRooms
                    newRooms[index].unread_count++
                    return {
                      ...prev,
                      chat_rooms: newRooms,
                    }
                  }
                  return ''
                })
              }
            }
          }
        )
        listenMessageRead(({ readUser, chatRoomId }) => {
          if (!user || readUser.id !== user.id) {
            return true
          }
          const index = chatRooms.findIndex(
            (chatRoom) => chatRoom.id === chatRoomId
          )
          if (index !== -1) {
            setUser((prev) => {
              if (!!prev) {
                const newRooms = chatRooms
                newRooms[index].unread_count = 0
                return {
                  ...prev,
                  chat_rooms: newRooms,
                }
              }
              return ''
            })
          }
        })
      }
    }, [chatRooms])

    return (
      <>
        <Head>
          <title>{!!title ? `${title} | ${SITE_TITLE}` : SITE_TITLE}</title>
        </Head>
        <div className={classes.root}>
          <CssBaseline />
          <Header toggleMenu={handleDrawerToggle} user={user} />
          <Sidebar
            open={mobileOpen}
            onClose={handleMobileDrawer}
            flexibleOpen={tabletOpen}
            handleFlexibleOpen={handleFlexibleDrawer}
          />
          <main className={classes.main}>
            {/* <div className={classes.appBarSpacer} /> */}
            <section style={{ height: '100%' }}>
              <Box
                display={'flex'}
                flexDirection={{ xs: 'column', md: 'row' }}
                className={classes.content}
              >
                <div
                  className={clsx(classes.chatSide, {
                    [classes.none]: sideNone,
                  })}
                >
                  {/* TODO: 検索ボックス */}
                  <Box className={classes.chatHead}>
                    <div className={classes.keywordBox}>
                      <Autocomplete
                        id="chat-room-select-demo"
                        style={{ width: '100%' }}
                        options={chatRooms as ChatRoom[]}
                        autoHighlight
                        className={classes.field}
                        getOptionLabel={(option) => option.name}
                        onChange={handleRoomSelect}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder="チャットルーム検索"
                            fullWidth
                            margin={'none'}
                            InputProps={{
                              ...params.InputProps,
                            }}
                          />
                        )}
                      />
                    </div>
                    {/* 追加アイコン */}
                    <Tooltip title={'チャットルームを追加'}>
                      <IconButton color={'primary'} onClick={handleAddIcon}>
                        <AddCircleOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>

                    <ChatRoomForm
                      defaultValues={defaultValues}
                      fixedMember={fixedMember}
                      sharedBy={sharedBy}
                      open={open}
                      setOpen={setOpen}
                      req={saveReq}
                      onSuccess={handleSuccess}
                      saveAction={'create'}
                    />
                  </Box>
                  {chatRooms !== null && (
                    <nav className={classes.sideBody}>
                      <ChatRoomList chatRooms={chatRooms} />
                    </nav>
                  )}
                </div>
                <div
                  className={clsx(classes.chatMain, {
                    [classes.none]: mainNone,
                  })}
                >
                  {children}
                </div>
              </Box>
            </section>
          </main>
        </div>
      </>
    )
  }
)

export default ChatLayout
