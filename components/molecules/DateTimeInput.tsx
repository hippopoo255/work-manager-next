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
}

const DateTimeInput = ({ value, label, onChange, required }: Props) => {
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
        disablePast
        showTodayButton
        format="yyyy/MM/dd HH:mm"
        required={required}
      />
    </MuiPickersUtilsProvider>
  )
}

DateTimeInput.propTypes = {
  required: PropTypes.bool,
}

DateTimeInput.defaultProps = {
  required: false,
}

export default DateTimeInput
