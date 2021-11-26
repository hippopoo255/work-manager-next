import React, { useState, useContext, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import MenuIcon from '@material-ui/icons/Menu'
import { postRequest, requestUri } from '@/api'
import { HeaderGrowContent, AvatarMenu } from '@/components/molecules'
import { logoutAction } from '@/globalState/user/action'
import { AuthContext } from '@/provider/AuthProvider'
import { useAuth0 } from '@auth0/auth0-react'
import { httpClient } from '@/lib/axios'

export type Menu = {
  text: string
  icon: any
  to: string
}

export type Anchor = 'top' | 'left' | 'bottom' | 'right'

export type Props = {
  noShadow?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      // background: `linear-gradient(165deg, ${darken('#5dff26', 0.1)}, #5cb363)`,
      background: theme.palette.primary.main,
    },
    noShadow: {
      boxShadow: 'none',
    },
    nav: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    list: {
      flexGrow: 1,
      padding: `0 ${theme.spacing(1)}px`,
    },
  })
)

const Header = ({ noShadow }: Props) => {
  const classes = useStyles()
  const router = useRouter()
  const {
    isAuthenticated,
    loginWithRedirect,
    // logout,
    user,
    getAccessTokenSilently,
  } = useAuth0()

  useEffect(() => {
    let isMounted = true
    if (isMounted && isAuthenticated) {
      const tokenTest = async () => {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.NEXT_PUBLIC_AUTH0_AUTHORIZER_IDENTIFIER || '',
        }).catch((err) => {
          console.error(err)
        })
        if (!!accessToken) {
          const response = await httpClient.get('/private', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          console.log(response)
        }
      }
      tokenTest()
    }
    return () => {
      isMounted = false
    }
  }, [isAuthenticated])

  const { auth, dispatch } = useContext(AuthContext)
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
    {
      text: user?.name || '',
      icon: <ExitToAppOutlinedIcon />,
      to: '/logout',
    },
  ]

  // const switchedMenus = () => (isAuthenticated ? authMenus : menus)
  const switchedMenus = () => (auth.isLogin ? authMenus : menus)
  const headerClass = clsx(classes.header, {
    [classes.noShadow]: !!noShadow,
  })

  const onItem = (to: string) => {
    if (to === '/logout') {
      logout()
    } else if (to === '/login') {
      // loginWithRedirect()
      router.push(to)
    } else {
      router.push(to)
    }
  }

  const logout = async () => {
    await postRequest<null, {}>(requestUri.logout, {}).then(() => {
      dispatch(logoutAction())
      router.push('/login')
    })
  }

  const list = (menus: Menu[], anchor: Anchor) => (
    <div
      className={clsx(classes.nav, {
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
    <AppBar position="fixed" className={headerClass} color="inherit">
      <Toolbar className="container">
        <nav className={classes.list}>
          <HeaderGrowContent />
        </nav>
        {!!auth.isLogin && <AvatarMenu />}
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
