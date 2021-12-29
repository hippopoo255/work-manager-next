import React, { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MypageLayout } from '@/layouts'
import { useQuery } from '@/gql'
import { blogQuery } from '@/gql/query'
import { Blog, QueryInput, Tag } from '@/interfaces/graphql/generated/graphql'
import { BlogCard } from '@/components/molecules'
import { MypageTitle } from '@/components/atoms'
import { Box, Grid } from '@material-ui/core'
import { AddButton, MoreLoadButton } from '@/components/molecules'
import { SearchBox, SearchBlogResultBox } from '@/components/organisms'

type BlogData = {
  blogs: {
    items: Blog[]
    nextToken: string | null
  }
}

const Index = () => {
  const { data, fetch } = useQuery<BlogData>(blogQuery.getPager(), {
    blogs: {
      items: [],
      nextToken: null,
    },
  })
  const nextToken = data.blogs.nextToken
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [tagId, setTagId] = useState<string | undefined>(undefined)
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    setBlogs((prev: Blog[]) => [...prev, ...data.blogs.items])
  }, [data])

  const reloadBlogs = async (
    queryArgs: QueryInput = {
      tag: tagId,
    },
    token: string | null = nextToken
  ) => {
    const query = blogQuery.getPager(queryArgs, token)
    return await fetch(query)
  }
  const handleMore = async () => await reloadBlogs()

  const handleSearchClear = async () => {
    if (!!keyword) {
      setBlogs([])
      return await fetch(blogQuery.getPager()).then(() => {
        setTagId(undefined)
        setKeyword('')
      })
    } else {
      return await undefined
    }
  }

  const handleAdd = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.push('/mypage/blog/create')
  }

  const handleTagClick = useCallback(async (targetTag: Tag) => {
    setBlogs([])
    const queryArgs = {
      tag: targetTag.id,
    }
    await reloadBlogs(queryArgs, null).then(() => {
      setTagId(targetTag.id)
      setKeyword(targetTag.name)
    })
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
          {nextToken && (
            <Box
              className="container"
              mt={2}
              display={'flex'}
              justifyContent={'center'}
            >
              <MoreLoadButton fetch={handleMore} />
            </Box>
          )}
        </Box>
        <AddButton onClick={handleAdd} title="ブログを投稿する" />
      </section>
    </MypageLayout>
  )
}

export default Index
