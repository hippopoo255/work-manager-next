import React, { useState, useMemo, useEffect } from 'react'
import { ListItem, ListItemText } from '@material-ui/core'
import { ChatLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  index: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    color: theme.palette.text.hint,
    textAlign: 'center',
  },
}))
const Index = () => {
  const init = () => {}
  const classes = useStyles()

  return (
    <ChatLayout
      supplyUserId={init}
      title="チャット"
      mainNone
      sideNone={false}
      activeRoom={null}
    >
      <div className={classes.index}>
        <ListItem>
          <ListItemText className={classes.hint}>
            チャットルームを選択して下さい
          </ListItemText>
        </ListItem>
      </div>
    </ChatLayout>
  )
}

export default Index
