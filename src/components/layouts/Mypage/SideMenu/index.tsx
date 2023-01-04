import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { ThemeToggle } from '~/components/elements'
import { sideMenu } from '~/config'
import { User } from '~/schema/generated/@types'
import { useLink } from '~/services/common'

type Props = {
  user?: User | ''
  className?: string
  open?: boolean
  onToggle?: () => void
}
const SideMenu = ({ className, onToggle }: Props) => {
  const { t } = useTranslation()
  const { router, handleLink } = useLink({ onLink: onToggle })

  const menu = sideMenu(t)

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
            <ul className="l-sidemenu__list">
              {menu.map((item, i) => (
                <li key={`menu_${i}`} className="l-sidemenu__item">
                  {item.children === undefined ? (
                    <Link
                      href={`${item.path}`}
                      onClick={(e) => handleLink(e, item.path ?? '')}
                      className={clsx('l-sidemenu__link', {
                        '--current': router.pathname === item.path,
                      })}
                    >
                      <item.icon color="current" size={16} />
                      {item.label}
                    </Link>
                  ) : (
                    <details className="l-sidemenu__details">
                      <summary className="l-sidemenu__summary">
                        <div className="flex items-center gap-2">
                          <item.icon color="current" size={16} />
                          <span className="">{item.label}</span>
                        </div>
                        <IoIosArrowDown
                          size={16}
                          color="current"
                          className="l-sidemenu__summary-icon"
                        />
                      </summary>
                      <ul className="l-sidemenu__children">
                        {item.children.map((child, j) => (
                          <li key={`item_${j}`} className="l-sidemenu__child">
                            <Link
                              href={`${child.path}`}
                              onClick={(e) => handleLink(e, child.path ?? '')}
                              className={clsx('l-sidemenu__link', {
                                '--current': router.pathname === child.path,
                              })}
                            >
                              <child.icon color="current" size={16} />
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </li>
              ))}
            </ul>
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
