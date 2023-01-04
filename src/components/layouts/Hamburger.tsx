import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  open: boolean
  onToggle?: Function
  under?: 'lg' | 'md' | 'sm' | 'xs'
}

export const Hamburger = ({ children, open, onToggle, under }: Props) => {
  const handleClick = () => {
    onToggle && onToggle()
  }

  return (
    <div
      className={clsx(`p-hamburger${open ? ' --open' : ''}`, {
        '--responsive': under ?? false,
      })}
    >
      <div className="p-hamburger__overlay" onClick={handleClick}></div>
      <button className="p-hamburger__toggler" onClick={handleClick}>
        <span className="p-hamburger__toggler-line"></span>
        <span className="p-hamburger__toggler-line"></span>
        <span className="p-hamburger__toggler-line"></span>
      </button>
      <div className={`p-hamburger__content`}>{children}</div>
    </div>
  )
}
