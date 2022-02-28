import React from 'react'
import styles from '@/assets/scss/Object/Project/p-panel.module.scss'
import Features from '@/lib/features'
import { RoundedIcon } from '@/components/molecules/top'
import { useLocale } from '@/hooks'
import clsx from 'clsx'
import { Button } from '@material-ui/core'

const FeaturesPanel = () => {
  const { t } = useLocale()
  const feats = Features()

  const handleClick = (
    to: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const target = window.document.querySelector(to)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.bg}></div>
      <div className={clsx(['u-container', styles.content])}>
        <div className={styles.items}>
          <div className={clsx([styles.item, styles.first])}>
            <div className="u-my-6">
              <h3 className={styles.title}>{'feature'.toUpperCase()}</h3>
              <div className={clsx([styles['sub-title'], 'u-text-center'])}>
                <span className={styles.description}>
                  登録・更新・削除・検索・共有
                </span>
              </div>
            </div>
            {/* <div className={styles.picture}></div> */}
          </div>
          <div className={clsx([styles.item, styles.second])}>
            <ul className={clsx([styles.icons, 'u-px-5'])}>
              {feats.slice(0, 4).map((feature) => (
                <li className={styles.icon} key={feature.to}>
                  <RoundedIcon
                    text={feature.name}
                    icon={feature.icon}
                    id={feature.id}
                  />
                  <div className={styles['icon-devide']}></div>
                  <Button
                    color="inherit"
                    variant="outlined"
                    size="small"
                    className={styles.link}
                    onClick={handleClick.bind(null, feature.to)}
                  >
                    詳細を見る
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesPanel
