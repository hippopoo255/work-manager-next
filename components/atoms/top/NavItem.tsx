import React from 'react'
import clsx from 'clsx'
import cNavItem from '@/assets/scss/Object/Project/p-nav-item.module.scss'
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

  return (
    <a onClick={handleLink} className={clsx([cNavItem.root])}>
      {item.text}
    </a>
  )
}

export default NavItem
