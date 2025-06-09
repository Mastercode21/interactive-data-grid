'use client'

import { memo, ReactElement } from 'react'

import { IDCell, NumberCell, TagCell, TextCell, UserCell } from './DataCells'
import useDataGrid from '../hooks/useDataGrid'
import type { Column, DataCellValues } from '../types'

interface TableDataCellProps {
  column: Column
  rowId: string
}

type DataCellCurrentValue = {
  currentValue: DataCellValues
  onChangeCurrentValue: (newValue: DataCellValues) => void
}

type TypeCellMap = {
  id: ({ currentValue }: DataCellCurrentValue) => ReactElement
  text: ({ currentValue }: DataCellCurrentValue) => ReactElement
  number: ({ currentValue }: DataCellCurrentValue) => ReactElement
  tag: ({ currentValue }: DataCellCurrentValue) => ReactElement
  users: ({ currentValue }: DataCellCurrentValue) => ReactElement
}

const cellMap: TypeCellMap = {
  id: IDCell as TypeCellMap['id'],
  text: TextCell as TypeCellMap['text'],
  number: NumberCell as TypeCellMap['number'],
  tag: TagCell as TypeCellMap['tag'],
  users: UserCell as TypeCellMap['users'],
}

// MemoizedComponent to avoid rerendering during row selection
const TableDataCell = memo(({ column, rowId }: TableDataCellProps) => {
  const Cell = cellMap[column.type]

  const { updateCell } = useDataGrid()

  const handleChangeValue = async (newValue: DataCellValues) => {
    await updateCell(column.id, rowId, newValue)
  }

  return (
    <td className="h-14 border-b border-amber-50">
      <Cell
        currentValue={
          column.entries.find((col) => col.rowId === rowId)
            ?.value as DataCellValues
        }
        onChangeCurrentValue={handleChangeValue}
      />
    </td>
  )
})

export default TableDataCell
