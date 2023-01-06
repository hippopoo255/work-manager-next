import clsx from 'clsx'
import React from 'react'
import { useRef } from 'react'
import { usePosition } from '~/services/events/position'

type Props = {
  children: React.ReactNode
  text: string
  className?: string
  tabIndex?: number
}
const Tooltip = ({ children, text, className, tabIndex }: Props) => {
  const ref = useRef({} as HTMLDivElement)
  const { handleMouseOver, style } = usePosition({ ref })
  return (
    <div
      className={clsx(['p-tooltip', className ?? ''])}
      onMouseOver={handleMouseOver}
      tabIndex={tabIndex ?? 0}
    >
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
