import { X } from '@phosphor-icons/react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

interface DialogProps extends RadixDialog.DialogProps {
  content: ReactNode
  trigger: ReactNode
}

export default function Dialog({ content, trigger, ...rest }: DialogProps) {
  return (
    <RadixDialog.Root {...rest}>
      <RadixDialog.Trigger asChild children={trigger} />

      <RadixDialog.Portal>
        <RadixDialog.Overlay className="absolute inset-0 bg-transparent/50 backdrop-blur-xs" />
        <RadixDialog.Content className="bg-secondary fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md border border-amber-50/30 p-7 shadow-2xl focus:outline-none">
          <RadixDialog.Close asChild>
            <button
              className="btn-icon absolute top-2.5 right-2.5"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </RadixDialog.Close>
          {content}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
