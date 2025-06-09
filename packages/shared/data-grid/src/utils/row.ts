import type { Column, ColumnDefaultEntryValues, IDEntry } from '../types'
import { DefaultEntryValues } from './column'

/**
 * Check if a row ID already exists in the first column
 * @param {IDEntry['rowId']} rowId Row ID to check
 * @param {Column[]} columns Current columns
 * @returns {boolean} True if the row ID already exists
 */
export function checkDuplicateRowId(
  rowId: IDEntry['rowId'],
  columns: Column[],
): boolean {
  return columns[0].entries.some((entry) => entry.rowId === rowId)
}

export interface CreateNewRowProps {
  rowId: IDEntry['rowId']
  columns: Column[]
}

/**
 * Create a new row to all columns with the same row ID
 * @param {Column[]} columns Current columns
 * @returns {Column[]} Columns with new row
 */
export function createNewRow({ columns, rowId }: CreateNewRowProps): Column[] {
  if (checkDuplicateRowId(rowId, columns)) {
    throw new Error('Row ID already exists')
  }

  return columns.map((column, index) => {
    return {
      ...column,
      entries: [
        ...column.entries,
        {
          rowId,
          value:
            index === 0
              ? rowId
              : DefaultEntryValues[
                  column.type as keyof ColumnDefaultEntryValues
                ],
        },
      ],
    }
  }) as Column[]
}

interface RemoveSelectedRowsProps {
  columns: Column[]
  selectedRows: string[]
}

/**
 * Remove selected rows from all columns
 * @param {Column[]} columns Current columns
 * @param {string[]} rowIds Row IDs to remove
 * @returns {Column[]} Columns with rows removed
 */
export function removeSelectedRows({
  columns,
  selectedRows,
}: RemoveSelectedRowsProps): Column[] {
  return columns.map((column) => {
    return {
      ...column,
      entries: column.entries.filter(
        (entry) => !selectedRows.includes(entry.rowId),
      ),
    }
  }) as Column[]
}
