import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import Link from 'next/link'
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
} from '@material-ui/core'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import { ChatRoom } from '@/interfaces/models'
import router, { useRouter } from 'next/router'
import clsx from 'clsx'
import { lighten } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    margin: 0,
  },
  row: {
    position: 'relative',
  },
  active: {
    background: lighten(theme.palette.primary.main, 0.9),
    pointerEvents: 'none',
  },
  unread: {
    position: 'absolute',
    top: '50%',
    right: theme.spacing(3),
    transform: 'translate3d(0, -50%, 0)',
  },
  badge: {
    backgroundColor: '#f50057',
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
  },
}))

type Props = {
  chatRooms: ChatRoom[]
}

const ChatRoomList = ({ chatRooms }: Props) => {
  const classes = useStyles()
  const router = useRouter()
  const activeClass = (to: string): boolean => router.asPath == to
  const handleLink = async (chatRoomId: number, e: React.SyntheticEvent) => {
    e.preventDefault()
    router.push(`/mypage/chat/${chatRoomId}`)
  }

  return (
    <List style={{ padding: 0 }}>
      {chatRooms.length > 0 &&
        chatRooms.map((chatRoom: ChatRoom) => (
          <li key={chatRoom.id}>
            <Box component={'h6'} className={classes.item}>
              <Link
                as={`/mypage/chat/${chatRoom.id}`}
                href={{
                  pathname: `/mypage/chat/[id]`,
                }}
                passHref
              >
                <ListItem
                  button
                  alignItems={'flex-start'}
                  component="a"
                  className={clsx(classes.row, {
                    [classes.active]: activeClass(
                      `/mypage/chat/${chatRoom.id}`
                    ),
                  })}
                  onClick={handleLink.bind(null, chatRoom.id)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <MeetingRoomIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={chatRoom.name + `(${chatRoom.members.length})`}
                    secondary="Jan 9, 2014"
                  />
                  {chatRoom.unread_count > 0 && (
                    <strong className={classes.unread}>
                      <Badge
                        badgeContent={chatRoom.unread_count}
                        max={99}
                        color={'default'}
                        classes={{
                          badge: classes.badge,
                        }}
                      />
                    </strong>
                  )}
                </ListItem>
              </Link>
            </Box>
            <Divider />
          </li>
        ))}
    </List>
  )
}

export default ChatRoomList
