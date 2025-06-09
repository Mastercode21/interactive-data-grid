import { useCallback } from 'react'

import type { Column, DataCellValues } from '../types'
import { updateColumns, resetAPIColumns } from '../utils/actions'
import { updateCellValue } from '../utils/cell'
import { createNewColumn, type CreateNewColumnProps } from '../utils/column'
import { createNewRow, removeSelectedRows } from '../utils/row'
import { useColumnStore } from '../store/columns'

export default function useDataGrid() {
  const { columns, setColumns } = useColumnStore()

  const addNewColumn = useCallback(
    async (newColumnData: CreateNewColumnProps['newColumnData']) => {
      const newColumn: Column = createNewColumn({ columns, newColumnData })
      setColumns(await updateColumns([...columns, newColumn]))
    },
    [columns],
  )

  const addNewRow = useCallback(
    async (rowId: string) => {
      setColumns(await updateColumns(createNewRow({ columns, rowId })))
    },
    [columns],
  )

  const removeColumn = useCallback(
    async (columnId: Column['id']) => {
      setColumns(
        await updateColumns(columns.filter((column) => column.id !== columnId)),
      )
    },
    [columns],
  )

  const removeRows = useCallback(
    async (rowIds: string[]) => {
      setColumns(
        await updateColumns(
          removeSelectedRows({ columns, selectedRows: rowIds }),
        ),
      )
    },
    [columns],
  )

  const resetColumns = async ({ size }: { size: 'large' | 'default' }) => {
    setColumns(await resetAPIColumns({ size }))
  }

  const updateCell = useCallback(
    async (columnId: Column['id'], rowId: string, newValue: DataCellValues) => {
      setColumns(
        await updateColumns(
          updateCellValue({ columnId, columns, rowId, newValue }),
        ),
      )
    },
    [columns],
  )

  return {
    columns,
    addNewColumn,
    addNewRow,
    removeColumn,
    removeRows,
    resetColumns,
    setColumns,
    updateCell,
  }
}
