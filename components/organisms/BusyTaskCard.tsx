import React, { useState, useMemo } from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { List, ListItem, Typography, Avatar } from '@material-ui/core'
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
      borderImage: linerGradient.red,
      borderBottom: '4px solid',
      borderImageSlice: 1,
    },
    headerTitleDanger: {
      fontWeight: theme.typography.fontWeightBold,
      background: linerGradient.red,
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
    },
    subHeaderColorDanger: {
      background: linerGradient.red,
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
    },
    linkDanger: {
      color: customColor.red,
    },
    loaderDanger: {
      color: customColor.red,
    },
    avatarDanger: {
      background: linerGradient.red,
    },
    headerWarning: {
      borderImage: linerGradient.orange,
      borderBottom: '4px solid',
      borderImageSlice: 1,
    },
    headerTitleWarning: {
      fontWeight: theme.typography.fontWeightBold,
      background: linerGradient.orange,
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
    },
    subHeaderColorWarning: {
      background: linerGradient.orange,
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
    },
    linkWarning: {
      color: theme.palette.warning.main,
    },
    loaderWarning: {
      color: theme.palette.warning.main,
    },
    avatarWarning: {
      background: linerGradient.orange,
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
      headerTitle: any
      subHeaderColor: any
      loaderColor?: any
      adjective: string
      helpText?: React.ReactNode
      tooltip?: string
      footerLink?: string
      avatar?: string
    }
  } = useMemo(() => {
    return {
      over: {
        linkColor: classes.linkDanger,
        headerColor: classes.headerDanger,
        headerTitle: classes.headerTitleDanger,
        subHeaderColor: classes.subHeaderColorDanger,
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
        avatar: classes.avatarDanger,
      },
      warning: {
        linkColor: classes.linkWarning,
        headerColor: classes.headerWarning,
        headerTitle: classes.headerTitleWarning,
        subHeaderColor: classes.subHeaderColorWarning,
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
        avatar: classes.avatarWarning,
      },
      safe: {
        linkColor: classes.linkWarning,
        headerColor: classes.headerWarning,
        headerTitle: classes.headerTitleWarning,
        subHeaderColor: classes.subHeaderColorWarning,
        adjective: '',
        avatar: classes.avatarWarning,
      },
    }
  }, [classes])

  const header: Header = {
    avatar: (
      <Avatar className={classOfStatus[flag].avatar}>
        <TaskIcon />
      </Avatar>
    ),
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
  const headerTitle = classOfStatus[flag].headerTitle
  const subHeaderColor = classOfStatus[flag].subHeaderColor
  const loaderColor = classOfStatus[flag].loaderColor || classes.loaderBasis
  const linkColor = classOfStatus[flag].linkColor

  return (
    <DashboardBaseCard
      header={header}
      footerLink={footerLink}
      wrapClasses={wrapClasses}
      loading={!!loading}
      classes={{
        headerColor,
        loaderColor,
        linkColor,
        headerTitle,
        subHeaderColor,
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
