import React, { useCallback, useState } from 'react'
import { ScheduleSubmit } from '@/interfaces/form/submit'
import { Schedule } from '@/interfaces/models'
import { requestUri } from '@/api'
import { useInitialConnector, useRestApi, useAuth } from '@/hooks'
import { AlertStatus } from '@/interfaces/common'
import { initialAlertStatus } from '@/lib/initialData'

type Props = {
  onListSuccess?: (schedules: Schedule[]) => unknown
}

const useSchedule = ({ onListSuccess }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [targetUserId, setTargetUserId] = useState<number>(0)
  const [targetScheduleId, setTargetScheduleId] = useState<number>(0)
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({
    ...initialAlertStatus,
  })
  const { auth, config } = useAuth()
  const { getMethod, postMethod, putMethod, deleteMethod } = useRestApi()

  useInitialConnector<Schedule[]>({
    path: requestUri.schedule.list.replace(':id', String(auth.user.id)),
    onSuccess: (schedules: Schedule[]) => {
      setSchedules(schedules)
      setTargetUserId(auth.user.id)
      if (onListSuccess !== undefined) {
        onListSuccess(schedules)
      }
    },
  })

  const getSchedulesByUserId = async (targetUId?: number) => {
    await getMethod<Schedule[]>(
      requestUri.schedule.list.replace(':id', String(targetUId || auth.user.id))
    ).then((schedules) => {
      setSchedules(schedules)
      setTargetUserId(targetUId || auth.user.id)
      if (onListSuccess !== undefined) {
        onListSuccess(schedules)
      }
    })
  }

  const afterSaved = (newSchedule: Schedule) => {
    setAlertStatus((prev: AlertStatus) => ({
      ...prev,
      msg: 'スケジュールを保存しました',
      severity: 'success',
      show: true,
    }))
    setSchedules((prev: Schedule[]) => {
      const index = prev.findIndex((schedule) => schedule.id === newSchedule.id)
      if (index !== -1) {
        // 更新時の処理
        prev.splice(index, 1, newSchedule)
        return prev
      } else {
        // 新規追加時の処理
        return [newSchedule].concat(prev)
      }
    })
    return newSchedule
  }

  const afterDeleted = () => {
    setAlertStatus((prev: AlertStatus) => ({
      ...prev,
      msg: 'スケジュールを削除しました',
      severity: 'success',
      show: true,
    }))
    setSchedules((prev: Schedule[]) => {
      const index = prev.findIndex(
        (schedule) => schedule.id === targetScheduleId
      )
      if (index !== -1) {
        // 更新時の処理
        prev.splice(index, 1)
      }
      return prev
    })
    setTargetScheduleId(0)
  }

  const save = useCallback(
    async (submitData: ScheduleSubmit, id?: number) => {
      if (!!id) {
        return await putMethod<Schedule, ScheduleSubmit>(
          `/schedule/${id}`,
          submitData
        ).then((schedule) => {
          afterSaved(schedule)
          return schedule
        })
      } else {
        return await postMethod<Schedule, ScheduleSubmit>(
          requestUri.schedule.post,
          submitData
        ).then((schedule) => {
          afterSaved(schedule)
          return schedule
        })
      }
    },
    [config]
  )

  const deleteSchedule = async () => {
    setLoading(true)
    return await deleteMethod(`/schedule/${targetScheduleId}`)
      .then(() => {
        afterDeleted()
        return null
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    alertStatus,
    afterSaved,
    auth,
    deleteSchedule,
    getSchedulesByUserId,
    loading,
    schedules,
    setAlertStatus,
    setSchedules,
    setTargetScheduleId,
    save,
    targetScheduleId,
    targetUserId,
    setTargetUserId,
  }
}

export default useSchedule
