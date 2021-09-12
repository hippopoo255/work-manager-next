import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { AboutTitle } from '@/components/atoms'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      padding: '64px 32px',
      [theme.breakpoints.down('sm')]: {
        padding: '64px 16px',
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
  console.log(title)
  return (
    <div className={classes.top}>
      <AboutTitle main={title.main} sub={title.sub} Icon={title.icon} />
      {children}
    </div>
  )
}

export default AboutFormat
