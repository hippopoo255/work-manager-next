import React, { useState, useMemo } from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { List, ListItem, Typography, IconButton } from '@material-ui/core'
import { DashboardBaseCard } from '@/components/organisms'
import {
  CardHeaderTitle,
  CardItemBar,
  MoreExpander,
} from '@/components/molecules'
import { TaskIcon } from '@/components/atoms/icons'
import { toStrLabel } from '@/lib/util'
import { Header, FooterLink } from '@/interfaces/common/dashboard'
import { Task } from '@/interfaces/models'
import { TaskStatusFlag } from '@/interfaces/enums/TaskStatusFlag'
import { linerGradient } from '@/assets/color/gradient'
import { customColor } from '@/assets/color/basic'
import { useLocale } from '@/hooks'

type ListProps = {
  classes: any
  tasks: Task[]
}

const TaskListLayout = ({ classes, tasks }: ListProps) => {
  const { t } = useLocale()
  return (
    <List disablePadding>
      {!!tasks.length ? (
        tasks.map((task) => (
          <div key={`task_${task.id}`}>
            <CardItemBar
              main={task.body}
              sub={toStrLabel(new Date(task.time_limit), false, t)}
              status={task.progress.name}
              key={`task_${task.id}`}
            />
          </div>
        ))
      ) : (
        <ListItem disableGutters>該当のタスクはありません。</ListItem>
      )}
    </List>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      fontSize: theme.typography.body2.fontSize,
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.text.secondary,
    },
    headerDanger: {
      background: linerGradient.red,
      color: theme.palette.common.white,
    },
    linkDanger: {
      color: customColor.red,
    },
    loaderDanger: {
      color: customColor.red,
    },
    headerWarning: {
      background: linerGradient.orange,
      // background: theme.palette.warning.main,
      color: theme.palette.common.white,
    },
    linkWarning: {
      color: theme.palette.warning.main,
    },
    loaderWarning: {
      color: theme.palette.warning.main,
    },
    loaderBasis: {
      color: theme.palette.secondary.main,
    },
  })
)

type Props = {
  wrapClasses: any
  tasks: Task[]
  flag: TaskStatusFlag
  collapse?: boolean
  loading?: boolean
}

const BusyTaskCard = ({
  wrapClasses,
  tasks,
  collapse,
  flag = 'safe',
  loading,
}: Props) => {
  const classes = useStyles()
  const { t, locale } = useLocale()
  const classOfStatus: {
    [k in TaskStatusFlag]: {
      linkColor: any
      headerColor: any
      loaderColor?: any
      adjective: string
      helpText?: React.ReactNode
      tooltip?: string
      footerLink?: string
    }
  } = useMemo(() => {
    return {
      over: {
        linkColor: classes.linkDanger,
        headerColor: classes.headerDanger,
        loaderColor: classes.loaderDanger,
        adjective: t.mypage.expiredTasks,
        helpText: (
          <Typography component={'div'} className={classes.description}>
            次のタスクを表示しています。
            <ul>
              <li>・期限を過ぎてから7日以内</li>
              <li>・状態が[未着手]または[作業中]</li>
            </ul>
          </Typography>
        ),
        tooltip: t.tooltip.qa(t.mypage.expiredTasks),
        footerLink: t.common.showExpiredTasks,
      },
      warning: {
        linkColor: classes.linkWarning,
        headerColor: classes.headerWarning,
        loaderColor: classes.loaderWarning,
        adjective: t.mypage.approachedTasks,
        helpText: (
          <Typography className={classes.description}>
            次のタスクを表示しています。
            <ul>
              <li>・期限が3日以内に迫っている</li>
              <li>・状態が[未着手]または[作業中]</li>
            </ul>
          </Typography>
        ),
        tooltip: t.tooltip.qa(t.mypage.approachedTasks),
        footerLink: t.common.showApproachedTasks,
      },
      safe: {
        linkColor: classes.linkWarning,
        headerColor: classes.headerWarning,
        adjective: '',
      },
    }
  }, [classes])

  const header: Header = {
    avatar: <TaskIcon />,
    title: (
      <CardHeaderTitle
        title={classOfStatus[flag].adjective}
        description={classOfStatus[flag].helpText}
        tooltip={classOfStatus[flag].tooltip || ''}
      />
    ),
    subTitle: tasks.length + t.unit.item,
  }
  const footerLink: FooterLink = {
    to: `/mypage/task?status=${flag}&sort_key=time_limit&order_by=asc`,
    color: 'inherit',
    text: classOfStatus[flag].footerLink || 'タスク一覧を見る',
  }
  const headerColor = classOfStatus[flag].headerColor
  const loaderColor = classOfStatus[flag].loaderColor || classes.loaderBasis
  const linkColor = classOfStatus[flag].linkColor

  return (
    <DashboardBaseCard
      wrapClasses={wrapClasses}
      header={header}
      footerLink={footerLink}
      loading={!!loading}
      classes={{
        headerColor: headerColor,
        loaderColor: loaderColor,
        linkColor: linkColor,
      }}
    >
      {!!collapse ? (
        <MoreExpander maxCount={tasks.length}>
          <TaskListLayout tasks={tasks} classes={classes} />
        </MoreExpander>
      ) : (
        <TaskListLayout tasks={tasks} classes={classes} />
      )}
    </DashboardBaseCard>
  )
}

export default BusyTaskCard
