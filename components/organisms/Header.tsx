import React, { useState } from 'react'
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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from '@/axios'
import requests from '@/Requests'
import { AvatarMenu } from '../molecules'
import { UserModel } from '@/interfaces'

export type Menu = {
  text: string
  icon: any
  to: string
}

export type Anchor = 'top' | 'left' | 'bottom' | 'right'

export type Props = {
  user: UserModel | []
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      background: `radial-gradient(circle at 40px 50px, #59be57 0 10%, ${theme.palette.primary.main} 70%)`,
    },
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

const Header = ({ user }: Props) => {
  const classes = useStyles()
  const router = useRouter()
  const isLogin: boolean = !Array.isArray(user)
  const [state, setState] = useState(false)
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
      icon: <LockOutlinedIcon />,
      to: '/login',
    },
  ]

  const authMenus: Menu[] = [
    {
      text: 'ログアウト',
      icon: <ExitToAppOutlinedIcon />,
      to: '/logout',
    },
  ]

  const switchedMenus = () => (isLogin ? authMenus : menus)

  const onItem = (to: string) => {
    if (to === '/logout') {
      logout()
    } else {
      router.push(to)
    }
  }

  const logout = async () => {
    await axios.post(requests.logout).then((res) => {
      if (res.status === 200) {
        router.push('/login')
      }
    })
  }

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
          <li key={`${index}_${menu.text}`} onClick={() => onItem(menu.to)}>
            <ListItem button>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.text} />
            </ListItem>
          </li>
        ))}
      </List>
    </div>
  )
  return (
    <AppBar position="fixed" className={classes.header} color="inherit">
      <Toolbar className="container">
        <Typography variant="h6" className={classes.title}>
          <Link href="/">{process.env.NEXT_PUBLIC_SITE_NAME}</Link>
        </Typography>
        {!Array.isArray(user) && <AvatarMenu user={user} />}
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
        {list(switchedMenus(), 'right')}
      </Drawer>
    </AppBar>
  )
}

export default Header
