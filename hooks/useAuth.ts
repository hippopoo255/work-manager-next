import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getRequest, requestUri } from '@/api'
import { User } from '@/interfaces/models'

const useAuth = (canGuest: boolean = false): User | '' => {
  const [data, setData] = useState<User | ''>('')
  const router = useRouter()
  useEffect(() => {
    const func = async () => {
      const res = await getRequest<User | ''>(requestUri.currentUser)
      if (res === '' && !canGuest) {
        router.push('/login')
      } else {
        setData(res)
      }
    }
    func()
  }, [])
  return data
}

export default useAuth
