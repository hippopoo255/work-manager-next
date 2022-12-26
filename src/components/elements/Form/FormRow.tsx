import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}
const FormRow = ({ children, className }: Props) => {
  return <div className={`mt-6 ${className}`}>{children}</div>
}

export default FormRow
