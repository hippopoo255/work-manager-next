import React from 'react'
import styles from '@/assets/scss/Layout/l-base-section.module.scss'
import clsx from 'clsx'
import Features from '@/lib/features'
import { MissionTitle } from '@/components/molecules/top'

type Props = {
  index: number
  icon: JSX.Element
}

const ScheduleSection = ({ index, icon }: Props) => {
  const feature = Features()[index]
  return (
    <div
      className={clsx(styles.root, {
        [styles.even]: index % 2 !== 0,
      })}
    >
      <div className={clsx([styles.inner, styles.first, styles[feature.id]])}>
        <div className={clsx([styles['central-icon']])}>
          <div className={clsx(['p-rhombus', feature.id])}>
            <div className={clsx(['bg', feature.id])}></div>
            {icon}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles['title-wrap']}>
            <MissionTitle
              mission={feature.mission || ''}
              index={`0${index + 1}`}
            />
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
        <div className={styles.body}>
          <ul className={styles.points}>
            <li className={styles.point}>
              <div className={'p-white-panel'}>
                <h4 className={clsx(['p-white-panel__title', feature.id])}>
                  <span>POINT</span>
                  <span className="p-white-panel__title-index">01</span>
                </h4>
                <p className="p-white-panel__body">
                  他のユーザーとスケジュールを共有できる
                </p>
              </div>
            </li>
            <li className={styles.point}>
              <div className={'p-white-panel'}>
                <h4 className="p-white-panel__title schedule">
                  <span>POINT</span>
                  <span className="p-white-panel__title-index">02</span>
                </h4>
                <p className="p-white-panel__body">
                  共有相手の編集権限や、共有していないユーザーに対する公開設定ができる
                </p>
              </div>
            </li>
            <li className={styles.point}>
              <div className={'p-white-panel'}>
                <h4 className="p-white-panel__title schedule">
                  <span>POINT</span>
                  <span className="p-white-panel__title-index">03</span>
                </h4>
                <p className="p-white-panel__body">
                  当日のスケジュールを毎朝メールでアラート
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ScheduleSection
