import React from 'react'
import styles from '@/assets/scss/Module/lined-paper.module.scss'
import clsx from 'clsx'
type Props = {
  text: string
  isPopup?: boolean
  animationStart?: boolean
  children?: React.ReactNode
}

const LinedPaper = ({
  text,
  isPopup = true,
  animationStart = true,
  children = null,
}: Props) => {
  return (
    <div
      className={clsx(styles.root, {
        ['u-animation__pop-up']: isPopup,
        ['--reached']: animationStart,
        ['--delay-1500']: isPopup,
      })}
    >
      <div className={styles.line}></div>
      {children || ''}
      <p className={styles.text}>{text}</p>
    </div>
  )
}

export default LinedPaper
