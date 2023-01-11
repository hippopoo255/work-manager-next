import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import { IoIosArrowUp } from 'react-icons/io'
import { useLink } from '~/services/events/link'

type Props = {
  Icon?: IconType
  label: string
  path?: string
  child?: boolean
  onClick?: () => void
}
const MenuRow = ({ Icon, label, onClick, path, child }: Props) => {
  const { router, handleLink } = useLink({ onLink: onClick })
  return (
    <>
      {path === undefined ? (
        <div className="p-menu-row --parent">
          {Icon && (
            <Icon color="current" size={16} className="p-menu-row__col" />
          )}
          <span className="p-menu-row__col --text">{label}</span>
          <IoIosArrowUp className={`p-menu-row__col u-toggle`} />
        </div>
      ) : (
        <Link
          href={path ?? ''}
          onClick={(e) => handleLink(e, path ?? '')}
          className={clsx('p-menu-row --linkable', {
            '--current': router.pathname === path,
            '--thin': child ?? false,
          })}
        >
          {Icon && <Icon color="current" size={16} />}
          {label}
        </Link>
      )}
    </>
  )
}

export default MenuRow
