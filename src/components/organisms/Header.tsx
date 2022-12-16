'use client'

import Link from 'next/link'
import React from 'react'
import { useAuthContext } from '~/services/auth'

const Header = () => {
  const handleClick = () => {}
  const { auth } = useAuthContext()
  return (
    <header>
      <div>
        <div>
          <Link href={'/'}>Top</Link>
        </div>
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link href={{ pathname: 'signin' }}>Sign In</Link>
            </li>
            <li>
              <Link href={{ pathname: 'mypage' }}>My Page</Link>
            </li>
            <li>
              <button className={'c-button'} onClick={handleClick}>
                {auth.isSignedIn ? auth.user.full_name : 'ゲスト'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
