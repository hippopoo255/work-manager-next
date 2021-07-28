import React from 'react'
import Link from 'next/link'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import HomeIcon from '@material-ui/icons/Home'

import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined'
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined'
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined'
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined'
import BookOutlinedIcon from '@material-ui/icons/BookOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import { useRouter } from 'next/router'

// export type Menu = {
//   title: string
//   children: Child[]
//   [k: string]: any
// }

// export type Child = {
//   id: string
//   label: string
//   to: string
// }

export type Menu = {
  id: string
  to: string
  icon: any
  text: string
}

export type Menus = {
  [k: string]: Menu[]
}

interface Props {
  window?: () => Window
  open: any
  onClose: any
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
  })
)

const Sidebar = (props: Props) => {
  const { window } = props
  const classes = useStyles()
  const container =
    window !== undefined ? () => window().document.body : undefined
  const theme = useTheme()
  const router = useRouter()

  // const menus: Menus = {
  //   meeting: {
  //     title: '会議',
  //     children: [
  //       // {
  //       //   id: 'reservation',
  //       //   to: '/meeting_reservation',
  //       //   label: '会議予約',
  //       // },
  //       {
  //         id: 'record',
  //         to: '/meeting_record',
  //         label: '議事録',
  //       },
  //     ],
  //   },
  //   schedule: {
  //     title: 'スケジュール',
  //     children: [
  //       {
  //         id: 'schedule',
  //         to: '/schedule',
  //         label: 'スケジュール',
  //       },
  //     ],
  //   },
  //   document: {
  //     title: 'ドキュメント',
  //     children: [
  //       {
  //         id: 'document',
  //         to: '/document',
  //         label: 'ドキュメント',
  //       },
  //     ],
  //   },
  //   task: {
  //     title: 'タスク',
  //     children: [
  //       {
  //         id: 'task',
  //         to: '/task',
  //         label: 'ドキュメント',
  //       },
  //     ],
  //   },
  //   chat: {
  //     title: 'チャット',
  //     children: [
  //       {
  //         id: 'chat',
  //         to: '/chat',
  //         label: 'チャット',
  //       },
  //     ],
  //   },
  //   blog: {
  //     title: '社内ブログ',
  //     children: [
  //       {
  //         id: 'index',
  //         to: '/blog',
  //         label: '一覧',
  //       },
  //       {
  //         id: 'new',
  //         to: '/blog/create',
  //         label: '新規投稿',
  //       },
  //       {
  //         id: 'history',
  //         to: '/blog/history',
  //         label: '投稿履歴',
  //       },
  //     ],
  //   },
  // }

  const menus: Menus = {
    top: [
      {
        id: 'meeting',
        icon: <MenuBookOutlinedIcon />,
        to: '/meeting_record',
        text: '会議議事録',
      },
      {
        id: 'schedule',
        icon: <EventAvailableOutlinedIcon />,
        to: '/schedule',
        text: 'スケジュール',
      },
      {
        id: 'document',
        icon: <FolderOpenOutlinedIcon />,
        to: '/document',
        text: 'ドキュメント',
      },
      {
        id: 'task',
        icon: <FormatListBulletedOutlinedIcon />,
        to: '/task',
        text: 'タスク',
      },
      {
        id: 'chat',
        icon: <SendOutlinedIcon />,
        to: '/chat',
        text: 'チャット',
      },
      {
        id: 'blog',
        icon: <BookOutlinedIcon />,
        to: '/blog',
        text: 'ブログ',
      },
    ],
    bottom: [
      {
        id: 'settings',
        text: '設定',
        icon: <SettingsOutlinedIcon />,
        to: '/settings',
      },
    ],
  }

  const onItem = (to: string) => {
    router.push(to)
  }

  const drawer = (
    <aside>
      <List>
        <Link href="/">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {menus.top.map((menu: Menu) => (
          <ListItem button key={menu.id} onClick={() => onItem(menu.to)}>
            <ListItemIcon>{menu.icon || <InboxIcon />}</ListItemIcon>
            <ListItemText primary={menu.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menus.bottom.map((menu: Menu) => (
          <ListItem button key={menu.id} onClick={() => onItem(menu.to)}>
            <ListItemIcon>{menu.icon || <InboxIcon />}</ListItemIcon>
            <ListItemText primary={menu.text} />
          </ListItem>
        ))}
      </List>
    </aside>
  )

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.open}
          onClose={() => props.onClose(false)}
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
      <Hidden xsDown implementation="css">
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
