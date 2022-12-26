'use client'

import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useStatus } from '~/services/status'

export const SnackBar = () => {
  const { status, clear: clearStatus } = useStatus()
  useEffect(() => {
    let unmounted = false

    if (!unmounted && status.message !== undefined) {
      setTimeout(() => {
        clearStatus()
      }, 5000)
    }

    return () => {
      unmounted = true
    }
  }, [status.message])
  return (
    <div className={clsx(['p-snackbar', `--${status.category ?? ''}`])}>
      {status.message ?? ''}
    </div>
  )
}

export default SnackBar
