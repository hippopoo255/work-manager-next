import React from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Divider, Typography } from '@material-ui/core'
import { Product } from '@/interfaces/common'
import { linerGradient } from '@/assets/color/gradient'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      filter: `drop-shadow(0 3px 6px #aaaaaa)`,
      overflow: 'hidden',
      borderRadius: 4,
    },
    colorPaper: {
      background: linerGradient.primary,
      color: theme.palette.common.white,
      padding: `${theme.spacing(2)}px ${theme.spacing(2)}px `,
      clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
    divider: {
      backgroundColor: theme.palette.common.white,
      margin: `${theme.spacing(1)}px 0`,
    },
    description: {
      // minHeight: 60,
    },
  })
)

type Props = {
  item: Product
}

const PaperLabel = ({ item }: Props) => {
  const classes = useStyles()

  return (
    <Box className={clsx([classes.wrap])}>
      <Box className={clsx([classes.colorPaper])}>
        <Typography variant="body1" component="h4" className={classes.title}>
          {item.icon}
          {item.title}
        </Typography>
        <Divider className={classes.divider} />
        <Typography
          variant="body2"
          component="p"
          className={classes.description}
        >
          {item.description}
        </Typography>
      </Box>
    </Box>
  )
}

export default PaperLabel
