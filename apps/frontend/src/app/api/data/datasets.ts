import { v6 as uuidv6 } from 'uuid'

import type {
  Column,
  IDEntry,
  TextEntry,
  NumberEntry,
  TagEntry,
  UsersEntry,
} from '@monorepo/data-grid'

/**
 * Generates a large dataset with the specified number of columns and entries.
 * The first column is always an ID column, and there are no duplicate ID columns.
 * @param numColumns Number of columns to generate.
 * @param numEntries Number of entries per column.
 * @returns A large dataset with fake data.
 */
export function generateLargeDataset(
  numColumns: number,
  numEntries: number,
): Column[] {
  const columnTypes = ['text', 'number', 'tag', 'users'] as const

  const generateEntries = (type: (typeof columnTypes | 'id')[number]) => {
    return Array.from({ length: numEntries }, (_, rowIndex) => {
      const rowId = `row-${rowIndex + 1}`
      switch (type) {
        case 'id':
          return { rowId, value: rowId } as IDEntry
        case 'text':
          return { rowId, value: `Text ${rowIndex + 1}` } as TextEntry
        case 'number':
          return {
            rowId,
            value: Math.floor(Math.random() * 1000),
          } as NumberEntry
        case 'tag':
          return {
            rowId,
            value: [`Tag${rowIndex + 1}`, `Tag${rowIndex + 2}`],
          } as TagEntry
        case 'users':
          return {
            rowId,
            value: [
              {
                id: `user-${rowIndex + 1}`,
                name: `User ${rowIndex + 1}`,
                image: `/avatars/avatar${(rowIndex % 10) + 1}.png`,
              },
            ],
          } as UsersEntry
      }
    })
  }

  return Array.from({ length: numColumns }, (_, columnIndex) => {
    const type =
      columnIndex === 0
        ? 'id'
        : columnTypes[(columnIndex - 1) % columnTypes.length]
    return {
      id: uuidv6(),
      type,
      label: columnIndex === 0 ? 'ID' : `Column ${columnIndex + 1}`,
      entries: generateEntries(type),
    } as Column
  })
}

export const defaultDataset: Column[] = [
  {
    id: uuidv6(),
    type: 'id',
    label: 'ID',
    entries: [
      { rowId: 'inv-GT-plasmid-1', value: 'inv-GT-plasmid-1' },
      { rowId: 'inv-GT-plasmid-2', value: 'inv-GT-plasmid-2' },
      { rowId: 'inv-GT-plasmid-3', value: 'inv-GT-plasmid-3' },
    ],
  },
  {
    id: uuidv6(),
    type: 'number',
    label: 'Volume (ul)',
    entries: [
      { rowId: 'inv-GT-plasmid-1', value: 50 },
      { rowId: 'inv-GT-plasmid-2', value: 30 },
      { rowId: 'inv-GT-plasmid-3', value: 40 },
    ],
  },
]

export const largeDataset = generateLargeDataset(30, 100)
