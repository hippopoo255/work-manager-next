import React, { useState } from 'react'
import { MemberExtInputs } from '@/interfaces/form/inputs'
import { User } from '@/interfaces/models'

import useInitialConnector from './useInitialConnector'
import { requestUri } from '@/api'

type Props = {
  sharedBy?: number
}
const useMemberList = ({ sharedBy = 0 }: Props) => {
  const [memberList, setMemberList] = useState<MemberExtInputs[]>([])
  const { loading } = useInitialConnector<User[]>({
    path: requestUri.user.list,
    onSuccess: (users: User[]) => {
      const memberList: MemberExtInputs[] = users.map((u) => ({
        id: u.id,
        full_name: u.full_name,
        is_editable: true,
        shared_by: sharedBy || 0,
      }))
      setMemberList(memberList)
    },
  })
  return {
    memberList,
  }
}

export default useMemberList
