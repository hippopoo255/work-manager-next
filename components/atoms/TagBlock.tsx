import React, { useMemo } from 'react'
import { Tag } from '@/interfaces/graphql/generated/graphql'
import { Button } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 48,
    padding: 4,
    lineHeight: 1.2,
    fontSize: theme.typography.caption.fontSize,
  },
  disableClick: {
    '&.MuiButton-contained': {
      color: theme.palette.background.paper,
      fontWeight: 'bold',
      backgroundColor: theme.palette.text.disabled,
      borderColor: theme.palette.action.disabled,
    },
    '&.MuiButton-outlined': {
      color: theme.palette.text.disabled,
      borderColor: theme.palette.action.disabled,
    },
  },
}))

type Props = {
  onClick?: (id: Tag['id']) => void
  tag: Tag
}

const TagBlock = ({ onClick, tag }: Props) => {
  const classes = useStyles()

  const handleClick = () => {
    if (onClick !== undefined) {
      onClick(tag.id)
    }
  }

  const linkable = useMemo(() => !!onClick, [onClick])
  return (
    <>
      <Button
        variant={linkable ? 'outlined' : 'contained'}
        color={'primary'}
        disabled={!linkable}
        className={classes.root}
        classes={{
          disabled: classes.disableClick,
        }}
        onClick={handleClick}
      >
        {tag.name}
      </Button>
    </>
  )
}

export default TagBlock
