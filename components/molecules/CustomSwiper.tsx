import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// 使いたい機能をインポート
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import styles from '@/assets/scss/Module/swiper.module.scss'

SwiperCore.use([Autoplay, Pagination])

type Content = {
  component: JSX.Element
}
type Props = {
  contents: Content[]
}
const CustomSwiper = ({ contents }: Props) => {
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
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      className={styles.root}
    >
      {contents.map((content, index) => (
        <SwiperSlide key={`swiper_${index}`} className={styles.item}>
          {content.component}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CustomSwiper
