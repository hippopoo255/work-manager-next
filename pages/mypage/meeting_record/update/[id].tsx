// import { GetStaticProps, GetStaticPaths } from 'next'
import React from 'react'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { FormTitle, CustomLoader } from '@/components/molecules'
import { Box } from '@material-ui/core'
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined'
import { requestUri } from '@/api'
import { User } from '@/interfaces/models'
import { MeetingRecordForm } from '@/components/template'
import { MeetingRecord } from '@/interfaces/models'
import { MeetingRecordInputs, MemberInputs } from '@/interfaces/form/inputs'
import { PROCESS_FLAG } from '@/lib/util'
import { Breadcrumbs } from '@/components/molecules'
import { BreadcrumbItem } from '@/interfaces/common'
import { useInitialConnector, useMeetingRecord } from '@/hooks'

const MeetingRecordUpdate = () => {
  const {
    save,
    classes,
    defaultValues,
    meetingPlaceList,
    meetingRecordId,
    memberList,
    setDefaultValues,
  } = useMeetingRecord()

  const fixedMember: MemberInputs[] = []

  const { loading } = useInitialConnector<MeetingRecord>({
    path: requestUri.meetingRecord.id + `/${meetingRecordId}`,
    onSuccess: (meetingRecord: MeetingRecord) => {
      setDefaultValues(() => {
        const d = {
          recorded_by: meetingRecord.recorded_by.id,
          title: meetingRecord.title,
          summary: meetingRecord.summary,
          place_id: meetingRecord.place_id,
          role_id: meetingRecord.role_id,
          meeting_date: new Date(meetingRecord.meeting_date),
          members: meetingRecord.members.map((member: User) => ({
            id: member.id,
            full_name: member.full_name,
          })),
          meeting_decisions: meetingRecord.decisions.map((decision) => ({
            subject: decision.subject,
            body: decision.body,
            written_by: decision.written_by.id,
            decided_by:
              decision.decided_by === null ? null : decision.decided_by.id,
            id: decision.id,
            flag: PROCESS_FLAG.updateFlag,
          })),
        }
        return { ...d }
      })
    },
    condition: !!meetingRecordId,
    depend: meetingRecordId,
  })

  const handleUpdate = (data: MeetingRecordInputs) => {
    setDefaultValues(data)
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
      to: '/mypage/meeting_record',
      label: '議事録一覧',
    },
    {
      label: defaultValues.title,
    },
  ]

  return (
    <MypageLayout title="議事録更新">
      <div className="container">
        <Breadcrumbs links={breadcrumbs} />
        <MypageTitle>{defaultValues.title}</MypageTitle>
      </div>
      <section className="container">
        <Box className={classes.wrap}>
          <FormTitle title={'更新フォーム'} icon={<MenuBookOutlinedIcon />} />
        </Box>
        {loading ? (
          <CustomLoader />
        ) : (
          <MeetingRecordForm
            memberList={memberList}
            fixedMember={fixedMember}
            defaultValues={defaultValues}
            req={save}
            classes={classes}
            meetingPlaceList={meetingPlaceList}
            handleSuccess={handleUpdate}
          />
        )}
      </section>
    </MypageLayout>
  )
}

export default MeetingRecordUpdate
