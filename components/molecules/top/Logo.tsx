import React from 'react'
import Link from 'next/link'
import { SiteLogo } from '@/components/atoms'

const Logo = () => {
  return (
    <Link href={'/'}>
      <a>
        <SiteLogo />
      </a>
    </Link>
  )
}

export default Logo
