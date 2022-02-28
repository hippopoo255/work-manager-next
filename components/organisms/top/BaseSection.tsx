import React from 'react'
import styles from '@/assets/scss/Layout/l-base-section.module.scss'
import clsx from 'clsx'
import Features from '@/lib/features'

type Props = {
  index: number
  icon: JSX.Element
}

const BaseSection = ({ index, icon }: Props) => {
  const feature = Features()[index]
  return (
    <div
      className={clsx(styles.root, {
        [styles.even]: index % 2 !== 0,
      })}
    >
      <div className={clsx([styles.inner, styles.first])}>
        <div className={styles.content}>
          <div>
            <h3 className={styles.mission}>
              <div>
                <span className={styles['main-title']}>{`MISSION`}</span>
                <span className={styles['sub-title']}>{feature.mission}</span>
              </div>
              <div className={styles.fixed}>
                <span className={styles.index}>{`0${index + 1}`}</span>
              </div>
            </h3>
          </div>
          <div className={styles.description}>{feature.description}</div>
        </div>
      </div>
      <div className={clsx([styles.inner, styles.second, styles[feature.id]])}>
        <h3 className={styles['feature-name']}>
          <span
            className={styles['feature-name-text']}
            data-subja={feature.name}
          >
            {feature.id[0].toLocaleUpperCase() + feature.id.slice(1)}
          </span>
        </h3>
      </div>
      <div className={clsx([styles['central-icon']])}>
        <div className={clsx(['p-rhombus', feature.id])}>
          <div className={clsx(['bg', feature.id])}></div>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default BaseSection
