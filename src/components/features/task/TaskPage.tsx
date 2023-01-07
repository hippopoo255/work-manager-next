import { LoaderIcon } from '~/components/elements/Icon'
import { useTaskPage } from '~/services/task'

const TaskPage = () => {
  const { taskPage } = useTaskPage()
  return (
    <div className="p-card">
      <div className="p-card__inner">
        {taskPage ? (
          <ul>
            {taskPage?.data.map((item) => (
              <li key={`task_${item.id}`}>{item.body}</li>
            ))}
          </ul>
        ) : (
          <div className="u-position-center">
            <LoaderIcon />
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskPage
