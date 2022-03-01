import React from 'react'
import base from '@/assets/scss/Layout/l-base-section.module.scss'
import styles from '@/assets/scss/Layout/l-minutes-section.module.scss'
import clsx from 'clsx'
import Features from '@/lib/features'
import { MissionTitle } from '@/components/molecules/top'
import { FeatGreenIcon } from '@/components/atoms/top'
import Feature01 from '@/assets/images/minutes_feat01.svg'
import Feature02 from '@/assets/images/minutes_feat02.svg'
import Feature03 from '@/assets/images/minutes_feat03.svg'

type Props = {
  index: number
  icon: JSX.Element
}

const MinutesSection = ({ index, icon }: Props) => {
  const feature = Features()[index]
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={clsx([styles.content, styles.first])}>
          <div className={styles.title}>
            <MissionTitle
              index={`0${index + 1}`}
              mission={feature.mission || ''}
            />
          </div>
          <div className={styles.description}>{feature.description}</div>
        </div>
        <div className={clsx([styles.content, styles.second])}>
          <div>
            <ul className={styles.points}>
              <li className={styles['feat-item']}>
                <div className={styles['feat-item__inner']}>
                  <h4 className={styles['feat-title']}>POINT 01</h4>
                  <FeatGreenIcon>
                    <Feature01 width="120" />
                  </FeatGreenIcon>
                  <div className={styles['feat-description']}>
                    追加フォームからステップに沿って入力
                  </div>
                </div>
                <span className={styles['feat-item-divider']}></span>
              </li>
              <li className={styles['feat-item']}>
                <div className={styles['feat-item__inner']}>
                  <h4 className={styles['feat-title']}>POINT 02</h4>
                  <FeatGreenIcon>
                    <Feature02 width="120" />
                  </FeatGreenIcon>
                  <div className={styles['feat-description']}>
                    絞込機能で月別や自分が参加した会議のみを一覧できる
                  </div>
                </div>
                <span className={styles['feat-item-divider']}></span>
              </li>
              <li className={styles['feat-item']}>
                <div className={styles['feat-item__inner']}>
                  <h4 className={styles['feat-title']}>POINT 03</h4>
                  <FeatGreenIcon>
                    <Feature03 width="120" />
                  </FeatGreenIcon>
                  <div className={styles['feat-description']}>
                    議事録を新規追加すると、参加メンバーにメールでアラート
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            {/* ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。 */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MinutesSection
