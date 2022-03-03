import React from 'react'
import { useLocale } from '@/hooks'
import styles from '@/assets/scss/Object/Project/p-panel.module.scss'
import clsx from 'clsx'

// mui
import { Box } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Product } from '@/interfaces/common'
import { Hidden } from '@material-ui/core'

import { PaperLabel } from '@/components/molecules'
import { FullPhotoPaper } from '@/components/atoms'
import {
  MeetingRecordIcon,
  ScheduleIcon,
  ChatIcon,
  TaskIcon,
} from '@/components/atoms/icons'

import { RoundedIcon } from '@/components/molecules/top'

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    marginTop: '16px',
    width: '100%',
    maxWidth: 320,
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  inner: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    padding: theme.spacing(0, 2),
  },
  paperLabel: {
    position: 'relative',
    // bottom: '-16px',
    left: -16,
    width: 300,
    [theme.breakpoints.down('xs')]: {
      right: '-16px',
      width: 240,
    },
  },
  operator: {
    margin: `${theme.spacing(8)}px auto auto`,
    maxWidth: 320,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 480,
    },
  },
  card: {
    opacity: 0,
  },
}))

type Props = {
  active: boolean
}

const NotificationPanel = ({ active = true }: Props) => {
  const { t } = useLocale()
  const classes = useStyles()

  const notificationList: Product[] = [
    {
      id: 'minutes',
      title: '議事録',
      description: '追加された議事録の参加者欄に、あなたが加えられていた時',
      bgImage: 'image_meeting.jpg',
      icon: <MeetingRecordIcon fontSize="24" />,
    },
    {
      id: 'schedule',
      title: 'スケジュール',
      description: '他のユーザーがあなたとスケジュールを共有した時',
      bgImage: 'image_schedule.jpg',
      icon: <ScheduleIcon fontSize="24" />,
    },
    {
      id: 'chat',
      title: 'チャット',
      description: '参加中のチャットグループに新着メッセージが届いた時',
      bgImage: 'image_chat.jpg',
      icon: <ChatIcon fontSize="24" />,
    },
  ]

  return (
    <div className={clsx([styles.root, styles['--notification']])}>
      <div className={clsx([styles.bg, styles['--notification']])}></div>
      <div className={clsx(['u-container', styles.content])}>
        <div className={styles.items}>
          <div className={clsx([styles.item, styles.first])}>
            <div className="u-my-6">
              <h3 className={styles.title}>{'Notification'.toUpperCase()}</h3>
              <div className={clsx([styles['sub-title'], 'u-text-center'])}>
                <span className={styles.description}>メール通知</span>
              </div>
            </div>
          </div>
          <div className={clsx([styles.item, styles.second])}>
            <ul className={styles.cards}>
              {notificationList.length > 0 &&
                notificationList.map((itm: Product) => (
                  <li key={itm.id} className={styles.cards__item}>
                    <Hidden xsDown implementation="css">
                      <Box className={classes.inner}>
                        <FullPhotoPaper src={itm.bgImage} />
                        <Box className={classes.paperLabel}>
                          <PaperLabel item={itm} />
                        </Box>
                      </Box>
                    </Hidden>
                    <Hidden smUp implementation="css">
                      <div className={'u-flex__align-center gap-2'}>
                        <div className="u-flex__static">
                          <RoundedIcon
                            sizes={{ width: 40, height: 40 }}
                            icon={itm.icon}
                            id={itm.id}
                          />
                        </div>
                        <span className={clsx([styles['timing'], 'u-ml-2'])}>
                          {itm.description}
                        </span>
                      </div>
                    </Hidden>
                  </li>
                ))}
              <Hidden smUp implementation="css">
                <li className={styles.cards__item}>
                  <div className={'u-flex__align-center'}>
                    <div className="u-flex__static">
                      <RoundedIcon
                        sizes={{ width: 40, height: 40 }}
                        icon={<TaskIcon />}
                        id={'task'}
                      />
                    </div>
                    <span className={clsx([styles['timing'], 'u-ml-2'])}>
                      翌日に迫ったタスクを夕方にお届け
                    </span>
                  </div>
                </li>
              </Hidden>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationPanel
