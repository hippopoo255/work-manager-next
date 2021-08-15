import React from 'react'
import Link from 'next/link'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined'
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined'
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined'
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined'
import BookOutlinedIcon from '@material-ui/icons/BookOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import { LinkBar } from '@/components/molecules'
import { drawerWidth } from '@/lib/util'
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import { useRouter } from 'next/router'

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
  open: boolean
  onClose: any
}

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

  const menus: Menus = {
    top: [
      {
        id: 'meeting',
        icon: <MenuBookOutlinedIcon />,
        to: '/mypage/meeting_record',
        text: '会議議事録',
      },
      {
        id: 'schedule',
        icon: <EventAvailableOutlinedIcon />,
        to: '/mypage/schedule',
        text: 'スケジュール',
      },
      {
        id: 'document',
        icon: <FolderOpenOutlinedIcon />,
        to: '/mypage/document',
        text: 'ドキュメント',
      },
      {
        id: 'task',
        icon: <FormatListBulletedOutlinedIcon />,
        to: '/mypage/task',
        text: 'タスク',
      },
      {
        id: 'chat',
        icon: <SendOutlinedIcon />,
        to: '/mypage/chat',
        text: 'チャット',
      },
      {
        id: 'blog',
        icon: <BookOutlinedIcon />,
        to: '/mypage/blog',
        text: 'ブログ',
      },
    ],
    bottom: [
      {
        id: 'settings',
        text: '設定',
        icon: <SettingsOutlinedIcon />,
        to: '/mypage/setting',
      },
    ],
  }

  const onItem = (to: string) => {
    router.push(to)
  }

  const activeClass = (to: string): boolean => router.asPath == to

  const drawer = (
    <aside>
      <List>
        <Link href="/" passHref>
          <ListItem button component="a">
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
          <LinkBar
            key={menu.id}
            item={menu}
            activeClass={activeClass(menu.to)}
            onItem={() => onItem(menu.to)}
          />
        ))}
      </List>
      <Divider />
      <List>
        {menus.bottom.map((menu: Menu) => (
          <LinkBar
            key={menu.id}
            item={menu}
            activeClass={activeClass(menu.to)}
            onItem={() => onItem(menu.to)}
          />
        ))}
      </List>
    </aside>
  )

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
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
