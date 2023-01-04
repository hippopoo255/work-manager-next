import { useState } from 'react'

import { Hamburger } from '../../Hamburger'
import SideMenu from '../SideMenu'
import { AuthNav } from './AuthNav'

const Header = () => {
  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <div className="l-header">
      <Hamburger open={open} onToggle={handleToggle} under="lg">
        <SideMenu className="lg:hidden" open={open} onToggle={handleToggle} />
      </Hamburger>
      <div className="l-header__nav">
        <AuthNav />
      </div>
    </div>
  )
}

export default Header
