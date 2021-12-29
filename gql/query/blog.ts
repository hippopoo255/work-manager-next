import { BlogStatus, QueryInput } from '@/interfaces/graphql/generated/graphql'

const getAll = (tagId?: string) => `
  query {
    blogs(query: {
      tag: "${tagId || 0}"
    }) {
      id
      title
      body
      created_at
      updated_at
      status
      tags {
        id
        name
      }
      writtenBy {
        id
        name
      }
    }
  }
`
const getPager = (query?: QueryInput, nextToken?: string | null) => {
  const token = !nextToken ? '' : nextToken
  return `
    query {
      blogs(query: {
        tag: "${!query || !query.tag ? 0 : query.tag}",
      }, nextToken: "${token}") {
        items {
          id
          title
          body
          created_at
          updated_at
          status
          tags {
            id
            name
          }
          writtenBy {
            id
            name
          }
        }
        nextToken
      }
    }
  `
}

const findById = (id: string) => `
  query {
    blog(id: "${id}") {
      id
      title
      body
      created_at
      updated_at
      status
      tags {
        id
        name
      }
      writtenBy {
        id
        name
      }
    }
  }
`

const blogQuery = {
  getAll,
  getPager,
  findById,
}

export default blogQuery
