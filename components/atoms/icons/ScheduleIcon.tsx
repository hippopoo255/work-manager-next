import React from 'react'
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined'

type Props = {
  className?: any
  fontSize?: string
}
const ScheduleIcon = ({ className, fontSize }: Props) => {
  return (
    <EventAvailableOutlinedIcon style={{ fontSize }} className={className} />
  )
}

export default ScheduleIcon
