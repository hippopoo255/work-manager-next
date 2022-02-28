import React, { useState } from 'react'
import { CustomSwiper } from '@/components/molecules'
import lMainVisual from '@/assets/scss/Layout/l-main-visual.module.scss'
import { useFillHeight } from '@/hooks'
import {
  Introduction,
  FeaturesPanel,
  NotificationPanel,
} from '@/components/molecules/top'

const MainVisual = () => {
  const { fillRef } = useFillHeight()
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
  })

  const contents = [
    {
      component: <Introduction />,
    },
    {
      component: <FeaturesPanel />,
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
