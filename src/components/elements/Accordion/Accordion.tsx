import React, { useState } from 'react'

type Props = {
  role: string
  children: React.ReactNode
  controller: React.ReactNode
  areaControls: string
}
const Accordion = ({ role, children, controller, areaControls }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`p-accordion${!isOpen ? ' --hidden' : ''}`} role={role}>
      <div
        className="p-accordion__trigger"
        aria-controls={areaControls}
        onClick={handleClick}
        aria-expanded={isOpen}
      >
        {controller}
      </div>
      <div
        aria-hidden={!isOpen}
        id={areaControls}
        className="p-accordion__body"
      >
        {children}
      </div>
    </div>
  )
}

export default Accordion
