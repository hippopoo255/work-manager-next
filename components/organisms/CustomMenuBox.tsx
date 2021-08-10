import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import clsx from 'clsx'
import { makeStyles, Theme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

type Props = {
  options: {
    text: string
    onClick: (id: number) => void
    disabled?: boolean
    danger?: boolean
  }[]
  id: number
  small: boolean
  horizon: boolean
}

const ITEM_HEIGHT = 48

const useStyles = makeStyles((theme: Theme) => ({
  small: {
    fontSize: theme.typography.body2.fontSize,
    minHeight: theme.spacing(4),
  },
  danger: {
    color: theme.palette.error.main,
    fontWeight: theme.typography.fontWeightBold,
  },
  disabled: {
    pointerEvents: 'none',
    color: theme.palette.action.disabled,
    fontWeight: theme.typography.fontWeightMedium,
  },
}))

const CustomMenuBox = ({ options, small, horizon, id }: Props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuClick = (index: number) => {
    setAnchorEl(null)
    options[index].onClick(id)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size={small ? 'small' : 'medium'}
      >
        {horizon ? <MoreHorizIcon /> : <MoreVertIcon />}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            minWidth: '20ch',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={`menu_${index}`}
            onClick={() => handleMenuClick(index)}
            className={clsx({
              [classes.small]: small,
              [classes.danger]:
                option.danger === undefined ? false : option.danger,
              [classes.disabled]:
                option.disabled === undefined ? false : option.disabled,
            })}
          >
            {option.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

CustomMenuBox.propTypes = {
  small: PropTypes.bool,
  horizon: PropTypes.bool,
}

CustomMenuBox.defaultProps = {
  small: false,
  horizon: false,
}

export default CustomMenuBox
