import React from 'react'
import marked from '@/lib/marked'
import DOMPurify from 'isomorphic-dompurify'
import 'highlight.js/styles/github.css'
import { lighten, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'

const usePreviewStyles = makeStyles((theme: Theme) => ({
  markdown: {
    padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    background: theme.palette.background.paper,
    height: `100%`,
    '& h1,& h2,& h3,& h4,& h5,& h6': {
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(1),
    },
    '& h1,& h2': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& h1': {
      fontSize: '2.4rem',
    },
    '& h2': {
      fontSize: '2rem',
    },
    '& h3': {
      fontSize: '1.6rem',
    },
    '& h4': {
      fontSize: '1.4rem',
    },
    '& h5,& h6': {
      fontSize: '1.2rem',
    },
    // コード
    '& p > code': {
      color: 'red',
      backgroundColor: '#eee',
      borderRadius: '4px',
      padding: '0 5px',
    },
    // リンク
    '& a': {
      color: theme.palette.primary.main,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    // 画像
    '& img': {
      margin: `${theme.spacing(2)}px 0`,
    },
    // 引用文
    '& blockquote': {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      borderLeft: `3px solid ${theme.palette.divider}`,
    },
    // コードブロック
    '& pre': {
      display: 'block',
      borderRadis: '4px',
      overflowX: 'scroll',
      padding: theme.spacing(1),
    },
    // リスト
    '& ul': {
      listStyle: 'disc',
      paddingLeft: theme.spacing(2),
    },
    '& li': {
      margin: `${theme.spacing(2)}px 0`,
    },
    '& ol': {
      listStyle: 'decimal',
      paddingLeft: theme.spacing(2),
    },
    // テーブル
    '& table': {
      borderCollapse: 'collapse',
    },
    '& thead': {
      background: lighten(theme.palette.primary.main, 0.8),
    },
    '& tbody > tr:nth-of-type(even)': {
      background: theme.palette.grey[100],
    },
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
}))

type Props = {
  editorValue: string
}

const MarkdownPreview = ({ editorValue }: Props) => {
  const classes = usePreviewStyles()
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked(editorValue)),
      }}
      className={clsx(['editor-preview', classes.markdown])}
      style={{ height: '100%' }}
    ></div>
  )
}

export default MarkdownPreview
