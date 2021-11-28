const getAll = () => `
  query {
    blogs {
      id
      title
      body
      created_at
      updated_at
      status
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
