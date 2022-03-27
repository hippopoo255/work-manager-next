import React, { useRef } from 'react'
import styles from '@/assets/scss/Module/two-tone-section.module.scss'
import clsx from 'clsx'
import Features from '@/lib/features'
import {
  FeatureNameTitle,
  MissionTitle,
  PointPaper,
} from '@/components/molecules/top'
import { useAnimationByScroll } from '@/hooks'

type Props = {
  index: number
  pointIcons: string[]
}

const TwoToneSection = ({ index, pointIcons }: Props) => {
  const feature = Features()[index]
  const featureTitleRef = useRef(null)
  const { isReached } = useAnimationByScroll({ ref: featureTitleRef })

  return (
    <section
      className={clsx(styles.root, {
        [styles.even]: index % 2 !== 0,
      })}
      id={feature.to.replace('#', '')}
    >
      <div className={clsx([styles.inner, styles.first, styles[feature.id]])}>
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
          <div
            className={clsx('u-animation__pop-up', {
              ['--reached']: isReached,
            })}
            ref={featureTitleRef}
          >
            <FeatureNameTitle
              featureId={feature.id}
              featureName={feature.name}
            />
          </div>
          <ul className={styles.points}>
            {feature.points?.map((point, index) => (
              <li className={styles.point} key={`point_${index}`}>
                <PointPaper
                  iconPath={pointIcons[index]}
                  text={point.text}
                  id={feature.id}
                  index={index + 1}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default TwoToneSection
