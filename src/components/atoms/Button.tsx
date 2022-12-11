import React from 'react'

type Props = {
  text: string
}

const Button = ({ text }: Props) => {
  return <button className={'c-button'}>{text}</button>
}

export default Button
