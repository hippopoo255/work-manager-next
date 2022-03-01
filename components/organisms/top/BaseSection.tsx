import React from 'react'
import styles from '@/assets/scss/Layout/l-base-section.module.scss'
import clsx from 'clsx'
import Features from '@/lib/features'
import { MissionTitle } from '@/components/molecules/top'
import ScheduleFeat01Icon from '@/assets/images/schedule_feat01.svg'
import { featuresIcon } from '@/assets/images'

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
      <div className={clsx([styles.inner, styles.first, styles[feature.id]])}>
        {/* <div className={clsx([styles['central-icon']])}>
          <div className={clsx(['p-rhombus', feature.id])}>
            <div className={clsx(['bg', feature.id])}></div>
            {icon}
          </div>
        </div> */}
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
        <div className={styles.body}>
          <h3 className={styles['feature-name']}>
            <span
              className={styles['feature-name-text']}
              data-subja={feature.name}
            >
              {feature.id[0].toLocaleUpperCase() + feature.id.slice(1)}
            </span>
          </h3>
          <ul className={styles.points}>
            {feature.points?.map((point, index) => (
              <li className={styles.point} key={`point_${index}`}>
                <div className={styles['panel-wrap']}>
                  <div className={'p-panel'}>
                    <h4 className={clsx(['p-panel__title', feature.id])}>
                      <span>POINT</span>
                      <span className="p-panel__title-index">{`0${
                        index + 1
                      }`}</span>
                      <div
                        className={clsx(['p-panel__title-line', feature.id])}
                      ></div>
                    </h4>
                    <div className="u-text-center">{point.icon}</div>
                    <p className="p-panel__body">{point.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BaseSection
