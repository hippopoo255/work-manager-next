import { Dispatch, SetStateAction } from 'react'
import { useQuery } from '@/gql'
import { Query, TagInput } from '@/interfaces/graphql/generated/graphql'
import { tagQuery } from '@/gql/query'
type TagData = {
  tags: Query['tags']
}

type Data = {
  tagList: TagInput[]
  setTags: Dispatch<SetStateAction<TagData>>
}

const useTags = (): Data => {
  const { data, setData } = useQuery<TagData>(tagQuery.getAll(), { tags: [] })
  return {
    tagList: !data.tags
      ? []
      : data.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
        })),
    setTags: setData,
  }
}

export default useTags
