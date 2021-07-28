import React from 'react'
import { MypageLayout } from '@/layouts'
import { GetStaticProps, GetServerSideProps, GetStaticPropsContext } from 'next'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { LatestNews } from '@/components/organisms'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}))
interface Props {
  window?: () => Window
}

const Dashboard = (props: Props) => {
  const classes = useStyles()

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <MypageLayout title="ダッシュボード">
      <>
        <section className="container">
          <Grid container spacing={3}>
            {/* Something Summary */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <LatestNews />
              </Paper>
            </Grid>{' '}
            {/* Schedule Calendar */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}></Paper>
            </Grid>
            {/* Recent Task */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}></Paper>
            </Grid>
          </Grid>
        </section>
      </>
    </MypageLayout>
  )
}

export default Dashboard
