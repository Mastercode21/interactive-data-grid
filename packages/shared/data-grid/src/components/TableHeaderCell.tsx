'use client'

import { DotsThreeVertical, LineVertical, Trash } from '@phosphor-icons/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Column as ColumnType } from '../types'

interface ColumnProps {
  column: ColumnType
  removeColumn: (columnId: ColumnType['id']) => Promise<void>
}

export default function TableHeaderCell({ column, removeColumn }: ColumnProps) {
  return (
    <th className="w-fit min-w-44 hover:bg-amber-50/20">
      <div className="inline-flex w-full items-center justify-between pl-4">
        {column.label}
        <div className="inline-flex items-center justify-end gap-1">
          {/* We don't want to delete the ID column */}
          {column.type !== 'id' && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="btn-icon" aria-label="Column options">
                  <DotsThreeVertical size={16} />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-secondary rounded-md p-2 shadow-2xl focus:outline-none">
                  <DropdownMenu.Item
                    className="inline-flex cursor-pointer items-center justify-between gap-4 rounded-xs p-1 text-xs hover:bg-amber-50/20"
                    onSelect={() => removeColumn(column.id)}
                  >
                    Delete column
                    <Trash size={12} />
                  </DropdownMenu.Item>

                  <DropdownMenu.Arrow className="fill-secondary" />
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
          <LineVertical size={16} />
        </div>
      </div>
    </th>
  )
}
