import React from 'react'
import { TestLoginButton } from '@/components/molecules'
import introduction from '@/assets/scss/Object/Project/p-introduction.module.scss'
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

const Introduction = () => {
  const classes = useStyles()

  const testButtonOptions = {
    color: 'inherit',
    variant: 'outlined',
    classes,
  }

  const features = Features()

  return (
    <div className={introduction.root}>
      <div className={introduction.bg}></div>
      <div className="u-container">
        <div className="u-px-5">
          <h1 className={introduction.catchCopy}>
            {'support your Job.'.toUpperCase()}
          </h1>
          <div className={introduction.sub}>
            <div className={introduction.description}>
              <ul>
                {features.splice(0, 4).map((feature) => (
                  <li className={introduction.item} key={feature.id}>
                    <LiveHelpOutlinedIcon />
                    <span className={introduction.point}>
                      {feature.mission}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={clsx([introduction.demo, 'u-text-center'])}>
              <TestLoginButton options={testButtonOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduction
