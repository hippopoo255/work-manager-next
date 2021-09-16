import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { makeStyles, Theme } from '@material-ui/core/styles'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import { Menu } from '@/lib/sidebar'
import Badge from '@material-ui/core/Badge'
import { ChildLinkBar } from '@/components/molecules'
import { useRouter } from 'next/router'
import { customColor } from '@/assets/color/basic'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    paddingLeft: 20,
    paddingRight: 22,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  active: {
    background: theme.palette.action.selected,
    pointerEvents: 'none',
  },
  badge: {
    '& .MuiBadge-badge': {
      backgroundColor: customColor.red,
    },
  },
  iconRoot: {
    minWidth: 45,
  },
}))

type OnItem = {
  (param: Menu): void
}

interface Props {
  item: Menu
  onItem: OnItem
  isChild?: boolean
}

const LinkBar = ({ item, onItem, isChild }: Props) => {
  const classes = useStyles()
  const router = useRouter()
  const activeClass = (to?: string): boolean => {
    return !!to ? router.pathname == to : false
  }

  const handleLink = (target: Menu, e: React.SyntheticEvent) => {
    e.preventDefault()
    onItem(target)
  }

  const handleChildClick = (to: string) => {
    router.push(to)
  }
  return (
    <Link href={!!item.to ? item.to : '/mypage'} passHref>
      <a>
        <ListItem
          button
          component="li"
          color="inherit"
          className={clsx(classes.root, {
            [classes.active]: activeClass(item.to),
          })}
          onClick={handleLink.bind(null, item)}
        >
          <Tooltip title={item.text}>
            <ListItemIcon classes={{ root: classes.iconRoot }}>
              {!!item.is_notify ? (
                <Badge color="default" variant="dot" className={classes.badge}>
                  {item.icon || <InboxIcon />}
                </Badge>
              ) : (
                item.icon || <InboxIcon />
              )}
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary={item.text} />
          {!!item.children && (!!item.open ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {item.children !== undefined && (
          <Collapse in={item.open!} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ChildLinkBar
                  key={`child_${child.id}`}
                  child={child}
                  activeClass={activeClass(child.to)}
                  onItem={handleChildClick}
                />
              ))}
            </List>
          </Collapse>
        )}
      </a>
    </Link>
  )
}

export default LinkBar
