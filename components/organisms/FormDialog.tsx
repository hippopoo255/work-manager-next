import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles, Theme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import theme from '@/theme'
import { CircularButton } from '../molecules'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '500px',
    maxWidth: '100%',
  },
  title: {
    textAlign: 'center',
  },
  cancel: {
    color: theme.palette.text.disabled,
  },
  action: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    justifyContent: 'center',
  },
}))

export type Props = {
  onSubmit: () => Promise<any>
  dialogTitle: string
  cancelText: string
  submitText: string
  children: React.ReactNode
  open: boolean
  setOpen: (isOpen: boolean) => void
  isCircular: boolean
  loading: boolean
}

const FormDialog = ({
  onSubmit,
  dialogTitle,
  cancelText,
  submitText,
  children,
  open,
  setOpen,
  isCircular,
  loading,
}: Props) => {
  const classes = useStyles()
  // const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClickClose = () => {
    setOpen(false)
  }
  const handleSubmit = async () => {
    await onSubmit()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.title} id="form-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent className={classes.root}>{children}</DialogContent>
        <DialogActions className={classes.action}>
          <Button
            onClick={handleClickClose}
            color="inherit"
            className={classes.cancel}
          >
            {cancelText}
          </Button>
          {isCircular ? (
            <CircularButton loading={loading} onClick={handleSubmit} />
          ) : (
            <Button
              onClick={handleSubmit}
              variant={'contained'}
              color="primary"
            >
              {submitText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

FormDialog.propTypes = {
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  dialogTitle: PropTypes.string,
  isCircular: PropTypes.bool,
  loading: PropTypes.bool,
}

FormDialog.defaultProps = {
  cancelText: 'キャンセル',
  submitText: '保存',
  dialogTitle: 'フォーム画面',
  isCircular: false,
  loading: false,
}

export default FormDialog