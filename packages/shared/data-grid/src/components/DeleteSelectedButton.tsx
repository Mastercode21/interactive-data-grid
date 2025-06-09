import { Trash } from '@phosphor-icons/react'
import useDataGrid from '../hooks/useDataGrid'
import { useSelectedRowsStore } from '../store/selectedRows'
import { handleError } from '../utils/errorHandler'
import ConfirmationDialog from './ConfirmationDialog'
import { useCallback } from 'react'

export default function DeleteSelectedButton() {
  const { removeRows } = useDataGrid()
  const { selectedRows, setSelectedRows } = useSelectedRowsStore()

  const handleRemoveRows = useCallback(async () => {
    removeRows(selectedRows)
      .then(() => setSelectedRows([]))
      .catch(handleError)
  }, [removeRows, selectedRows, setSelectedRows])

  if (!selectedRows.length) return null

  return (
    <ConfirmationDialog
      title="Delete selected rows"
      description={`Are you sure you want to delete ${selectedRows.length > 1 ? `${selectedRows.length} rows` : '1 row'} ?`}
      onConfirm={handleRemoveRows}
      trigger={
        <button
          className="btn-secondary inline-flex items-center gap-2"
          aria-description="Delete selected rows"
        >
          <Trash size={16} />
          Delete selected
        </button>
      }
    />
  )
}
