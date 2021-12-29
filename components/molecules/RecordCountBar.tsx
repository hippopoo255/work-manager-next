import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Button, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  fieldClear: {
    flexShrink: 0,
  },
}))

type Props = {
  onSearchClear: () => void
  currentTotalCount: number
}

const RecordCountBar = ({ onSearchClear, currentTotalCount = 0 }: Props) => {
  const classes = useStyles()
  return (
    <Grid
      container
      spacing={2}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Grid item classes={{ item: classes.fieldClear }}>
        <Button
          variant={'outlined'}
          color={'primary'}
          size={'small'}
          onClick={onSearchClear}
        >
          検索クリア
        </Button>
      </Grid>
      <Grid item>
        <Typography color={'textSecondary'} variant={'body2'}>
          検索結果：<strong>{currentTotalCount}</strong>件
        </Typography>
      </Grid>
    </Grid>
  )
}

export default RecordCountBar
