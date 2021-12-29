import { useMemo, useEffect, useCallback } from 'react'
import { useAuth } from '.'
import { useQuery } from '@/gql'
import {
  BlogStatus,
  CreateBlogInput,
  UpdateBlogInput,
  Query,
} from '@/interfaces/graphql/generated/graphql'
import { blogMutation } from '@/gql/mutation'
import { execMutation } from '@/gql'
import { Blog } from '@/interfaces/graphql/generated/graphql'
import { useRouter } from 'next/router'
import { blogQuery } from '@/gql/query'
import { decode64 } from '@/lib/util'

type BlogData = {
  blog: Query['blog']
}

const useBlog = () => {
  const router = useRouter()
  const paramId = router.query.id
  const decodedId = decode64(String(paramId))
  const { data, setData } = useQuery<BlogData>(
    blogQuery.findById(decodedId),
    { blog: null },
    [paramId],
    paramId !== undefined
  )
  const { auth } = useAuth()
  const defaultValues: CreateBlogInput | UpdateBlogInput = useMemo(
    () => ({
      title: data.blog?.title || '',
      body: data.blog?.body || '',
      status: data.blog?.status || BlogStatus.Done,
      writtenBy: {
        id: auth.user.user_code,
        name: auth.user.full_name,
      },
      tags: data.blog?.tags || [],
    }),
    [auth, data]
  )

  const createBlog = async (input: CreateBlogInput) => {
    console.log()
    input.body = input.body.replace(/\r?\n/g, '\\n')
    input.body = input.body.replace(/"/g, '\\"')
    const args = { input }
    return await execMutation<Blog>(blogMutation.createBlog(args))
  }

  const updateBlog = async (input: UpdateBlogInput) => {
    input.body = input.body.replace(/\r?\n/g, '\\n')
    input.body = input.body.replace(/"/g, '\\"')
    const args = { id: String(decodedId), input }
    return await execMutation<Blog>(blogMutation.updateBlog(args))
  }

  const deleteBlog = async () => {
    const args = { id: String(decodedId) }
    return await execMutation<Blog>(blogMutation.deleteBlog(args))
  }

  useEffect(() => {
    if (data.blog === null && paramId !== undefined) {
      router.push('/404', '/not_found')
    }
  }, [data])

  return {
    blog: data.blog,
    setBlog: setData,
    defaultValues,
    createBlog,
    updateBlog,
    deleteBlog,
    auth,
  }
}

export default useBlog
