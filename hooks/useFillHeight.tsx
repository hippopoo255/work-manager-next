import React, { useEffect, useRef } from 'react'
type Props = {
  diff?: number
}
const useFillHeight = ({ diff = 0 }: Props = {}) => {
  let fillRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const resize = () => {
      const fullHeight = window.innerHeight - (diff || 0)
      if (!!fillRef) {
        fillRef!.current!.style.minHeight = `${fullHeight}px`
      }
    }
    resize()
  }, [])
  return { fillRef }
}

export default useFillHeight
