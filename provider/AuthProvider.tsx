import { createContext, useReducer } from 'react'
import { UserState } from '@/interfaces/state'
import { UserAction } from '@/interfaces/action/UserAction'
import initialState from '@/globalState/store/initialState'
import { userReducer } from '@/globalState/user/reducer'

const authState = {
  user: initialState.user,
  isLogin: initialState.isLogin,
}

export const AuthContext = createContext<{
  auth: UserState
  dispatch: React.Dispatch<UserAction>
}>({
  auth: authState,
  dispatch: () => undefined,
})

type Props = {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [auth, dispatch] = useReducer(userReducer, authState)

  return (
    <>
      <AuthContext.Provider value={{ auth, dispatch }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthProvider
