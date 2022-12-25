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
    // console.log('width:', current.clientWidth)
    // console.log('height:', current.clientHeight)
    // console.log('top:', clientRect.top)
    // console.log('left:', clientRect.left)
    // console.log(
    //   'right:',
    //   window.innerWidth - current.clientWidth - clientRect.left
    // )
    // console.log(
    //   'bottom:',
    //   window.innerHeight - current.clientHeight - clientRect.top
    // )
    // console.log('x:', window.innerWidth)
    // console.log('y:', window.innerHeight)
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
  // top
  // top: 0;
  // transform: translates3d(0, -100%, 0);

  // right
  // top: 0;
  // transform: translates3d(100%, 0, 0);
  // bottom: bottom: 0; left: 50%;
  // transform: translates3d(0, 100%, 0);
  // left: top: 0; left: 0;
  // transform: translates3d(-100%, 0, 0);
  return {
    ref,
    handleMouseOver,
    style,
  }
}

export default useTooltip
