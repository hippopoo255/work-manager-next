import { useCallback } from 'react'
import useStatusContext from './useStatusContext'
import { statusOperation } from '~/stores/status'
import { StatusState } from '~/stores/status/types'

const useStatus = () => {
  const { status, dispatch } = useStatusContext()

  const update = useCallback(
    (context: StatusState) => {
      statusOperation.set(dispatch, context)
    },
    [dispatch]
  )

  const clear = useCallback(() => {
    statusOperation.clear(dispatch)
  }, [dispatch])

  return {
    status,
    update,
    clear,
  }
}
export default useStatus
