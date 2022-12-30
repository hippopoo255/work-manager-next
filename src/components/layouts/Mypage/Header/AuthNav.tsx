import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import AuthAvatar from './AuthAvatar'
import { ThemeToggle } from '~/components/elements/Toggle'
import { useAuthContext } from '~/services/auth'

export const AuthNav = () => {
  const { auth } = useAuthContext()
  const { t } = useTranslation()

  return (
    <>
      {/* <Hamburger open={open} onToggle={handleToggle}>
        <SideMenu />
      </Hamburger> */}
      <nav className="p-auth-nav">
        <ul className="p-auth-nav__menu">
          {/* <li className="p-auth-nav__item grid grid-flow-col place-content-center place-items-center">
            <ThemeToggle />
          </li>
          <li className="p-auth-nav__item">
            <Link href={{ pathname: '/help' }} className={'c-header-link'}>
              {t('header.help')}
            </Link>
          </li> */}
          <li className="p-auth-nav__item">
            <AuthAvatar user={auth.user} />
          </li>
        </ul>
      </nav>
    </>
  )
}
