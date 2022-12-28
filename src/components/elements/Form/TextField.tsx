'use client'

import React from 'react'
import {
  Controller,
  FieldPath,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form'
import ErrorMessage from './ErrorMessage'

type Props = {
  label: string
  type?: 'email' | 'text' | 'tel' | 'password' | 'number' // ...and more
  placeholder?: string
  autoFocus?: boolean
  errorMessage?: string
} & React.ComponentProps<'input'>

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ errorMessage, ...props }, ref) => {
    return (
      <>
        <label
          htmlFor={props.name}
          className={`p-text-field${
            errorMessage !== undefined ? ' --error' : ''
          }${(props.value ?? '') !== '' ? ' --visible' : ''}`}
        >
          <span className="p-text-field__label">{props.label}</span>
          <input
            type={props.type ?? 'text'}
            placeholder={props.placeholder ?? ''}
            className="p-text-field__body"
            autoFocus={props.autoFocus ?? false}
            ref={ref}
            {...props}
          />
        </label>
        <ErrorMessage errorMessage={errorMessage} />
      </>
    )
  }
)

type ControllerProps<T extends FieldValues> = {
  fieldName: FieldPath<T>
} & Omit<
  React.ComponentProps<typeof Input>,
  'errorMessage' | keyof ControllerRenderProps
> // 重複するプロパティを除外する

export default function TextField<T extends FieldValues>({
  fieldName,
  ...props
}: ControllerProps<T>) {
  return (
    <Controller
      name={fieldName}
      render={({ field, fieldState }) => (
        <Input errorMessage={fieldState.error?.message} {...field} {...props} />
      )}
    />
  )
}