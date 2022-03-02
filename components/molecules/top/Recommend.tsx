import React from 'react'
import styles from '@/assets/scss/Layout/l-recommend.module.scss'
import { LinedPaper } from '@/components/molecules/top'
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined'
import clsx from 'clsx'
import ArrowExpandDownIcon from '@/assets/images/arrow-expand-down.svg'
const Recommend = () => {
  const list = [
    {
      text: '会議の議事録をオンラインで管理したい方',
    },
    {
      text: '予定やタスクの管理システムを一本化したい方',
    },
    {
      text: 'まだチャットツールの選定が決まっていない方',
    },
    {
      text: 'クラウドサービスによる管理が大変になった方',
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
              <LinedPaper text={item.text}>
                <h5 className={styles['point-title']}>
                  <TouchAppOutlinedIcon />
                  <span>Check {`0${index + 1}`}</span>
                </h5>
              </LinedPaper>
            </li>
          ))}
        </ul>
        <button className={styles.arrow} onClick={handleClick}>
          <ArrowExpandDownIcon className={styles['arrow-icon']} />
        </button>
      </div>
    </div>
  )
}

export default Recommend
