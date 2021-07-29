import React from 'react'
import { UserModel } from '@/interfaces'
import useApi, { httpClient } from './useApi'
import requests from '@/Requests'

const currentUser = () => {
  const req = () => {
    return httpClient.get(requests.currentUser)
  }
  const user = useApi<UserModel | []>(req, [])
  return user
}

export default currentUser
