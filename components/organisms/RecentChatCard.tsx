import React, { useState } from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { List, ListItem, Avatar } from '@material-ui/core'
import { ChatIcon } from '@/components/atoms/icons'
import { DashboardBaseCard } from '@/components/organisms'
import { CardItemBar } from '@/components/molecules'
import { Header, FooterLink } from '@/interfaces/common/dashboard'
import { ChatMessage } from '@/interfaces/models'
import { postTiming, COLLAPSE_COUNT } from '@/lib/util'
import { linerGradient } from '@/assets/color/gradient'
import { requestUri } from '@/api'
import { UserBar, MoreExpander } from '@/components/molecules'
import { useLocale, useInitialConnector } from '@/hooks'

type ListProps = {
  classes: any
  unreadMessages: ChatMessage[]
}

const MessageList = ({ unreadMessages, classes }: ListProps) => {
  return (
    <List disablePadding>
      {!!unreadMessages.length ? (
        unreadMessages.map((message) => (
          <div key={`unreadMessage_${message.id}`}>
            <CardItemBar
              main={message.body}
              sub={<UserBar user={message.created_by} variant={'caption'} />}
              status={postTiming(new Date(message.created_at))}
            />
          </div>
        ))
      ) : (
        <ListItem disableGutters>未読のメッセージはありません。</ListItem>
      )}
    </List>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerTitle: {
      fontWeight: theme.typography.fontWeightBold,
      background: linerGradient.secondary,
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
    },
    headerColor: {
      borderImage: linerGradient.secondary,
      borderBottom: '2px solid',
      borderImageSlice: 1,
    },
    subHeaderColor: {
      background: linerGradient.secondary,
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
    },
    avatar: {
      background: linerGradient.secondary,
    },
    loaderColor: {
      color: theme.palette.secondary.main,
    },
    detailBtn: {
      fontSize: theme.typography.caption.fontSize,
    },
  })
)

type Props = {
  wrapClasses: any
}

// eslint-disable-next-line react/display-name
const RecentChatCard = React.memo(({ wrapClasses }: Props) => {
  const classes = useStyles()
  const [unreadMessages, setUnreadMessages] = useState<ChatMessage[]>([])
  const { t } = useLocale()
  const { loading } = useInitialConnector<ChatMessage[]>({
    path: requestUri.chatRoom.unreadRecently,
    onSuccess: (data) => setUnreadMessages(data),
  })

  const header: Header = {
    avatar: (
      <Avatar className={classes.avatar}>
        <ChatIcon />
      </Avatar>
    ),
    title: t.mypage.unreadChat,
    subTitle: `${t.status.recent}10${t.unit.item}(${t.status.max})`,
  }

  const footerLink: FooterLink = {
    to: '/mypage/chat',
    color: 'secondary',
    text: t.common.showChatRooms,
  }

  const collapse = unreadMessages.length > COLLAPSE_COUNT

  return (
    <DashboardBaseCard
      header={header}
      footerLink={footerLink}
      wrapClasses={wrapClasses}
      loading={loading}
      classes={{
        headerColor: classes.headerColor,
        loaderColor: classes.loaderColor,
        headerTitle: classes.headerTitle,
        subHeaderColor: classes.subHeaderColor,
      }}
    >
      {!!collapse ? (
        <MoreExpander maxCount={unreadMessages.length}>
          <MessageList unreadMessages={unreadMessages} classes={classes} />
        </MoreExpander>
      ) : (
        <MessageList unreadMessages={unreadMessages} classes={classes} />
      )}
    </DashboardBaseCard>
  )
})

export default RecentChatCard
