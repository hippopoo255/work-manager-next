import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { SiteLogo } from '@/components//atoms'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { List, ListItem } from '@material-ui/core'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      display: 'flex',
      alignItems: 'center',
    },
    item: {
      paddingTop: 0,
      paddingBottom: 0,
      flexGrow: 0,
      width: 'initial',
    },
    link: {
      cursor: 'pointer',
      transition: '300ms',
      '&:hover': {
        textDecoration: 'none',
        opacity: '.7',
      },
    },
  })
)

const HeaderGrowContent = () => {
  const classes = useStyles()

  return (
    <List className={classes.list} disablePadding>
      <ListItem disableGutters className={clsx([classes.item, classes.link])}>
        <Link href={'/'}>
          <a>
            <SiteLogo />
          </a>
        </Link>
      </ListItem>
    </List>
  )
}

export default HeaderGrowContent
