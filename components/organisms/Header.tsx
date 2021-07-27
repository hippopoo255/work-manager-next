import React from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import MenuIcon from '@material-ui/icons/Menu'
import styles from '@/assets/stylesheets/components/Header.module.scss'
import Link from 'next/link'

export type Menu = {
  text: string
  icon: any
  to: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    title: {
      flexGrow: 1,
    },
  })
)

type Anchor = 'top' | 'left' | 'bottom' | 'right'

export default function TemporaryDrawer() {
  const classes = useStyles()
  const [state, setState] = React.useState(false)

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState(open)
    }

  const menus: Menu[] = [
    {
      text: 'ログイン',
      icon: <LockOpenOutlinedIcon />,
      to: '/login',
    },
  ]
  const list = (menus: Menu[], anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menus.map((menu, index) => (
          <Link href={menu.to} key={`${index}_${menu.text}`}>
            <ListItem button>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )

  return (
    <AppBar position="fixed">
      <Toolbar className="container">
        <Typography variant="h6" className={classes.title}>
          <Link href="/">業務支援システム</Link>
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor={'right'} open={state} onClose={toggleDrawer(false)}>
        {list(menus, 'right')}
      </Drawer>
    </AppBar>
  )
}
