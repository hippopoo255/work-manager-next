import React from 'react'
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined'

type Props = {
  className?: any
  fontSize?: string
}

const MeetingRecordIcon = ({ className, fontSize }: Props) => {
  return <MenuBookOutlinedIcon style={{ fontSize }} className={className} />
}

export default MeetingRecordIcon
