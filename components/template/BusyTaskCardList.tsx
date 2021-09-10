import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { BusyTaskCard } from '@/components/organisms'
import { requestUri, getRequest } from '@/api'
import { BusyTaskList } from '@/interfaces/models/BusyTaskList'
import { COLLAPSE_COUNT } from '@/lib/util'

type Props = {
  fixedHeightPaper: any
}

// eslint-disable-next-line react/display-name
const BusyTaskCardList = React.memo(({ fixedHeightPaper }: Props) => {
  const [busyTasks, setBusyTasks] = useState<BusyTaskList | null>(null)

  useEffect(() => {
    let unmounted = false
    const init = async () => {
      getRequest<BusyTaskList>(requestUri.task.myBusyTask).then((data) => {
        if (!unmounted) {
          setBusyTasks(data)
        }
      })
    }
    init()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <Grid container spacing={3}>
      {busyTasks !== null ? (
        (Object.keys(busyTasks) as (keyof BusyTaskList)[]).map((flag) => (
          <Grid item xs={12} md={6} key={`tasks_${flag}`}>
            <BusyTaskCard
              wrapClasses={fixedHeightPaper}
              tasks={busyTasks[flag]}
              flag={flag}
              collapse={busyTasks[flag].length > COLLAPSE_COUNT}
            />
          </Grid>
        ))
      ) : (
        <>
          <Grid item xs={12} md={6}>
            <BusyTaskCard
              wrapClasses={fixedHeightPaper}
              tasks={[]}
              flag={'over'}
              collapse={false}
              loading
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BusyTaskCard
              wrapClasses={fixedHeightPaper}
              tasks={[]}
              flag={'warning'}
              collapse={false}
              loading
            />
          </Grid>
        </>
      )}
    </Grid>
  )
})

export default BusyTaskCardList
