import React from 'react'
import { Box, Tooltip } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { TagBlock } from '@/components/atoms'
import { Blog, Tag } from '@/interfaces/graphql/generated/graphql'

const useStyles = makeStyles((theme: Theme) => ({
  tagList: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
}))
type Props = {
  tags: Blog['tags']
  onTagClick?: (id: Tag['id']) => void
  disabled?: boolean
}

const TagsRow = ({ tags, onTagClick, disabled }: Props) => {
  const classes = useStyles()
  const handleTagClick = (id: Tag['id']) => {
    if (onTagClick !== undefined) {
      onTagClick(id)
    }
  }

  return (
    <Box component="ul" className={classes.tagList}>
      {tags &&
        tags.map((tag) =>
          !!disabled ? (
            <li key={tag.id}>
              <TagBlock tag={tag} />
            </li>
          ) : (
            <Tooltip title={'絞り込む'} key={tag.id}>
              <li>
                <TagBlock onClick={handleTagClick} tag={tag} />
              </li>
            </Tooltip>
          )
        )}
    </Box>
  )
}

export default TagsRow
