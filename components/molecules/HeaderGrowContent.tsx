import React from 'react'
import { SiteLogo } from '@/components//atoms'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      paddingTop: 18,
      paddingBottom: 18,
    },
  })
)

const HeaderGrowContent = () => {
  const classes = useStyles()

  return (
    <div className={classes.title}>
      <SiteLogo />
    </div>
  )
}

export default HeaderGrowContent
