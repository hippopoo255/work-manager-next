import React, { useState, useMemo } from 'react'
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@material-ui/core'
import { HelpBox } from '@/components/molecules'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { SignupInputs } from '@/interfaces/form/inputs'
import { Control, Controller } from 'react-hook-form'
import { strPatterns } from '@/lib/util'

type Props = {
  helpBox?: boolean
  name?: string
  control: any
  error: boolean
  textProps: TextFieldProps
}

const PasswordTextField = ({
  helpBox = false,
  name = 'password',
  control,
  error,
  textProps,
}: Props) => {
  const [type, setType] = useState<'text' | 'password'>('password')

  const handleType = () => {
    setType((prev) => (prev === 'text' ? 'password' : 'text'))
  }

  const iconByType = useMemo(() => {
    const icon = type === 'text' ? <VisibilityIcon /> : <VisibilityOffIcon />

    return {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleType}
            edge="end"
          >
            {icon}
          </IconButton>
        </InputAdornment>
      ),
    }
  }, [type])

  return (
    <>
      {helpBox && (
        <Box textAlign={'right'}>
          <HelpBox />
        </Box>
      )}
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            {...textProps}
            type={type}
            error={error}
            InputProps={iconByType}
            required
            fullWidth
          />
        )}
        name={name}
        defaultValue=""
        control={control}
        rules={{
          required: {
            value: true,
            message: 'パスワードは必須です',
          },
          pattern: {
            value: strPatterns.password,
            message: 'パスワードの形式が違います',
          },
          minLength: {
            value: 8,
            message: '8文字以上64文字以下で入力してください',
          },
          maxLength: {
            value: 64,
            message: '8文字以上64文字以下で入力してください',
          },
        }}
      />
    </>
  )
}

export default PasswordTextField
