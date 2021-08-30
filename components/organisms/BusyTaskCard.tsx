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

type ListProps = {
  classes: any
  tasks: Task[]
}

const TaskListLayout = ({ classes, tasks }: ListProps) => {
  return (
    <List disablePadding>
      {!!tasks.length ? (
        tasks.map((task) => (
          <div key={`task_${task.id}`}>
            <CardItemBar
              main={task.body}
              sub={toStrLabel(new Date(task.time_limit)) + 'まで'}
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
      // backgroundColor: '#f50057',
      color: theme.palette.common.white,
    },
    linkDanger: {
      color: '#f50057',
    },
    headerWarning: {
      background: linerGradient.orange,
      // background: theme.palette.warning.main,
      color: theme.palette.common.white,
    },
    linkWarning: {
      color: theme.palette.warning.main,
    },
  })
)

type Props = {
  wrapClasses: any
  tasks: Task[]
  flag: TaskStatusFlag
  collapse?: boolean
}

const BusyTaskCard = ({
  wrapClasses,
  tasks,
  collapse,
  flag = 'safe',
}: Props) => {
  const classes = useStyles()

  const classOfStatus: {
    [k in TaskStatusFlag]: {
      linkColor: any
      headerColor: any
      adjective: string
      helpText?: React.ReactNode
      tooltip?: string
    }
  } = useMemo(() => {
    return {
      over: {
        linkColor: classes.linkDanger,
        headerColor: classes.headerDanger,
        adjective: '期限を過ぎた',
        helpText: (
          <Typography component={'div'} className={classes.description}>
            次のタスクを表示しています。
            <ul>
              <li>・期限を過ぎてから7日以内</li>
              <li>・状態が[未着手]または[作業中]</li>
            </ul>
          </Typography>
        ),
        tooltip: '期限を過ぎたタスクとは？',
      },
      warning: {
        linkColor: classes.linkWarning,
        headerColor: classes.headerWarning,
        adjective: '期限が近い',
        helpText: (
          <Typography className={classes.description}>
            次のタスクを表示しています。
            <ul>
              <li>・期限が3日以内に迫っている</li>
              <li>・状態が[未着手]または[作業中]</li>
            </ul>
          </Typography>
        ),
        tooltip: '期限が近いタスクとは？',
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
        title={classOfStatus[flag].adjective + 'タスク'}
        description={classOfStatus[flag].helpText}
        tooltip={classOfStatus[flag].tooltip || ''}
      />
    ),
    subTitle: `${tasks.length}件`,
  }
  const footerLink: FooterLink = {
    to: `/mypage/task?status=${flag}&sort_key=time_limit&order_by=asc`,
    color: 'inherit',
    text: 'タスク一覧画面へ',
  }
  const headerColor = classOfStatus[flag].headerColor
  const linkColor = classOfStatus[flag].linkColor

  return (
    <DashboardBaseCard
      wrapClasses={wrapClasses}
      header={header}
      footerLink={footerLink}
      classes={{
        headerColor: headerColor,
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
