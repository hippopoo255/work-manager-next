import React from 'react'
import { TestLoginButton } from '@/components/molecules'
import styles from '@/assets/scss/Layout/l-cold-gradient-wall.module.scss'
import clsx from 'clsx'
import { Theme, makeStyles } from '@material-ui/core/styles'
import LiveHelpOutlinedIcon from '@material-ui/icons/LiveHelpOutlined'
import Features from '@/lib/features'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 9999,
    minWidth: 240,
    width: '100%',
    boxShadow: theme.shadows[2],
    padding: theme.spacing(1),
    // fontSize: theme.typography.h6.fontSize,
  },
}))

type Props = {
  active: boolean
}

const ColdGradientWall = ({ active = true }: Props) => {
  const classes = useStyles()

  const testButtonOptions = {
    color: 'inherit',
    variant: 'outlined',
    classes,
  }

  const features = Features()

  return (
    <div className={styles.root}>
      <div className={styles.bg}></div>
      <div className="u-container">
        <div className="u-px-5">
          <h2 className={styles['catch-copy']}>
            {'support your job'.toUpperCase()}
          </h2>
          <div className={styles.sub}>
            <div className={styles.description}>
              <ul>
                {features.splice(0, 4).map((feature) => (
                  <li className={styles.item} key={feature.id}>
                    <LiveHelpOutlinedIcon />
                    <span className={styles.point}>{feature.mission}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={clsx([styles.demo, 'u-text-center'])}>
              <TestLoginButton options={testButtonOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColdGradientWall
