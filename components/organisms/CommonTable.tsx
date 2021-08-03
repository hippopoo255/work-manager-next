import React, { FC, useState, useEffect } from 'react'
import clsx from 'clsx'
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { red } from '@material-ui/core/colors'
// テーブルトップツールバー、テーブルヘッド
import { EnhancedTableToolbar, EnhancedTableHead } from '@/components/molecules'

// テーブル共通
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'

import Avatar from '@material-ui/core/Avatar'
import { Grid, Hidden } from '@material-ui/core'
import { CustomMenuBox } from '@/components/organisms'

import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { Pager } from '@/interfaces'
import { ConfirmDialog } from '@/components/organisms'
import { QueryParam, Order, HeadCell, TableRowData } from '@/interfaces/table'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    head: {
      background: theme.palette.common.black,
      '& .MuiTableSortLabel-root': {
        color: theme.palette.common.white,
        fontWeight: '800',
      },
      '& .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon':
        {
          color: theme.palette.common.white,
          fontWeight: '800',
        },
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    row: {
      // transition: theme.transitions.duration.short,
      '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
      },
      '&.MuiTableRow-hover:hover': {
        backgroundColor: lighten(theme.palette.primary.light, 0.9),
      },
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
    headCheck: {
      color: theme.palette.common.white,
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
      width: 24,
      height: 24,
      fontSize: 12,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    trashIcon: {
      color: '#fff',
      backgroundColor: theme.palette.error.main,
      width: 24,
      height: 24,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.error.dark,
      },
    },
    icon: {
      fontSize: '1.4rem',
    },
    td: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      display: 'inline-block',
      overflow: 'hidden',
      width: '100%',
    },
  })
)

/**
 * T = Model
 * U = extends TableRowData
 */
export type Props<T, U extends TableRowData> = {
  headCells: HeadCell<U>[]
  onDelete: (ids: number[]) => Promise<void>
  onEdit: (id: number) => void
  onPage: (
    e:
      | React.MouseEvent<unknown>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | null,
    obj: QueryParam<U>
  ) => Promise<void>
  pagerData: Pager<T>
  rows: U[]
  title: string
  children: React.ReactNode
  multiSelect: boolean
}

const CommonTable = <T, U extends TableRowData>({
  headCells,
  onDelete,
  onEdit,
  onPage,
  pagerData,
  rows,
  title,
  children,
  multiSelect,
}: Props<T, U>) => {
  const classes = useStyles()
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<keyof U>('created_at')
  const [selected, setSelected] = useState<number[]>([])
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)

  const handleRequestSort = async (
    event: React.MouseEvent<unknown>,
    property: keyof U
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

  const handleTrash = (id: number = 0) => {
    if (id > 0) {
      setSelected([id])
    }
    setConfirmOpen(true)
  }

  const handleDelete = async () => {
    await onDelete(selected).then(() => {
      setConfirmOpen(false)
      setSelected([])
    })
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
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

  const menuList = [
    {
      text: '編集',
      onClick: (id: number) => onEdit(id),
    },
    {
      text: '削除',
      onClick: (id: number) => handleTrash(id),
    },
  ]

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
          onTrash={handleTrash}
          numSelected={selected.length}
          title={title}
          multiSelect={multiSelect}
        >
          {children}
        </EnhancedTableToolbar>
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
              headCells={headCells}
              multiSelect={multiSelect}
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
                      selected={multiSelect && isItemSelected}
                      className={classes.row}
                    >
                      <TableCell padding={multiSelect ? 'checkbox' : 'normal'}>
                        {multiSelect && (
                          <Checkbox
                            onChange={(event) => handleRowClick(event, row.id)}
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            // color="default"
                            className={classes.checkBox}
                          />
                        )}
                      </TableCell>
                      {headCells.length > 0 &&
                        headCells.map((headCell, nthOfCell) =>
                          headCell.id === 'id' ? (
                            <TableCell
                              align="center"
                              key={`row_${index}_${headCell.id}`}
                            >
                              <CustomMenuBox options={menuList} id={row.id} />
                            </TableCell>
                          ) : (
                            <TableCell
                              key={`row_${index}_${headCell.id}`}
                              component="th"
                              id={labelId}
                              scope="row"
                              align={headCell.align}
                              padding={
                                headCell.disablePadding ? 'none' : 'normal'
                              }
                              style={{
                                minWidth: headCell.size || 100,
                                maxWidth: headCell.long
                                  ? headCell.size
                                  : 'initial',
                              }}
                              onClick={(event) =>
                                multiSelect && nthOfCell === 0
                                  ? handleRowClick(event, row.id)
                                  : false
                              }
                            >
                              <span
                                className={clsx({
                                  [classes.td]: headCell.long,
                                })}
                              >
                                {row[headCell.id]}
                              </span>
                            </TableCell>
                          )
                        )}
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell
                    style={{ height: 53 }}
                    colSpan={headCells.length + 1}
                  >
                    データがまだありません。
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[pagerData.per_page || 10]}
          component="div"
          count={pagerData.total || 0}
          rowsPerPage={pagerData.per_page || 10}
          page={pagerData.current_page ? pagerData.current_page - 1 : 0}
          onPageChange={handleChangePage}
        />
      </Paper>
    </div>
  )
}

CommonTable.propTypes = {
  title: PropTypes.string,
  multiSelect: PropTypes.bool,
}

CommonTable.defaultProps = {
  title: 'テーブル',
  multiSelect: false,
}

export default CommonTable
