import { Column, DataCellValues, IDEntry } from '../types'

interface UpdateCellValueProps {
  columnId: Column['id']
  columns: Column[]
  newValue: DataCellValues
  rowId: IDEntry['rowId']
}

/**
 * Update a cell value in the columns
 * @param {UpdateCellValueProps} props Column ID, columns, new value and row ID
 * @returns {Column[]} Updated columns
 */
export function updateCellValue({
  columnId,
  columns,
  rowId,
  newValue,
}: UpdateCellValueProps): Column[] {
  const columnIndex = columns.findIndex((column) => column.id === columnId)
  if (columnIndex === -1) throw new Error('Column not found')

  const entryIndex = columns[columnIndex].entries.findIndex(
    (entry) => entry.rowId === rowId,
  )
  if (entryIndex === -1) throw new Error('Entry not found')

  const updatedColumns = [...columns]
  updatedColumns[columnIndex].entries[entryIndex].value = newValue

  return updatedColumns
}
