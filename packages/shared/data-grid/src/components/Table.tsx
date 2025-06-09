'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowClockwise } from '@phosphor-icons/react'
import { useVirtualizer } from '@tanstack/react-virtual'

import useDataGrid from '../hooks/useDataGrid'
import { fetchColumns } from '../utils/actions'
import { handleError } from '../utils/errorHandler'
import ConfirmationDialog from './ConfirmationDialog'
import DeleteSelectedButton from './DeleteSelectedButton'
import NewColumnButton from './NewColumnButton'
import NewRowButton from './NewRowButton'
import SelectAllCheckbox from './SelectAllCheckbox'
import TableHeaderCell from './TableHeaderCell'
import TableRow from './TableRow'

export default function Table() {
  const { columns, setColumns, removeColumn, resetColumns } = useDataGrid()
  const [loading, setLoading] = useState(true)
  const parentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial render fetch
    fetchColumns()
      .then(setColumns)
      .catch(handleError)
      .finally(() => setLoading(false))
  }, [])

  const virtualizer = useVirtualizer({
    count: columns[0] ? columns[0].entries.length : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 20,
  })

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex items-center justify-end gap-4">
        <DeleteSelectedButton />
        <NewRowButton />
        <ConfirmationDialog
          title="Reset data"
          description="Are you sure you want to reset the data to Default Dataset?"
          onConfirm={() => resetColumns({ size: 'default' })}
          trigger={
            <button
              className="btn-secondary inline-flex items-center gap-2"
              aria-description="Reset data to default dataset"
            >
              <ArrowClockwise size={16} />
              Reset data
            </button>
          }
        />
        <ConfirmationDialog
          title="Reset data"
          description="Are you sure you want to reset the data to Large Dataset?"
          onConfirm={() => resetColumns({ size: 'large' })}
          trigger={
            <button
              className="btn-secondary inline-flex items-center gap-2"
              aria-description="Reset data to large dataset"
            >
              <ArrowClockwise size={16} />
              Large data
            </button>
          }
        />
      </div>

      <div
        ref={parentRef}
        className="h-125 overflow-x-auto rounded-md border border-amber-50 bg-amber-50/10"
      >
        <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
          <table className="w-full">
            <thead>
              <tr className="h-10 border-b border-amber-50 bg-amber-50/15">
                <th className="w-9 pl-4 hover:bg-amber-50/20">
                  <SelectAllCheckbox
                    rowIds={columns[0].entries.map((entry) => entry.rowId)}
                  />
                </th>
                {columns.map((column) => (
                  <TableHeaderCell
                    key={column.id}
                    column={column}
                    removeColumn={removeColumn}
                  />
                ))}
                <th className="px-4 text-left">
                  <NewColumnButton />
                </th>
              </tr>
            </thead>
            <tbody>
              {}
              {columns[0].entries.length ? (
                virtualizer.getVirtualItems().map((virtualRow, index) => {
                  const row = columns[0].entries[virtualRow.index]
                  return (
                    <TableRow
                      key={row.rowId}
                      entry={row}
                      columns={columns}
                      style={{
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${
                          virtualRow.start - index * virtualRow.size
                        }px)`,
                      }}
                    />
                  )
                })
              ) : (
                <tr>
                  <td
                    className="px-4 pt-40 text-center"
                    colSpan={columns.length + 2}
                  >
                    No data available. Insert a new row to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
