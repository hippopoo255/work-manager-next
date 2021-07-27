import React from 'react'
import { MypageLayout } from '@/layouts'
import { GetStaticProps, GetServerSideProps, GetStaticPropsContext } from 'next'
import Head from 'next/head'
import axios from '@/axios'
import requests from '@/Requests'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import {MuiButton} from '@/components/atoms'

export type User = {
  id: number
  family_name: string
  given_name: string
}

const Dashboard = () => {
  const [user, setUser] = useState<User|any>([])
  useEffect(() => {
    axios.get(requests.currentUser).then((res) => {
      setUser(res.data)
    })
  }, [])

  return (
    <MypageLayout>
      <Head>
        <title>マイページ</title>
      </Head>
      <section>
        <h2>マイページ</h2>
        <div>
          <MuiButton
            label="わっしょい"
            variant="contained"
            color="primary"
          />
          <span>{user.family_name}さん、こんにちは</span>
        </div>
      </section>
    </MypageLayout>
  )
}

// export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
//   const header = {
//     headers: {
//       Cookie: context.req.cookies
//     }
//   }
//   const response = await axios.get(requests.currentUser, header)
//   return {
//     props: {
//       user: response.data,
//     }
//   }
// }

export default Dashboard
