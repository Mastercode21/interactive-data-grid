import { Plus } from '@phosphor-icons/react'
import { Close, Description, Title } from '@radix-ui/react-dialog'
import { useState } from 'react'

import useDataGrid from '../hooks/useDataGrid'
import { handleError } from '../utils/errorHandler'
import Dialog from './Dialog'

export default function NewRowButton() {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { addNewRow } = useDataGrid()

  const handleAddNewRow = (formData: FormData) => {
    setLoading(true)
    const rowId = formData.get('row-id')
    if (!rowId) return

    addNewRow(rowId as string)
      .then(() => setOpen(false))
      .catch((error) => handleError(error, true))
      .finally(() => setLoading(false))
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <button
          className="btn-secondary inline-flex items-center gap-2"
          aria-description="Reset data to default"
        >
          <Plus size={16} />
          Insert row
        </button>
      }
      content={
        <>
          <Title className="text-lg font-semibold">New row</Title>
          <Description className="text-sm">
            Insert the ID of the new row
          </Description>

          <form action={(data) => handleAddNewRow(data)}>
            <div className="mt-8">
              <label htmlFor="row-id" className="text-sm font-medium">
                Row id
              </label>
              <input
                id="row-id"
                name="row-id"
                type="text"
                className="h-10 w-full rounded-md border border-amber-50 px-2"
                autoComplete="off"
                required
              />
            </div>

            <div className="mt-8 flex justify-end">
              <Close asChild>
                <button className="btn-secondary" aria-label="Cancel button">
                  Cancel
                </button>
              </Close>
              <button
                aria-label="Add new row button"
                className="btn-primary ml-2"
                type="submit"
                disabled={loading}
              >
                Insert row
              </button>
            </div>
          </form>
        </>
      }
    />
  )
}
