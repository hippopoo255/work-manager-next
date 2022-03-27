import React from 'react'
import { useLocale } from '@/hooks'
import styles from '@/assets/scss/Module/notification-panel.module.scss'
import clsx from 'clsx'

// mui
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Product } from '@/interfaces/common'

import {
  MeetingRecordIcon,
  ScheduleIcon,
  ChatIcon,
} from '@/components/atoms/icons'

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
    <div className={styles.root}>
      <div className={styles.inner}>
        <h2 className={styles['catch-copy']}>{'Notification'.toUpperCase()}</h2>
        <div className={styles.main}>
          <div className={styles.image}>
            <div
              className={clsx([
                styles['notification-icon'],
                styles['--schedule'],
              ])}
            ></div>
            <div
              className={clsx([styles['notification-icon'], styles['--task']])}
            ></div>
            <div
              className={clsx([styles['notification-icon'], styles['--chat']])}
            ></div>
          </div>
          <h4>
            メール通知で当日のスケジュールや
            <br />
            締切間近のタスクも手軽に管理できます
          </h4>
        </div>
        <ul className={styles.points}>
          <li className={styles.point}>
            <div className={styles.item}>
              <div
                className={clsx([styles['item__icon'], styles['--time']])}
              ></div>
              <div className={styles['item__text']}>
                <span>{'当日の予定を\n毎朝お届け'}</span>
              </div>
            </div>
          </li>
          <li className={styles.point}>
            <div className={styles.item}>
              <div
                className={clsx([styles['item__icon'], styles['--task']])}
              ></div>
              <div className={styles['item__text']}>
                <span>{'締切前のタスクを\n毎夕お届け'}</span>
              </div>
            </div>
          </li>
          <li className={styles.point}>
            <div className={styles.item}>
              <div
                className={clsx([styles['item__icon'], styles['--chat']])}
              ></div>
              <div className={styles['item__text']}>
                <span>{'チャットの\n新着投稿時'}</span>
              </div>
            </div>
          </li>
          <li className={styles.point}>
            <div className={styles.item}>
              <div className={clsx([styles['item__icon']])}></div>
              <div className={styles['item__text']}>
                <span>{'他のユーザーとスケジュール共有時'}</span>
              </div>
            </div>
          </li>
          <li className={styles.point}>
            <div className={styles.item}>
              <div
                className={clsx([styles['item__icon'], styles['--minutes']])}
              ></div>
              <div className={styles['item__text']}>
                <span>{'参加した会議の議事録がアップされた時'}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NotificationPanel
