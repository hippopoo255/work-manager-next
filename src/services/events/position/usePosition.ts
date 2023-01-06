import { useCallback, RefObject, useState, useMemo } from 'react'
import * as Type from './types'
type Props = {
  ref: RefObject<HTMLElement>
}

const usePosition = ({ ref }: Props) => {
  const [position, setPosition] = useState({
    x: 'left', // left | right
    y: 'top', // top | bottom
  })

  const [translate, setTranslate] = useState('-100%')

  const style = useMemo(
    () => ({
      [position.x]: -8,
      [position.y]: -8,
      transform: `translateY(${translate})`,
    }),
    [position, translate]
  )

  const handleMouseOver = useCallback(() => {
    if (!ref.current) {
      return false
    }
    // {[left|right]: num, [top|bottom]: num}を動的に返す
    const position = decidePosition(ref.current)

    decideTransform(position)
  }, [ref])

  const decidePosition = useCallback(
    (current: HTMLElement): Type.PositionType => {
      const clientRect = current.getBoundingClientRect()
      const top = Math.floor(clientRect.top)
      const right = Math.floor(
        window.innerWidth - current.clientWidth - clientRect.left
      )
      const bottom = Math.floor(
        window.innerHeight - current.clientHeight - clientRect.top
      )
      const left = Math.floor(clientRect.left)
      const positionX = right >= left ? { right } : { left }
      const positionY = top >= bottom ? { top } : { bottom }
      setPosition((prev) => ({
        ...prev,
        x: right >= left ? 'left' : 'right',
        y: top >= bottom ? 'top' : 'bottom',
      }))
      return {
        ...positionX,
        ...positionY,
      }
    },
    [setPosition]
  )

  const decideTransform = (position: Type.PositionType) => {
    const [_, keyY] = Object.keys(position)
    setTranslate(keyY === 'top' ? '-100%' : '100%')
  }

  return {
    ref,
    handleMouseOver,
    style,
  }
}

export default usePosition
