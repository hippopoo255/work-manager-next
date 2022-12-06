import React, { useState, useEffect } from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { Schedule } from '@/interfaces/models'
import { List, ListItem, Avatar } from '@material-ui/core'
import { ScheduleIcon } from '@/components/atoms/icons'
import { toStrLabel, scheduleLabel } from '@/lib/util'
import { DashboardBaseCard } from '@/components/organisms'
import { Header, FooterLink } from '@/interfaces/common/dashboard'
import { requestUri } from '@/api'
import { CardItemBar } from '@/components/molecules'
import { linerGradient } from '@/assets/color/gradient'
import { useLocale, useInitialConnector } from '@/hooks'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerColor: {
      borderImage: linerGradient.secondary,
      borderBottom: '2px solid',
      borderImageSlice: 1,
    },
    headerTitle: {
      fontWeight: theme.typography.fontWeightBold,
      background: linerGradient.secondary,
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
    },
    subHeaderColor: {
      background: linerGradient.secondary,
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
    },
    avatar: {
      background: linerGradient.secondary,
    },
    loaderColor: {
      color: theme.palette.secondary.main,
    },
  })
)

type Props = {
  wrapClasses: any
}

// eslint-disable-next-line react/display-name
const DailyScheduleCard = React.memo(({ wrapClasses }: Props) => {
  const classes = useStyles()
  const { t } = useLocale()
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const { loading } = useInitialConnector<Schedule[]>({
    path: requestUri.schedule.myDaily,
    onSuccess: (schedules) => setSchedules(schedules),
  })

  const header: Header = {
    avatar: (
      <Avatar className={classes.avatar}>
        <ScheduleIcon />
      </Avatar>
    ),
    title: t.mypage.dailySchedule,
    subTitle: toStrLabel(new Date(), true, t),
  }
  const footerLink: FooterLink = {
    to: '/mypage/schedule',
    color: 'secondary',
    text: t.common.showCalendar,
  }

  return (
    <DashboardBaseCard
      header={header}
      footerLink={footerLink}
      wrapClasses={wrapClasses}
      classes={{
        headerColor: classes.headerColor,
        loaderColor: classes.loaderColor,
        headerTitle: classes.headerTitle,
        subHeaderColor: classes.subHeaderColor,
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
