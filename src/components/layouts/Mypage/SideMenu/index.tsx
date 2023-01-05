import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'
import MenuList from './MenuList'
import { ThemeToggle } from '~/components/elements'
import { sideMenus } from '~/config'
import { User } from '~/schema/generated/@types'

type Props = {
  user?: User | ''
  className?: string
  open?: boolean
  onToggle?: () => void
}
const SideMenu = ({ className, onToggle }: Props) => {
  const { t } = useTranslation()
  const menus = sideMenus(t)

  return (
    <div className={`l-sidemenu ${className ?? ''}`}>
      <div className="l-sidemenu__head">
        <Link href={'/'} className="l-sidemenu__top-link">
          Top Page
        </Link>
      </div>
      <div className="l-sidemenu__body">
        <section className="l-sidemenu__section">
          <nav className="l-sidemenu__nav">
            <MenuList menu={menus.primary} onToggle={onToggle} />
          </nav>
        </section>
        <section className="l-sidemenu__section">
          <nav className="l-sidemenu__nav">
            <MenuList menu={menus.secondary} onToggle={onToggle} />
          </nav>
        </section>
        <section className="l-sidemenu__section --bottom">
          <ThemeToggle />
        </section>
      </div>
    </div>
  )
}

export default SideMenu
