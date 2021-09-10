import React from 'react'
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined'

type Props = {
  className?: any
}

const TaskIcon = ({ className }: Props) => {
  return <AttachFileOutlinedIcon className={className} />
}

export default TaskIcon
