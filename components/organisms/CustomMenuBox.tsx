import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'

type Props = {
  options: {
    text: string
    onClick: (id: number) => void
  }[]
  id: number
}

const ITEM_HEIGHT = 48

const CustomMenuBox = ({ options, id }: Props) => {
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
      >
        <MoreVertIcon />
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
            width: '20ch',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={`menu_${index}`}
            onClick={() => handleMenuClick(index)}
          >
            {option.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default CustomMenuBox
