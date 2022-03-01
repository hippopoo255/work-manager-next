import React from 'react'

type Props = {
  children: React.ReactNode
}
const FeatGreenIcon = ({ children }: Props) => {
  return <div className="c-feat-green-icon">{children}</div>
}

export default FeatGreenIcon
