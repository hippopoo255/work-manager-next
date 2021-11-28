import React, { useState, useMemo } from 'react'
import { useBlog } from '@/hooks'
import { mine, encode64, postTiming } from '@/lib/util'
import { BreadcrumbItem } from '@/interfaces/common'
import Router from 'next/router'
import {
  BlogDetailCard,
  ConfirmDialog,
  CustomMenuBox,
} from '@/components/organisms'
import { BlogMeta, Breadcrumbs } from '@/components/molecules'
import { MypageTitle } from '@/components/atoms'
import { MypageLayout } from '@/layouts'
import { makeStyles, Theme } from '@material-ui/core/styles'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import UpdateIcon from '@material-ui/icons/Update'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  operator: {
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      borderTop: `1px solid ${theme.palette.divider}`,
      background: theme.palette.common.white,
      // textAlign: 'right',
    },
  },
  flexible: {
    flexGrow: 1,
    maxWidth: '100%',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    padding: `${theme.spacing(5)}px 0`,
  },
}))

const BlogDetail = () => {
  const { blog, auth, deleteBlog } = useBlog()
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const classes = useStyles()
  const editable = useMemo(
    () =>
      blog?.writtenBy && mine(blog?.writtenBy.id, String(auth.user.user_code)),
    [blog, auth]
  )
  const handleEdit = () => {
    Router.push(
      `/mypage/blog/edit/${blog?.id}`,
      `/mypage/blog/edit/${encode64(blog?.id || '')}`
    )
  }
  const handleDialog = () => {
    // モーダルを表示する
    setConfirmOpen(true)
  }
  const handleDelete = async () => {
    setConfirmLoading(true)
    await deleteBlog()
      .then((blog) => {
        if (blog === null) {
          console.log('投稿に失敗しました')
          return false
        }
        Router.push(`/mypage/blog`)
      })
      .finally(() => {
        setConfirmLoading(false)
      })
  }

  const menuList = [
    {
      text: 'この記事を編集する',
      onClick: () => handleEdit(),
      disabled: !editable,
    },
    {
      text: 'この記事を削除する',
      onClick: () => handleDialog(),
      disabled: !editable,
      danger: true,
    },
  ]

  const breadcrumbs: BreadcrumbItem[] = [
    {
      to: '/mypage/blog',
      label: 'ブログ一覧',
    },
    {
      label: blog?.title || '',
    },
  ]

  return !!blog ? (
    <MypageLayout title={blog.title}>
      <div className="container">
        <Breadcrumbs links={breadcrumbs} />
      </div>
      <section>
        <div className="container">
          <div>
            <div className={classes.layout}>
              <div className={classes.operator}>
                {editable && <CustomMenuBox options={menuList} />}
              </div>
              <div className={classes.flexible}>
                <MypageTitle center>{blog.title}</MypageTitle>
                <div className={classes.meta}>
                  <BlogMeta
                    label={'投稿者'}
                    value={blog.writtenBy?.name || ''}
                    Icon={AccountCircleIcon}
                  />
                  <BlogMeta
                    label={'公開日'}
                    value={postTiming(new Date(blog.created_at!)) || ''}
                    Icon={CalendarTodayIcon}
                  />
                  <BlogMeta
                    label={'更新日'}
                    value={postTiming(new Date(blog.updated_at!)) || ''}
                    Icon={UpdateIcon}
                  />
                </div>
                <BlogDetailCard blog={blog} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ConfirmDialog
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onExec={handleDelete}
        loading={confirmLoading}
        isCircular
      />
    </MypageLayout>
  ) : (
    <div />
  )
}

export default BlogDetail
