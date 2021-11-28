import React from 'react'
import { Blog } from '@/interfaces/graphql/generated/graphql'
import { Card, CardContent } from '@material-ui/core'
import { MarkdownPreview } from '@/components/atoms'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

type Props = {
  blog: Blog
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      // background: theme.palette.background.paper,
    },
  })
)

const BlogDetailCard = ({ blog }: Props) => {
  const classes = useStyles()
  return (
    <Card className={classes.paper}>
      <CardContent>
        <MarkdownPreview editorValue={blog.body} />
      </CardContent>
    </Card>
  )
}

export default BlogDetailCard
