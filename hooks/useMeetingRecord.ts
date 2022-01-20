import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { MeetingRecordInputs } from '@/interfaces/form/inputs'
import { MeetingRecordSubmit } from '@/interfaces/form/submit'
import { useMemberList, useMeetingPlaceList, useAuth } from '@/hooks'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { requestUri } from '@/api'
import { useRestApi } from '@/hooks'
import { MeetingRecord, MeetingPlace } from '@/interfaces/models'
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
    color: theme.palette.common.white,
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

const useMeetingRecord = () => {
  const { auth, config, router } = useAuth()
  const { postMethod, putMethod } = useRestApi()
  const paramId = router.query.id || 0
  const meetingRecordId = useMemo(() => paramId, [paramId])
  const [defaultValues, setDefaultValues] = useState<MeetingRecordInputs>({
    recorded_by: auth.user.id,
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
        written_by: auth.user.id,
        decided_by: null,
      },
    ],
  })

  const { memberList } = useMemberList({ sharedBy: 0 })
  const { meetingPlaceList } = useMeetingPlaceList({
    paramId,
  })

  const classes = useStyles()

  const store = useCallback(
    async (submitData: MeetingRecordSubmit) =>
      await postMethod<MeetingRecord, MeetingRecordSubmit>(
        requestUri.meetingRecord.post,
        submitData
      ),
    [meetingRecordId, auth]
  )

  const update = useCallback(
    async (submitData: MeetingRecordSubmit) =>
      await putMethod<MeetingRecord, MeetingRecordSubmit>(
        `${requestUri.meetingRecord.put}/${meetingRecordId}`,
        submitData
      ),
    [meetingRecordId, auth]
  )

  const save = useCallback(
    async (submitData: MeetingRecordSubmit) => {
      if (meetingRecordId > 0) {
        return await update(submitData)
      } else {
        return await store(submitData)
      }
    },
    [meetingRecordId, auth]
  )

  return {
    auth,
    classes,
    defaultValues,
    memberList,
    meetingPlaceList,
    meetingRecordId,
    save,
    setDefaultValues,
    store,
    update,
  }
}

export default useMeetingRecord
