import React from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Container, Grid } from '@material-ui/core'
import { AboutFormat } from '@/components/organisms'
import { PaperLabel } from '@/components/molecules'
import { FullPhotoPaper } from '@/components/atoms'
import {
  MeetingRecordIcon,
  ScheduleIcon,
  ChatIcon,
} from '@/components/atoms/icons'
import { Product } from '@/interfaces/common'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import { TestLoginButton } from '@/components/molecules'

const useStyles = makeStyles((theme: Theme) => ({
  lg: {
    maxWidth: 1024,
  },
  item: {
    width: 320,
    [theme.breakpoints.down('xs')]: {
      width: 480,
      maxWidth: '100%',
    },
  },
  inner: {
    width: 300,
    height: 280,
    padding: theme.spacing(3),
    maxWidth: '100%',
    margin: '0 auto',
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: `${theme.spacing(3)}px 0`,
    },
  },
  paperLabel: {
    position: 'absolute',
    bottom: '-24px',
    right: '-24px',
    width: 240,
    [theme.breakpoints.down('xs')]: {
      right: '-16px',
    },
  },
}))

const AboutNotification = () => {
  const classes = useStyles()
  const notificationList: Product[] = [
    {
      id: 'meeting_record',
      title: '議事録',
      description: '新たな議事録が追加され、自分が参加者に含まれている時',
      bgImage: 'image_meeting.jpg',
      icon: <MeetingRecordIcon />,
    },
    {
      id: 'schedule',
      title: 'スケジュール',
      description: '別のユーザーから新たなスケジュールが共有された時',
      bgImage: 'image_schedule.jpg',
      icon: <ScheduleIcon />,
    },
    {
      id: 'chat',
      title: 'チャット',
      description: '参加中のチャットグループに新着メッセージが届いた時',
      bgImage: 'image_chat.jpg',
      icon: <ChatIcon />,
    },
  ]

  return (
    <AboutFormat
      title={{
        main: 'メール通知のタイミング',
        sub: 'mail notification',
        icon: EmailOutlinedIcon,
      }}
    >
      <Container component={'div'} className={classes.lg}>
        <Grid container spacing={3} justifyContent={'center'}>
          {notificationList.length > 0 &&
            notificationList.map((itm: Product) => (
              <Grid item key={itm.id} className={classes.item} md={4}>
                <Box className={classes.inner}>
                  <FullPhotoPaper src={itm.bgImage} />
                  <Box className={classes.paperLabel}>
                    <PaperLabel item={itm} />
                  </Box>
                </Box>
              </Grid>
            ))}
        </Grid>
        <Box mt={10} px={3}>
          <TestLoginButton />
        </Box>
      </Container>
    </AboutFormat>
  )
}

export default AboutNotification
