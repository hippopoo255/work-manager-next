import React, { useContext, useState, useRef, useEffect } from 'react'
import { AuthContext } from '@/provider/AuthProvider'
import { logoutAction } from '@/globalState/user/action'

import {
  ClickAwayListener,
  Grow,
  MenuList,
  MenuItem,
  Paper,
  Popper,
  Divider,
} from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { STORAGE_URL } from '@/lib/util'
import { UserAvatar } from '@/components/atoms'
import { postRequest, requestUri } from '@/api'
import { useLocale } from '@/hooks'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuBox: {
      maxWidth: '100%',
    },
    menuLabel: {
      whiteSpace: 'pre-wrap',
      fontSize: theme.typography.subtitle2.fontSize,
      color: theme.palette.text.secondary,
      pointerEvents: 'none',
    },
  })
)

export type Letter = () => string

const AvatarMenu = () => {
  const classes = useStyles()
  const router = useRouter()
  const { auth, dispatch } = useContext(AuthContext)
  const { t, locale } = useLocale()
  const menus = [
    {
      id: 'mypage',
      to: '/mypage',
      text: t.authMenu.mypage,
    },
    {
      id: 'profile',
      to: '/mypage/profile',
      text: t.authMenu.profile,
    },
    {
      id: 'logout',
      to: '/logout',
      text: t.authMenu.logout,
    },
  ]
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleItem = async (to: string, e: React.MouseEvent<EventTarget>) => {
    handleClose(e)
    if (to === '/logout') {
      await logout()
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

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }
    setOpen(false)
  }

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }
  const prevOpen = useRef(open)
  const avatarSrc =
    auth.isLogin && !!auth.user.file_path
      ? `${STORAGE_URL}/${auth.user.file_path}`
      : ''

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }
    prevOpen.current = open
  }, [open])

  return (
    <div>
      {auth.isLogin && (
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          component="span"
        >
          <UserAvatar user={auth.user} />
        </IconButton>
      )}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper className={classes.menuBox}>
              <ClickAwayListener onClickAway={handleClose}>
                <nav>
                  <MenuList>
                    <MenuItem className={classes.menuLabel}>
                      {auth.isLogin && auth.user.full_name}
                    </MenuItem>
                  </MenuList>
                  <Divider />
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {menus.length > 0 &&
                      menus.map((menu) => (
                        <MenuItem
                          key={menu.id}
                          onClick={handleItem.bind(null, menu.to)}
                        >
                          {menu.text}
                        </MenuItem>
                      ))}
                  </MenuList>
                </nav>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default AvatarMenu
