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
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import HomeIcon from '@material-ui/icons/Home'
import { Menu, Child, Menus, sidebarMenus } from '@/lib/sidebar'
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
  const [menus, setMenus] = useState<Menus>({ ...sidebarMenus })

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
          menu.children === undefined
            ? menu.disabled === undefined && (
                <LinkBar
                  key={menu.id + `_${i}`}
                  item={menu}
                  activeClass={activeClass(menu.to!)}
                  onItem={() => onItem(menu.to!)}
                />
              )
            : menu.disabled === undefined && (
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
