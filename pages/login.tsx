import React from 'react'
import axios from '@/axios'
import requests from '@/Requests'
import { useState, useCallback } from 'react'
import { Layout } from '@/components/templates'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()
  const [login_id, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const inputLoginId = useCallback((e) => {
    setLoginId(e.target.value)
  }, [setLoginId])
  const inputPassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [setPassword])

  const login = async (login_id: string, password: string) => {
    const loginData: any = new FormData()
    loginData.append('login_id', login_id)
    loginData.append('password', password)
    await axios.post(requests.login, loginData).then((res: any) => {
      if(res.status === 200) {
        router.push('/mypage')
      }
    })
  }

  return (
    <Layout>
      <Head>
        <title>ログイン</title>
      </Head>
      <div>        
        <div>
          <input type="text" placeholder="ログインID" name="login_id" value={login_id} onChange={(e) => inputLoginId(e)} />
        </div>
        <div>
          <input type="password" placeholder="パスワード" name="password" onChange={inputPassword} />
        </div>
        <button onClick={() => login(login_id, password)}>ログイン</button>
      </div>
    </Layout>
  )
}
export default Login
