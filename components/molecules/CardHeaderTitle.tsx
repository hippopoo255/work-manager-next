import React from 'react'
import { Typography, IconButton } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { HelpBox } from '@/components/molecules'
import { linerGradient } from '@/assets/color/gradient'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerTitle: {
      position: 'relative',
      fontWeight: theme.typography.fontWeightBold,
    },
    headerHelp: {
      position: 'absolute',
      right: -8,
      bottom: -8,
    },
  })
)

const TriggerIcon = () => {
  return (
    <IconButton
      color="inherit"
      aria-label="show detail"
      component="span"
      size="small"
      style={{ color: 'rgba(0, 0, 0, 0.38)' }}
    >
      <HelpOutlineOutlinedIcon />
    </IconButton>
  )
}

type Props = {
  title: string
  description?: React.ReactNode
  trigger?: React.ReactNode
  tooltip?: string | undefined
}

const CardHeaderTitle = ({ title, description, trigger, tooltip }: Props) => {
  const classes = useStyles()
  return (
    <>
      {title}
      <Typography
        component={'h3'}
        variant={'h6'}
        className={classes.headerTitle}
      >
        {!!description && (
          <div className={classes.headerHelp}>
            <HelpBox point={trigger || <TriggerIcon />} tooltip={tooltip}>
              <Typography>{description}</Typography>
            </HelpBox>
          </div>
        )}
      </Typography>
    </>
  )
}

export default CardHeaderTitle
