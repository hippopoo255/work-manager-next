import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'

export type Props = {
  severity: 'error' | 'warning' | 'info' | 'success'
  variant: 'filled' | 'outlined' | 'standard'
  msg: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      width: 180,
      position: 'fixed',
      bottom: 64,
      right: 24,
      zIndex: 1200,
      borderRadius: 4,
      transition: '400ms',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    hidden: {
      opacity: 0,
      pointerEvents: 'none',
    },
  })
)

const CustomAlert = ({ severity, variant, msg }: Props) => {
  const classes = useStyles()

  return (
    <Box
      className={clsx(classes.top, {
        [classes.hidden]: msg === '',
      })}
      boxShadow={3}
    >
      <Alert variant={variant} severity={severity}>
        {msg}
      </Alert>
    </Box>
  )
}

CustomAlert.propTypes = {
  severity: PropTypes.string,
  variant: PropTypes.string,
  msg: PropTypes.string,
}

CustomAlert.defaultProps = {
  severity: 'info',
  variant: 'filled',
  msg: 'This is an info alert — check it out!',
}

export default CustomAlert
