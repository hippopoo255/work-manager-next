import React from 'react'

type Props = {
  children: React.ReactNode
  title?: string
  size?: 'sm' | 'lg'
  Suggestion?: () => JSX.Element
}
const FormCard = ({ children, title, size }: Props) => {
  return (
    <div className="p-card">
      <div className={`p-form${size !== undefined ? ' --' + size : ''}`}>
        <h3 className="p-form__head">{title ?? 'title'}</h3>
        <div className="p-form__body">{children}</div>
      </div>
    </div>
  )
}

export default FormCard
