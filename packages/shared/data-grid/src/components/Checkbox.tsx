'use client'

import { Check, Minus } from '@phosphor-icons/react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'

export default function Checkbox(props: CheckboxRadix.CheckboxProps) {
  return (
    <CheckboxRadix.Root
      className="flex size-5 appearance-none items-center justify-center rounded bg-white"
      aria-label="Row Checkbox"
      {...props}
    >
      <CheckboxRadix.Indicator asChild className="text-primary">
        {props.checked === 'indeterminate' ? (
          <Minus size={12} />
        ) : (
          <Check size={12} />
        )}
      </CheckboxRadix.Indicator>
    </CheckboxRadix.Root>
  )
}
