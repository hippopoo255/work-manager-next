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
  findById,
}

export default blogQuery
