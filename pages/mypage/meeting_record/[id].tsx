import React, { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import router, { useRouter, SingletonRouter } from 'next/router'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { httpClient } from '@/api/useApi'
import requests from '@/Requests'
import { AxiosResponse } from 'axios'
import { MypageLayout } from '@/layouts'
import { Typography } from '@material-ui/core'
import { MeetingRecord } from '@/interfaces/models'
import Custom404Page from '@/pages/404'

const useStyles = makeStyles((theme: Theme) => ({}))

const MeetingRecordDetail = () => {
  const classes = useStyles()
  const router = useRouter()
  const [data, setData] = useState<MeetingRecord | null>(null)
  const [error, setError] = useState<any | null>(null)
  const paramId = router.query.id
  useEffect(() => {
    const fetch = async () => {
      if (paramId !== undefined) {
        await httpClient
          .get(requests.meetingRecord.id + `/${paramId}`)
          .then((res: AxiosResponse) => {
            setData(res.data)
          })
          .catch((err) => {
            setError(err.response)
            // console.log(err.response)
          })
      }
    }
    fetch()
  }, [paramId])
  return (
    <MypageLayout>
      {error !== null ? (
        error.status === 404 && <Custom404Page />
      ) : (
        <>
          <Typography variant="h2" gutterBottom>
            {data !== null && data.title}
          </Typography>
          <section></section>
        </>
      )}
    </MypageLayout>
  )
}

export default MeetingRecordDetail
