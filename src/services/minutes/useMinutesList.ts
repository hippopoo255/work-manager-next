import { uri } from '~/config/endPoint'
import { Pager, MeetingRecord } from '~/schema/generated/@types'
import useSwr from '~/services/common/useSwr'

const useMinutesList = () => {
  const { data, error, fetch } = useSwr<Pager<MeetingRecord>>(uri.minutes.index)

  return {
    data,
    fetch,
  }
}

export default useMinutesList
