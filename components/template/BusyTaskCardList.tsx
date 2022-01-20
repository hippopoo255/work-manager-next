import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { BusyTaskCard } from '@/components/organisms'
import { requestUri } from '@/api'
import { BusyTaskList } from '@/interfaces/models/BusyTaskList'
import { COLLAPSE_COUNT } from '@/lib/util'
import { useInitialConnector } from '@/hooks'

type Props = {
  fixedHeightPaper: any
}

// eslint-disable-next-line react/display-name
const BusyTaskCardList = React.memo(({ fixedHeightPaper }: Props) => {
  const [busyTasks, setBusyTasks] = useState<BusyTaskList | null>(null)
  const { loading } = useInitialConnector<BusyTaskList>({
    path: requestUri.task.myBusyTask,
    onSuccess: (data) => setBusyTasks(data),
  })

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
