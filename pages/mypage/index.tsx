import React, { useState, useMemo } from 'react'
import { MypageLayout } from '@/layouts'
import { GetStaticProps, GetServerSideProps, GetStaticPropsContext } from 'next'
import Grid from '@material-ui/core/Grid'
import { BusyTaskCardList } from '@/components/template'
import {
  LatestMeetingRecord,
  DailyScheduleCard,
  RecentChatCard,
} from '@/components/organisms'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import { useLocale } from '@/hooks'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    minHeight: 140,
  },
  relative: {
    position: 'relative',
    overflow: 'hidden',
  },
}))
interface Props {
  window?: () => Window
}

const Dashboard = (props: Props) => {
  const classes = useStyles()
  const { t } = useLocale()
  const fixedHeightPaper = useMemo(
    () => clsx(classes.paper, classes.fixedHeight, classes.relative),
    []
  )

  return (
    <MypageLayout title={t.head.title.mypage.index}>
      <>
        <section className="container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LatestMeetingRecord wrapClasses={fixedHeightPaper} />
            </Grid>{' '}
            <Grid item xs={12} sm={6} md={4}>
              <Grid container spacing={3}>
                {/* Daily Schedule */}
                <Grid item xs={12}>
                  <DailyScheduleCard wrapClasses={fixedHeightPaper} />
                </Grid>
                <Grid item xs={12}>
                  {/* Recent Unread Chat  */}
                  <RecentChatCard wrapClasses={fixedHeightPaper} />
                </Grid>
              </Grid>
            </Grid>
            {/* Busy Task */}
            <Grid item xs={12} sm={6} md={8}>
              <BusyTaskCardList fixedHeightPaper={fixedHeightPaper} />
            </Grid>
          </Grid>
        </section>
      </>
    </MypageLayout>
  )
}

export default Dashboard
