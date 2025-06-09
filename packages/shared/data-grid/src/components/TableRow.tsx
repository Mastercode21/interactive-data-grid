'use client'

import type { CheckedState } from '@radix-ui/react-checkbox'
import { ComponentProps, useCallback, useMemo } from 'react'

import { useSelectedRowsStore } from '../store/selectedRows'
import { Column } from '../types'
import Checkbox from './Checkbox'
import TableDataCell from './TableDataCell'

interface RowProps extends ComponentProps<'tr'> {
  entry: Column['entries'][0]
  columns: Column[]
}

export default function TableRow({ entry, columns, ...rest }: RowProps) {
  const { selectedRows, setSelectedRows } = useSelectedRowsStore()

  const isSelected = useMemo(
    () => selectedRows.includes(entry.rowId),
    [entry.rowId, selectedRows],
  )

  const handleCheckedChange = useCallback(
    (isChecked: CheckedState) => {
      setSelectedRows(
        isChecked
          ? [...selectedRows, entry.rowId]
          : selectedRows.filter(
              (selectedRowId) => selectedRowId !== entry.rowId,
            ),
      )
    },
    [entry.rowId, selectedRows, setSelectedRows],
  )

  return (
    <tr
      className={`h-10 hover:bg-amber-50/20 ${isSelected ? 'bg-amber-50/15' : ''}`}
      {...rest}
    >
      <td className="w-9 border-b border-amber-50 pl-4">
        <Checkbox checked={isSelected} onCheckedChange={handleCheckedChange} />
      </td>
      {columns.map((column) => (
        <TableDataCell
          key={[entry.rowId, column.id].join('-')}
          column={column}
          rowId={entry.rowId}
        />
      ))}
      <td className="border-b border-amber-50"></td>
    </tr>
  )
}
