import React, { useState, useEffect, useMemo } from 'react'
import clsx from 'clsx'
import {
  BlogStatus,
  CreateBlogInput,
  UpdateBlogInput,
} from '@/interfaces/graphql/generated/graphql'
import { useForm, Controller } from 'react-hook-form'
import { createBlogInput } from '@/lib/initialData'
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { CircularButton, FormTitle } from '@/components/molecules'
import { FormErrorMessage } from '@/components/atoms'
import { BlogIcon } from '@/components/atoms/icons'
import { Blog } from '@/interfaces/models'
import { useRouter } from 'next/router'

type Props = {
  defaultValues: CreateBlogInput | UpdateBlogInput
  save: (input: CreateBlogInput | UpdateBlogInput) => Promise<Blog | null>
  formTitle?: string
  id?: string
}

type SubmitButtonText = '投稿する' | '下書き保存する'

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    maxWidth: 800,
  },
  body: {
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  top: {
    paddingTop: theme.spacing(4),
  },
  footer: {
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}))

const BlogForm = (
  { defaultValues, save, formTitle, id }: Props = {
    defaultValues: createBlogInput,
    save: async () => await null,
    formTitle: 'ブログ投稿フォーム',
  }
) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [submitText, setSubmitText] = useState<SubmitButtonText>('投稿する')
  const router = useRouter()

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateBlogInput | UpdateBlogInput>({
    defaultValues,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value as BlogStatus
    setValue('status', val)
    setSubmitText(val === BlogStatus.Done ? '投稿する' : '下書き保存する')
  }

  const handleSave = async (input: CreateBlogInput | UpdateBlogInput) => {
    setLoading(true)
    await save(input)
      .then((data: Blog | null) => {
        if (data === null) {
          console.log('投稿に失敗しました')
          return false
        }
        router.push('/mypage/blog')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    ;(
      Object.keys(defaultValues) as (
        | keyof CreateBlogInput
        | keyof UpdateBlogInput
      )[]
    ).forEach((key) => {
      if (key in getValues()) {
        setValue(key, defaultValues[key])
      }
    })
  }, [defaultValues])

  return (
    <>
      <Card className={clsx(['container', classes.top])}>
        <div>
          <div className={classes.wrap}>
            <FormTitle
              title={formTitle || 'ブログ投稿フォーム'}
              icon={<BlogIcon />}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit(handleSave)}>
          <CardContent>
            <Grid container spacing={2} className={classes.wrap}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="title"
                  rules={{
                    required: {
                      value: true,
                      message: 'タイトルは必須です',
                    },
                    maxLength: {
                      value: 80,
                      message: 'タイトルは80文字以内で入力してください',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="title"
                      label="タイトル"
                      type="text"
                      placeholder="ex)タイトル（80文字以内）"
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
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="body"
                  rules={{
                    required: {
                      value: true,
                      message: '内容は必須です',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="body"
                      label="内容"
                      type="text"
                      required
                      fullWidth
                      variant="outlined"
                      multiline
                      minRows={10}
                      placeholder={'内容'}
                      error={!!errors.body}
                    />
                  )}
                />
                <p style={{ minHeight: 20 }}>
                  {errors.body && (
                    <FormErrorMessage msg={errors.body.message} />
                  )}
                </p>
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  name="status"
                  defaultValue={getValues('status')}
                  onChange={handleChange}
                  style={{ flexDirection: 'row' }}
                >
                  <FormControlLabel
                    value={BlogStatus.Done}
                    control={<Radio color="primary" />}
                    label="本投稿"
                  />
                  <FormControlLabel
                    value={BlogStatus.Pending}
                    control={<Radio color="primary" />}
                    label="下書き保存"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions className={classes.footer}>
            <div className={classes.wrap}>
              <CircularButton
                loading={loading}
                onClick={handleSubmit(handleSave)}
                submitText={submitText}
              />
            </div>
          </CardActions>
        </form>
      </Card>
    </>
  )
}

export default BlogForm
