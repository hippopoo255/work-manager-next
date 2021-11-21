import React from 'react'
import { useBlog } from '@/hooks'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { Breadcrumbs } from '@/components/molecules'
import { BreadcrumbItem } from '@/interfaces/common'
import { BlogForm } from '@/components/template'

const BlogEdit = () => {
  const { blog, defaultValues, updateBlog } = useBlog()
  const breadcrumbs: BreadcrumbItem[] = [
    {
      to: '/mypage/blog',
      label: 'ブログ一覧',
    },
    {
      label: blog?.title || '',
    },
  ]

  return (
    <MypageLayout title="ブログ更新">
      <div className="container">
        <Breadcrumbs links={breadcrumbs} />
        <MypageTitle>ブログ新規投稿</MypageTitle>
      </div>
      <section>
        <div className="container">
          <BlogForm defaultValues={defaultValues} save={updateBlog} />
        </div>
      </section>
    </MypageLayout>
  )
}

export default BlogEdit
