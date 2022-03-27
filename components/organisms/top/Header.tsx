import React, { useEffect, useMemo, useState } from 'react'
import header from '@/assets/scss/Module/header.module.scss'
import clsx from 'clsx'
import { headerHeight } from '@/lib/util'
import { GlobalNav, Logo } from '@/components/molecules/top'

const Header = () => {
  const [isIncludeMainVisual, setIsInclude] = useState(true)
  const handleShow = () => {
    const isInclude = window.scrollY <= window.innerHeight - headerHeight
    if (!isInclude === isIncludeMainVisual) {
      setIsInclude(isInclude)
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
  }, [isIncludeMainVisual])

  return (
    <header
      className={clsx(header.root, {
        [header.__transparent]: isIncludeMainVisual,
      })}
    >
      <div className={header.overlay}></div>
      <div className="u-container">
        <div className={clsx([header.content, 'u-px-5'])}>
          <Logo />
          <GlobalNav />
        </div>
      </div>
    </header>
  )
}

export default Header
