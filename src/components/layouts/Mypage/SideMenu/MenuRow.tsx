import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import { useLink } from '~/services/events/link'

type Props = {
  Icon?: IconType
  label: string
  path?: string
  child?: boolean
  onToggle?: () => void
}
const MenuRow = ({ Icon, label, onToggle, path, child }: Props) => {
  const { router, handleLink } = useLink({ onLink: onToggle })
  return (
    <>
      {path === undefined ? (
        <div className="p-menu-row">
          {Icon && <Icon color="current" size={16} />}
          <span className="">{label}</span>
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
