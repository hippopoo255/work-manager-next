import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Button, CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useLocale } from '@/hooks'

export type Props = {
  loading: boolean
  submitText?: string
  color: 'default' | 'inherit' | 'primary' | 'secondary'
  variant?: 'contained' | 'outlined' | 'text' | undefined
  disabled: boolean
  onClick?: () => Promise<void>
  options?: {
    [k: string]: boolean | string | any
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    position: 'relative',
  },
  submitBtn: {
    // color: '#fff',
  },
  danger: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
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
  submitText,
  disabled,
  options,
  variant,
}: Props) => {
  const classes = useStyles()
  const { t } = useLocale()
  return (
    <div className={classes.wrap}>
      <Button
        variant={variant}
        color={color}
        className={clsx(classes.submitBtn, {
          [classes.danger]: color === 'inherit',
        })}
        disabled={loading || disabled}
        onClick={() => !!onClick && onClick()}
        {...options}
      >
        {submitText || t.common.save}
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
  color: 'primary',
  variant: 'contained',
  disabled: false,
}

export default CircularButton
