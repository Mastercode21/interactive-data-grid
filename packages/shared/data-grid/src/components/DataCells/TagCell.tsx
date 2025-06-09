import { useCallback, useEffect, useRef, useState } from 'react'

import { TagEntry } from '../../types'
import { handleError } from '../../utils/errorHandler'
import Tooltip from '../Tooltip'

interface TagCellProps {
  currentValue: TagEntry['value']
  onChangeCurrentValue: (newValue: TagEntry['value']) => Promise<void>
}

export default function TagCell({
  currentValue,
  onChangeCurrentValue,
}: TagCellProps) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(currentValue)
  const inputRef = useRef<HTMLInputElement>(null)

  const tagClass = 'text-primary rounded-md bg-amber-50 px-2 font-semibold'

  const handleChangeValue = useCallback(async () => {
    // Only update if the value has changed
    try {
      if (JSON.stringify(value) !== JSON.stringify(currentValue))
        await onChangeCurrentValue(value)
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
      <div
        className={[
          'h-full w-full flex-col',
          editing ? 'absolute flex' : 'hidden',
        ].join(' ')}
      >
        <input
          aria-label="tag cell input"
          ref={inputRef}
          type="text"
          className="h-full w-full border border-amber-50 px-4"
          value={value.join(';')}
          size={1}
          autoFocus
          onChange={(event) => setValue(event.currentTarget.value.split(';'))}
          onBlur={handleChangeValue}
          onKeyUp={(event) => {
            if (event.key === 'Enter') handleChangeValue()
          }}
        />
        <span className="text-xs">Separate tags with a semicolon ( ; )</span>
      </div>

      <span
        className={[
          'flex h-full w-full items-center gap-2 px-4 hover:bg-amber-50/25',
          editing ? 'invisible' : 'visible',
        ].join(' ')}
        onClick={() => setEditing(true)}
      >
        {currentValue.length > 2 ? (
          <>
            <span className={tagClass}>{currentValue[0]}</span>

            <Tooltip
              trigger={
                <span className="text-primary rounded-full bg-amber-50 px-2">
                  +{currentValue.length - 1}
                </span>
              }
              content={
                <div className="flex w-full flex-col gap-1">
                  {currentValue.slice(1).map((tag, index) => (
                    <span key={index} className={tagClass}>
                      {tag}
                    </span>
                  ))}
                </div>
              }
            />
          </>
        ) : (
          currentValue.map((tag, index) => (
            <span key={index} className={tagClass}>
              {tag}
            </span>
          ))
        )}
      </span>
    </div>
  )
}
