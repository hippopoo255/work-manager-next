import React from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

type Props = {
  fontSize?: string
  className?: any
}

const Signupcon = ({ className, fontSize = '1.5rem' }: Props = {}) => {
  return <LockOutlinedIcon style={{ fontSize }} className={className} />
}

export default Signupcon
