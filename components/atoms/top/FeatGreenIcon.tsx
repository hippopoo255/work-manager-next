import React from 'react'
import { STORAGE_URL } from '@/lib/util'
type Props = {
  iconPath: string
}
const FeatGreenIcon = ({ iconPath }: Props) => {
  const bgImage = {
    backgroundImage: `url('${STORAGE_URL}/assets/${iconPath}')`,
  }
  return <div className="c-feat-green-icon" style={bgImage}></div>
}

export default FeatGreenIcon
