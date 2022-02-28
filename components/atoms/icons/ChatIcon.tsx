import React from 'react'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined'

type Props = {
  className?: any
  fontSize?: string
}

const ChatIcon = ({ className, fontSize }: Props) => {
  return <SendOutlinedIcon style={{ fontSize }} className={className} />
}

export default ChatIcon
