import React from 'react'
import styles from '@/assets/scss/Object/Component/c-filled-loader.module.scss'
import clsx from 'clsx'

type Props = {
  loading: boolean
}

const FilledLoader = ({ loading }: Props) => {
  return (
    <div
      className={clsx(styles.root, {
        [styles.hidden]: !loading,
      })}
    >
      <span className={styles.loader}>
        <span className={styles['loader-inner']}></span>
      </span>
    </div>
  )
}

export default FilledLoader
