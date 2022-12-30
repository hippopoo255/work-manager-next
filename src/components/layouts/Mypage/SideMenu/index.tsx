import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from '~/components/elements'
import { User } from '~/schema/generated/@types'

type Props = {
  user?: User | ''
  className?: string
}
const SideMenu = ({ user, className }: Props) => {
  return (
    <div className={`l-sidemenu ${className ?? ''}`}>
      <div className="l-sidemenu__head">
        <Link href={'/'}>Top</Link>
      </div>
      <hr />
      <div className="l-sidemenu__body">
        SideMenu: {!!user ? user.full_name : ''}
      </div>
      <hr />
      <div className="l-sidemenu__bottom">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default SideMenu
