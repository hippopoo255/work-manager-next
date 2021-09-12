import React from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/Inbox'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      textAlign: 'center',
    },
    title: {
      display: 'inline-block',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      borderBottom: `6px double ${theme.palette.primary.main}`,
      borderTop: `6px double ${theme.palette.primary.main}`,
    },
    main: {
      lineHeight: 1,
      // color: theme.palette.text.secondary,
    },
    sub: {
      color: theme.palette.primary.main,
      lineHeight: 1,
      letterSpacing: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    icon: {
      fontSize: theme.typography.body1.fontSize,
    },
  })
)

type Props = {
  main: string
  sub: string
  Icon?: any
}

const AboutTitle = ({ main, sub, Icon }: Props) => {
  const classes = useStyles()
  return (
    <Box className={clsx(['container', classes.top])}>
      <Box className={classes.title}>
        <Typography component={'h3'} variant={'h5'} className={classes.main}>
          <span>{main}</span>
        </Typography>
        <Typography
          component={'small'}
          variant={'overline'}
          className={classes.sub}
        >
          {!!Icon ? (
            <Icon className={classes.icon} />
          ) : (
            <InboxIcon className={classes.icon} />
          )}
          {sub}
        </Typography>
      </Box>
    </Box>
  )
}

export default AboutTitle
