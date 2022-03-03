import React, { useEffect, useRef, useState } from 'react'
type Props = {
  diff?: number
  onFilled?: Function
}
const useFillHeight = ({ diff = 0, onFilled = undefined }: Props = {}) => {
  const [isFilled, setIsFilled] = useState(false)

  let fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const resize = () => {
      const fullHeight = window.innerHeight - (diff || 0)
      if (!!fillRef) {
        fillRef!.current!.style.minHeight = `${fullHeight}px`
        setIsFilled(true)
        if (onFilled !== undefined) {
          onFilled()
        }
      }
    }
    resize()
  }, [])

  return { fillRef, isFilled }
}

export default useFillHeight
