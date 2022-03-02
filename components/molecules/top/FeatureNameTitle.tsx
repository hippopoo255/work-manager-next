import React from 'react'
import styles from '@/assets/scss/Object/Project/p-feature-name-title.module.scss'
import clsx from 'clsx'

type Props = {
  featureId: string
  featureName: string
  space?: number
}

const FeatureNameTitle = ({ featureId, featureName, space = 22 }: Props) => {
  const mbUtility = space === undefined ? '' : `u-mb-${space}`
  // const pbUtility = space === undefined ? '' : `u-pb-${space}`
  const options = [mbUtility]
  return (
    <h3 className={clsx([styles['root'], ...options])}>
      <span className={styles['text']} data-subja={featureName}>
        {featureId[0].toLocaleUpperCase() + featureId.slice(1)}
      </span>
    </h3>
  )
}

export default FeatureNameTitle
