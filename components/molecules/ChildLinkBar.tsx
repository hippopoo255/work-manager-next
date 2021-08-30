import React from 'react'
import Link from 'next/link'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import clsx from 'clsx'
import { makeStyles, Theme } from '@material-ui/core/styles'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import { Child } from '@/lib/sidebar'
import Badge from '@material-ui/core/Badge'
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(3),
    color: theme.palette.text.secondary,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  active: {
    background: theme.palette.action.selected,
    color: theme.palette.text.primary,
    pointerEvents: 'none',
  },
  iconRoot: {
    minWidth: theme.spacing(5),
  },
  icon: {
    color: theme.palette.text.hint,
  },
  iconActive: {
    color: theme.palette.text.secondary,
  },
  badge: {
    '& .MuiBadge-badge': {
      backgroundColor: '#f50057',
    },
  },
}))

type OnItem = {
  (param: string): void
}

interface Props {
  activeClass: boolean
  child: Child
  onItem: OnItem
}

const ChildLinkBar = ({ child, onItem, activeClass }: Props) => {
  const classes = useStyles()

  const handleLink = (to: string | undefined, e: React.SyntheticEvent) => {
    e.preventDefault()
    if (to !== undefined) {
      onItem(to)
    }
  }

  return (
    <Link href={child.to!} passHref>
      <ListItem
        button
        component="a"
        color="inherit"
        className={clsx(classes.root, {
          [classes.active]: activeClass,
        })}
        onClick={handleLink.bind(null, child.to)}
      >
        <ListItemIcon
          className={clsx(classes.iconActive, {
            [classes.iconActive]: activeClass,
          })}
          classes={{ root: classes.iconRoot }}
        >
          {!!child.is_notify ? (
            <Badge color="default" variant="dot" className={classes.badge}>
              {child.icon || <InboxIcon />}
            </Badge>
          ) : (
            child.icon || <InboxIcon />
          )}
        </ListItemIcon>
        <ListItemText primary={child.text} />
      </ListItem>
    </Link>
  )
}

export default ChildLinkBar
