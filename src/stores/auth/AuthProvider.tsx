import { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './reducer'
import initialState from '~/stores/initialState'

type Props = {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [auth, dispatch] = useReducer(authReducer, initialState.auth)

  return (
    <>
      <AuthContext.Provider value={{ auth, dispatch }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthProvider
