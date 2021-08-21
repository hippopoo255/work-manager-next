import React from 'react'
import Link from 'next/link'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import clsx from 'clsx'
import { makeStyles, Theme } from '@material-ui/core/styles'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import { Menu } from '@/lib/sidebar'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  active: {
    background: theme.palette.action.selected,
    pointerEvents: 'none',
  },
  nested: {
    paddingLeft: 40,
    color: theme.palette.text.secondary,
  },
  nestedActive: {
    color: theme.palette.text.primary,
  },
  subIcon: {
    color: theme.palette.text.hint,
  },
  subIconActive: {
    color: theme.palette.text.secondary,
  },
}))

type OnItem = {
  (param: string): void
}

interface Props {
  activeClass: boolean
  item: Menu
  onItem: OnItem
  isChild?: boolean
}

const LinkBar = ({ item, activeClass, onItem, isChild }: Props) => {
  const classes = useStyles()

  const handleLink = (to: string | undefined, e: React.SyntheticEvent) => {
    e.preventDefault()
    if (to !== undefined) {
      onItem(to)
    }
  }

  return (
    <Link href={item.to!} passHref>
      <ListItem
        button
        component="a"
        color="inherit"
        className={clsx(classes.root, {
          [classes.active]: activeClass,
          [classes.nestedActive]: !!isChild && activeClass,
          [classes.nested]: !!isChild,
        })}
        onClick={handleLink.bind(null, item.to)}
      >
        <ListItemIcon
          className={clsx({
            [classes.subIconActive]: !!isChild && activeClass,
            [classes.subIcon]: !!isChild,
          })}
        >
          {item.icon || <InboxIcon />}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    </Link>
  )
}

export default LinkBar
