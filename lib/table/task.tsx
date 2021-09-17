import { HeadCell } from '@/interfaces/table'
import { TaskTableRowData } from '@/interfaces/table/rowData'
import { Task } from '@/interfaces/models'
import { toStrLabel } from '@/lib/util'
import { StatusText, TimeLimitStatusText } from '@/components/atoms'

export const headCells: HeadCell<TaskTableRowData>[] = [
  {
    id: 'body',
    disablePadding: true,
    label: '内容',
    numeric: false,
    align: 'left',
    size: 180,
    long: true,
  },
  {
    id: 'priority_id',
    disablePadding: false,
    label: '優先度',
    numeric: false,
    align: 'center',
  },
  {
    id: 'progress_id',
    disablePadding: false,
    label: '進捗度',
    numeric: false,
    align: 'center',
  },
  {
    id: 'time_limit',
    disablePadding: false,
    label: '期日',
    numeric: false,
    align: 'center',
    size: 120,
  },
  {
    id: 'created_by',
    disablePadding: false,
    label: '登録者',
    numeric: false,
    align: 'center',
    size: 150,
  },
  {
    id: 'created_at',
    disablePadding: false,
    label: '登録日',
    numeric: false,
    align: 'center',
    size: 120,
  },
  {
    id: 'id',
    disablePadding: false,
    label: '操作',
    numeric: false,
    align: 'center',
  },
]

export const createRows = (list: Task[]): TaskTableRowData[] =>
  list.map((task: Task) => ({
    body: task.body,
    priority_id: task.priority.name,
    progress_id: <StatusText value={task.progress.name} status={task.status} />,
    time_limit: (
      <TimeLimitStatusText
        value={toStrLabel(new Date(task.time_limit))}
        status={task.status}
      />
    ),
    created_by: task.created_by.full_name,
    created_at: toStrLabel(new Date(task.created_at)),
    id: task.id,
    is_editable: true /*task.is_editable*/,
  }))
