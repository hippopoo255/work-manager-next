import React from 'react'
import Router from 'next/router'
import { Link } from '@material-ui/core'
import { NextPage } from 'next'
import theme from '@/theme'

export type Props = {
  statusCode: number
}
const Custom403Page: NextPage = () => {
  return (
    <div style={{ padding: 16 }}>
      <p>権限のない操作が発生しました。</p>
      <Link onClick={() => Router.back()} component="button">
        <a>back</a>
      </Link>
    </div>
  )
}

export default Custom403Page
