import { uri } from '~/config/endPoint'
import { Pager, Task } from '~/schema/generated/@types'
import { useSwr } from '~/services/common'

const useTaskPage = () => {
  const { data: taskPage, error, fetch } = useSwr<Pager<Task>>(uri.task.index)
  return {
    taskPage,
    error,
    fetch,
  }
}

export default useTaskPage
