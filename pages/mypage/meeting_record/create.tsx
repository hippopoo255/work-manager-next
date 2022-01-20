import { GetStaticProps } from 'next'
import React, { useContext, useState, useMemo, useEffect } from 'react'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { FormTitle } from '@/components/molecules'
import { Box } from '@material-ui/core'
import { MeetingRecordIcon } from '@/components/atoms/icons'
import { getRequest, requestUri } from '@/api'
import { MeetingRecordForm } from '@/components/template'
import { MeetingPlace } from '@/interfaces/models'
import { MemberInputs } from '@/interfaces/form/inputs'
import { Breadcrumbs } from '@/components/molecules'
import { BreadcrumbItem } from '@/interfaces/common'
import { useMeetingRecord } from '@/hooks'

export type Props = {
  meetingPlaceList: MeetingPlace[]
}

const MeetingRecordCreate = ({ meetingPlaceList }: Props) => {
  const { save, classes, defaultValues, memberList } = useMeetingRecord()
  const fixedMember: MemberInputs[] = []

  const handleStore = () => {
    console.log('')
  }

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
      <div className="container">
        <Breadcrumbs links={breadcrumbs} />
        <MypageTitle>議事録</MypageTitle>
      </div>
      <section className="container">
        <Box className={classes.wrap}>
          <FormTitle title={'新規追加フォーム'} icon={<MeetingRecordIcon />} />
        </Box>
        <MeetingRecordForm
          memberList={memberList}
          fixedMember={fixedMember}
          defaultValues={defaultValues}
          req={save}
          classes={classes}
          meetingPlaceList={meetingPlaceList}
          handleSuccess={handleStore}
          saveAction="create"
        />
      </section>
    </MypageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const meetingPlaceList = await getRequest<MeetingPlace[]>(
    requestUri.meetingPlace.list
  ).then((meetingPlaceList: MeetingPlace[]) => meetingPlaceList)
  return {
    props: {
      meetingPlaceList,
    },
  }
}

export default MeetingRecordCreate
