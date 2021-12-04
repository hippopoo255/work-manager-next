import React, { useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Box, Hidden, Button, SwipeableDrawer } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    disablePadding: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })
)

type Props = {
  formContent: React.ReactNode
  position?: {
    position?: 'absolute'
    top?: string | number
    left?: string | number
    right?: string | number
    bottom?: string | number
    paddingBottom?: string | number
  }
  disablePadding?: boolean
}

const SearchBox = ({
  formContent,
  position,
  disablePadding = false,
}: Props) => {
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
        <div
          className={clsx(classes.top, {
            [classes.disablePadding]: disablePadding,
          })}
        >
          {formContent}
        </div>
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
            <Box>{formContent}</Box>
          </SwipeableDrawer>
        </div>
      </Hidden>
    </div>
  )
}

export default SearchBox
