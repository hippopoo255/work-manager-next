import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    face: {
      width: theme.spacing(25),
      height: theme.spacing(25),
      overflow: 'hidden',
      borderRadius: 9999,
      border: `5px solid ${theme.palette.common.white}`,
      position: 'relative',
      flexShrink: 0,
    },
    src: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100%',
      transform: 'translate3d(-50%, -50%, 0)',
    },
  })
)

type Props = {
  Icon: any
  classes?: any
}

const RoundedIcon = ({ Icon, classes }: Props) => {
  const defaultClasses = { ...useStyles(), ...classes }
  return (
    <div className={defaultClasses.face}>
      <Icon className={defaultClasses.src} />
    </div>
  )
}

export default RoundedIcon
