import React, { useMemo } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { ProductIntroductionCard } from '@/components/organisms'
import { ProductList } from '@/lib/initialData'
import { Product } from '@/interfaces/common'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: '100%',
      maxWidth: 1024,
      margin: '0 auto',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px `,
    },
    item: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
  })
)

type Props = {
  productList?: Product[]
}
const ProductIntroductionCardList = ({
  productList = ProductList(),
}: Props) => {
  const classes = useStyles()
  return (
    <nav className={classes.list}>
      <Grid container spacing={3} justifyContent={'center'}>
        {!!productList.length &&
          productList.map((item) => (
            <Grid item md={4} key={item.id} className={classes.item}>
              <ProductIntroductionCard item={item} />
            </Grid>
          ))}
      </Grid>
    </nav>
  )
}

export default ProductIntroductionCardList
