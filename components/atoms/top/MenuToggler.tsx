import React from 'react'
import cMenuToggler from '@/assets/scss/Object/Component/c-menu-toggler.module.scss'
import clsx from 'clsx'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// eslint-disable-next-line react/display-name
const MenuToggler = ({ open, setOpen }: Props) => {
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <button
      className={clsx(cMenuToggler.root, {
        [cMenuToggler.open]: open,
      })}
      onClick={handleClick}
    >
      <span className={cMenuToggler.line}></span>
      <span className={cMenuToggler.line}></span>
      <span className={cMenuToggler.line}></span>
    </button>
  )
}

export default MenuToggler
