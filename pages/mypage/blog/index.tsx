import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { MypageLayout } from '@/layouts'
import { useQuery } from '@/gql'
import { blogQuery } from '@/gql/query'
import { Blog } from '@/interfaces/graphql/generated/graphql'
import { BlogCard } from '@/components/molecules'
import { MypageTitle } from '@/components/atoms'
import { Box, Grid } from '@material-ui/core'
import { AddButton } from '@/components/molecules'
import { SearchBox, SearchBlogResultBox } from '@/components/organisms'

type BlogData = {
  blogs: Blog[]
}

const Index = () => {
  const { data, fetch } = useQuery<BlogData>(blogQuery.getAll(), {
    blogs: [],
  })
  const blogs = data.blogs

  const router = useRouter()
  const [keyword, setKeyword] = useState<string>('')

  const handleSearchClear = async () =>
    !!keyword
      ? await fetch(blogQuery.getAll()).then(() => {
          setKeyword('')
        })
      : await undefined

  const handleAdd = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.push('/mypage/blog/create')
  }

  const handleTagClick = useCallback((target: string) => {
    setKeyword(target)
  }, [])

  return (
    <MypageLayout title="ブログ">
      <div className="container">
        <MypageTitle>ブログ</MypageTitle>
      </div>
      <section>
        <Box className="container" mt={5}>
          <SearchBox
            position={{
              paddingBottom: 16,
            }}
            formContent={
              <SearchBlogResultBox
                onClear={handleSearchClear}
                currentTotalCount={blogs.length}
                keyword={keyword}
              />
            }
            disablePadding
          />
          <Grid container spacing={2} alignItems={'center'}>
            {!!blogs.length &&
              blogs.map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                  <BlogCard
                    blog={blog}
                    fetch={fetch}
                    onTagClick={handleTagClick}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        <AddButton onClick={handleAdd} title="ブログを投稿する" />
      </section>
    </MypageLayout>
  )
}

export default Index
