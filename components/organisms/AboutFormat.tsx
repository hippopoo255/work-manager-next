import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { AboutTitle } from '@/components/atoms'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      padding: theme.spacing(0, 4),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0),
      },
    },
  })
)

type Props = {
  children: React.ReactNode
  title: {
    main: string
    sub: string
    icon?: any
  }
}

const AboutFormat = ({
  children,
  title = { main: 'メール通知機能', sub: '', icon: undefined },
}: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.top}>
      <AboutTitle main={title.main} sub={title.sub} Icon={title.icon} />
      {children}
    </div>
  )
}

export default AboutFormat
