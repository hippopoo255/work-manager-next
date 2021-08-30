import React, { useState, useMemo } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Collapse, Tooltip } from '@material-ui/core'
import { COLLAPSE_COUNT } from '@/lib/util'
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined'
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    collapse: {
      position: 'relative',
      paddingBottom: theme.spacing(5),
      transition: theme.transitions.create('min-height', {
        duration: theme.transitions.duration.standard,
      }),
    },
    expander: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      display: 'block',
      width: '100%',
      height: theme.spacing(5),
      padding: theme.spacing(1),
      background:
        'linear-gradient(rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, .7) 20%, rgba(255, 255, 255, 1) 80%)',
      zIndex: 1,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      cursor: 'pointer',
    },
  })
)

type Props = {
  children: React.ReactNode
  maxCount: number
  rowSize?: number
  step?: number
}

const MoreExpander = ({
  children,
  maxCount,
  rowSize = 65,
  step = 3,
}: Props) => {
  const classes = useStyles()
  const [checked, setChecked] = useState(false)
  const [count, setCount] = useState<number>(COLLAPSE_COUNT)
  const collapseSize = useMemo(() => (count + 1) * rowSize, [count])

  const handleChange = () => {
    if (checked) {
      setChecked((prev) => !prev)
      setCount(COLLAPSE_COUNT)
    } else if (count + step >= maxCount) {
      setChecked((prev) => !prev)
      setCount(maxCount)
    } else {
      setCount((prev) => prev + step)
    }
  }

  return (
    <Collapse
      in={checked}
      collapsedSize={collapseSize}
      className={classes.collapse}
    >
      <Tooltip title={checked ? '元に戻す' : 'さらに表示'}>
        <div className={classes.expander} onClick={handleChange}>
          {checked ? (
            <KeyboardArrowUpOutlinedIcon />
          ) : (
            <KeyboardArrowDownOutlinedIcon />
          )}
        </div>
      </Tooltip>
      {children}
    </Collapse>
  )
}

export default MoreExpander
