import useSWR from 'swr'
import { fetch } from '~/libs/http_clients/axios'
import { User } from '~/schema/generated/@types'

export const duplicateEmailCount = async (email: string): Promise<number> => {
  return await fetch<User[]>(`/user?email=${email}&likely=0&slim=1`)
    .then(
      ({ data: userList }) =>
        userList.filter((user) => !!user.email_verified_at).length
    )
    .catch((err) => {
      throw err
    })
}

const useUserList = () => {
  const { data } = useSWR<User[]>('/user')
  return { data }
}

export default useUserList
