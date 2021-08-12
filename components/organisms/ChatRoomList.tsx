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
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { ChatRoom } from '@/interfaces/models'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { lighten } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    margin: 0,
  },
  active: {
    background: lighten(theme.palette.primary.main, 0.9),
  },
}))

type Props = {
  chatRooms: ChatRoom[]
}

// eslint-disable-next-line react/display-name
const ChatRoomList = ({ chatRooms }: Props) => {
  const classes = useStyles()
  const router = useRouter()
  const activeClass = (to: string): boolean => router.asPath == to
  return (
    <List>
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
                  className={clsx({
                    [classes.active]: activeClass(
                      `/mypage/chat/${chatRoom.id}`
                    ),
                  })}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={chatRoom.name + `(${chatRoom.members.length})`}
                    secondary="Jan 9, 2014"
                  />
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
