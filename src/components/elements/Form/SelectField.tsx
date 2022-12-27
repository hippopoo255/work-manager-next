'use client'

import clsx from 'clsx'
import React from 'react'
import {
  Controller,
  FieldPath,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import { SelectOptionList } from './types'

type Props = {
  label: string
  placeholder?: string
  autoFocus?: boolean
  errorMessage?: string
  options: SelectOptionList
} & React.ComponentProps<'select'>

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLSelectElement, Props>(
  ({ errorMessage, ...props }, ref) => {
    return (
      <>
        <label
          htmlFor={props.name}
          className={`p-select-field${
            errorMessage !== undefined ? ' --error' : ''
          }${(props.value ?? '') !== '' ? ' --visible' : ''}`}
        >
          <span className="p-select-field__label">{props.label}</span>
          <select
            placeholder={props.placeholder ?? ''}
            className={clsx('p-select-field__body', {
              '--init': props.value == 0,
            })}
            ref={ref}
            {...props}
          >
            {props.options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
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

export default function SelectField<T extends FieldValues>({
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
