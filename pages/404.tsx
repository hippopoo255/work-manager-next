import React from 'react'
import Router from 'next/router'
import { Link } from '@material-ui/core'
import { NextPage } from 'next'

export type Props = {
  statusCode: number
}
const Custom404Page: NextPage = () => {
  return (
    <>
      <p>お探しのページは見つかりませんでした</p>
      <Link onClick={() => Router.back()} component="button">
        <a>back</a>
      </Link>
    </>
  )
}

// Error.getInitialProps = ({ res, err }: any) => {
//   const statusCode = res ? res.statusCode : err ? err.statusCode : null
//   return { statusCode }
// }

export default Custom404Page
