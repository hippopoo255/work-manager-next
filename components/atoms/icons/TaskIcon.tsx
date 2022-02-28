import React from 'react'
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined'

type Props = {
  className?: any
  fontSize?: string
}

const TaskIcon = ({ className, fontSize }: Props) => {
  return <AttachFileOutlinedIcon style={{ fontSize }} className={className} />
}

export default TaskIcon
