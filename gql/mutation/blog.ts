import {
  MutationCreateBlogArgs,
  MutationDeleteBlogArgs,
  MutationUpdateBlogArgs,
} from '@/interfaces/graphql/generated/graphql'

const createBlog = ({ input }: MutationCreateBlogArgs) => `
  mutation {
    createBlog(input: {
      title: "${input.title}",
      body: "${input.body}",
      status: ${input.status},
      writtenBy: {
        id: "${input.writtenBy.id}",
        name: "${input.writtenBy.name}",
      }
      tags: []
    }) {
      id
      title
      body
      created_at
      status
      writtenBy {
        id
        name
      }
    }
  }
`

const updateBlog = ({ id, input }: MutationUpdateBlogArgs) => `
  mutation {
    updateBlog(id: "${id}", input: {
      title: "${input.title}",
      body: "${input.body}",
      status: ${input.status},
      writtenBy: {
        id: "${input.writtenBy.id}",
        name: "${input.writtenBy.name}",
      }
      tags: []
    }) {
      id
      title
      body
      created_at
      status
      writtenBy {
        id
        name
      }
    }
  }
`

const deleteBlog = ({ id }: MutationDeleteBlogArgs) => `
  mutation {
    deleteBlog(id: "${id}") {
      id
      title
      body
      created_at
      status
      writtenBy {
        id
        name
      }
    }
  }
`

const blogMutation = {
  createBlog,
  updateBlog,
  deleteBlog,
}

export default blogMutation
