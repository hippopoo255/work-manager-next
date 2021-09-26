import React, { useEffect, useState, useRef } from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    opacity: 0,
  },
  show: {
    animation: '$fadeIn forwards 1s',
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '67%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}))

type Props = {
  children: React.ReactNode
  classes: any
}

const AnimationBoxByScroll = ({ children, classes }: Props) => {
  const [isReached, setIsReached] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const defaultClass = { ...useStyles(), ...classes }

  const handleShow = () => {
    const current = window.scrollY + window.innerHeight
    if (ref !== null && current > ref.current!.offsetTop) {
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
  }, [setIsReached])
  return (
    <div
      ref={ref}
      className={clsx(defaultClass.root, {
        [defaultClass.show]: isReached,
      })}
    >
      {children}
    </div>
  )
}

export default AnimationBoxByScroll
