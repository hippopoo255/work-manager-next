import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { DateClickArg } from '@fullcalendar/interaction'
import { EventInput } from '@fullcalendar/common'
import { EventClickArg, EventChangeArg } from '@fullcalendar/react'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { CustomCalendar, ConfirmDialog } from '@/components/organisms'
import { ScheduleForm } from '@/components/template'
import {
  ScheduleInputs,
  MemberExtInputs,
  MemberInputs,
} from '@/interfaces/form/inputs'
import { ScheduleSubmit } from '@/interfaces/form/submit'
import { Schedule, User } from '@/interfaces/models'
import {
  requestUri,
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from '@/api'
import { toStrData } from '@/lib/util'
import { defaultScheduleColor } from '@/lib/fullCalendar'
import { TextField, Grid } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

export type Props = {
  users: MemberInputs[]
  onChange: (
    event: React.ChangeEvent<{}>,
    newValue: MemberInputs | null
  ) => void
}

const UserField = ({ users, onChange }: Props) => {
  const handleMember = (
    event: React.ChangeEvent<{}>,
    newValue: MemberInputs | null
  ) => {
    onChange(event, newValue)
  }
  return (
    <div className={'container'}>
      <Grid container justifyContent={'flex-end'} alignItems={'center'}>
        <Grid item style={{ marginBottom: 16 }}>
          <Autocomplete
            id="users-box-demo"
            options={users}
            getOptionLabel={(option) => option.full_name}
            style={{ width: 280 }}
            onChange={handleMember}
            renderInput={(params) => (
              <TextField
                {...params}
                label="ユーザ"
                size={'small'}
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  )
}

const Index = () => {
  const router = useRouter()
  const [memberList, setMemberList] = useState<MemberInputs[]>([])
  const [scheduleEvents, setScheduleEvents] = useState<EventInput[]>([])
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [userId, setUserId] = useState<number>(0)
  const [ownerId, setOwnerId] = useState<number>(0)
  const [delScheduleId, setDelScheduleId] = useState<number>(0)
  const [defaultValues, setDefaultValues] = useState<ScheduleInputs>({
    scheduled_by: 0,
    title: '',
    memo: '',
    start: new Date(),
    end: new Date(),
    color: '',
    is_public: true,
    disabled: false,
    sharedMembers: [],
  })
  const fixedMember: MemberExtInputs[] = []
  const mine = userId === ownerId

  const handleSupply = (id: number) => {
    setOwnerId(id)
  }

  const handleTarget = (
    event: React.ChangeEvent<{}>,
    newValue: MemberInputs | null
  ) => {
    if (newValue !== null) {
      setUserId(newValue.id)
    } else {
      setUserId(ownerId)
    }
  }

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
      setOpen(true)
    }
  }

  const handleDateClick = (e: DateClickArg) => {
    setDefaultValues((prev) => {
      if (prev.id !== undefined) {
        delete prev.id
      }
      return {
        scheduled_by: ownerId,
        title: '',
        memo: '',
        color: defaultScheduleColor,
        is_public: true,
        disabled: userId > 0 && !mine,
        sharedMembers: [],
        start: e.date,
        end: e.date,
      }
    })
    setOpen(true)
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

      await putRequest<Schedule, ScheduleSubmit>(
        `/schedule/${targetSchedule.id}`,
        submitData
      )
        .then((newSchedule) => {
          handleSuccess(newSchedule)
        })
        .catch((err) => {})
    }
  }

  const handleSuccess = (newSchedule: Schedule) => {
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

    setScheduleEvents((prev: EventInput[]) => {
      const index = prev.findIndex(
        (event) => Number(event.id) === newSchedule.id
      )
      if (index !== -1) {
        prev.splice(index, 1, {
          id: String(newSchedule.id),
          title: newSchedule.title,
          start: new Date(newSchedule.start),
          end: new Date(newSchedule.end),
          color: !!newSchedule.color ? newSchedule.color : defaultScheduleColor,
          editable: newSchedule.can_edit,
        })
      } else {
        prev.push({
          id: String(newSchedule.id),
          title: newSchedule.title,
          start: new Date(newSchedule.start),
          end: new Date(newSchedule.end),
          color: !!newSchedule.color ? newSchedule.color : defaultScheduleColor,
          editable: newSchedule.can_edit,
        })
      }
      return [...prev]
    })
  }

  const handleDelete = (id: number) => {
    setOpen(false)
    setDelScheduleId(id)
    setDeleteOpen(true)
  }

  const execDelete = async () => {
    setDeleteLoading(true)
    if (delScheduleId > 0) {
      await deleteRequest(`/schedule/${delScheduleId}`)
        .then((res) => {
          setSchedules((prev: Schedule[]) => {
            const index = prev.findIndex(
              (schedule) => schedule.id === delScheduleId
            )
            if (index !== -1) {
              prev.splice(index, 1)
            }
            return prev
          })
          setScheduleEvents((prev: EventInput[]) => {
            const index = prev.findIndex(
              (event) => Number(event.id) === delScheduleId
            )
            if (index !== -1) {
              prev.splice(index, 1)
            }
            return [...prev]
          })
          setDelScheduleId(0)
          setDeleteOpen(false)
        })
        .finally(() => {
          setDeleteLoading(false)
        })
    }
  }

  useEffect(() => {
    const fetchSchedules = async () => {
      const id = userId === 0 ? ownerId : userId
      if (id > 0) {
        await getRequest<Schedule[]>(`/user/${id}/schedule`).then(
          (schedules: Schedule[]) => {
            setSchedules(schedules)
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
        )
      }
    }
    fetchSchedules()
  }, [userId, ownerId])

  useEffect(() => {
    const fetchMember = async () => {
      await getRequest<User[]>(requestUri.user.list).then((users: User[]) => {
        const dataList: MemberInputs[] = users.map((u) => ({
          id: u.id,
          full_name: u.full_name,
        }))
        setMemberList(dataList)
      })
    }
    fetchMember()
  }, [])

  const saveReq = useCallback(
    async (submitData: ScheduleSubmit) => {
      if (defaultValues.id !== undefined) {
        return await putRequest<Schedule, ScheduleSubmit>(
          `/schedule/${defaultValues.id}`,
          submitData
        )
      } else {
        return await postRequest<Schedule, ScheduleSubmit>(
          requestUri.schedule.post,
          submitData
        )
      }
    },
    [defaultValues]
  )
  return (
    <MypageLayout title="スケジュール" supplyUserId={handleSupply}>
      <div className="container">
        <MypageTitle>スケジュール</MypageTitle>
      </div>
      <section>
        <UserField users={memberList} onChange={handleTarget} />
        <ScheduleForm
          defaultValues={defaultValues}
          open={open}
          setOpen={setOpen}
          fixedMember={fixedMember}
          sharedBy={ownerId}
          req={saveReq}
          onSuccess={handleSuccess}
          onDelete={handleDelete}
          dialogTitle={
            defaultValues.id !== undefined
              ? 'スケジュールの更新'
              : 'スケジュールの登録'
          }
        />
        <div className="container">
          <CustomCalendar
            initialEvents={scheduleEvents}
            onEventClick={handleEventClick}
            onDateClick={handleDateClick}
            onEventChange={handleEventChange}
          />
        </div>
        <ConfirmDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          onExec={execDelete}
          isCircular
          loading={deleteLoading}
        />
      </section>
    </MypageLayout>
  )
}

export default Index
