import React from 'react'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined'

type Props = {
  className?: any
}

const ChatIcon = ({ className }: Props) => {
  return <SendOutlinedIcon className={className} />
}

export default ChatIcon
