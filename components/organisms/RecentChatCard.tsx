import React, { useState, useMemo, useEffect } from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { List, ListItem } from '@material-ui/core'
import { ChatIcon } from '@/components/atoms/icons'
import { DashboardBaseCard } from '@/components/organisms'
import { CardItemBar } from '@/components/molecules'
import { Header, FooterLink } from '@/interfaces/common/dashboard'
import { ChatMessage } from '@/interfaces/models'
import { toStrLabel, postTiming, COLLAPSE_COUNT } from '@/lib/util'
import { linerGradient } from '@/assets/color/gradient'
import { getRequest, requestUri } from '@/api'
import { UserBar, MoreExpander } from '@/components/molecules'
import { useLocale } from '@/hooks'

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
              sub={<UserBar user={message.written_by} variant={'caption'} />}
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
    headerColor: {
      background: linerGradient.secondary,
      color: theme.palette.common.white,
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
  const [loading, setLoading] = useState<boolean>(false)
  const { t } = useLocale()

  const header: Header = {
    avatar: <ChatIcon />,
    title: t.mypage.unreadChat,
    subTitle: `${t.status.recent}10${t.unit.item}(${t.status.max})`,
  }

  const footerLink: FooterLink = {
    to: '/mypage/chat',
    color: 'secondary',
    text: t.common.showChatRooms,
  }

  useEffect(() => {
    let isMounted = true
    const init = async () => {
      setLoading(true)
      await getRequest<ChatMessage[]>(requestUri.chatRoom.unreadRecently)
        .then((data) => {
          if (isMounted) {
            setUnreadMessages(data)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
    init()
    return () => {
      isMounted = false
    }
  }, [])

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
