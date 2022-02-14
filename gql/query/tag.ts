const getAll = () => `
  query {
    tags {
      id
      name
      created_at
      updated_at
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
      createdBy {
        id
        name
      }
    }
  }
`

const tagQuery = {
  getAll,
  findById,
}

export default tagQuery
