import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import { Box } from '@material-ui/core'

type Item = {
  term: string | number
  key: string
  el: React.ReactNode
} | null

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    borderColor: grey[400],
  },
  row: {
    width: '100%',
    borderColor: grey[400],
    '&:last-of-type': {
      borderBottom: 0,
    },
  },
  term: {
    background: grey[200],
    padding: theme.spacing(3),
    flexShrink: 0,
    textAlign: 'center',
    minWidth: 150,
    [theme.breakpoints.down('md')]: {
      borderBottom: `1px solid ${grey[400]}`,
    },
    [theme.breakpoints.up('md')]: {
      borderRight: `1px solid ${grey[400]}`,
    },
  },
  data: {
    padding: theme.spacing(3),
    flexShrink: 1,
    flexGrow: 1,
  },
}))

interface Props {
  list: Item[]
}
const DefinitionList = ({ list }: Props) => {
  const classes = useStyles()
  return (
    <div>
      <Box component="dl" border={1} className={classes.root}>
        {list.length > 0 &&
          list.map(
            (item: Item) =>
              item !== null && (
                <Box
                  display={'flex'}
                  flexDirection={{ xs: 'column', md: 'row' }}
                  key={item.key}
                  borderBottom={1}
                  className={classes.row}
                >
                  <Box component={'dt'} className={classes.term}>
                    {item.term}
                  </Box>
                  <Box component={'dd'} className={classes.data}>
                    {item.el}
                  </Box>
                </Box>
              )
          )}
      </Box>
    </div>
  )
}

export default DefinitionList
