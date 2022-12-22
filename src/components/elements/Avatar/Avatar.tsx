import { spawn } from 'child_process'
import Image from 'next/image'
import React from 'react'
// import noPicture from '~/assets/me.png'

type Props = {
  name: string
  filePath?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Avatar = ({ name, filePath, onClick }: Props) => {
  return (
    <button className="c-avatar" onClick={onClick}>
      <span className="c-avatar__initial">{name.slice(0, 1)}</span>
      {/* {filePath !== undefined ? (
        <Image
          src={filePath}
          alt={`${name}`}
          className={'c-avatar__src'}
          width={32}
          height={32}
        />
      ) : (
        <span>{name.slice(0, 1)}</span>
      )} */}
    </button>
  )
}

export default Avatar
