import { v6 as uuidv6 } from 'uuid'

import type { Column, ColumnDefaultEntryValues } from '../types'

interface ColumnType {
  label: string
  type: Column['type']
}

/**
 * Column types
 *
 * These are the types of columns that can be created. ID is a special column type that is created by default.
 */
export const newColumnTypes: Readonly<ColumnType[]> = Object.freeze([
  {
    label: 'Text',
    type: 'text',
  },
  {
    label: 'Number',
    type: 'number',
  },
  {
    label: 'Tag',
    type: 'tag',
  },
  {
    label: 'Users',
    type: 'users',
  },
] as ColumnType[])

/**
 * Default entry values for each column type
 *
 * These are the default values for each column type when a new column is created.
 */
export const DefaultEntryValues: Readonly<ColumnDefaultEntryValues> =
  Object.freeze({
    text: '',
    number: 0,
    tag: [],
    users: [],
  } as ColumnDefaultEntryValues)

export interface CreateNewColumnProps {
  newColumnData: Pick<Column, 'label' | 'type'>
  columns: Column[]
}

/**
 * Create a new column with default entries based on the new column type and the current columns rows
 * @param {CreateNewColumnProps} props Current columns and new column data
 * @returns {Column} New column
 */
export function createNewColumn({
  columns,
  newColumnData,
}: CreateNewColumnProps): Column {
  const newColumnEntries: Column['entries'] = columns[0].entries.map(
    (entry) => {
      return {
        rowId: entry.rowId,
        value:
          DefaultEntryValues[
            newColumnData.type as keyof ColumnDefaultEntryValues
          ],
      }
    },
  ) as Column['entries']

  return {
    id: uuidv6(),
    entries: newColumnEntries,
    ...newColumnData,
  } as Column
}
