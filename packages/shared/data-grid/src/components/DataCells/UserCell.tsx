import { useCallback, useEffect, useRef, useState } from 'react'

import { UsersEntry } from '../../types'
import { handleError } from '../../utils/errorHandler'
import Tooltip from '../Tooltip'
import User from '../User'
import UserSelect from '../UserSelect'

interface UserCellProps {
  currentValue: UsersEntry['value']
  onChangeCurrentValue: (newValue: UsersEntry['value']) => Promise<void>
}

export default function UserCell({
  currentValue,
  onChangeCurrentValue,
}: UserCellProps) {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChangeValue = useCallback(
    async (newValue: UsersEntry['value']) => {
      // Only update if the value has changed
      try {
        if (JSON.stringify(newValue) !== JSON.stringify(currentValue))
          await onChangeCurrentValue(newValue)
      } catch (error) {
        handleError(error as Error)
      } finally {
        setEditing(false)
      }
    },
    [currentValue, onChangeCurrentValue],
  )

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus()
  }, [editing])

  return (
    <div className="relative z-50 h-full w-full">
      <UserSelect
        className={[
          'z-50 h-full w-full flex-col',
          editing ? 'absolute flex' : 'hidden',
        ].join(' ')}
        open={editing}
        selectedUsers={currentValue}
        onSelectUsers={handleChangeValue}
      />

      <div
        className="inline-flex h-full w-full items-center gap-2 px-4 hover:bg-amber-50/25"
        onClick={() => setEditing(true)}
      >
        {currentValue.length > 2 ? (
          <>
            <User key={currentValue[0].id} user={currentValue[0]} />

            <Tooltip
              trigger={
                <span className="text-primary rounded-full bg-amber-50 px-2">
                  +{currentValue.length - 1}
                </span>
              }
              content={
                <div className="flex w-full flex-col gap-1">
                  {currentValue.slice(1).map((user, index) => (
                    <User key={index} user={user} />
                  ))}
                </div>
              }
            />
          </>
        ) : (
          currentValue.map((user) => <User key={user.id} user={user} />)
        )}
      </div>
    </div>
  )
}
