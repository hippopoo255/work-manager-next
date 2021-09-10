import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Card, CardHeader } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Product } from '@/lib/initialData'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 320,
    margin: '0 auto',
    boxShadow: theme.shadows[10],
    [theme.breakpoints.down('xs')]: {
      maxWidth: 480,
    },
  },
  headerRoot: {
    padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
  },
  headerContent: {
    height: 40,
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
  },
  description: {
    minHeight: 60,
  },
}))

type Props = {
  item: Product
}

const ProductIntroductionCard = ({ item }: Props) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        subheader={item.icon}
        classes={{
          root: classes.headerRoot,
          content: classes.headerContent,
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h4"
          style={{ textAlign: 'center' }}
        >
          {item.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.description}
        >
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductIntroductionCard
