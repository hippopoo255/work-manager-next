import React, { useRef, useCallback } from 'react'
import { FeatGreenIcon } from '@/components/atoms/top'
import styles from '@/assets/scss/Module/vertical-point-box.module.scss'
import { useAnimationByScroll } from '@/hooks'
import clsx from 'clsx'

type Props = {
  icon: string
  index?: number
  pointText: string
  animation?: boolean
}

const VerticalPointBox = ({
  icon,
  index,
  pointText,
  animation = false,
}: Props) => {
  const ref = useRef(null)
  const { isReached } = useAnimationByScroll({ ref })

  return (
    <div
      className={clsx([styles['root']], {
        ['u-animation__pop-up']: animation,
        ['--reached']: isReached,
      })}
      ref={ref}
    >
      <h4 className={styles['title']}>{`POINT 0${index || 0}`}</h4>
      <FeatGreenIcon iconPath={icon} />
      <div className={styles['description']}>{pointText}</div>
    </div>
  )
}

export default VerticalPointBox
