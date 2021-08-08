import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { AlertStatus } from '@/interfaces'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      minWidth: 180,
      position: 'fixed',
      bottom: theme.spacing(2),
      left: theme.spacing(2),
      zIndex: 1301,
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
    content: {
      '&.MuiAlert-filledError': {
        background: 'linear-gradient(135deg, #EB3941, #F15E64, #E2373f)',
      },
      '&.MuiAlert-filledSuccess': {
        background: 'linear-gradient(164deg, #5dff26, #5cb363)',
      },
    },
  })
)

const CustomAlert = ({ severity, variant, msg, show }: AlertStatus) => {
  const classes = useStyles()

  return (
    <Box
      className={clsx(classes.top, {
        [classes.hidden]: !show,
      })}
      boxShadow={3}
    >
      <Alert variant={variant} severity={severity} className={classes.content}>
        {msg}
      </Alert>
    </Box>
  )
}

CustomAlert.propTypes = {
  severity: PropTypes.string,
  variant: PropTypes.string,
  msg: PropTypes.string,
  show: PropTypes.bool,
}

CustomAlert.defaultProps = {
  severity: 'info',
  variant: 'filled',
  msg: 'This is an info alert — check it out!',
  show: false,
}

export default CustomAlert
