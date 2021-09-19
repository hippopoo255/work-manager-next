import React from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna'
import { AboutFormat } from '@/components/organisms'
import { FullPhotoPaper } from '@/components/atoms'
import { TestLoginButton } from '@/components/molecules'
import { AnimationBoxByScroll } from '@/components/atoms'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    lg: {
      width: '100%',
      maxWidth: 1024,
      margin: '16px auto 0',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      opacity: 0,
    },
    inner: {
      width: 450,
      height: 280,
      padding: theme.spacing(3),
      maxWidth: '100%',
      margin: '0 auto',
      position: 'relative',

      [theme.breakpoints.down('xs')]: {
        padding: `${theme.spacing(3)}px 0`,
      },
    },
    description: {
      color: theme.palette.text.secondary,
      [theme.breakpoints.down('xs')]: {
        width: 450,
        maxWidth: '100%',
        margin: 'auto',
        padding: `0 ${theme.spacing(2)}px`,
      },
    },
  })
)
const AboutRealTime = () => {
  const classes = useStyles()

  return (
    <AboutFormat
      title={{
        main: 'リアルタイムチャット',
        sub: 'realtime chat',
        icon: SettingsInputAntennaIcon,
      }}
    >
      <div className={clsx(['container'])}>
        <AnimationBoxByScroll classes={{ root: classes.lg }}>
          <Grid container spacing={3}>
            <Grid item sm={6} className={classes.inner}>
              <FullPhotoPaper src={'image_broadcast.jpg'} />
            </Grid>
            <Grid item sm={6} className={classes.description}>
              <Typography>
                「チャットルーム一覧」「チャットメッセージ一覧」の画面では、新着メッセージをリアルタイムに検知し、ページの再読み込みをしなくてもメッセージや未読件数を最新に保ちます。
              </Typography>
              <Box mt={4}>
                <TestLoginButton />
              </Box>
            </Grid>
          </Grid>
        </AnimationBoxByScroll>
      </div>
    </AboutFormat>
  )
}

export default AboutRealTime
