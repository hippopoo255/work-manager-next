import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import { List } from '@material-ui/core'

import { Menu, Child, Menus, sidebarMenus } from '@/lib/sidebar'
import { LinkBar } from '@/components/molecules'
import { FlexibleDrawer } from '@/components/organisms'
import { drawerWidth } from '@/lib/util'
import { useRouter } from 'next/router'
import { ChatMessage, User } from '@/interfaces/models'
import { listenMessageSent, listenMessageRead } from '@/lib/pusher'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      zIndex: theme.zIndex.appBar - 1,
      [theme.breakpoints.up('lg')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    modalPaper: {
      width: drawerWidth,
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
)

interface Props {
  window?: () => Window
  open: boolean
  onClose: any
  flexibleOpen: boolean
  handleFlexibleOpen: any
  user?: User | ''
}

const Sidebar = (props: Props) => {
  const { window, open, onClose, flexibleOpen, handleFlexibleOpen, user } =
    props
  const classes = useStyles()
  const container =
    window !== undefined ? () => window().document.body : undefined
  const theme = useTheme()
  const router = useRouter()
  const [menus, setMenus] = useState<Menus>({ ...sidebarMenus })

  const handleClick = (target: Menu) => {
    if (target.children === undefined) {
      onItem(target.to)
    } else {
      handleFlexibleOpen(true)
      setMenus((prev) => {
        if (target.open !== undefined) {
          target.open = !target.open
        }
        const index = prev.top.findIndex((menu) => menu.id === target.id)
        if (index !== -1) {
          prev.top.splice(index, 1, target)
        }
        return {
          ...prev,
        }
      })
    }
  }

  const onItem = (to: string) => {
    router.push(to)
  }

  const includesActive = (to: string): boolean => router.asPath.includes(to)

  useEffect(() => {
    setMenus((prev) => {
      const newTop = prev.top.map((menu) => {
        if (menu.open !== undefined) {
          menu.open = includesActive(menu.to)
        }
        return menu
      })
      return {
        ...prev,
        top: [...newTop],
      }
    })
    handleFlexibleOpen(includesActive('/mypage/meeting_record'))
  }, [])

  // useEffect(() => {
  //   listenMessageSent((message: ChatMessage) => {
  //     if (!!user && message.written_by.id !== user.id) {
  //       setMenus((prev) => {
  //         const newTop = prev.top
  //         const index = newTop.findIndex((menu) => menu.id === 'chat')
  //         newTop[index].is_notify = true
  //         return {
  //           ...prev,
  //           top: [...newTop],
  //         }
  //       })
  //     }
  //   })
  //   listenMessageRead(({ readUser, chatRoomId }) => {
  //     if (!!user && readUser.id === user.id) {
  //       setMenus((prev) => {
  //         const newTop = prev.top
  //         const index = newTop.findIndex((menu) => menu.id === 'chat')
  //         newTop[index].is_notify = false
  //         return {
  //           ...prev,
  //           top: [...newTop],
  //         }
  //       })
  //     }
  //   })
  // }, [user])

  const drawer = (
    <aside>
      <List style={{ paddingBottom: 0 }}>
        <LinkBar item={menus.home[0]} onItem={handleClick} />
      </List>
      <Divider />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        disablePadding
      >
        {menus.top.map(
          (menu, i) =>
            menu.disabled === undefined && (
              <LinkBar
                key={menu.id + `_${i}`}
                item={menu}
                onItem={handleClick}
              />
            )
        )}
      </List>
      <Divider />
      <List disablePadding>
        {menus.bottom.map((menu: Menu) => (
          <LinkBar key={menu.id} item={menu} onItem={() => onItem(menu.to!)} />
        ))}
      </List>
    </aside>
  )

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden mdUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={open}
          onClose={() => onClose(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden lgUp smDown implementation="css">
        <FlexibleDrawer
          drawer={drawer}
          open={flexibleOpen}
          onClose={() => handleFlexibleOpen(false)}
        />
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default Sidebar
