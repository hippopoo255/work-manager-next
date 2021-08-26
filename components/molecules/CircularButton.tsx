import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Button, CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import clsx from 'clsx'

export type Props = {
  loading: boolean
  submitText: string
  color: 'default' | 'inherit' | 'primary' | 'secondary'
  disabled: boolean
  onClick: () => Promise<void>
  options?: {
    [k: string]: boolean
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    position: 'relative',
  },
  submitBtn: {
    color: '#fff',
  },
  danger: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const CircularButton = ({
  loading,
  onClick,
  color,
  submitText = '保存',
  disabled,
  options,
}: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.wrap}>
      <Button
        variant="contained"
        color={color}
        className={clsx(classes.submitBtn, {
          [classes.danger]: color === 'inherit',
        })}
        disabled={loading || disabled}
        onClick={() => onClick()}
        {...options}
      >
        {submitText}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  )
}

CircularButton.propTypes = {
  submitText: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
}

CircularButton.defaultProps = {
  submitText: '保存',
  color: 'primary',
  disabled: false,
}

export default CircularButton
