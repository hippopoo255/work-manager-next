import React, { useState, useMemo, useEffect } from 'react'
import clsx from 'clsx'
import { MypageHeader as Header, Sidebar } from '@/components/organisms'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { User, ChatRoom } from '@/interfaces/models'
import { getRequest, postRequest, requestUri } from '@/api'
import { ChatRoomList } from '@/components/organisms'
import { Box, TextField, Tooltip, IconButton } from '@material-ui/core'
import { FormErrorMessage } from '@/components/atoms'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import { useRouter } from 'next/router'
// 検索バー
import Autocomplete from '@material-ui/lab/Autocomplete'
import { ChatRoomForm } from '@/components/template'
import { ChatRoomInputs, MemberExtInputs } from '@/interfaces/form/inputs'
import { ChatRoomSubmit } from '@/interfaces/form/submit'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
  },
  // necessary for main to be below app bar
  appBarSpacer: theme.mixins.toolbar,
  content: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  main: {
    flexGrow: 1,
    marginTop: 64,
    padding: theme.spacing(0),
    height: 'calc(100vh - 64px)',
    overflowY: 'hidden',
  },
  chatHead: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    // gap: theme.spacing(1),
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
  chatSide: {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      maxWidth: 360,
      flexShrink: 0,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
  chatMain: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      maxWidth: 640,
    },
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
}

// eslint-disable-next-line react/display-name
const ChatLayout = React.memo(
  ({ children, title, mainNone, sideNone }: Props) => {
    const classes = useStyles()
    const router = useRouter()
    const [user, setUser] = useState<User | ''>('')
    const [open, setOpen] = useState<boolean>(false)
    const fixedMember: MemberExtInputs[] = []

    useEffect(() => {
      const fetchCurrentUser = async () => {
        await getRequest<User>(requestUri.currentUserWithChat, (err) => {
          throw err
        })
          .then((data) => {
            setUser(data)
          })
          .catch((err) => {
            console.error(err)
            if (err.status === 401) {
              router.push('/login')
            }
          })
      }
      fetchCurrentUser()
    }, [])

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

    const suffix = process.env.NEXT_PUBLIC_SITE_NAME
    const [mobileOpen, setMobileOpen] = useState(false)
    const handleDrawerToggle = (specified: boolean | null = null) => {
      if (specified === null) {
        setMobileOpen(!mobileOpen)
      } else {
        setMobileOpen(specified)
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

    return (
      <>
        <Head>
          <title>{!!title ? `${title} | ${suffix}` : suffix}</title>
        </Head>
        <div className={classes.root}>
          <CssBaseline />
          <Header toggleMenu={handleDrawerToggle} user={user} />
          <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
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
                        id="country-select-demo"
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
                  {chatRooms !== null && <ChatRoomList chatRooms={chatRooms} />}
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
