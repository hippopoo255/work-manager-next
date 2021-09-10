import React from 'react'
import clsx from 'clsx'
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles'
import { IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core'
import { Title } from '@/components/atoms'
import DeleteIcon from '@material-ui/icons/Delete'

interface EnhancedTableToolbarProps {
  numSelected: number
  onTrash: any
  title: string
  multiSelect: boolean
  children: React.ReactNode
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.error.main,
            backgroundColor: lighten(theme.palette.error.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flexGrow: 0,
    },
    simpleColor: {
      background: '#404040',
      color: '#ffffff',
      '&:hover': {
        background: lighten('#404040', 0.2),
      },
    },
  })
)

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles()
  const { numSelected, onTrash, title, multiSelect, children } = props
  const isHighlight = multiSelect && numSelected > 0
  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: isHighlight,
        })}
      >
        {isHighlight ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <div className={classes.title}>
            <Title>{title}</Title>
          </div>
        )}
        {isHighlight && (
          <Tooltip title="削除する">
            <IconButton aria-label="delete" onClick={() => onTrash()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <div>{children}</div>
    </>
  )
}

export default EnhancedTableToolbar
