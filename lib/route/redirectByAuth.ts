import { User } from '@/interfaces/models'
import router from 'next/router'
import redirectByOrgData from './redirectByOrgData'

export default function redirectByAuth(loggedInUser: User | '') {
  if (router.pathname === '/login') {
    router.push('/')
  } else if (loggedInUser) {
    redirectByOrgData(loggedInUser.is_initialized)
  } else {
    router.push('/login')
  }
}
