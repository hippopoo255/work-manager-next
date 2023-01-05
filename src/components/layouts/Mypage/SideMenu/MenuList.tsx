import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import MenuRow from './MenuRow'
import { SideMenu } from '~/config'

type Props = {
  menu: SideMenu
  onToggle?: () => void
}

const MenuList = ({ menu, onToggle }: Props) => {
  return (
    <ul className="p-menu-list">
      {menu.map((item, i) => (
        <li key={`menu_${i}`} className="p-menu-list__item">
          {item.children === undefined ? (
            <MenuRow
              label={item.label}
              Icon={item.icon}
              path={item.path}
              onToggle={onToggle}
            />
          ) : (
            <details className="p-menu-list__details">
              <summary className="p-menu-list__summary">
                <MenuRow label={item.label} Icon={item.icon} />
                <IoIosArrowDown
                  size={16}
                  color="current"
                  className="p-menu-list__summary-icon"
                />
              </summary>
              <ul className="p-menu-list__children">
                {item.children.map((child, j) => (
                  <li key={`item_${j}`} className="l-sidemenu__child">
                    <MenuRow
                      label={child.label}
                      Icon={child.icon}
                      path={child.path}
                      onToggle={onToggle}
                      child
                    />
                  </li>
                ))}
              </ul>
            </details>
          )}
        </li>
      ))}
    </ul>
  )
}

export default MenuList
