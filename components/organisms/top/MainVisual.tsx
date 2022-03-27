import React, { useState } from 'react'
import lMainVisual from '@/assets/scss/Module/main-visual.module.scss'
import { useFillHeight } from '@/hooks'
import { MainVisualSwiper } from '@/components/molecules/top'

type Props = {
  onFilled?: Function
}

const MainVisual = ({ onFilled }: Props) => {
  const { fillRef, isFilled } = useFillHeight({ onFilled })

  return (
    <div className={lMainVisual.root} ref={fillRef}>
      <div className={lMainVisual.content}>
        <MainVisualSwiper isShow={isFilled} />
      </div>
    </div>
  )
}

export default MainVisual
