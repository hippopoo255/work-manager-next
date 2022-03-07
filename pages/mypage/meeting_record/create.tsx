import React, { useEffect, useMemo } from 'react'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { FormTitle, CustomLoader } from '@/components/molecules'
import { Box } from '@material-ui/core'
import { MeetingRecordIcon } from '@/components/atoms/icons'
import { MeetingRecordForm } from '@/components/template'
import { MeetingPlace } from '@/interfaces/models'
import { MemberInputs } from '@/interfaces/form/inputs'
import { Breadcrumbs } from '@/components/molecules'
import { BreadcrumbItem } from '@/interfaces/common'
import { useMeetingRecord } from '@/hooks'

const MeetingRecordCreate = () => {
  const {
    auth,
    save,
    classes,
    defaultValues,
    meetingPlaceList,
    setDefaultValues,
    memberList,
  } = useMeetingRecord()
  const fixedMember: MemberInputs[] = []

  useEffect(() => {
    if (auth.isLogin) {
      setDefaultValues((prev) => ({
        ...prev,
        created_by: auth.user.id,
        meeting_decisions: [
          {
            ...prev.meeting_decisions[0],
            created_by: auth.user.id,
          },
        ],
      }))
    }
  }, [auth])

  const loading = useMemo(
    () => meetingPlaceList.length === 0,
    [meetingPlaceList]
  )

  const breadcrumbs: BreadcrumbItem[] = [
    {
      to: '/mypage/meeting_record',
      label: '議事録一覧',
    },
    {
      label: '議事録追加',
    },
  ]

  return (
    <MypageLayout title="議事録追加">
      <div className="u-container">
        <Breadcrumbs links={breadcrumbs} />
        <MypageTitle>議事録</MypageTitle>
      </div>
      <section className="u-container">
        <Box className={classes.wrap}>
          <FormTitle title={'新規追加フォーム'} icon={<MeetingRecordIcon />} />
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
            saveAction="create"
          />
        )}
      </section>
    </MypageLayout>
  )
}

export default MeetingRecordCreate
