import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

export type Prop = {
  children: React.ReactNode
}

const PaperTitle = ({ children }: Prop) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  )
}

PaperTitle.propTypes = {
  children: PropTypes.node,
}

export default PaperTitle
