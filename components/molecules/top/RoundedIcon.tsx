import React from 'react'
import { Avatar, makeStyles, Theme } from '@material-ui/core'
import { linerGradient } from '@/assets/color/gradient'
import clsx from 'clsx'
import styles from '@/assets/scss/Object/Component/c-rounded-icon.module.scss'
import { id } from 'date-fns/locale'

type Props = {
  color?: string
  icon: JSX.Element | React.ReactNode
  sizes?: {
    width: string | number
    height: string | number
  }
  text?: string
  id?: string
}

const RoundedIcon = ({ color, text, icon, id, sizes }: Props) => {
  const modifier = !!id ? id : ''
  const defaultClass = [styles.root, styles[modifier]]
  const classes = clsx(defaultClass)

  return (
    <div className={classes} style={{ ...sizes }}>
      {icon}
      {!!text && <span className={styles.text}>{text}</span>}
    </div>
  )
}

export default RoundedIcon
