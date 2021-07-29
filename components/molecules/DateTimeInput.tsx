import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import ja from 'date-fns/locale/ja'
import React from 'react'
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'

export type Props = {
  value: Date | null
  label: string
  onChange: any
}

const DateTimeInput = ({ value, label, onChange }: Props) => {
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
      />
    </MuiPickersUtilsProvider>
  )
}

export default DateTimeInput
