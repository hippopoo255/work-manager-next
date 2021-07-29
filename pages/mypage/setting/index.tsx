import React from 'react'
import { MypageLayout } from '@/layouts'
import { CallMissedSharp } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
})

const Index = () => {
  const classes = useStyles()
  return (
    <MypageLayout title="設定">
      <h2>設定</h2>
      <section className={classes.root}></section>
    </MypageLayout>
  )
}

export default Index
