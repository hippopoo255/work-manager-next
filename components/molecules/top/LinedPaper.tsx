import React from 'react'
import styles from '@/assets/scss/Object/Project/p-lined-paper.module.scss'
import clsx from 'clsx'
type Props = {
  text: string
  isPopup?: boolean
  children?: React.ReactNode
}

const LinedPaper = ({ text, isPopup = true, children = null }: Props) => {
  return (
    <div
      className={clsx(styles.root, {
        ['c-animation__pop-up']: isPopup,
        ['--reached']: isPopup,
        ['--delay-2']: isPopup,
      })}
    >
      <div className={styles.line}></div>
      {children || ''}
      <p className={styles.text}>{text}</p>
    </div>
  )
}

export default LinedPaper
