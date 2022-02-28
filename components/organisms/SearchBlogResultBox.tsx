import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { SearchBaseForm } from '@/components/organisms'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxHeight: {
      [theme.breakpoints.down('xs')]: {
        height: 140,
      },
    },
    body: {
      [theme.breakpoints.down('xs')]: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    keyword: {
      fontSize: theme.typography.h5.fontSize,
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
    },
    disableKeyword: {
      color: theme.palette.common.white,
      fontWeight: theme.typography.fontWeightBold,
      background: theme.palette.grey[800],
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
  })
)
export type Props = {
  currentTotalCount: number
  keyword?: string
  onClear: () => Promise<void>
}

const SearchBlogResultBox = ({
  onClear,
  keyword,
  currentTotalCount = 0,
}: Props) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = () => {}

  const handleClear = async () => {
    setLoading(true)
    await onClear().finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <SearchBaseForm
        currentTotalCount={currentTotalCount}
        loading={loading}
        onClear={handleClear}
        onSubmit={handleSubmit}
        classes={{ boxHeight: classes.boxHeight }}
      >
        <Grid item xs={12} className={classes.body}>
          {!!keyword ? (
            <Typography>
              <span className={classes.keyword}>{keyword}</span>で絞り込み中
            </Typography>
          ) : (
            <Typography className={classes.disableKeyword}>
              カード内のタグをクリックすると絞り込み検索ができます
            </Typography>
          )}
        </Grid>
      </SearchBaseForm>
    </>
  )
}

export default SearchBlogResultBox
