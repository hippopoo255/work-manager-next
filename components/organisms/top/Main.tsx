import React, { useRef, useEffect } from 'react'
import clsx from 'clsx'
import { footerHeight } from '@/lib/util'
import lMain from '@/assets/scss/Layout/l-main.module.scss'
import { useFillHeight } from '@/hooks'

type Props = {
  children: React.ReactNode
  top?: boolean
}
const Main = ({ children, top }: Props) => {
  const { fillRef } = useFillHeight({ diff: footerHeight })

  return (
    <main
      ref={fillRef}
      className={clsx(lMain.root, {
        [lMain.isTop]: top,
      })}
    >
      {children}
    </main>
  )
}

export default Main
