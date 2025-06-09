'use client'

import { Plus } from '@phosphor-icons/react'
import { Close, Description, Title } from '@radix-ui/react-dialog'
import { useState } from 'react'

import useDataGrid from '../hooks/useDataGrid'
import { Column } from '../types'
import { type CreateNewColumnProps, newColumnTypes } from '../utils/column'
import { handleError } from '../utils/errorHandler'
import Dialog from './Dialog'
import Tooltip from './Tooltip'

export default function NewColumnButton() {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { addNewColumn } = useDataGrid()

  const handleAddNewColumn = (formData: FormData) => {
    setLoading(true)
    const newColumn: CreateNewColumnProps['newColumnData'] = {
      label: formData.get('column-label') as string,
      type: formData.get('column-type') as Column['type'],
    }
    addNewColumn(newColumn)
      .then(() => setOpen(false))
      .catch(handleError)
      .finally(() => setLoading(false))
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <button className="btn-icon" aria-label="New column dialog trigger">
          <Tooltip trigger={<Plus size={16} />} content="Insert column" />
        </button>
      }
      content={
        <>
          <Title className="text-lg font-semibold">New column</Title>
          <Description className="text-sm">
            Insert the name and type of the new column
          </Description>

          <form action={(data) => handleAddNewColumn(data)}>
            <div className="mt-8">
              <label htmlFor="column-label" className="text-sm font-medium">
                Column name
              </label>
              <input
                id="column-label"
                name="column-label"
                type="text"
                className="h-10 w-full rounded-md border border-amber-50 px-2"
                autoComplete="off"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="column-type" className="text-sm font-medium">
                Column type
              </label>
              <select
                id="column-type"
                name="column-type"
                className="h-10 w-full rounded-md border border-amber-50 px-2"
                required
              >
                {newColumnTypes.map((type) => (
                  <option
                    key={type.type}
                    className="text-neutral-800"
                    value={type.type}
                  >
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-8 flex justify-end">
              <Close asChild>
                <button className="btn-secondary" aria-label="Cancel">
                  Cancel
                </button>
              </Close>
              <button
                aria-label="Add new column"
                className="btn-primary ml-2"
                type="submit"
                disabled={loading}
              >
                Add column
              </button>
            </div>
          </form>
        </>
      }
    />
  )
}
