import { Login, Logout, CurrentUser } from '@/interfaces/action/UserAction'
import { ActionType } from '@/interfaces/action/UserAction'
import { User } from '@/interfaces/models'

export const loginAction = (loggedInUser: User): Login => ({
  type: ActionType.Login,
  payload: loggedInUser,
})

export const logoutAction = (): Logout => ({
  type: ActionType.Logout,
})

export const currentUserAction = (currentUser: User | ''): CurrentUser => ({
  type: ActionType.CurrentUser,
  payload: currentUser,
})
