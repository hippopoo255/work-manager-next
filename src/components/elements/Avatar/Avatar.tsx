import Image from 'next/image'

type Props = {
  name: string
  filePath?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Avatar = ({ name, filePath, onClick }: Props) => {
  return (
    <button
      className={`c-avatar${filePath ? ' --has-path' : ''}`}
      onClick={onClick}
    >
      {filePath !== undefined ? (
        <Image
          src={filePath}
          width={256}
          height={256}
          alt={`icon_${name}`}
          className={'c-avatar__src'}
        />
      ) : (
        <span className="c-avatar__initial">{name.slice(0, 1)}</span>
      )}
    </button>
  )
}

export default Avatar
