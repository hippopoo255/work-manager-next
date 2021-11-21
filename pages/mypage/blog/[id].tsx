import React, { useState, useMemo } from 'react'
import { useBlog } from '@/hooks'
import { mine, encode64 } from '@/lib/util'
import { BreadcrumbItem } from '@/interfaces/common'
import Router from 'next/router'
import { ConfirmDialog, CustomMenuBox } from '@/components/organisms'
import { Breadcrumbs } from '@/components/molecules'
import { MypageTitle } from '@/components/atoms'
import { MypageLayout } from '@/layouts'

const BlogDetail = () => {
  const { blog, auth, deleteBlog } = useBlog()
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
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
  console.log(auth)
  console.log(editable)

  return !!blog ? (
    <MypageLayout title="ブログ更新">
      <div className="container">
        <Breadcrumbs links={breadcrumbs} />
        <MypageTitle>{blog.title}</MypageTitle>
      </div>
      <section>
        <div className="container">
          <div>{editable && <CustomMenuBox options={menuList} />}</div>
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
