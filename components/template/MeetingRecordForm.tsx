import React, { useState, useEffect, useMemo, useRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { toStrData, toStrFormalLabel, PROCESS_FLAG } from '@/lib/util'
import { AxiosError } from 'axios'
import { Typography, Box, Paper, Grid, CssBaseline } from '@material-ui/core'
// import Stepper from '@material-ui/core/Stepper'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Chip,
  Tooltip,
  CircularProgress,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import CancelIcon from '@material-ui/icons/Cancel'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { FormErrorMessage } from '@/components/atoms'
import { DateTimeInput } from '@/components/molecules'
import { DefinitionList } from '@/components/organisms'

import { MeetingRecord, MeetingPlace } from '@/interfaces/models'
import {
  MeetingRecordInputs,
  MeetingDecisionInputs,
  MemberInputs,
} from '@/interfaces/form/inputs'
import { MeetingRecordSubmit } from '@/interfaces/form/submit'
import { DefinitionListItem } from '@/interfaces/common/definitionList'

const getSteps = () => {
  return ['概要', '参加者', '決定事項', '入力内容確認']
}

const getStepContent = (stepIndex: number) => {
  switch (stepIndex) {
    case 0:
      return '概要'
    case 1:
      return '参加者'
    case 2:
      return '決定事項'
    case 3:
      return '入力内容確認'
    default:
      return 'Finished'
  }
}

type Props = {
  memberList: MemberInputs[]
  fixedMember: MemberInputs[]
  defaultValues: MeetingRecordInputs
  req: (submitData: MeetingRecordSubmit) => Promise<MeetingRecord>
  classes: any
  meetingPlaceList: MeetingPlace[]
  handleSuccess: (submitData: MeetingRecordInputs) => void
  saveAction: 'update' | 'create'
}

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    '&:not(:first-of-type)': {
      marginTop: theme.spacing(3),
    },
  },
  groupTitle: {
    color: theme.palette.primary.main,
    margin: 0,
    lineHeight: 1.75,
    fontSize: theme.typography.fontSize,
  },
}))

const MeetingRecordForm = ({
  memberList,
  fixedMember,
  defaultValues,
  req,
  classes,
  meetingPlaceList,
  handleSuccess,
  saveAction,
}: Props) => {
  const definitionClasses = useStyles()

  // steps
  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollToLatest = () =>
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const handleNext = () => {
    if (activeStep === steps.length) {
      setActiveStep(0)
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
  }

  // react hook form
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<MeetingRecordInputs>({
    defaultValues,
  })

  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: 'meeting_decisions',
  })

  const currentFormVals = useMemo(() => getValues(), [activeStep])

  const handleSave = async (data: MeetingRecordInputs) => {
    if (activeStep === steps.length) {
      handleReset()
      return true
    }

    if (activeStep === steps.length - 1) {
      setLoading(true)
      const submitData: MeetingRecordSubmit = {
        title: data.title,
        summary: data.summary,
        meeting_date: toStrData(data.meeting_date),
        recorded_by: data.recorded_by,
        place_id: data.place_id,
        role_id: data.role_id,
        members: data.members.map((m) => m.id),
        meeting_decisions: data.meeting_decisions.map((decision) => {
          const meetingDecisionData: MeetingDecisionInputs = {
            subject: decision.subject,
            body: decision.body,
            written_by: decision.written_by,
            decided_by: decision.decided_by,
          }
          if (decision.id !== undefined) {
            meetingDecisionData.id = decision.id
          }
          if (decision.flag !== undefined) {
            meetingDecisionData.flag = decision.flag
          }
          return meetingDecisionData
        }),
      }
      await req(submitData)
        .then(() => {
          if (saveAction === 'create') {
            reset()
          } else {
            handleSuccess(data)
          }
          handleNext()
        })
        .catch((err: AxiosError) => {
          return false
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      handleNext()
    }
  }

  // Autocomlete members
  const selectedMembers = watch('members', [])

  const handleMembers = (
    event: React.ChangeEvent<{}>,
    newValue: MemberInputs[]
  ) => {
    setValue('members', [
      ...fixedMember,
      ...newValue.filter(
        (option: MemberInputs) => fixedMember.indexOf(option) === -1
      ),
    ])
    if (newValue.length > 0) {
      clearErrors('members')
    }
  }

  useEffect(() => {
    Object.keys(defaultValues).forEach((key) => {
      setValue(key, defaultValues[key])
    })
  }, [defaultValues])

  useEffect(() => {
    if (activeStep !== 0) {
      scrollToLatest()
    }
  }, [activeStep])

  const handleDecisionDelete = (index: number) => {
    const removed = getValues('meeting_decisions')
    if (removed[index].id !== undefined) {
      removed[index].flag = PROCESS_FLAG.deleteFlag
      setValue('meeting_decisions', removed)
    } else {
      remove(index)
    }
  }

  const isDelete = (item: MeetingDecisionInputs): boolean =>
    item.flag !== undefined && item.flag === PROCESS_FLAG.deleteFlag

  const labels: { [k: string]: string } = {
    recorded_by: '記録者',
    title: '会議名',
    meeting_date: '開催日時',
    place_id: '開催場所',
    role_id: '権限設定',
    summary: '議題',
    members: '参加者',
    meeting_decisions: '決定事項',
  }

  const definitionList: (DefinitionListItem | null)[] = Object.keys(
    currentFormVals
  ).map((key: string) => {
    let el: React.ReactNode
    if (key === 'meeting_decisions') {
      el = (
        <ul>
          {currentFormVals[key].length > 0 &&
            currentFormVals[key].map(
              (decision: MeetingDecisionInputs, index) =>
                !isDelete(decision) && (
                  <Box
                    key={`decision_${index}`}
                    component={'li'}
                    className={definitionClasses.item}
                  >
                    <Box
                      component={'h5'}
                      className={definitionClasses.groupTitle}
                    >{`決定事項${index + 1}`}</Box>
                    <Box>
                      <strong>件名：</strong>
                      {decision.subject}
                    </Box>
                    <Box>
                      <strong>内容：</strong>
                      {decision.body}
                    </Box>
                  </Box>
                )
            )}
        </ul>
      )
    } else if (key === 'members') {
      el = (
        <span>
          {currentFormVals[key]
            .map((member: MemberInputs) => member.full_name)
            .join(' / ')}
        </span>
      )
    } else if (key === 'place_id') {
      const index = meetingPlaceList.findIndex(
        (meetingPlace) => meetingPlace.id === currentFormVals[key]
      )
      el = <span>{meetingPlaceList[index].name}</span>
    } else if (key === 'meeting_date') {
      el = <span>{toStrFormalLabel(currentFormVals.meeting_date)}</span>
    } else if (key === 'recorded_by') {
      const index = memberList.findIndex(
        (member) => member.id === currentFormVals.recorded_by
      )
      if (index !== -1) {
        el = <span>{memberList.length > 0 && memberList[index].full_name}</span>
      } else {
        el = <span></span>
      }
    } else {
      el = <span>{currentFormVals[key]}</span>
    }
    return key !== 'role_id'
      ? {
          term: labels[key],
          key,
          el,
        }
      : null
  })

  return (
    <Box component={'section'} className={classes.wrap}>
      <div ref={scrollRef}></div>
      <CssBaseline />
      <Paper className={classes.head}>
        <Stepper
          className={classes.stepper}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label} className={classes.stepperCol}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(handleSave)}
      >
        {/* ステップ1 */}
        {activeStep === 0 && (
          <Paper className={classes.body}>
            <Typography component={'h4'} className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <Grid container spacing={2} className={classes.minHeight}>
              <Grid item xs={12} md={5}>
                <Controller
                  control={control}
                  name="title"
                  rules={{
                    required: {
                      value: true,
                      message: '会議名は必須です',
                    },
                    maxLength: {
                      value: 80,
                      message: '会議名は80文字以内で入力してください',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="title"
                      label="会議名"
                      type="text"
                      placeholder="ex)月次定例MTG（80文字以内）"
                      required
                      fullWidth
                      error={!!errors.title}
                    />
                  )}
                />
                <p style={{ minHeight: 20 }}>
                  {!!errors.title && (
                    <FormErrorMessage msg={errors.title.message} />
                  )}
                </p>
              </Grid>
              <Grid item xs={12} sm={7} md={4}>
                <Controller
                  name="meeting_date"
                  defaultValue={new Date()}
                  rules={{
                    required: {
                      value: true,
                      message: '開催日時は必須です',
                    },
                  }}
                  control={control}
                  render={({ field }) => (
                    <DateTimeInput
                      {...field}
                      error={!!errors.meeting_date}
                      required
                      label="開催日時"
                    />
                  )}
                />
                <p style={{ minHeight: 20 }}>
                  {errors.meeting_date && (
                    <FormErrorMessage msg={errors.meeting_date.message} />
                  )}
                </p>
              </Grid>
              <Grid item xs={12} sm={5} md={3}>
                <InputLabel shrink id="progress-id-select-label">
                  開催場所
                </InputLabel>
                <Controller
                  control={control}
                  name="place_id"
                  rules={{
                    required: {
                      value: true,
                      message: '開催場所は必須です',
                    },
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      id="place_id"
                      name="place_id"
                      labelId="place-id-select-label"
                      fullWidth
                    >
                      {meetingPlaceList.map((place) => (
                        <MenuItem key={place.id} value={place.id}>
                          {place.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="summary"
                  rules={{
                    required: {
                      value: true,
                      message: '概要欄は必須です',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="summary"
                      label="概要"
                      type="text"
                      required
                      fullWidth
                      multiline
                      minRows={10}
                      placeholder={'- 議題1...'}
                      error={!!errors.summary}
                    />
                  )}
                />
                <p style={{ minHeight: 20 }}>
                  {errors.summary && (
                    <FormErrorMessage msg={errors.summary.message} />
                  )}
                </p>
              </Grid>
            </Grid>
          </Paper>
        )}
        {/* ステップ2 */}
        {activeStep === 1 && (
          <Paper className={classes.body}>
            <Typography component={'h4'} className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <Grid container spacing={2} className={classes.minHeight}>
              <Grid item xs={12} style={{ marginTop: 8 }}>
                <Controller
                  control={control}
                  name="members"
                  rules={{
                    required: {
                      value: true,
                      message: '参加者の入力は必須です',
                    },
                    minLength: {
                      value: 1,
                      message: '参加者の人数を最低1名入力してください',
                    },
                  }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      id="meeting_members_field"
                      value={selectedMembers}
                      onChange={handleMembers}
                      options={memberList}
                      getOptionLabel={(option) => option.full_name}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            key={`member_${index}`}
                            label={option.full_name}
                            {...getTagProps({ index })}
                            disabled={fixedMember.indexOf(option) !== -1}
                          />
                        ))
                      }
                      style={{
                        width: '100%',
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="会議参加者"
                          variant="outlined"
                          placeholder="＋"
                          required
                          error={!!errors.members}
                        />
                      )}
                    />
                  )}
                />
                <p style={{ minHeight: 20 }}>
                  {!!errors.members && (
                    <FormErrorMessage
                      msg={
                        /* @ts-ignore */
                        errors.members.message
                      }
                    />
                  )}
                </p>
              </Grid>
            </Grid>
          </Paper>
        )}
        {/* ステップ3 */}
        {activeStep === 2 && (
          <div>
            {fields.map(
              (item, index) =>
                !isDelete(item) && (
                  <Paper className={classes.body} key={item.id}>
                    <Typography
                      component={'h4'}
                      className={classes.instructions}
                    >
                      {getStepContent(activeStep) + `${index + 1}`}
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems={'flex-start'}
                      className={classes.minHeight}
                    >
                      <Box flexGrow={1}>
                        <Box>
                          <Controller
                            control={control}
                            name={`meeting_decisions[${index}].subject`}
                            rules={{
                              required: {
                                value: true,
                                message: '件名は必須です',
                              },
                              maxLength: {
                                value: 80,
                                message: '件名は80文字以内で入力してください',
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                autoFocus
                                name={`meeting_decisions[${index}].subject`}
                                label="件名"
                                type="text"
                                placeholder="ex)〇〇企画の件（80文字以内）"
                                required
                                error={
                                  !!errors.meeting_decisions &&
                                  !!errors.meeting_decisions[index] &&
                                  !!errors.meeting_decisions[index]?.subject
                                }
                                fullWidth
                              />
                            )}
                          />
                          <p style={{ minHeight: 20 }}>
                            {!!errors.meeting_decisions &&
                              !!errors.meeting_decisions[index] &&
                              !!errors.meeting_decisions[index]?.subject && (
                                <FormErrorMessage
                                  msg={
                                    errors.meeting_decisions[index]?.subject
                                      ?.message
                                  }
                                />
                              )}
                          </p>
                        </Box>
                        <Box style={{ marginTop: 16 }}>
                          <Controller
                            control={control}
                            name={`meeting_decisions[${index}].body`}
                            rules={{
                              required: {
                                value: true,
                                message: '決定内容は必須です',
                              },
                              maxLength: {
                                value: 140,
                                message:
                                  '決定内容は140文字以内で入力してください',
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                name={`meeting_decisions[${index}].body`}
                                label="決定内容"
                                type="text"
                                multiline
                                minRows={1}
                                required
                                placeholder="ex)現状把握のため従業員にアンケート調査をする（80文字以内）"
                                fullWidth
                                error={
                                  !!errors.meeting_decisions &&
                                  !!errors.meeting_decisions[index] &&
                                  !!errors.meeting_decisions[index]?.body
                                }
                              />
                            )}
                          />
                          <p style={{ minHeight: 20 }}>
                            {!!errors.meeting_decisions &&
                              !!errors.meeting_decisions[index] &&
                              !!errors.meeting_decisions[index]?.body && (
                                <FormErrorMessage
                                  msg={
                                    errors.meeting_decisions[index]?.body
                                      ?.message
                                  }
                                />
                              )}
                          </p>
                        </Box>
                      </Box>
                      <Box
                        style={{ marginLeft: 16, minWidth: 24 }}
                        flexShrink={0}
                      >
                        {index > 0 && (
                          <Tooltip title="削除する">
                            <CancelIcon
                              className={classes.deleteRow}
                              onClick={() => handleDecisionDelete(index)}
                            />
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
                  </Paper>
                )
            )}
            <Box display={'flex'} justifyContent={'flex-end'}>
              <Tooltip
                title="追加する"
                onClick={() => {
                  append({
                    subject: '',
                    body: '',
                    written_by: 1,
                    decided_by: null,
                  })
                }}
              >
                <Button variant={'outlined'} size={'small'} color={'default'}>
                  ＋
                </Button>
              </Tooltip>
            </Box>
          </div>
        )}
        {/* 最終確認 */}
        {activeStep === 3 && (
          <Paper className={classes.body}>
            <Typography component={'h4'} className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <Grid container spacing={2} className={classes.minHeight}>
              <Grid item xs={12}>
                <DefinitionList list={definitionList} />
              </Grid>
            </Grid>
          </Paper>
        )}
        {activeStep === steps.length && (
          <Paper className={classes.body}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" component="h4" align={'center'}>
                  登録完了しました。
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}
        <Paper>
          <Grid container spacing={2} className={classes.tail}>
            <Grid item xs={12}>
              <Box className={classes.tailBody}>
                <Button
                  disabled={activeStep === 0 || activeStep >= steps.length}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                {activeStep >= steps.length ? (
                  <Button type="submit" color="primary">
                    最初に戻る
                  </Button>
                ) : (
                  <div className={classes.tailWrap}>
                    <Button
                      variant={
                        activeStep !== steps.length - 1
                          ? 'outlined'
                          : 'contained'
                      }
                      color={
                        activeStep !== steps.length - 1
                          ? 'secondary'
                          : 'primary'
                      }
                      className={classes.submitBtn}
                      disabled={loading}
                      type="submit"
                      // onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? '保存' : 'Next'}
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </Box>
  )
}

MeetingRecordForm.propTypes = {
  saveAction: PropTypes.string,
}

MeetingRecordForm.defaultProps = {
  saveAction: 'update',
}

export default MeetingRecordForm
