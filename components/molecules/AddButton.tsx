import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Avatar, Tooltip } from '@material-ui/core'
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      margin: theme.spacing(1),
      width: theme.spacing(7),
      height: theme.spacing(7),
      background: 'linear-gradient(135deg,#ED6EA0,#F7186A,#d76264)',
      boxShadow: '0 10px 20px -5px rgb(218 59 31 / 50%)',
      transition: 'all .25s ease-out',
      cursor: 'pointer',
      '&:hover': {
        boxShadow: '0 10px 20px -5px #da3b1f',
      },
    },
  })
)

export type Props = {
  title: string
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const AddButton = ({ title, onClick }: Props) => {
  const classes = useStyles()
  return (
    <Tooltip title={title}>
      <Avatar className={classes.avatar} onClick={(e) => onClick(e)}>
        <NoteAddOutlinedIcon />
      </Avatar>
    </Tooltip>
  )
}

AddButton.propTypes = {
  title: PropTypes.string,
}

AddButton.defaultProps = {
  title: '追加する',
}
export default AddButton
