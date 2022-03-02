import React, { useRef } from 'react'
import { TopLinedPaper } from '@/components/molecules/top'
import { useAnimationByScroll } from '@/hooks'
import styles from '@/assets/scss/Object/Project/p-point-paper.module.scss'
import clsx from 'clsx'
type Props = {
  id: string
  text: string
  icon: any
  index: number
}

const PointPaper = ({ id, text, icon, index }: Props) => {
  const ref = useRef(null)
  const { isReached } = useAnimationByScroll({ ref })
  return (
    <div
      ref={ref}
      className={clsx(styles['root'], {
        [styles['scale']]: isReached,
      })}
    >
      <TopLinedPaper
        featureId={id}
        icon={icon}
        text={text}
        zerofill={`0${index}`}
      />
    </div>
  )
}

export default PointPaper
