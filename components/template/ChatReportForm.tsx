import React, { useState } from 'react'
import { FormDialog } from '@/components/organisms'
import { useForm } from 'react-hook-form'
import { Grid, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { ChatReportInputs } from '@/interfaces/form/inputs'
import { ChatReport } from '@/interfaces/models'
import { FormErrorMessage } from '@/components/atoms'
import PropTypes from 'prop-types'
import { useLocale, useChatReport } from '@/hooks'

export type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  id: number
  onSuccess?: (response: ChatReport) => void
}

const ChatReportForm = ({ open, setOpen, id, onSuccess }: Props) => {
  const { t } = useLocale()
  const [loading, setLoading] = useState<boolean>(false)
  const { save, reportCategories } = useChatReport(id)
  const {
    handleSubmit,
    setValue,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChatReportInputs>({
    defaultValues: {
      report_category_id: 1,
    },
  })

  const handleSave = async (data: ChatReportInputs) => {
    setLoading(true)
    await save(data)
      .then((chatReport) => {
        setOpen(false)
        reset()
        if (!!onSuccess) {
          onSuccess(chatReport)
        }
      })
      .catch((err) => {
        if (err.status === 422) {
          const errBody: { [k: string]: string[] } = err.data.errors
          Object.keys(errBody).forEach((key: any) => {
            setError(key, {
              type: 'invalid',
              message: errBody[key][0],
            })
          })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reportCategoryId = e.target.value
    setValue('report_category_id', reportCategoryId)
  }

  const currentValue = watch('report_category_id', 1)

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        dialogTitle={t.chat.report}
        onSubmit={handleSubmit(handleSave)}
        isCircular
        loading={loading}
        submitText={t.common.send}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RadioGroup
              name="report_category_id"
              defaultValue={1}
              onChange={handleChange}
            >
              {reportCategories.map((category) => (
                <FormControlLabel
                  key={category.id}
                  value={category.id}
                  control={
                    <Radio
                      color="primary"
                      checked={currentValue == category.id}
                    />
                  }
                  label={category.name}
                  name="report_category_id"
                />
              ))}
            </RadioGroup>

            <p style={{ minHeight: 20 }}>
              {!!errors.report_category_id && (
                <FormErrorMessage msg={errors.report_category_id.message} />
              )}
            </p>
          </Grid>
        </Grid>
      </FormDialog>
    </>
  )
}

ChatReportForm.propTypes = {
  dialogTitle: PropTypes.string,
}

ChatReportForm.defaultProps = {
  dialogTitle: 'このチャットを報告',
}

export default ChatReportForm
