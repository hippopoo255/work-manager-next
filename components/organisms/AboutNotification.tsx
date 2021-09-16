import React, { useEffect, useState, useRef } from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Container, Grid } from '@material-ui/core'
import { AboutFormat } from '@/components/organisms'
import { PaperLabel } from '@/components/molecules'
import { FullPhotoPaper, AnimationBoxByScroll } from '@/components/atoms'
import {
  MeetingRecordIcon,
  ScheduleIcon,
  ChatIcon,
} from '@/components/atoms/icons'
import { Product } from '@/interfaces/common'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import { TestLoginButton } from '@/components/molecules'

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: '100%',
    maxWidth: 1024,
    margin: '0 auto',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
  item: {
    marginTop: '16px',
    width: '100%',
    maxWidth: 320,
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  inner: {
    position: 'relative',
    paddingBottom: '90%',
    width: '100%',
    maxWidth: 450,
    height: 0,
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '56.75%',
    },
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  paperLabel: {
    position: 'absolute',
    bottom: '-16px',
    right: '-16px',
    width: 240,
    [theme.breakpoints.down('xs')]: {
      right: '-16px',
    },
  },
  operator: {
    margin: `${theme.spacing(8)}px auto auto`,
    maxWidth: 320,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 480,
    },
  },
  card: {
    opacity: 0,
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
      <div className={classes.list}>
        <Grid container spacing={3} justifyContent={'center'}>
          {notificationList.length > 0 &&
            notificationList.map((itm: Product) => (
              <Grid item key={itm.id} className={classes.item} md={4}>
                <AnimationBoxByScroll
                  classes={{
                    root: classes.card,
                  }}
                >
                  <Box className={classes.inner}>
                    <Box className={classes.bgImage}>
                      <FullPhotoPaper src={itm.bgImage} />
                    </Box>
                    <Box className={classes.paperLabel}>
                      <PaperLabel item={itm} />
                    </Box>
                  </Box>
                </AnimationBoxByScroll>
              </Grid>
            ))}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.operator}>
            <TestLoginButton />
          </Grid>
        </Grid>
      </div>
    </AboutFormat>
  )
}

export default AboutNotification
