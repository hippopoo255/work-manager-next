// import { createContext, useReducer } from 'react'
// import { UserState } from '@/interfaces/state'
// import { UserAction } from '@/interfaces/action/UserAction'
// import initialState from '@/globalState/store/initialState'
// import { userReducer } from '@/globalState/user/reducer'
import { Auth0Provider } from '@auth0/auth0-react'
import providerProps from '@/lib/auth/auth0/providerProps'

// const authState = {
//   user: initialState.user,
//   isLogin: initialState.isLogin,
// }
//
// export const AuthContext = createContext<{
//   auth: UserState
//   dispatch: React.Dispatch<UserAction>
// }>({
//   auth: authState,
//   dispatch: () => undefined,
// })
//
type Props = {
  children: React.ReactNode
}

const Auth0CustomProvider = ({ children }: Props) => {
  // const [auth, dispatch] = useReducer(userReducer, authState)
  return (
    <>
      <Auth0Provider {...providerProps}>{children}</Auth0Provider>
    </>
  )
}

export default Auth0CustomProvider
