'use client'

import Link from 'next/link'
import GlobalNav from './GlobalNav'

const Header = () => {
  return (
    <div className="l-header">
      <div>
        <div>
          <Link href={'/'}>Top</Link>
        </div>
      </div>
      <div>
        <GlobalNav />
      </div>
    </div>
  )
}

export default Header
