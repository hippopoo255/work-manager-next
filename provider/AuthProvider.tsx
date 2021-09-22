import { createContext, useReducer } from 'react'
import { UserState } from '@/interfaces/state'
import { UserAction } from '@/interfaces/action/UserAction'
import initialState from '@/globalState/store/initialState'
import { userReducer } from '@/globalState/user/reducer'

export const AuthContext = createContext<{
  auth: UserState
  dispatch: React.Dispatch<UserAction>
}>({
  auth: { user: initialState.user, isLogin: initialState.isLogin },
  dispatch: () => undefined,
})

type Props = {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [auth, dispatch] = useReducer(userReducer, {
    user: initialState.user,
    isLogin: initialState.isLogin,
  })

  return (
    <>
      <AuthContext.Provider value={{ auth, dispatch }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthProvider
