import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon'
type Props = {
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  label: string
  value: string
}

const useStyles = makeStyles((theme: Theme) => ({
  meta: {
    color: theme.palette.text.secondary,
    // padding: `0 ${theme.spacing(1)}px`,
  },
  metaLabel: {
    marginLeft: 4,
    marginRight: theme.spacing(1),
  },
  metaValue: {
    fontWeight: theme.typography.fontWeightBold,
  },
}))

const BlogMeta = ({ Icon, label, value }: Props) => {
  const classes = useStyles()
  return (
    <Box
      component="div"
      display="flex"
      alignItems={'center'}
      className={classes.meta}
    >
      <Icon color="action" fontSize="small" />
      <Typography
        component="span"
        variant={'body2'}
        className={classes.metaLabel}
      >
        {label}:
      </Typography>
      <Typography className={classes.metaValue} variant={'body2'}>
        {value}
      </Typography>
    </Box>
  )
}

export default BlogMeta
