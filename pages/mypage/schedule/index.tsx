import React, { useState } from 'react'
import { EventInput } from '@fullcalendar/common'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { useCalendar, ConfirmDialog } from '@/components/organisms'
import { ScheduleForm } from '@/components/template'
import {
  ScheduleInputs,
  MemberExtInputs,
  MemberInputs,
} from '@/interfaces/form/inputs'
import { ScheduleSubmit } from '@/interfaces/form/submit'
import { Schedule } from '@/interfaces/models'
import { defaultScheduleColor } from '@/lib/fullCalendar'
import { TextField, Grid } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { CustomAlert } from '@/components/atoms'
import { useMemberList, useSchedule } from '@/hooks'
import { CustomLoader } from '@/components/molecules'

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
    <div className={'u-container'}>
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
  const {
    alertStatus,
    auth,
    deleteSchedule,
    getSchedulesByUserId,
    loading,
    setLoading,
    formLoading,
    save,
    schedules,
    setAlertStatus,
    setTargetScheduleId,
    targetScheduleId,
    targetUserId,
    setTargetUserId,
  } = useSchedule({
    onListSuccess: (schedules: Schedule[]) =>
      setScheduleEvents(
        schedules.map((schedule) => ({
          id: String(schedule.id),
          title: schedule.title,
          start: new Date(schedule.start),
          end: new Date(schedule.end),
          color: !!schedule.color ? schedule.color : defaultScheduleColor,
          editable: schedule.can_edit,
        }))
      ),
  })
  const [open, setOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const authorId = auth.user.id
  const { memberList } = useMemberList({ sharedBy: authorId })
  const [defaultValues, setDefaultValues] = useState<ScheduleInputs>({
    created_by: authorId,
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
  const mine = targetUserId === authorId

  const { Calendar, scheduleEvents, setScheduleEvents } = useCalendar({
    schedules,
    setDefaultValues,
    afterFetchDefaultValues: () => setOpen(true),
    disabledSchedule: targetUserId > 0 && !mine,
    afterDateClick: () => setOpen(true),
    afterEventChange: async (
      submitData: ScheduleSubmit,
      targetScheduleId: number
    ) =>
      await save(submitData, targetScheduleId).then((schedule) => {
        handleSuccess(schedule)
      }),
  })

  const onAlertClose = () => {
    setAlertStatus((prev) => ({
      ...prev,
      show: false,
    }))
  }

  const handleTarget = async (
    event: React.ChangeEvent<{}>,
    targetMember: MemberInputs | null
  ) => {
    setTargetUserId(targetMember === null ? auth.user.id : targetMember.id)
    // ×ボタンの際はnullが入ってくる
    await getSchedulesByUserId(
      targetMember === null ? undefined : targetMember.id
    )
  }

  const handleSuccess = (newSchedule: Schedule) => {
    setScheduleEvents((prev: EventInput[]) => {
      const index = prev.findIndex(
        (event) => Number(event.id) === newSchedule.id
      )
      if (index !== -1) {
        // 更新処理後
        prev.splice(index, 1, {
          id: String(newSchedule.id),
          title: newSchedule.title,
          start: new Date(newSchedule.start),
          end: new Date(newSchedule.end),
          color: !!newSchedule.color ? newSchedule.color : defaultScheduleColor,
          editable: newSchedule.can_edit,
        })
      } else {
        // 新規登録処理後
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

  const handleDelete = (id?: number | string) => {
    setOpen(false)
    if (typeof id === 'number') {
      setTargetScheduleId(id)
    }
    setDeleteOpen(true)
  }

  const execDelete = async () => {
    await deleteSchedule().then(() => {
      setScheduleEvents((prev: EventInput[]) => {
        const index = prev.findIndex(
          (event) => Number(event.id) === targetScheduleId
        )
        if (index !== -1) {
          prev.splice(index, 1)
        }
        return [...prev]
      })
      setDeleteOpen(false)
    })
  }

  return (
    <MypageLayout title="スケジュール">
      <div className="u-container">
        <MypageTitle>スケジュール</MypageTitle>
      </div>
      <section>
        <UserField users={memberList} onChange={handleTarget} />
        <ScheduleForm
          defaultValues={defaultValues}
          open={open}
          setOpen={setOpen}
          fixedMember={fixedMember}
          sharedBy={authorId}
          req={save}
          onSuccess={handleSuccess}
          onDelete={handleDelete}
          dialogTitle={
            defaultValues.id !== undefined
              ? 'スケジュールの更新'
              : 'スケジュールの登録'
          }
        />
        <div className="u-container">
          {!loading ? <Calendar /> : <CustomLoader />}
        </div>
        <ConfirmDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          onExec={execDelete}
          isCircular
          loading={formLoading}
        />
      </section>
      <CustomAlert alertStatus={alertStatus} onClose={onAlertClose} />
    </MypageLayout>
  )
}

export default Index
