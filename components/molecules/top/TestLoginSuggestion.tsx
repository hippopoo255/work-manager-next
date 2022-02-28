import React, { useState } from 'react'
import styles from '@/assets/scss/Object/Project/p-test-login-suggestion.module.scss'
import CancelIcon from '@material-ui/icons/Cancel'
import clsx from 'clsx'
import { TestLoginButton } from '@/components/molecules'

const TestLoginSuggestion = () => {
  const [close, setClose] = useState(false)
  const handleClose = () => {
    setClose(true)
  }
  const testLoginOption = {
    variant: 'outlined',
    color: 'inherit',
    // fullWidth: true,
  }
  return (
    <div
      className={clsx(styles.root, {
        [styles['--close']]: close,
      })}
    >
      <div className={styles.contents}>
        <p className={styles.text}>アカウント作成の前にお試しいただけます。</p>
        <div className="u-flex__justify-center">
          <TestLoginButton options={testLoginOption} />
        </div>
      </div>
      <button className={styles.close} onClick={handleClose}>
        <CancelIcon />
      </button>
    </div>
  )
}

export default TestLoginSuggestion
