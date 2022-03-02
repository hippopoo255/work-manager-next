import React, { useRef } from 'react'
import styles from '@/assets/scss/Layout/l-minutes-section.module.scss'
import clsx from 'clsx'
import Features from '@/lib/features'
import { FeatureNameTitle, MissionTitle } from '@/components/molecules/top'
import Feature01 from '@/assets/images/minutes_feat01.svg'
import Feature02 from '@/assets/images/minutes_feat02.svg'
import Feature03 from '@/assets/images/minutes_feat03.svg'
import { MeetingRecordIcon } from '@/components/atoms/icons'
import { VerticalPointBox } from '@/components/molecules/top'
import { useAnimationByScroll } from '@/hooks'

const MinutesSection = () => {
  const feature = Features()[0]
  const icons = [
    <Feature01 key="01" width="120" />,
    <Feature02 key="02" width="120" />,
    <Feature03 key="03" width="120" />,
  ]
  const featureTitleRef = useRef(null)
  const { isReached } = useAnimationByScroll({ ref: featureTitleRef })
  return (
    <section className={styles.root} id={feature.to.replace('#', '')}>
      <div className={styles.wrapper}>
        <div className={clsx([styles.content, styles.first])}>
          <div className={styles.title}>
            <MissionTitle index={`01`} mission={feature.mission || ''} />
          </div>
          <div className={styles.description}>{feature.description}</div>
        </div>
        <div className={clsx([styles.content, styles.second])}>
          <div>
            <div className={clsx(styles['feature-title'])}>
              <div
                className={clsx('c-pop-up', {
                  ['--reached']: isReached,
                })}
                ref={featureTitleRef}
              >
                <FeatureNameTitle
                  featureId={feature.id}
                  featureName={feature.name}
                />
              </div>
            </div>
            <ul className={styles.points}>
              {feature.points?.map((point, i) => (
                <li key={`point_${i}`} className={styles['feat-item']}>
                  <VerticalPointBox
                    icon={icons[i]}
                    index={i + 1}
                    pointText={point.text}
                    animation
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            {/* ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。 */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MinutesSection
