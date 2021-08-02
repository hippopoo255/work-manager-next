import React, { FC, useState, useEffect } from 'react'
import clsx from 'clsx'
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import { TaskModel, Pager } from '@/interfaces'
import { toStrLabel } from '@/lib/util'
import { ConfirmDialog } from '@/components/organisms'

interface Data {
  id: number
  body: string
  priority_id: string
  progress_id: string
  time_limit: string
  created_by: string
  created_at: string
}

function createData(
  id: number,
  body: string,
  priority_id: string,
  progress_id: string,
  time_limit: string,
  created_by: string,
  created_at: string
): Data {
  return {
    id,
    body,
    priority_id,
    progress_id,
    time_limit,
    created_by,
    created_at,
  }
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
  align: 'right' | 'left' | 'center'
  size?: number
}

const headCells: HeadCell[] = [
  {
    id: 'body',
    numeric: false,
    disablePadding: true,
    label: '内容',
    align: 'left',
    size: 180,
  },
  {
    id: 'priority_id',
    numeric: false,
    disablePadding: false,
    label: '優先度',
    align: 'center',
  },
  {
    id: 'progress_id',
    numeric: false,
    disablePadding: false,
    label: '進捗度',
    align: 'center',
  },
  {
    id: 'time_limit',
    numeric: false,
    disablePadding: false,
    label: '期日',
    align: 'center',
    size: 120,
  },
  {
    id: 'created_by',
    numeric: false,
    disablePadding: false,
    label: '登録者',
    align: 'center',
    size: 150,
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: '登録日',
    align: 'center',
    size: 120,
  },
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: '操作',
    align: 'center',
  },
]

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
            className={classes.checkBox}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            // variant="head"
            style={{ minWidth: headCell.size || 100 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.error.main,
            backgroundColor: lighten(theme.palette.error.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
    addBtn: {
      background: '#404040',
      color: '#ffffff',
      '&:hover': {
        background: lighten('#404040', 0.2),
      },
    },
  })
)

interface EnhancedTableToolbarProps {
  numSelected: number
  onAdd: any
  onTrash: any
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles()
  const { numSelected, onAdd, onTrash } = props

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          タスク一覧
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="削除する">
          <IconButton aria-label="delete" onClick={() => onTrash()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="タスクを追加する">
          <IconButton aria-label="add" onClick={() => onAdd(true)}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    row: {
      '&.Mui-selected':
        theme.palette.type === 'light'
          ? {
              color: theme.palette.error.main,
              backgroundColor: lighten(theme.palette.error.light, 0.85),
              '&:hover': {
                backgroundColor: lighten(theme.palette.error.light, 0.7),
              },
            }
          : {
              color: theme.palette.error.dark,
              backgroundColor: theme.palette.secondary.dark,
            },
    },
    checkBox: {
      '&.Mui-checked': {
        color: theme.palette.error.light,
      },
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    editIcon: {
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
      width: 32,
      height: 32,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  })
)

export type Props = {
  tasks: Pager<TaskModel>
  onPage: any
  onAdd: (isOpen: true) => void
  onEdit: (id: number) => void
  onDelete: (ids: number[]) => Promise<void>
}

const TaskTable: FC<Props> = ({
  tasks,
  onPage,
  onAdd,
  onEdit,
  onDelete,
}: Props) => {
  const classes = useStyles()
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<keyof Data>('created_at')
  const [selected, setSelected] = useState<number[]>([])
  const [rows, setRows] = useState<Data[]>([])
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  const getRows = (tasks: Pager<TaskModel>) => {
    return tasks.data
      ? tasks.data.map((task: TaskModel) =>
          createData(
            task.id,
            task.body,
            task.priority.name,
            task.progress.name,
            toStrLabel(new Date(task.time_limit)),
            task.created_by.full_name,
            toStrLabel(new Date(task.created_at))
          )
        )
      : []
  }

  useEffect(() => {
    setRows(getRows(tasks))
  }, [tasks])

  const handleRequestSort = async (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    setSelected([])
    await onPage(event, {
      sort_key: property,
      order_by: isAsc ? 'desc' : 'asc',
      page: 1,
    })
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n, index): number => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleDialog = () => {
    setConfirmOpen(true)
  }

  const handleDelete = async () => {
    await onDelete(selected).then(() => {
      setConfirmOpen(false)
      setSelected([])
    })
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    onPage(event, {
      page: newPage + 1,
      sort_key: orderBy,
      order_by: order,
    })
  }

  const handleRowClick = (
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<unknown>,
    id: number
  ) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const isSelected = (id: number) => selected.indexOf(id) !== -1
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ConfirmDialog
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onExec={handleDelete}
        />
        <EnhancedTableToolbar
          onAdd={onAdd}
          onTrash={handleDialog}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`row_${index}`}
                      selected={isItemSelected}
                      className={classes.row}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onChange={(event) => handleRowClick(event, row.id)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          color="default"
                          className={classes.checkBox}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        onClick={(event) => handleRowClick(event, row.id)}
                      >
                        {row.body}
                      </TableCell>
                      <TableCell align="left">{row.priority_id}</TableCell>
                      <TableCell align="left">{row.progress_id}</TableCell>
                      <TableCell align="center">{row.time_limit}</TableCell>
                      <TableCell align="center">{row.created_by}</TableCell>
                      <TableCell align="center">{row.created_at}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="編集する">
                          <Avatar
                            variant="rounded"
                            className={classes.editIcon}
                            onClick={() => onEdit(row.id)}
                          >
                            <EditOutlinedIcon />
                          </Avatar>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell style={{ height: 53 }} colSpan={6}>
                    データがまだありません。
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[tasks.per_page || 10]}
          component="div"
          count={tasks.total || 0}
          rowsPerPage={tasks.per_page || 10}
          page={tasks.current_page ? tasks.current_page - 1 : 0}
          onPageChange={handleChangePage}
        />
      </Paper>
    </div>
  )
}

// const TaskTable = (props: EnhancedTableProps) => {
//   return <div></div>
// }

export default TaskTable
