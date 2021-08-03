import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import ja from 'date-fns/locale/ja'
import React from 'react'
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import PropTypes from 'prop-types'

export type Props = {
  value: Date | null
  label: string
  onChange: any
  required: boolean
  disablePast: boolean
  error: boolean
}

const DateTimeInput = ({
  value,
  label,
  onChange,
  required,
  disablePast,
  error,
}: Props) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
      <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        label={label}
        value={value}
        onChange={onChange}
        onError={console.log}
        fullWidth
        disablePast={disablePast}
        format="yyyy/MM/dd HH:mm"
        required={required}
        error={error}
      />
    </MuiPickersUtilsProvider>
  )
}

DateTimeInput.propTypes = {
  required: PropTypes.bool,
  disablePast: PropTypes.bool,
}

DateTimeInput.defaultProps = {
  required: false,
  disablePast: false,
}

export default DateTimeInput
