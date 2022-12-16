'use client'

import Link from 'next/link'
import React from 'react'

const header = () => {
  const handleClick = () => {
    const accessToken = 'next/headers cannnot use in client component'
    console.log(accessToken)
  }

  return (
    <header>
      <div></div>
      <div>
        <nav>
          <ul>
            <li>
              <Link href={{ pathname: 'signin' }}>Sign In</Link>
            </li>
            <li>
              <button className={'c-button'} onClick={handleClick}>
                show Token
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default header
