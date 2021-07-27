import React from 'react'
import {Button, ButtonProps} from '@material-ui/core'
import PropTypes from 'prop-types'

interface Prop extends ButtonProps {
  label?: string
}

const MuiButton: React.FC<Prop> = (props: Prop) => {
  return (
    <Button variant={props.variant} color={props.color}>
      {props.label}
    </Button>
  )
}

MuiButton.defaultProps = {
  label: 'Button',
  variant: 'contained',
  color: 'primary'
}

export default MuiButton
