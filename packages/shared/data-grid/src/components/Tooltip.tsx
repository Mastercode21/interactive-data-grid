import * as RadixTooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

interface TooltipProps extends RadixTooltip.TooltipProps {
  content: ReactNode
  trigger: ReactNode
}

export default function Tooltip({ content, trigger, ...rest }: TooltipProps) {
  return (
    <RadixTooltip.Root delayDuration={300} {...rest}>
      <RadixTooltip.Trigger asChild children={trigger} />

      <RadixTooltip.Portal>
        <RadixTooltip.Content
          className="bg-secondary overflow-hidden rounded-md py-2"
          sideOffset={5}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="max-h-40 overflow-auto px-4 py-2 shadow will-change-[transform,opacity]">
            {content}
          </div>
          <RadixTooltip.Arrow className="fill-secondary" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}
