import React from 'react'
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined'

type Props = {
  className?: any
}
const ScheduleIcon = ({ className }: Props) => {
  return <EventAvailableOutlinedIcon className={className} />
}

export default ScheduleIcon
