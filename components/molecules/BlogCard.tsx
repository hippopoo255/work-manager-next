import React, { useCallback, useMemo } from 'react'
import { Blog } from '@/interfaces/graphql/generated/graphql'
import { postTiming, STORAGE_URL } from '@/lib/util'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Link from 'next/link'
import { encode64 } from '@/lib/util'
import { Typography } from '@material-ui/core'
import { TagsRow } from '@/components/molecules'
import { Tag } from '@/interfaces/graphql/generated/graphql'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    maxWidth: 450,
    margin: `0 auto`,
    background: theme.palette.common.white,
  },
  link: {
    display: 'block',
    '&:hover': {
      opacity: 0.7,
    },
  },
  thumbnail: {
    background: theme.palette.grey[200],
    position: 'relative',
    padding: `0 0 56.75%`,
    margin: `-${theme.spacing(2)}px -${theme.spacing(2)}px 0`,
    overflow: 'hidden',
  },
  thumbnailSrc: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'all .25s ease-out',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&:hover': {
      transform: 'scale3d(1.1, 1.1, 1.1)',
    },
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
    height: theme.spacing(6),
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    overflow: 'hidden',
    marginTop: theme.spacing(2),
  },
  subText: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
    fontWeight: 'bold',
  },
  tags: {
    height: theme.spacing(7),
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(1)}px`,
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
  },
  strong: {
    color: theme.palette.common.black,
  },
}))

type Props = {
  blog: Blog
  fetch?: (q: string) => Promise<void>
  onTagClick: (t: Tag) => void
}

// eslint-disable-next-line react/display-name
const BlogCard = React.memo(({ blog, fetch, onTagClick }: Props) => {
  const classes = useStyles()
  const encodedId = encode64(blog.id)

  const handleTagClick = useCallback(async (id: Tag['id']) => {
    if (fetch !== undefined) {
      const targetTag = !!blog.tags && blog.tags.find((tag) => tag.id === id)
      if (!!targetTag) {
        onTagClick(targetTag)
      }
    }
  }, [])

  const bgImage = useMemo(() => {
    return `url(${STORAGE_URL}/assets/no-image.png)`
  }, [blog])

  return (
    <>
      <article className={classes.root}>
        <Link
          href={`/mypage/blog/${blog.id}`}
          as={`/mypage/blog/${encodedId}`}
          passHref
        >
          <a className={classes.link}>
            <div className={classes.thumbnail}>
              <div
                className={classes.thumbnailSrc}
                style={{ backgroundImage: bgImage }}
              ></div>
            </div>
            <Typography
              variant="body1"
              component="h5"
              className={classes.title}
            >
              {blog.title}
            </Typography>
          </a>
        </Link>
        <Typography component="nav" className={classes.tags}>
          {blog.tags && (
            <TagsRow
              tags={blog.tags}
              onTagClick={!!fetch ? handleTagClick : undefined}
            />
          )}
        </Typography>
        <Typography className={classes.meta}>
          <span className={classes.subText}>
            {postTiming(new Date(blog.created_at))}
          </span>
          <span className={clsx([classes.subText, classes.strong])}>
            {blog.writtenBy?.name}
          </span>
        </Typography>
      </article>
    </>
  )
})

export default BlogCard
