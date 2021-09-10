import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { AlertStatus } from '@/interfaces/common'
import { linerGradient } from '@/assets/color/gradient'
import CloseIcon from '@material-ui/icons/Close'

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
    success: {
      background: linerGradient.success,
    },
    error: {
      background: linerGradient.error,
    },
    msg: {
      fontWeight: theme.typography.fontWeightBold,
      display: 'flex',
      alignItems: 'center',
    },
  })
)

type Props = {
  alertStatus: AlertStatus
  onClose: () => void
}
const CustomAlert = ({ alertStatus, onClose }: Props) => {
  const classes = useStyles()

  const handleClose = () => {
    onClose()
  }
  return (
    <Box
      className={clsx(classes.top, {
        [classes.hidden]: !alertStatus.show,
      })}
      boxShadow={3}
    >
      <Alert
        variant={alertStatus.variant}
        severity={alertStatus.severity}
        classes={{
          filledSuccess: classes.success,
          filledError: classes.error,
          message: classes.msg,
        }}
      >
        {alertStatus.msg}
        <CloseIcon
          onClick={handleClose}
          style={{ marginLeft: 8, cursor: 'pointer' }}
        />
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
