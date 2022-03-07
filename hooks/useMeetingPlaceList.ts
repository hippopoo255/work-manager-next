import React, { useState } from 'react'
import { MeetingPlace } from '@/interfaces/models'
import { useInitialConnector } from '@/hooks'
import { requestUri } from '@/api'

type Props = {
  handleSuccess?: () => void
  path?: string
}

const useMeetingPlaceList = ({
  handleSuccess,
  path = requestUri.meetingPlace.list,
}: Props = {}) => {
  const [meetingPlaceList, setMeetingPlaceList] = useState<MeetingPlace[]>([])
  useInitialConnector({
    path,
    onSuccess: (meetingPlaceList: MeetingPlace[]) => {
      setMeetingPlaceList([...meetingPlaceList])
      if (handleSuccess !== undefined) {
        handleSuccess()
      }
    },
  })
  return {
    meetingPlaceList,
    setMeetingPlaceList,
  }
}

export default useMeetingPlaceList
