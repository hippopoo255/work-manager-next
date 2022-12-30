import Link from 'next/link'
import GlobalNav from './GlobalNav'

const Header = () => {
  return (
    <div className="l-header">
      <div className="l-header__logo">
        <div>
          <Link href={'/'}>Top</Link>
        </div>
      </div>
      <div className="l-header__nav">
        <GlobalNav />
      </div>
    </div>
  )
}

export default Header
