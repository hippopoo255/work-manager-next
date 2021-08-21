import React, { useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Typography, IconButton, Popover } from '@material-ui/core'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined'

const useStyles = makeStyles((theme: Theme) => ({
  help: {
    color: theme.palette.text.hint,
  },
  helpText: {
    color: theme.palette.text.hint,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: 2,
  },
  popover: {
    pointerEvents: 'none',
  },
  helpPaper: {
    padding: theme.spacing(1),
  },
  item: {
    paddingLeft: theme.spacing(2),
  },
}))

const HelpBox = () => {
  const classes = useStyles()
  const [helpEl, setHelpEl] = useState<HTMLElement | null>(null)
  const handleHelpOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setHelpEl(event.currentTarget)
  }

  const handleHelpClose = () => {
    setHelpEl(null)
  }

  const helpOpen = Boolean(helpEl)

  return (
    <div>
      <Typography
        aria-owns={helpOpen ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handleHelpOpen}
        onMouseLeave={handleHelpClose}
      >
        <IconButton
          color="inherit"
          aria-label="upload picture"
          component="span"
          size="small"
          className={classes.help}
        >
          <HelpOutlineOutlinedIcon />
        </IconButton>
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.helpPaper,
        }}
        open={helpOpen}
        anchorEl={helpEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleHelpClose}
        disableRestoreFocus
      >
        <Typography className={classes.helpText} component={'div'}>
          <p>パスワードの条件</p>
          <ul>
            <li className={classes.item}>条件1: 8文字以上64文字以下</li>
            <li className={classes.item}>
              条件2: ①大文字[A-Z]、②小文字[a-z]、③数字[0-9]を必ず含める
            </li>
            <li className={classes.item}>
              その他使用可能文字：「-（ハイフン）」「_（アンダーバー）」「=（イコール）」「?（クエスチョン）」
            </li>
          </ul>
        </Typography>
      </Popover>
    </div>
  )
}

export default HelpBox
