import React, { useState } from 'react'
import { CustomSwiper } from '@/components/molecules'
import lMainVisual from '@/assets/scss/Layout/l-main-visual.module.scss'
import { useFillHeight } from '@/hooks'
import {
  Introduction,
  Recommend,
  ColdGradientWall,
  AboutAllFeatures,
  NotificationPanel,
} from '@/components/molecules/top'

const MainVisual = () => {
  const { fillRef } = useFillHeight()

  const contents = [
    {
      component: <Recommend />,
    },
    {
      component: <ColdGradientWall />,
    },
    {
      component: <NotificationPanel />,
    },
  ]
  return (
    <div className={lMainVisual.root} ref={fillRef}>
      <div className={lMainVisual.content}>
        <CustomSwiper contents={contents} />
      </div>
    </div>
  )
}

export default MainVisual
