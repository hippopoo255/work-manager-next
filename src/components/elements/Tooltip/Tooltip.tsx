import React from 'react'
import { useRef } from 'react'
import useTooltip from './useTooltip'

type Props = {
  children: React.ReactNode
  text: string
}
const Tooltip = ({ children, text }: Props) => {
  const ref = useRef({} as HTMLDivElement)
  const { handleMouseOver, style } = useTooltip({ ref })
  return (
    <div className="p-tooltip" onMouseOver={handleMouseOver}>
      <div className="p-tooltip__body" style={style}>
        {text}
      </div>
      <div className="p-tooltip__target" ref={ref}>
        {children}
      </div>
    </div>
  )
}

export default Tooltip
