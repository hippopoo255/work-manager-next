import React, { useState } from 'react'

type Props = {
  children: React.ReactNode
  open: boolean
  onToggle?: Function
}

export const Hamburger = ({ children, open, onToggle }: Props) => {
  const handleClick = () => {
    onToggle && onToggle()
  }

  return (
    <div className={`p-hamburger${open ? ' --open' : ''}`}>
      <button className="p-hamburger__toggler" onClick={handleClick}>
        <span className="p-hamburger__toggler-line"></span>
        <span className="p-hamburger__toggler-line"></span>
        <span className="p-hamburger__toggler-line"></span>
      </button>
      <div className={`p-hamburger__content`}>{children}</div>
    </div>
  )
}
