import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { getRequest, requestUri } from '@/api'
import { MypageLayout } from '@/layouts'
import { Box, Paper, Grid, Button } from '@material-ui/core'
import { MeetingRecord, MeetingDecision, User } from '@/interfaces/models'
import {
  DefinitionListItem,
  MeetingRecordTermKey,
} from '@/interfaces/common/definitionList'
import { BreadcrumbItem } from '@/interfaces/common'
import { MypageTitle } from '@/components/atoms'
import {
  Breadcrumbs,
  CircularButton,
  CustomLoader,
} from '@/components/molecules'
import { DefinitionList } from '@/components/organisms'
import { toStrFormalLabel } from '@/lib/util'
import Link from 'next/link'
const useStyles = makeStyles((theme: Theme) => ({
  body: {
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  minHeight: {
    minHeight: 180,
  },
  item: {
    '&:not(:first-of-type)': {
      marginTop: theme.spacing(3),
    },
  },
  groupTitle: {
    color: theme.palette.primary.main,
    margin: 0,
    lineHeight: 1.75,
    fontSize: theme.typography.fontSize,
  },
}))

const MeetingRecordDetail = () => {
  const classes = useStyles()
  const router = useRouter()
  const [meetingRecord, setMeetingRecord] = useState<MeetingRecord | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const paramId = router.query.id
  useEffect(() => {
    const fetch = async () => {
      if (paramId !== undefined) {
        await getRequest<MeetingRecord>(
          requestUri.meetingRecord.id + `/${paramId}`
        ).then((res) => {
          setMeetingRecord(res)
        })
      }
    }
    fetch()
  }, [paramId])

  const handleClick = async () => {
    setLoading(true)
    router.push(`/mypage/meeting_record/update/${paramId}`)
  }

  const labels: MeetingRecordTermKey = {
    recorded_by: '記録者',
    title: '会議名',
    meeting_date: '開催日時',
    place: '開催場所',
    summary: '概要',
    members: '参加者',
    decisions: '決定事項',
  }

  const definitionList: (DefinitionListItem | null)[] = useMemo(() => {
    return meetingRecord === null
      ? []
      : Object.keys(labels).map((key: string) => {
          let el: React.ReactNode
          if (key === 'decisions') {
            el = (
              <ul>
                {meetingRecord[key].length > 0 &&
                  meetingRecord[key].map((decision: MeetingDecision, index) => (
                    <Box
                      key={`decision_${index}`}
                      component={'li'}
                      className={classes.item}
                    >
                      <Box
                        component={'h5'}
                        className={classes.groupTitle}
                      >{`決定事項${index + 1}`}</Box>
                      <Box>件名：{decision.subject}</Box>
                      <Box>内容：{decision.body}</Box>
                    </Box>
                  ))}
              </ul>
            )
          } else if (key === 'members') {
            el = (
              <span>
                {meetingRecord[key]
                  .map((member: User) => member.full_name)
                  .join(' / ')}
              </span>
            )
          } else if (key === 'place') {
            el = <span>{meetingRecord.place.name}</span>
          } else if (key === 'meeting_date') {
            el = (
              <span>
                {toStrFormalLabel(new Date(meetingRecord.meeting_date))}
              </span>
            )
          } else if (key === 'recorded_by') {
            el = <span>{meetingRecord.recorded_by.full_name}</span>
          } else {
            el = <span>{meetingRecord[key]}</span>
          }
          return {
            term: labels[key],
            key,
            el,
          }
        })
  }, [meetingRecord])

  const links: BreadcrumbItem[] = [
    {
      to: '/mypage/meeting_record',
      label: '議事録一覧',
    },
    {
      label: meetingRecord !== null ? meetingRecord.title : '',
    },
  ]

  return (
    <MypageLayout>
      <Breadcrumbs links={links} />
      <MypageTitle>
        {meetingRecord === null ? '' : meetingRecord.title}
      </MypageTitle>
      <section>
        <Paper className={classes.body}>
          <Grid container spacing={2} className={classes.minHeight}>
            <Grid item xs={12}>
              {meetingRecord !== null ? (
                <DefinitionList list={definitionList} />
              ) : (
                <CustomLoader />
              )}
            </Grid>
            {meetingRecord !== null && (
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Link href={'/mypage/meeting_record'} passHref>
                      <Button variant={'outlined'} color={'default'}>
                        Back
                      </Button>
                    </Link>
                  </Grid>
                  {meetingRecord.is_editable && (
                    <Grid item>
                      <Link href={`/mypage/meeting_record/update/${paramId}`}>
                        <a>
                          <CircularButton
                            loading={loading}
                            options={{ variant: 'outlined' }}
                            color={'primary'}
                            submitText={'編集画面へ'}
                            onClick={handleClick}
                          />
                        </a>
                      </Link>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Paper>
      </section>{' '}
    </MypageLayout>
  )
}

export default MeetingRecordDetail
