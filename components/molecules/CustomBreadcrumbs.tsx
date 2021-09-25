import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Typography, Breadcrumbs, Link } from '@material-ui/core'
import { BreadcrumbItem } from '@/interfaces/common'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      paddingBottom: theme.spacing(2),
      marginBottom: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    item: {
      fontSize: theme.typography.subtitle2.fontSize,
      color: theme.palette.primary.main,
    },
    lastItem: {
      fontWeight: theme.typography.fontWeightBold,
    },
  })
)
type Props = {
  links: BreadcrumbItem[]
}
const CustomBreadcrumbs = ({ links }: Props) => {
  const classes = useStyles()

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault()
    console.info('You clicked a breadcrumb.')
  }

  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.top}>
      <Link color="inherit" href="/mypage" className={classes.item}>
        マイページトップ
      </Link>
      {!!links.length &&
        links.map((link, index) =>
          !!link.to ? (
            <Link
              color="inherit"
              href={link.to}
              key={`crumb_${index}`}
              className={classes.item}
            >
              {link.label}
            </Link>
          ) : (
            <Typography
              color="textPrimary"
              variant={'subtitle2'}
              key={`crumb_${index}`}
              className={classes.lastItem}
            >
              {link.label}
            </Typography>
          )
        )}
    </Breadcrumbs>
  )
}

export default CustomBreadcrumbs
