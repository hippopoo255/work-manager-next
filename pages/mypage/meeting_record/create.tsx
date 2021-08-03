import React, { useState, useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { Avatar, Typography, Box } from '@material-ui/core'
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined'
import { postRequest, getRequest, requestUri } from '@/api'
import { User } from '@/interfaces/models'
import { MeetingRecordForm } from '@/components/template'
import { MeetingRecord } from '@/interfaces/models'
import { MeetingRecordInputs, MemberInputs } from '@/interfaces/form/inputs'
import { MeetingRecordSubmit } from '@/interfaces/form/submit'

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    maxWidth: 800,
  },
  head: {
    width: '100%',
    padding: theme.spacing(2),
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
  tail: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
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
  submitBtn: {
    color: '#fff',
  },
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

const MeetingRecordCreate = () => {
  const classes = useStyles()
  // react hook form
  const defaultValues: MeetingRecordInputs = {
    recorded_by: 1,
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
  }
  const req = async (submitData: MeetingRecordSubmit) =>
    await postRequest<MeetingRecord>(
      requestUri.meetingRecord.post,
      submitData,
      (err) => {
        console.error(err)
        throw err
      }
    )

  // Autocomlete members
  const [memberList, setMemberList] = useState<MemberInputs[]>([])
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

  return (
    <MypageLayout title="議事録追加">
      <MypageTitle>議事録</MypageTitle>
      <Box className={clsx([classes.wrap, classes.title])}>
        <Avatar className={classes.avatar}>
          <MenuBookOutlinedIcon />
        </Avatar>
        <Typography component="h3" variant="h5">
          新規追加フォーム
        </Typography>
      </Box>
      <MeetingRecordForm
        memberList={memberList}
        fixedMember={fixedMember}
        defaultValues={defaultValues}
        req={req}
        classes={classes}
      />
    </MypageLayout>
  )
}

export default MeetingRecordCreate
