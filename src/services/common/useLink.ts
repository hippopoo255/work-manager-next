import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  onLink?: () => void
}
const useLink = ({ onLink }: Props) => {
  const router = useRouter()
  const handleLink = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    path: string
  ) => {
    e.preventDefault()
    onLink && onLink()
    router.push(path)
  }

  return {
    handleLink,
    router,
  }
}

export default useLink
