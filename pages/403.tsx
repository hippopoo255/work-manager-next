import React from 'react'
import Router from 'next/router'
import { Link } from '@material-ui/core'
import { NextPage } from 'next'

export type Props = {
  statusCode: number
}
const Custom403Page: NextPage = () => {
  return (
    <>
      <p>閲覧権限がありません。</p>
      <Link onClick={() => Router.back()} component="button">
        <a>back</a>
      </Link>
    </>
  )
}

export default Custom403Page
