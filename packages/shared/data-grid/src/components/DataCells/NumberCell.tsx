import { useCallback, useEffect, useRef, useState } from 'react'

import { NumberEntry } from '../../types'
import { handleError } from '../../utils/errorHandler'

interface NumberCellProps {
  currentValue: NumberEntry['value']
  onChangeCurrentValue: (newValue: NumberEntry['value']) => Promise<void>
}

export default function NumberCell({
  currentValue,
  onChangeCurrentValue,
}: NumberCellProps) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(currentValue)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChangeValue = useCallback(async () => {
    // Only update if the value has changed
    try {
      if (value !== currentValue) await onChangeCurrentValue(value)
    } catch (error) {
      handleError(error as Error)
    } finally {
      setEditing(false)
    }
  }, [value, currentValue, onChangeCurrentValue])

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus()
  }, [editing])

  return (
    <div className="relative h-full w-full">
      <input
        aria-label="number cell input"
        ref={inputRef}
        type="number"
        className={[
          'h-full w-full border border-amber-50 px-4',
          editing ? 'absolute' : 'hidden',
        ].join(' ')}
        value={value}
        size={1}
        autoFocus
        onChange={(event) => setValue(Number(event.currentTarget.value))}
        onBlur={handleChangeValue}
        onKeyUp={(event) => {
          if (event.key === 'Enter') handleChangeValue()
        }}
      />

      <span
        className={[
          'flex h-full w-full items-center px-4 hover:bg-amber-50/25',
          editing ? 'invisible' : 'visible',
        ].join(' ')}
        onClick={() => setEditing(true)}
      >
        {currentValue}
      </span>
    </div>
  )
}
