import React, { useRef } from 'react'
import { TopLinedPaper } from '@/components/molecules/top'
import { useAnimationByScroll } from '@/hooks'
import styles from '@/assets/scss/Object/Project/p-point-paper.module.scss'
import clsx from 'clsx'
type Props = {
  id: string
  text: string
  iconPath: string
  index: number
}

const PointPaper = ({ id, text, iconPath, index }: Props) => {
  const ref = useRef(null)
  const { isReached } = useAnimationByScroll({ ref })
  return (
    <div
      ref={ref}
      className={clsx([styles['root'], 'u-animation__pop-up'], {
        ['--reached']: isReached,
      })}
    >
      <TopLinedPaper
        featureId={id}
        iconPath={iconPath}
        text={text}
        zerofill={`0${index}`}
      />
    </div>
  )
}

export default PointPaper
