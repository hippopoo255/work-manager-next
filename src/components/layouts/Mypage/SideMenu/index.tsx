import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'
import MenuList from './MenuList'
import { ThemeToggle } from '~/components/elements/Toggle'
import { sideMenus } from '~/config/sideMenu'
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
        {(Object.keys(menus) as (keyof typeof menus)[]).map((k) => (
          <section className="l-sidemenu__section" key={`menus_${k}`}>
            <nav className="l-sidemenu__nav">
              <MenuList menu={menus[k]} onToggle={onToggle} />
            </nav>
          </section>
        ))}
        <section className="l-sidemenu__section --bottom">
          <ThemeToggle />
        </section>
      </div>
    </div>
  )
}

export default SideMenu
