import { ComponentProps } from 'react'
import type { User as UserType } from '../types/user'

interface UserProps extends ComponentProps<'div'> {
  user: UserType
  labelProps?: ComponentProps<'label'>
}

export default function User({ user, labelProps, ...rest }: UserProps) {
  return (
    <div className="inline-flex items-center gap-2" {...rest}>
      <img
        src={user.image}
        alt={`${user.name} avatar`}
        loading="lazy"
        width={24}
        height={24}
        className="rounded-full"
      />
      <label {...labelProps}>{user.name}</label>
    </div>
  )
}
