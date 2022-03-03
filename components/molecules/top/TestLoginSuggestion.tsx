import React, { useState, useEffect } from 'react'
import styles from '@/assets/scss/Object/Project/p-test-login-suggestion.module.scss'
import CancelIcon from '@material-ui/icons/Cancel'
import clsx from 'clsx'
import { TestLoginButton } from '@/components/molecules'

const TestLoginSuggestion = () => {
  const [close, setClose] = useState(false)
  const [isReached, setIsReached] = useState<boolean>(false)
  const testLoginOption = {
    variant: 'outlined',
    color: 'inherit',
    size: 'small',
  }

  const handleClose = () => {
    setClose(true)
  }

  const handleShow = () => {
    if (window.scrollY > window.innerHeight && !close) {
      setIsReached(true)
    }
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      window.addEventListener('scroll', handleShow)
    }
    return () => {
      window.removeEventListener('scroll', handleShow)
      isMounted = false
    }
  }, [])

  return (
    <div
      className={clsx(
        [styles.root, 'u-animation__pop-up', 'u-animation__pop-out'],
        {
          ['--left']: close,
          ['--reached']: isReached,
        }
      )}
    >
      <div className={styles.contents}>
        <p className={styles.text}>アカウント作成の前にお試しいただけます。</p>
        <div className="u-flex__justify-center">
          <TestLoginButton options={testLoginOption} />
        </div>
      </div>
      <button className={styles.close} onClick={handleClose}>
        <CancelIcon width={234} className={styles['close-icon']} />
      </button>
    </div>
  )
}

export default TestLoginSuggestion
