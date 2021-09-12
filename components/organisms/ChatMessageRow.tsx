import React, { useMemo } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Typography, List, ListItem } from '@material-ui/core'
import { CustomMenuBox } from '.'
import { HelpBox } from '@/components/molecules'
import { ChatMessage, User } from '@/interfaces/models'
import { UserAvatar } from '@/components/atoms'
import styles from '@/assets/stylesheets/pages/ChatDetail.module.scss'
import { postTiming, STORAGE_URL } from '@/lib/util'

const useStyles = makeStyles((theme: Theme) => ({
  msgItem: {
    width: '100%',
    display: 'flex',
    gap: theme.spacing(2),
    maxWidth: 320,
    [theme.breakpoints.up('md')]: {
      maxWidth: 420,
    },
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  myMsgItem: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    paddingRight: 0,
    paddingLeft: theme.spacing(2),
  },
  sentAvatar: {
    minWidth: theme.spacing(5),
    marginTop: theme.spacing(3),
    flexShrink: 0,
  },
  horizontal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  msgMeta: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: `0 4px`,
    gap: theme.spacing(2),
  },
  msgUserName: {
    color: theme.palette.text.hint,
    fontWeight: theme.typography.fontWeightBold,
  },
  msgTime: {
    color: theme.palette.text.hint,
    fontWeight: theme.typography.fontWeightBold,
  },
  msgContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  mine: {
    alignItems: 'flex-end',
  },
  msgBody: {
    position: 'relative',
    marginTop: 4,
    marginBottom: 4,
    lineHeight: theme.typography.body1.lineHeight,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightBold,
  },
  msgUpdate: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: 'translate3d(0, 100%, 0)',
    pointerEvents: 'none',
    color: theme.palette.text.hint,
    fontFamily: theme.typography.caption.fontFamily,
    fontSize: theme.typography.caption.fontSize,
    alignSelf: 'flex-end',
    order: 0,
    flexShrink: 0,
    wordBreak: 'keep-all',
  },
  msgMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'translate3d(-100%, -10px, 0)',
  },
  msgRead: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    transform: 'translate3d(100%, 0, 0)',
    color: theme.palette.text.hint,
    fontWeight: theme.typography.fontWeightBold,
    cursor: 'pointer',
  },
  previewList: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    overflow: 'hidden',
    borderRadius: '0 0 12px 12px / 0px 0 12px 12px',
  },
  previewItem: {
    flexGrow: 1,
    flexBasis: '50%',
    minWidth: 80,
  },
  previewSrc: {
    width: '100%',
    height: 0,
    paddingBottom: '100%',
    backgroundColor: theme.palette.grey[200],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'block',
  },
  myRead: {
    left: -2,
    right: 'initial',
    transform: 'translate3d(-100%, 0, 0)',
  },
  none: {
    display: 'none',
  },
}))

export type Props = {
  message: ChatMessage
  mine: boolean
  onEdit: (id: number, index?: number) => void
  onDelete: (id: number) => void
  index: number
}

const ChatMessageRow = ({ message, mine, onEdit, onDelete, index }: Props) => {
  const classes = useStyles()

  const readText: string = !!message.chat_message_reads.length
    ? '既読' + message.chat_message_reads.length
    : ''
  const msgMenuOptions = useMemo(
    () => [
      {
        text: '編集',
        onClick: (id: number, index?: number) => {
          onEdit(id, index)
        },
      },
      {
        text: '削除',
        onClick: (id: number) => onDelete(id),
        danger: true,
      },
    ],
    []
  )

  const Point = () => {
    return (
      <Typography
        component={'span'}
        variant="caption"
        style={{ fontWeight: 700 }}
      >
        {readText}
      </Typography>
    )
  }

  const ReadList = () => {
    return (
      <List dense>
        {message.chat_message_reads.length > 0 &&
          message.chat_message_reads.map((messageRead: User) => (
            <ListItem key={messageRead.id}>{messageRead.full_name}</ListItem>
          ))}
      </List>
    )
  }

  return (
    <ul
      className={clsx(classes.msgItem, {
        [classes.myMsgItem]: mine,
      })}
    >
      <li
        className={clsx(classes.sentAvatar, {
          [classes.none]: mine,
        })}
      >
        <UserAvatar user={message.written_by} />
      </li>
      <li
        className={clsx(classes.msgContent, {
          [classes.mine]: mine,
        })}
      >
        {/* 投稿者、投稿日時 */}
        <div className={classes.msgMeta}>
          <Typography
            className={clsx(classes.msgUserName, {
              [classes.none]: mine,
            })}
            component={'span'}
            variant="caption"
          >
            {message.written_by.full_name}
          </Typography>
          <Typography
            className={classes.msgTime}
            component={'span'}
            variant="caption"
          >
            {postTiming(new Date(message.created_at!))}
          </Typography>
        </div>
        {/* メッセージ本文 */}
        <div className={classes.msgBody}>
          <span
            className={clsx(classes.msgMenu, {
              [classes.none]: !(mine && !message.isDelete),
            })}
          >
            <CustomMenuBox
              options={msgMenuOptions}
              small
              horizon
              id={message.id}
              index={index}
            />
          </span>
          {/* 既読 */}
          <div
            className={clsx(classes.msgRead, {
              [classes.myRead]: mine,
            })}
          >
            <HelpBox point={<Point />}>
              <ReadList />
            </HelpBox>
          </div>
          <div
            className={clsx([styles.msgBody], {
              [styles.mine]: mine && !message.isDelete,
              [styles.disabled]: message.isDelete,
            })}
          >
            <span className={styles.msgBody_text}>{message.body}</span>
            {!!message.images.length && (
              <ul className={classes.previewList}>
                {message.images.map(
                  (image) =>
                    image !== null && (
                      <li
                        key={`image_${image.id}`}
                        className={classes.previewItem}
                      >
                        <output
                          style={{
                            backgroundImage: `url("${STORAGE_URL}/${image.file_path}")`,
                          }}
                          className={classes.previewSrc}
                        ></output>
                      </li>
                    )
                )}
              </ul>
            )}
          </div>
          <small
            className={clsx(classes.msgUpdate, {
              [classes.none]: message.created_at === message.updated_at,
            })}
          >
            {'（編集済）'}
          </small>
        </div>
        {/* リアクション */}
        <div className={classes.horizontal}>
          {/* <span>リアクションボタン</span> */}
        </div>
      </li>
    </ul>
  )
}

export default ChatMessageRow
