import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles, createStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '500px',
      maxWidth: '100%',
      textAlign: 'center',
    },
    title: {
      fontWeight: 700,
      textAlign: 'center',
    },
    tail: {
      justifyContent: 'center',
    },
    cancel: {
      color: theme.palette.text.disabled,
    },
    exec: {
      color: theme.palette.error.main,
      fontWeight: 700,
    },
  })
)

export type Props = {
  open: boolean
  setOpen: (isOpen: boolean) => void
  onExec: () => void
}

const ConfirmDialog = ({ open, setOpen, onExec }: Props) => {
  const handleClickOpen = (isOpen: boolean) => {
    setOpen(isOpen)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleExec = () => {
    // setOpen(false)
    onExec()
  }

  const classes = useStyles()

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" className={classes.title}>
          確認
        </DialogTitle>
        <DialogContent dividers className={classes.root}>
          一度削除すると元に戻せません。
          <br />
          削除してよろしいですか？
        </DialogContent>
        <DialogActions className={classes.tail}>
          <Button onClick={handleClose} color="default">
            キャンセル
          </Button>
          <Button onClick={handleExec} color="inherit" className={classes.exec}>
            実行
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmDialog
