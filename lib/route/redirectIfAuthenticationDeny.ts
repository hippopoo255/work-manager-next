import { User } from '@/interfaces/models'
import router from 'next/router'

export default function redirectIfAuthenticationDeny(loggedInUser: User | '') {
  const denyPath = [
    '/login',
    '/forgot_password',
    '/password/forgot_password',
    '/password/reset',
    '/signup',
  ]
  if (loggedInUser && denyPath.includes(router.pathname)) {
    router.push('/mypage')
  }
}
