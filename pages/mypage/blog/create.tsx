import { MypageTitle } from '@/components/atoms'
import { MypageLayout } from '@/layouts'
import { Breadcrumbs } from '@/components/molecules'
import { BreadcrumbItem } from '@/interfaces/common'
import { BlogForm } from '@/components/template'
import { useBlog } from '@/hooks'

const BlogCreate = () => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      to: '/mypage/blog',
      label: 'ブログ一覧',
    },
    {
      label: 'ブログ新規投稿',
    },
  ]

  const { defaultValues, createBlog } = useBlog()
  return (
    <MypageLayout title="ブログ新規投稿">
      <div className="container">
        <Breadcrumbs links={breadcrumbs} />
        <MypageTitle>ブログ新規投稿</MypageTitle>
      </div>
      <section>
        <div className="container">
          <BlogForm defaultValues={defaultValues} save={createBlog} />
        </div>
      </section>
    </MypageLayout>
  )
}

export default BlogCreate
