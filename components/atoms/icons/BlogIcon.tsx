import React from 'react'
import BookOutlinedIcon from '@material-ui/icons/BookOutlined'

type Props = {
  fontSize?: string
}
const BlogIcon = ({ fontSize = '1.5rem' }: Props = {}) => {
  return <BookOutlinedIcon style={{ fontSize }} />
}

export default BlogIcon
