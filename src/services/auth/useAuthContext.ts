import { useContext } from 'react'
import { AuthContext } from '~/stores/auth'

export const useAuthContext = () => useContext(AuthContext)
