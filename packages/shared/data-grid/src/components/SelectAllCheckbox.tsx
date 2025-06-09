'use client'

import { useMemo } from 'react'

import { useSelectedRowsStore } from '../store/selectedRows'
import Checkbox from './Checkbox'

interface SelectAllCheckboxProps {
  rowIds: string[]
}

export default function SelectAllCheckbox({ rowIds }: SelectAllCheckboxProps) {
  const { selectedRows, setSelectedRows } = useSelectedRowsStore()

  const checked = useMemo(() => {
    if (!selectedRows.length) return false
    if (selectedRows.length === rowIds.length) return true
    return 'indeterminate'
  }, [selectedRows, rowIds])

  const handleCheckedChange = () => {
    if (checked === 'indeterminate') {
      return setSelectedRows(rowIds)
    }

    setSelectedRows(checked ? [] : rowIds)
  }

  return <Checkbox checked={checked} onCheckedChange={handleCheckedChange} />
}
