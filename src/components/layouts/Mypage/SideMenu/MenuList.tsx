import MenuRow from './MenuRow'
import { Accordion } from '~/components/elements/Accordion'
import { SideMenu } from '~/config/sideMenu'

type Props = {
  menu: SideMenu
  onToggle?: () => void
}

const MenuList = ({ menu, onToggle }: Props) => {
  return (
    <div className="p-menu-list">
      {menu.map((item, i) => (
        <div key={`menu_${i}`} className="p-menu-list__row">
          {item.children === undefined ? (
            <MenuRow
              label={item.label}
              Icon={item.icon}
              path={item.path}
              onClick={onToggle}
            />
          ) : (
            <Accordion
              role="group"
              areaControls={`menu_${i}`}
              controller={
                <div className="p-menu-list__row">
                  <MenuRow label={item.label} Icon={item.icon} />
                </div>
              }
            >
              {item.children.map((child, j) => (
                <div key={`item_${j}`} className="p-menu-list__row">
                  <MenuRow
                    label={child.label}
                    Icon={child.icon}
                    path={child.path}
                    onClick={onToggle}
                    child
                  />
                </div>
              ))}
            </Accordion>
          )}
        </div>
      ))}
    </div>
  )
}

export default MenuList
