import React, { useEffect, useState } from 'react'

type Props = {
  ref: React.RefObject<any>
}

const useAnimationByScroll = ({ ref }: Props) => {
  const [isReached, setIsReached] = useState<boolean>(false)
  const [range, setRange] = useState<null | number>(null)
  const MAX_HEIGHT = 50
  const handleShow = () => {
    if (!ref.current) {
      return false
    }

    if (range === null) {
      // ページ最上部から要素までの距離
      const remain = ref.current.getBoundingClientRect().top
      // 要素の上端がデバイスの高さの10分の１にかかったらアニメーションを発生させたい
      const relatedToDeviceHeight = window.innerHeight / 10
      const halfHeight =
        relatedToDeviceHeight > MAX_HEIGHT ? MAX_HEIGHT : relatedToDeviceHeight
      setRange(remain + halfHeight)
    }
    // 現在の距離 = スクロールの量 + デバイスの高さ
    const scroll = window.pageYOffset || document.documentElement.scrollTop
    const currentPosition = scroll + window.innerHeight

    if (range !== null && currentPosition > range) {
      setIsReached(true)
    }
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      window.addEventListener('scroll', handleShow)
    }
    return () => {
      window.removeEventListener('scroll', handleShow)
      isMounted = false
    }
  }, [range])

  return {
    isReached,
  }
}

export default useAnimationByScroll
