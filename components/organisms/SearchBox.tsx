import React, { useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Box, Hidden, Button, SwipeableDrawer } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(3),
    },
  })
)

type Props = {
  formContent: React.ReactNode
  position?: {
    position: 'absolute'
    top?: string | number
    left?: string | number
    right?: string | number
    bottom?: string | number
  }
}

const SearchBox = ({ formContent, position }: Props) => {
  const classes = useStyles()
  const [open, setOpen] = useState<boolean>(false)
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setOpen(open)
    }

  return (
    <div>
      <Hidden xsDown implementation="css">
        <div className={classes.top}>{formContent}</div>
      </Hidden>
      <Hidden smUp implementation="css">
        <div style={!!position ? { ...position } : {}}>
          <Button
            onClick={toggleDrawer(true)}
            color={'default'}
            variant={'outlined'}
            size={'small'}
          >
            {'絞り込み'}
          </Button>
          <SwipeableDrawer
            anchor={'bottom'}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <div style={{ padding: '16px 24px' }}>{formContent}</div>
          </SwipeableDrawer>
        </div>
      </Hidden>
    </div>
  )
}

export default SearchBox
