import { User } from '@/interfaces/models'

export enum ActionType {
  Login,
  Logout,
  CurrentUser,
}

export interface Login {
  type: ActionType.Login
  payload: User
}

export interface Logout {
  type: ActionType.Logout
}

export interface CurrentUser {
  type: ActionType.CurrentUser
  payload: User | ''
}

export type UserAction = Login | Logout | CurrentUser
