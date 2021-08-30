import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { darken } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { Box } from '@material-ui/core'
import { DefinitionListItem } from '@/interfaces/common/definitionList'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      borderColor: theme.palette.grey[400],
    },
    row: {
      width: '100%',
      borderColor: theme.palette.grey[400],
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
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
      [theme.breakpoints.down('sm')]: {
        borderBottom: `1px solid ${theme.palette.grey[400]}`,
      },
      [theme.breakpoints.up('md')]: {
        borderRight: `1px solid ${theme.palette.grey[400]}`,
      },
    },
    data: {
      padding: theme.spacing(3),
      flexShrink: 1,
      flexGrow: 1,
    },
  })
)

interface Props {
  list: (DefinitionListItem | null)[]
}
const DefinitionList = ({ list }: Props) => {
  const classes = useStyles()
  return (
    <div>
      <Box component="dl" border={1} className={classes.root}>
        {list.length > 0 &&
          list.map(
            (item: DefinitionListItem | null) =>
              item !== null && (
                <Box key={item.key} borderBottom={1} className={classes.row}>
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
