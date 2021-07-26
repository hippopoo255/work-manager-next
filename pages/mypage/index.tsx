import React from 'react'
import { MypageLayout } from '@/components/templates'
import { GetStaticProps, GetServerSideProps, GetStaticPropsContext } from 'next'
import Head from 'next/head'
import axios from '@/axios'
import requests from '@/Requests'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

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

  const check = async () => {
    await axios.get(requests.currentUser).then(res => {
      console.log(res)
    })
  }
  return (
    <MypageLayout>
      <Head>
        <title>マイページ</title>
      </Head>
      <p>マイページ</p>
      <main>{user.family_name}さん、こんにちは</main>
      <div>
        <button onClick={() => check()}>確認</button>
      </div>
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
