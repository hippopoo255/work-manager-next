import React, { useMemo } from 'react'
import clsx from 'clsx'
import cNavItem from '@/assets/scss/Module/nav-item.module.scss'
import Link from 'next/link'

type Props = {
  item: {
    to: string
    name: string
    text: string
    icon?: JSX.Element
    handleClick?: Function
    component?: JSX.Element
  }
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NavItem = ({ item, setOpen }: Props) => {
  const defaultHandler = () => {
    const target = window.document.querySelector(item.to)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    setOpen(false)
    if (item.handleClick === undefined) {
      defaultHandler()
    } else {
      item.handleClick(item)
    }
  }

  const isOtherPage = useMemo(() => item.to.match(/^\/.+/), [])

  return !!isOtherPage ? (
    <Link href={item.to}>
      <a className={clsx([cNavItem.root])}>{item.text}</a>
    </Link>
  ) : (
    <a onClick={handleLink} className={clsx([cNavItem.root])}>
      {item.text}
    </a>
  )
}

export default NavItem
