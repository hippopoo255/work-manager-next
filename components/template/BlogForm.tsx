import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import {
  Blog,
  BlogStatus,
  CreateBlogInput,
  TagInput,
  UpdateBlogInput,
} from '@/interfaces/graphql/generated/graphql'
import { useForm, Controller } from 'react-hook-form'
import { createBlogInput } from '@/lib/initialData'
import {
  Card,
  CardContent,
  CardActions,
  Chip,
  Grid,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useTags } from '@/hooks'

import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  CircularButton,
  FormTitle,
  MarkdownEditor,
} from '@/components/molecules'
import { FormErrorMessage } from '@/components/atoms'
import { BlogIcon } from '@/components/atoms/icons'
import { useRouter } from 'next/router'
import { uploadFile } from '@/lib/file'

type Props = {
  defaultValues: CreateBlogInput | UpdateBlogInput
  save: (input: CreateBlogInput | UpdateBlogInput) => Promise<Blog | null>
  formTitle?: string
  id?: string
}

type SubmitButtonText = '投稿する' | '下書き保存する'

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    // maxWidth: 800,
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
  const { tagList } = useTags()
  const {
    handleSubmit,
    clearErrors,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<CreateBlogInput | UpdateBlogInput>({
    defaultValues,
  })

  // Autocomlete members
  const selectedTags = watch('tags', [])
  const handleTags = (
    event: React.ChangeEvent<{}>,
    newValue: CreateBlogInput['tags']
  ) => {
    if (newValue.length > 5) {
      newValue.splice(5)
    }
    setValue('tags', [...newValue])
    if (newValue.length > 0 && newValue.length <= 5) {
      clearErrors('tags')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value as BlogStatus
    setValue('status', val)
    setSubmitText(val === BlogStatus.Done ? '投稿する' : '下書き保存する')
  }

  const handleBodyChange = (value: string) => {
    setValue('body', value)
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

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await uploadFile(e.target.files![0]).then((d) => {
      console.log(d)
    })
  }

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
                  name="tags"
                  rules={{
                    required: {
                      value: true,
                      message: 'タグの入力は必須です',
                    },
                    minLength: {
                      value: 1,
                      message: 'タグの入力は必須です',
                    },
                    maxLength: {
                      value: 5,
                      message: '登録できるタグは5個までです',
                    },
                  }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      id="blog_tags_field"
                      value={selectedTags}
                      onChange={handleTags}
                      options={tagList}
                      getOptionSelected={(option, value) =>
                        option !== null &&
                        value !== null &&
                        option.id === value.id
                      }
                      getOptionLabel={(option) => (!!option ? option.name : '')}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            key={`tag_${index}`}
                            label={!!option ? option.name : ''}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      style={{
                        width: '100%',
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="タグ"
                          variant="outlined"
                          placeholder="タグは5個まで登録できます"
                          required
                          error={!!errors.tags}
                        />
                      )}
                    />
                  )}
                />
                <p style={{ minHeight: 20 }}>
                  {errors.tags && (
                    <FormErrorMessage
                      msg={'タグを1〜5個まで入力してください'}
                    />
                  )}
                </p>
              </Grid>
              <Grid item xs={12}>
                <MarkdownEditor
                  value={getValues('body')}
                  onChange={handleBodyChange}
                />
                <p style={{ minHeight: 20 }}>
                  {errors.body && (
                    <FormErrorMessage msg={errors.body.message} />
                  )}
                </p>
              </Grid>
              {/* <Grid item xs={12}>
                <input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  onChange={handleFile}
                />
              </Grid> */}
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
