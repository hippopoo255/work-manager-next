import React from 'react'
import Link from 'next/link'
import styles from '@/assets/stylesheets/components/Header.module.scss'
import axios from '@/axios'
import requests from '@/Requests'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

export type Props = {
  className: string
}

const Header = ({className}: Props) => {
  const router = useRouter()
  const logout = async () => {
    await axios.post(requests.logout).then(res => {
      router.push('/login')
    })
  }
  return (
    <header className={className}>
      <ul>
        <li>
          <Link href="/login">
            <a className={styles.link}>ログイン</a>
          </Link>
        </li>
        <li>
          <a onClick={logout} className={styles.link}>ログアウト</a>
        </li>
      </ul>
    </header>
  )
}

Header.propTypes = {
  className: PropTypes.string,
}

Header.defaultProps = {
  className: 'header'
}

export default Header
