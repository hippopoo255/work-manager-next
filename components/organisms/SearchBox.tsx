import React, { useState } from 'react'
import { Box, Hidden, Button, SwipeableDrawer } from '@material-ui/core'

type Props = {
  formContent: React.ReactNode
}

const SearchBox = ({ formContent }: Props) => {
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
    <>
      <Hidden xsDown implementation="css">
        {formContent}
      </Hidden>
      <Hidden smUp implementation="css">
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
          <Box style={{ padding: 24 }}>{formContent}</Box>
        </SwipeableDrawer>
      </Hidden>
    </>
  )
}

export default SearchBox
