import React from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Divider, Typography } from '@material-ui/core'
import { Product } from '@/interfaces/common'
import { linerGradient } from '@/assets/color/gradient'

import styles from '@/assets/stylesheets/components/ColorPaper.module.scss'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorPaper: {
      color: theme.palette.common.white,
      background: linerGradient.primary,
      padding: `${theme.spacing(2)}px ${theme.spacing(2)}px `,
      overflow: 'hidden',
      position: 'relative',
      borderRadius: 4,
      boxShadow: theme.shadows[4],
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
    <Box className={clsx([classes.colorPaper])}>
      <Typography variant="body1" component="h4" className={classes.title}>
        {item.icon}
        {item.title}
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant="body2" component="p" className={classes.description}>
        {item.description}
      </Typography>
    </Box>
  )
}

export default PaperLabel
