import Link from 'next/link'
import React from 'react'
import { BIRTH_DAY } from '~/config/app'

const Footer = () => {
  return (
    <div className="l-footer">
      <div className="l-footer__body">
        <p>
          <span>Copyright ©</span>
          <Link href="/" className="l-footer__link">
            ジョブサポ
          </Link>
          <span className="ml-1">{new Date(BIRTH_DAY).getFullYear()}</span>
          {new Date(BIRTH_DAY).getFullYear() !== new Date().getFullYear() && (
            <span> - {new Date().getFullYear()}</span>
          )}
        </p>
      </div>
    </div>
  )
}

export default Footer
