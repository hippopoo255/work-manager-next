import { GetStaticProps, GetStaticPaths } from 'next'
import React, { useState, useMemo, useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { FormTitle } from '@/components/molecules'
import { Avatar, Typography, Box } from '@material-ui/core'
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined'
import { putRequest, getRequest, requestUri } from '@/api'
import { User } from '@/interfaces/models'
import { MeetingRecordForm } from '@/components/template'
import { MeetingRecord, MeetingPlace } from '@/interfaces/models'
import { MeetingRecordInputs, MemberInputs } from '@/interfaces/form/inputs'
import { MeetingRecordSubmit } from '@/interfaces/form/submit'
import { useRouter } from 'next/router'
import { PROCESS_FLAG } from '@/lib/util'
export type Props = {
  meetingPlaceList: MeetingPlace[]
}

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    maxWidth: 800,
    // marginBottom: theme.spacing(4),
  },
  head: {
    width: '100%',
    padding: `${theme.spacing(2)}px 0`,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
    },
  },
  body: {
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  stepper: {
    width: '100%',
    padding: 0,
  },
  stepperCol: {
    padding: 0,
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  tail: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  form: {
    width: '100%',
  },
  minHeight: {
    minHeight: 180,
  },
  deleteRow: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    cursor: 'pointer',
  },
  // submitBtn: {
  //   color: '#fff',
  // },
  avatar: {
    margin: theme.spacing(1),
    background: 'linear-gradient(135deg,#fad961,#f76b1c)',
    boxShadow: theme.shadows[2],
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  tailWrap: {
    position: 'relative',
  },
  tailBody: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const MeetingRecordUpdate = ({ meetingPlaceList }: Props) => {
  const classes = useStyles()
  const router = useRouter()
  const paramId = router.query.id
  const meetingRecordId = useMemo(() => paramId, [paramId])
  // react hook form
  const req = async (submitData: MeetingRecordSubmit) =>
    await putRequest<MeetingRecord, MeetingRecordSubmit>(
      `${requestUri.meetingRecord.put}/${meetingRecordId}`,
      submitData
    )

  // Autocomlete members
  const [memberList, setMemberList] = useState<MemberInputs[]>([])
  const [userId, setUserId] = useState<number>(0)
  const [defaultValues, setDefaultValues] = useState<MeetingRecordInputs>({
    recorded_by: userId,
    title: '',
    summary: '',
    place_id: 1,
    role_id: null,
    meeting_date: new Date(),
    members: [],
    meeting_decisions: [
      {
        subject: '',
        body: '',
        written_by: 1,
        decided_by: null,
      },
    ],
  })
  const fixedMember: MemberInputs[] = []

  useEffect(() => {
    const fetch = async () => {
      await getRequest<User[]>(requestUri.user.list).then((users: User[]) => {
        const dataList: MemberInputs[] = users.map((u) => ({
          id: u.id,
          full_name: u.full_name,
        }))
        setMemberList(dataList)
      })
    }
    fetch()
  }, [])

  useEffect(() => {
    const fetchUpdateRecord = async () => {
      if (paramId !== undefined) {
        return await getRequest<MeetingRecord>(
          requestUri.meetingRecord.id + `/${paramId}`
        ).then((meetingRecord: MeetingRecord) => {
          setDefaultValues({
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
          })
        })
      }
    }
    fetchUpdateRecord()
  }, [paramId])

  const handleUpdate = (data: MeetingRecordInputs) => {
    setDefaultValues(data)
  }

  return (
    <MypageLayout title="議事録更新">
      <MypageTitle>{defaultValues.title}</MypageTitle>
      <Box className={classes.wrap}>
        <FormTitle title={'更新フォーム'} icon={<MenuBookOutlinedIcon />} />
      </Box>
      <MeetingRecordForm
        memberList={memberList}
        fixedMember={fixedMember}
        defaultValues={defaultValues}
        req={req}
        classes={classes}
        meetingPlaceList={meetingPlaceList}
        handleSuccess={handleUpdate}
      />
    </MypageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getRequest<number[]>(requestUri.meetingRecord.ids).then(
    (ids: number[]) =>
      ids.map((id: number) => ({
        params: {
          id: String(id),
        },
      }))
  )

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const meetingPlaceList = await getRequest<MeetingPlace[]>(
    requestUri.meetingPlace.list
  ).then((meetingPlaceList: MeetingPlace[]) => meetingPlaceList)
  return {
    props: {
      meetingPlaceList,
    },
  }
}

export default MeetingRecordUpdate
