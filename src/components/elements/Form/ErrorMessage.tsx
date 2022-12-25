import React from 'react'

type Props = {
  errorMessage?: string
}
const ErrorMessage = ({ errorMessage }: Props) => {
  return <p className="c-message-error">{errorMessage ?? ''}</p>
}

export default ErrorMessage
