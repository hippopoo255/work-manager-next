import React from 'react'
import {
  List,
  ListItem,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
} from '@material-ui/core'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import Router from 'next/router'
import { CustomMenuBox } from '@/components/organisms'
import PropTypes from 'prop-types'

export type Props = {
  title: string
  icon: React.ReactNode
  classes: any
  onEdit: any
  onTrash: any
  editable: boolean
}

const ChatDetailTitle = ({
  title,
  icon,
  classes,
  onEdit,
  onTrash,
  editable,
}: Props) => {
  const menuList = [
    {
      text: 'チャットルームを編集',
      onClick: (id: number) => onEdit(id),
      disabled: !editable,
    },
    {
      text: 'チャットルームを削除',
      onClick: (id: number) => onTrash(id),
      disabled: !editable,
      danger: true,
    },
  ]

  return (
    <div className={classes.top}>
      <List className={classes.titleList}>
        <Tooltip title="設定">
          <IconButton
            className={classes.allow}
            onClick={() => Router.back()}
            size={'small'}
          >
            <ArrowBackOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Typography component={'h2'} className={classes.titleMain}>
          <Avatar>{icon}</Avatar>
          <span>{title}</span>
        </Typography>
        <CustomMenuBox options={menuList} id={1} small />
      </List>
    </div>
  )
}

ChatDetailTitle.propTypes = {
  editable: PropTypes.bool,
}

ChatDetailTitle.defaultProps = {
  editable: false,
}

export default ChatDetailTitle
