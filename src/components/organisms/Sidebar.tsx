import React from 'react'
import { User } from '~/schema/@types'

type Props = {
  user: User | ''
}
const Sidebar = ({ user }: Props) => {
  return <aside>Sidebar: {user ? user.full_name : ''}</aside>
}

export default Sidebar
