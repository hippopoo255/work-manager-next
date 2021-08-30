import React from 'react'
import { ListItem, Typography, Box, ListItemText } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: 'block',
    },
    main: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    },
    title: {
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.fontWeightBold,
      flexGrow: 1,
      lineHeight: 1.25,
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    status: {
      flexShrink: 0,
    },
  })
)

type Props = {
  main: string
  sub: React.ReactNode
  status: React.ReactNode
}

const CardItemBar = ({ main, sub, status }: Props) => {
  const classes = useStyles()
  return (
    <ListItem disableGutters classes={{ root: classes.row }} divider>
      <Typography variant="caption" color="textSecondary">
        {sub}
      </Typography>
      <Box className={classes.main}>
        <ListItemText
          primaryTypographyProps={{
            variant: 'caption',
            color: 'textSecondary',
            component: 'h4',
            className: classes.title,
          }}
        >
          {main}
        </ListItemText>
        <Typography
          variant="body2"
          component="span"
          color="textSecondary"
          className={classes.status}
        >
          {status}
        </Typography>
      </Box>
    </ListItem>
  )
}

export default CardItemBar
