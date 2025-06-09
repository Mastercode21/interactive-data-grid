'use client'

import { ComponentProps, useCallback, useState } from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as PopoverRadix from '@radix-ui/react-popover'

import useUsers from '../hooks/useUsers'
import type { User as UserType } from '../types/user'
import User from './User'
import { Check } from '@phosphor-icons/react'

interface UserSelectProps extends ComponentProps<'div'> {
  selectedUsers: UserType[]
  open?: boolean
  onSelectUsers: (users: UserType[]) => Promise<void>
}

export default function UserSelect({
  selectedUsers,
  open,
  onSelectUsers,
  ...rest
}: UserSelectProps) {
  const { loadingUsers, users } = useUsers()
  const [search, setSearch] = useState<string>('')
  const [localSelectedUsers, setLocalSelectedUsers] =
    useState<UserType[]>(selectedUsers)

  const handleOpenChange = useCallback(() => {
    onSelectUsers(localSelectedUsers)
  }, [onSelectUsers, localSelectedUsers])

  const handleCheckedChange = useCallback(
    (checked: CheckboxRadix.CheckedState, user: UserType) => {
      if (checked) {
        setLocalSelectedUsers([...localSelectedUsers, user])
      } else {
        setLocalSelectedUsers(
          localSelectedUsers.filter((u) => u.id !== user.id),
        )
      }
    },
    [setLocalSelectedUsers, localSelectedUsers],
  )

  return (
    <div tabIndex={1} {...rest}>
      <PopoverRadix.Root open={open} onOpenChange={handleOpenChange}>
        <PopoverRadix.Trigger asChild>
          <button className="h-full w-full"></button>
        </PopoverRadix.Trigger>

        <PopoverRadix.Portal>
          <PopoverRadix.Content sideOffset={5} side="bottom" align="start">
            <div
              className="bg-secondary flex max-h-60 flex-col gap-2 overflow-auto rounded-md px-6 pb-4"
              role="listbox"
            >
              {loadingUsers ? (
                <div>Loading users...</div>
              ) : (
                <>
                  <div className="bg-secondary sticky top-0 z-10 py-2">
                    <input
                      type="text"
                      placeholder="Search for a user"
                      className="min-h-10 w-full rounded-md bg-white px-4 text-neutral-800"
                      aria-label="Search user input"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  {users
                    .filter((user) =>
                      user.name.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((user) => (
                      <CheckboxRadix.Root
                        id={['user-select', user.id].join('-')}
                        key={user.id}
                        className="inline-flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 hover:bg-amber-50/25"
                        checked={localSelectedUsers.some(
                          (u) => u.id === user.id,
                        )}
                        onCheckedChange={(checked) =>
                          handleCheckedChange(checked, user)
                        }
                      >
                        <User
                          user={user}
                          labelProps={{
                            htmlFor: ['user-select', user.id].join('-'),
                            className: 'cursor-pointer',
                          }}
                        />
                        <CheckboxRadix.Indicator asChild>
                          <Check size={12} />
                        </CheckboxRadix.Indicator>
                      </CheckboxRadix.Root>
                    ))}
                </>
              )}
            </div>
          </PopoverRadix.Content>
        </PopoverRadix.Portal>
      </PopoverRadix.Root>
    </div>
  )
}
