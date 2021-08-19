import React, { useState, useRef, useEffect } from 'react'
import {
  ClickAwayListener,
  Grow,
  MenuList,
  MenuItem,
  Paper,
  Popper,
} from '@material-ui/core'
import { Avatar, IconButton } from '@material-ui/core'
import { deepOrange } from '@material-ui/core/colors'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { LocalDiningOutlined, MenuSharp } from '@material-ui/icons'
import axios from '@/axios'
import requests from '@/Requests'
import { useRouter } from 'next/router'
import { User } from '@/interfaces/models'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: theme.palette.secondary.main,
    },
  })
)

export type Letter = () => string

interface Props {
  user: User | ''
}

const AvatarMenu = ({ user }: Props) => {
  const classes = useStyles()
  const router = useRouter()
  const menus = [
    {
      id: 'mypage',
      to: '/mypage',
      text: 'マイページ',
    },
    {
      id: 'profile',
      to: '/mypage/profile',
      text: 'プロフィール',
    },
    {
      id: 'logout',
      to: '/logout',
      text: 'Logout',
    },
  ]
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const letter: Letter = () => (!!user ? user.family_name.slice(0, 1) : '')

  const handleItem = async (to: string, e: React.MouseEvent<EventTarget>) => {
    handleClose(e)
    if (to === '/logout') {
      await logout()
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

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }
    prevOpen.current = open
  }, [open])

  return (
    <div>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        component="span"
      >
        <Avatar
          alt={!!user ? user.family_name : ''}
          src=""
          className={classes.avatar}
        >
          {letter()}
        </Avatar>
      </IconButton>
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
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
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
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default AvatarMenu
