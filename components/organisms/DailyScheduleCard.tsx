import React, { useState, useEffect } from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { Schedule } from '@/interfaces/models'
import { List, ListItem } from '@material-ui/core'
import { ScheduleIcon } from '@/components/atoms/icons'
import { toStrLabel, scheduleLabel } from '@/lib/util'
import { DashboardBaseCard } from '@/components/organisms'
import { Header, FooterLink } from '@/interfaces/common/dashboard'
import { requestUri, getRequest } from '@/api'
import { CardItemBar } from '@/components//molecules'
import { linerGradient } from '@/assets/color/gradient'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerColor: {
      background: linerGradient.secondary,
      color: theme.palette.common.white,
    },
    loaderColor: {
      color: theme.palette.secondary.main,
    },
  })
)

const header: Header = {
  avatar: <ScheduleIcon />,
  title: '本日の予定',
  subTitle: toStrLabel(new Date(), true),
}

const footerLink: FooterLink = {
  to: '/mypage/schedule',
  color: 'secondary',
  text: 'カレンダーを見る',
}

type Props = {
  wrapClasses: any
}

// eslint-disable-next-line react/display-name
const DailyScheduleCard = React.memo(({ wrapClasses }: Props) => {
  const classes = useStyles()
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true
    const init = async () => {
      setLoading(true)
      getRequest<Schedule[]>(requestUri.schedule.myDaily)
        .then((data) => {
          if (isMounted) {
            setSchedules(data)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
    init()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <DashboardBaseCard
      header={header}
      footerLink={footerLink}
      wrapClasses={wrapClasses}
      classes={{
        headerColor: classes.headerColor,
        loaderColor: classes.loaderColor,
      }}
      loading={loading}
    >
      <List disablePadding>
        {!!schedules.length ? (
          schedules.map((schedule) => (
            <div key={`schedule_${schedule.id}`}>
              <CardItemBar
                sub={scheduleLabel(
                  new Date(schedule.start),
                  new Date(schedule.end)
                )}
                main={schedule.title}
                status={!!schedule.is_public ? '公開' : '非公開'}
              />
            </div>
          ))
        ) : (
          <ListItem disableGutters>本日の予定はありません。</ListItem>
        )}
      </List>
    </DashboardBaseCard>
  )
})

export default DailyScheduleCard
