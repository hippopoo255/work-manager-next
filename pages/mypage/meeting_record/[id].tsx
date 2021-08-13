import React, { useEffect, useState, useMemo } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { AxiosResponse } from 'axios'
import router, { useRouter, SingletonRouter } from 'next/router'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { httpClient } from '@/api/useApi'
import requests from '@/Requests'
import { MypageLayout } from '@/layouts'
import { Box, Typography, Paper, Grid } from '@material-ui/core'
import { MeetingRecord, MeetingDecision, User } from '@/interfaces/models'
import { DefinitionListItem } from '@/interfaces/common'
import Custom404Page from '@/pages/404'
import { MypageTitle } from '@/components/atoms'
import { DefinitionList } from '@/components/organisms'
import { toStrFormalLabel } from '@/lib/util'

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
  const [error, setError] = useState<any | null>(null)
  const paramId = router.query.id
  useEffect(() => {
    const fetch = async () => {
      if (paramId !== undefined) {
        await httpClient
          .get(requests.meetingRecord.id + `/${paramId}`)
          .then((res: AxiosResponse) => {
            setMeetingRecord(res.data)
          })
          .catch((err) => {
            setError(err.response)
          })
      }
    }
    fetch()
  }, [paramId])

  const labels: { [k: string]: string } = {
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
  console.log('definitionList:', definitionList)
  return (
    <MypageLayout>
      {error !== null ? (
        error.status === 404 && <Custom404Page />
      ) : (
        <>
          <MypageTitle>
            {meetingRecord === null ? '' : meetingRecord.title}
          </MypageTitle>
          <section>
            <Paper className={classes.body}>
              <Grid container spacing={2} className={classes.minHeight}>
                <Grid item xs={12}>
                  <DefinitionList list={definitionList} />
                </Grid>
              </Grid>
            </Paper>
          </section>
        </>
      )}
    </MypageLayout>
  )
}

export default MeetingRecordDetail
