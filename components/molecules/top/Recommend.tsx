import React from 'react'
import styles from '@/assets/scss/Layout/l-recommend.module.scss'
import { LinedPaper } from '@/components/molecules/top'
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined'
import clsx from 'clsx'
import ArrowExpandDownIcon from '@/assets/images/arrow-expand-down.svg'

type Props = {
  active: boolean
}

const Recommend = ({ active = true }: Props) => {
  const list = [
    {
      text: '社内の議事録をオンラインで管理したい方',
    },
    {
      text: '議事録を手間なく参加者に共有したい方',
    },
    {
      text: '予定やタスク管理のシステムを一本化したい方',
    },
    {
      text: '業務管理をブラウザで完結させたい方',
    },
  ]

  const handleClick = () => {
    const target = window.document.querySelector('#minutes')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.contents}>
        <h1 className={styles.title}>JOB SUPPORT</h1>
        <ul className={styles.wills}>
          {list.map((item, index) => (
            <li key={`item_${index}`} className={styles.will}>
              <LinedPaper text={item.text} animationStart={active}>
                <h5 className={styles['point-title']}>
                  <TouchAppOutlinedIcon />
                  <span>Check {`0${index + 1}`}</span>
                </h5>
              </LinedPaper>
            </li>
          ))}
        </ul>
        <button
          className={clsx(
            [
              styles.arrow,
              'u-animation__bound',
              'u-animation__fade-in',
              '--delay-2000',
            ],
            {
              ['--reached']: active,
            }
          )}
          onClick={handleClick}
        >
          <span className={styles['arrow-icon']}>
            <ArrowExpandDownIcon className={styles['arrow-body']} />
          </span>
        </button>
      </div>
    </div>
  )
}

export default Recommend
