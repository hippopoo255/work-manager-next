import React from 'react'
import { useRouter } from 'next/router'
import { MypageLayout } from '@/layouts'
import { useQuery } from '@/gql'
import { blogQuery } from '@/gql/query'
import { Blog } from '@/interfaces/models'
import { BlogCard } from '@/components/molecules'
import { MypageTitle } from '@/components/atoms'
import { Grid } from '@material-ui/core'
import { AddButton } from '@/components/molecules'

type BlogData = {
  blogs: Blog[]
}

const Index = () => {
  const { data } = useQuery<BlogData>(blogQuery.getAll(), {
    blogs: [],
  })
  const blogs = data.blogs

  const router = useRouter()

  const handleAdd = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.push('/mypage/blog/create')
  }

  return (
    <MypageLayout title="ブログ">
      <div className="container">
        <MypageTitle>ブログ</MypageTitle>
      </div>
      <section>
        <div className="container">
          <Grid container spacing={2} alignItems={'center'}>
            {!!blogs.length &&
              blogs.map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                  <BlogCard blog={blog} />
                </Grid>
              ))}
          </Grid>
        </div>
        <AddButton onClick={handleAdd} title="ブログを投稿する" />
      </section>
    </MypageLayout>
  )
}

export default Index
