'use client'

import { useCallback, RefObject, useState } from 'react'
import * as Type from './types'
type Props = {
  ref: RefObject<HTMLElement>
}
const useTooltip = ({ ref }: Props) => {
  const [style, setStyle] = useState({})
  const handleMouseOver = useCallback(() => {
    if (!ref.current) {
      return false
    }
    // ↓left: 0; bottom: 0を動的に返す
    const position = decidePosition(ref.current) // right or left / top or bottom
    const [keyX, keyY] = Object.keys(position)
    // const transformStyle = decideTransform() // {transformX: '-100%'}
    const positionStyle = { [keyX]: -8, [keyY]: -8 }
    // ↓transformプロパティを決める
    const transformStyle = decideTransform(position)
    setStyle((prev) => ({
      ...positionStyle,
      ...transformStyle,
    }))
  }, [])

  const decidePosition = (current: HTMLElement): Type.PositionType => {
    const clientRect = current.getBoundingClientRect()
    const top = clientRect.top
    const right = window.innerWidth - current.clientWidth - clientRect.left
    const bottom = window.innerHeight - current.clientHeight - clientRect.top
    const left = clientRect.left
    const positionX = right > left ? { right } : { left }
    const positionY = top > bottom ? { top } : { bottom }
    return {
      ...positionX,
      ...positionY,
    }
  }

  const decideTransform = (position: Type.PositionType) => {
    const [keyX, keyY] = Object.keys(position)
    const pxX = position[keyX] ?? 0
    const pxY = position[keyY] ?? 0
    if (pxX === undefined && pxY === undefined) {
      return {
        transform: 'translateY(-100%)',
      }
    }
    const [direction, value] = pxX > pxY ? ['X', keyX] : ['Y', keyY]
    const amount = value === 'top' || value === 'left' ? '-100%' : '100%'
    return {
      transform: `translate${direction}(${amount})`,
    }
  }
  return {
    ref,
    handleMouseOver,
    style,
  }
}

export default useTooltip
