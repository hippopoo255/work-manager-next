import { User } from '@/interfaces/models'
import router from 'next/router'
import handleRedirectByOrgData from './handleRedirectByOrgData'

export default function handleRedirectByAuth(loggedInUser: User | '') {
  if (router.pathname === '/login') {
    router.push('/')
  } else if (loggedInUser) {
    handleRedirectByOrgData(loggedInUser.is_initialized)
  } else {
    router.push('/login')
  }
}
