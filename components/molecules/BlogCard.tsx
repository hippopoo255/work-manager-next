import React from 'react'
import { Blog } from '@/interfaces/models'
import { toStrData } from '@/lib/util'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Link from 'next/link'
import { encode64 } from '@/lib/util'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // border: `1px solid ${theme.palette.grey[500]}`,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    maxWidth: 450,
    margin: `0 auto`,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  subText: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
  },
}))

type Props = {
  blog: Blog
}

const BlogCard = ({ blog }: Props) => {
  const classes = useStyles()
  const encodedId = encode64(blog.id)

  return (
    <Link
      href={`/mypage/blog/${blog.id}`}
      as={`/mypage/blog/${encodedId}`}
      passHref
    >
      <a>
        <article className={classes.root}>
          <p>{blog.title}</p>
          <span className={classes.subText}>
            {toStrData(new Date(blog.created_at))}
          </span>
        </article>
      </a>
    </Link>
  )
}

export default BlogCard
