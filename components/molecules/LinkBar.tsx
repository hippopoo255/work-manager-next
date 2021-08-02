import React from 'react'
import { Link, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import InboxIcon from '@material-ui/icons/MoveToInbox'

const useStyles = makeStyles({
  root: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  active: {
    background: 'rgba(0,0,0,0.04)',
    pointerEvents: 'none',
  },
})

type OnItem = {
  (param: string): void
}

type Item = {
  id: string
  to: string
  icon: any
  text: string
}

interface Props {
  activeClass: boolean
  item: Item
  onItem: OnItem
}

const LinkBar = ({ item, activeClass, onItem }: Props) => {
  const classes = useStyles()

  const handleLink = (to: string, e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(to)
    onItem(to)
  }

  return (
    <Link
      component="li"
      href={item.to}
      onClick={handleLink.bind(null, item.to)}
      color="inherit"
      className={clsx(classes.root, {
        [classes.active]: activeClass,
      })}
    >
      <ListItem button>
        <ListItemIcon>{item.icon || <InboxIcon />}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    </Link>
  )
}

export default LinkBar
