import React, { useState } from 'react'
import {
  List,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
} from '@material-ui/core'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'
import Router from 'next/router'
import { CustomMenuBox } from '@/components/organisms'
import PropTypes from 'prop-types'
import { ChatRoom } from '@/interfaces/models'
import { ConfirmDialog } from '@/components/organisms'
import router from 'next/router'

export type Props = {
  chatRoom: ChatRoom | null
  onEdit: Function
  icon: React.ReactNode
  classes: any
  editable: boolean
  deleteChatRoom: () => Promise<null>
}

const ChatDetailTitle = ({
  chatRoom,
  onEdit,
  icon,
  classes,
  editable,
  deleteChatRoom,
}: Props) => {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  // チャットルーム削除
  const handleConfirm = () => {
    setConfirmOpen(true)
  }
  const handleDelete = async () => {
    setConfirmLoading(true)
    await deleteChatRoom().then(() => {
      setConfirmLoading(false)
      setConfirmOpen(false)
      router.push('/mypage/chat')
    })
  }

  const menuList = [
    {
      text: 'チャットルームを編集',
      onClick: (id?: number | string) => onEdit(),
      disabled: !editable,
    },
    {
      text: 'チャットルームを削除',
      onClick: (id?: number | string) => handleConfirm(),
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
          <span>{!!chatRoom ? chatRoom.name : ''}</span>
        </Typography>
        <CustomMenuBox options={menuList} id={1} small />
      </List>
      <ConfirmDialog
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onExec={handleDelete}
        loading={confirmLoading}
        isCircular
      />
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
