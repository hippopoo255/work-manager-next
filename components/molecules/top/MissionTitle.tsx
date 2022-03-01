import React from 'react'
import styles from '@/assets/scss/Object/Project/p-mission-title.module.scss'

type Props = {
  index: string
  mission: string
}
const MissionTitle = ({ index, mission }: Props) => {
  return (
    <h3 className={styles.mission}>
      <div>
        <span className={styles['main-title']}>{`FEATURE`}</span>
        <span className={styles['sub-title']}>{mission}</span>
      </div>
      <div className={styles.fixed}>
        <span className={styles.index}>{index}</span>
      </div>
    </h3>
  )
}

export default MissionTitle
