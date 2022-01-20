import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks'
import { Schedule } from '@/interfaces/models'
import { ScheduleInputs } from '@/interfaces/form/inputs'
import { ScheduleSubmit } from '@/interfaces/form/submit'
import { EventClickArg, EventChangeArg } from '@fullcalendar/react'
import { defaultScheduleColor } from '@/lib/fullCalendar'
import { DateClickArg } from '@fullcalendar/interaction'
import { EventInput } from '@fullcalendar/common'
import { toStrData } from '@/lib/util'
import { CustomCalendar } from '@/components/organisms'

type Props = {
  schedules: Schedule[]
  setDefaultValues: React.Dispatch<React.SetStateAction<ScheduleInputs>>
  afterFetchDefaultValues?: () => void
  afterEventChange?: (
    submitData: ScheduleSubmit,
    targetScheduleId: number
  ) => void
  afterDateClick?: (arg?: boolean | string) => void
  disabledSchedule: boolean
}
const useCalendar = ({
  schedules,
  setDefaultValues,
  afterFetchDefaultValues,
  afterEventChange,
  afterDateClick,
  disabledSchedule = false,
}: Props) => {
  const [scheduleEvents, setScheduleEvents] = useState<EventInput[]>([])
  const { auth } = useAuth()

  const handleEventClick = (e: EventClickArg) => {
    const targetSchedule = schedules.find(
      (schedule) => schedule.id === Number(e.event._def.publicId)
    )
    if (targetSchedule !== undefined && !!targetSchedule.is_show) {
      setDefaultValues({
        id: targetSchedule.id,
        scheduled_by: targetSchedule.scheduled_by!.id!,
        title: targetSchedule.title,
        memo: targetSchedule.memo,
        start: new Date(targetSchedule.start),
        end: new Date(targetSchedule.end),
        color: targetSchedule.color || defaultScheduleColor,
        is_public: targetSchedule.is_public,
        disabled: !targetSchedule.can_edit,
        sharedMembers: targetSchedule.shared_members.map((member) => ({
          id: member.id,
          full_name: member.full_name,
          is_editable: member.option.is_editable,
          shared_by: member.option.shared_by,
        })),
      })
      if (afterFetchDefaultValues !== undefined) {
        afterFetchDefaultValues()
      }
    }
  }

  const handleDateClick = (e: DateClickArg) => {
    setDefaultValues((prev) => {
      if (prev.id !== undefined) {
        delete prev.id
      }
      return {
        scheduled_by: auth.user.id,
        title: '',
        memo: '',
        color: defaultScheduleColor,
        is_public: true,
        disabled: disabledSchedule,
        sharedMembers: [],
        start: e.date,
        end: e.date,
      }
    })
    if (afterDateClick !== undefined) {
      afterDateClick(true)
    }
  }

  const handleEventChange = async (e: EventChangeArg) => {
    const targetSchedule = schedules.find(
      (schedule) => schedule.id === Number(e.event._def.publicId)
    )
    if (targetSchedule !== undefined) {
      const submitMember: ScheduleSubmit['sharedMembers'] = {}
      targetSchedule.shared_members.forEach((member) => {
        submitMember[member.id] = {
          is_editable: !!member.option.is_editable,
          shared_by: member.option.shared_by,
        }
      })
      const movedStartStr =
        e.event.start === null ? targetSchedule.start : toStrData(e.event.start)
      const submitData = {
        scheduled_by: targetSchedule.scheduled_by.id,
        title: targetSchedule.title,
        memo: targetSchedule.memo,
        start: movedStartStr,
        end: e.event.end === null ? movedStartStr : toStrData(e.event.end),
        color: targetSchedule.color,
        is_public: targetSchedule.is_public,
        sharedMembers: submitMember,
      }
      if (afterEventChange !== undefined) {
        await afterEventChange(submitData, targetSchedule.id)
      }
    }
  }

  useEffect(() => {
    let unmounted = true
    if (unmounted) {
      setScheduleEvents(
        schedules.map((schedule) => ({
          id: String(schedule.id),
          title: schedule.title,
          start: new Date(schedule.start),
          end: new Date(schedule.end),
          color: !!schedule.color ? schedule.color : defaultScheduleColor,
          editable: schedule.can_edit,
        }))
      )
    }
    return () => {
      unmounted = false
    }
  }, [])

  const Calendar = () => {
    return (
      <CustomCalendar
        initialEvents={scheduleEvents}
        onEventClick={handleEventClick}
        onDateClick={handleDateClick}
        onEventChange={handleEventChange}
      />
    )
  }
  return {
    Calendar,
    handleDateClick,
    handleEventChange,
    handleEventClick,
    scheduleEvents,
    setScheduleEvents,
  }
}

export default useCalendar
