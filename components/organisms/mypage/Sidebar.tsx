import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import Link from 'next/link'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import {
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@material-ui/core'
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined'
import BookOutlinedIcon from '@material-ui/icons/BookOutlined'
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined'
import HomeIcon from '@material-ui/icons/Home'
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined'
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import TocOutlinedIcon from '@material-ui/icons/TocOutlined'
import { Menu, Child, Menus } from '@/lib/common'
import { LinkBar } from '@/components/molecules'
import { drawerWidth } from '@/lib/util'
import { useRouter } from 'next/router'

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
    nested: {
      paddingLeft: theme.spacing(2),
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
  const [menus, setMenus] = useState<Menus>({
    top: [
      {
        id: 'meeting',
        icon: <MenuBookOutlinedIcon />,
        to: '/mypage/meeting_record',
        text: '会議',
        open: false,
        children: [
          {
            id: 'meeting_index',
            to: '/mypage/meeting_record',
            icon: <TocOutlinedIcon />,
            text: '議事録一覧',
          },
          {
            id: 'meeting_create',
            to: '/mypage/meeting_record/create',
            icon: <LibraryAddOutlinedIcon />,
            text: '議事録追加',
          },
        ],
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
        icon: <AttachFileOutlinedIcon />,
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
  })

  const handleClick = (
    target: Menu,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
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

  const onItem = (to: string) => {
    router.push(to)
  }

  const activeClass = (to: string): boolean => router.asPath == to
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
  }, [])
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
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            メニュー
          </ListSubheader>
        }
      >
        {menus.top.map((menu, i) =>
          menu.children === undefined ? (
            <LinkBar
              key={menu.id + `_${i}`}
              item={menu}
              activeClass={activeClass(menu.to!)}
              onItem={() => onItem(menu.to!)}
            />
          ) : (
            <div key={menu.id + `_${i}`}>
              <ListItem button onClick={handleClick.bind(null, menu)}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.text} />
                {menu.open! ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={menu.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.children !== undefined &&
                    menu.children.map((child) => (
                      <LinkBar
                        key={child.id}
                        item={child}
                        activeClass={activeClass(child.to!)}
                        onItem={() => onItem(child.to!)}
                        isChild
                      />
                    ))}
                </List>
              </Collapse>
            </div>
          )
        )}
      </List>
      <Divider />
      <List>
        {menus.bottom.map((menu: Menu) => (
          <LinkBar
            key={menu.id}
            item={menu}
            activeClass={activeClass(menu.to!)}
            onItem={() => onItem(menu.to!)}
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
