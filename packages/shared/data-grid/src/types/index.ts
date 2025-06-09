import { User } from './user'

// Column base data
type ColumnBase = {
  id: string
  label: string
}

// Entry base data - They are used to represent the column data for a row in a data grid
type EntryBase = {
  rowId: string
}

// Entry types data
// The ID column stores the IDs for the rows. The value and rowId are the same.
export interface IDEntry extends EntryBase {
  value: string
}
export interface TextEntry extends EntryBase {
  value: string
}
export interface NumberEntry extends EntryBase {
  value: number
}
export interface TagEntry extends EntryBase {
  value: string[]
}
export interface UsersEntry extends EntryBase {
  value: User[]
}

// Column types data
export interface IDColumn extends ColumnBase {
  type: 'id'
  entries: IDEntry[]
}
export interface TextColumn extends ColumnBase {
  type: 'text'
  entries: TextEntry[]
}
export interface NumberColumn extends ColumnBase {
  type: 'number'
  entries: NumberEntry[]
}
export interface TagColumn extends ColumnBase {
  type: 'tag'
  entries: TagEntry[]
}
export interface UsersColumn extends ColumnBase {
  type: 'users'
  entries: UsersEntry[]
}

/**
 * Column data
 */
export type Column =
  | IDColumn
  | TextColumn
  | NumberColumn
  | TagColumn
  | UsersColumn

/**
 * These are the default types for each column.
 */
export type ColumnDefaultEntryValues = {
  text: TextEntry['value']
  number: NumberEntry['value']
  tag: TagEntry['value']
  users: UsersEntry['value']
}

/**
 * These are the possible value types for a data cell.
 */
export type DataCellValues = Column['entries'][0]['value']
