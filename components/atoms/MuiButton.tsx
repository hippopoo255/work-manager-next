import React from 'react'
import styles from '@/assets/stylesheets/components/MuiButton.module.scss'
import {Button, ButtonProps} from '@material-ui/core'

interface Props extends ButtonProps {
  label: string
}

const MuiButton: React.FC<Props> = ({label, variant, color}: Props) => {
  return (
    <Button variant={variant} color={color}>
      {label}
    </Button>
  )
}

export default MuiButton
