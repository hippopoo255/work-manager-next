import React, { useState, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// 使いたい機能をインポート
import SwiperCore, { Pagination, Autoplay } from 'swiper'
SwiperCore.use([Autoplay, Pagination])

import styles from '@/assets/scss/Object/Project/p-swiper.module.scss'
import {
  Recommend,
  ColdGradientWall,
  NotificationPanel,
} from '@/components/molecules/top'

type Props = {
  isShow: boolean
}
const MainVisualSwiper = ({ isShow = true }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const contents = useState([Recommend, ColdGradientWall, NotificationPanel])

  const actives = useMemo(
    () =>
      contents.map((content, i) => {
        if (i === 0) {
          return isShow
        } else {
          return i === activeIndex - 1 && isShow
        }
      }),
    [activeIndex]
  )
  const handleChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.activeIndex)
  }

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      onSlideChange={handleChange}
      className={styles.root}
    >
      <SwiperSlide className={styles.item} virtualIndex={100}>
        <Recommend active={actives[0]} />
      </SwiperSlide>
      <SwiperSlide className={styles.item} virtualIndex={101}>
        <NotificationPanel active={actives[1]} />
      </SwiperSlide>
      <SwiperSlide className={styles.item} virtualIndex={102}>
        <ColdGradientWall active={actives[2]} />
      </SwiperSlide>
    </Swiper>
  )
}

export default MainVisualSwiper
