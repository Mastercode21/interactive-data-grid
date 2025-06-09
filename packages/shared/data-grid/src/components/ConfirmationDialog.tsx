'use client'

import {
  Close,
  Description,
  Title,
  type DialogProps,
} from '@radix-ui/react-dialog'
import { ReactNode, useCallback, useState } from 'react'

import Dialog from './Dialog'
import { handleError } from '../utils/errorHandler'

interface ConfirmationDialogProps extends DialogProps {
  title: string
  description: string
  onConfirm: () => Promise<void>
  trigger: ReactNode
}

export default function ConfirmationDialog({
  title,
  description,
  onConfirm,
  trigger,
  ...rest
}: ConfirmationDialogProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleConfirm = useCallback(() => {
    setLoading(true)
    onConfirm()
      .catch(handleError)
      .finally(() => {
        setLoading(false)
        setOpen(false)
      })
  }, [onConfirm])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      content={
        <>
          <Title className="text-lg font-semibold">{title}</Title>
          <Description className="text-sm">{description}</Description>

          <div className="mt-8 flex justify-end">
            <Close asChild>
              <button className="btn-secondary" aria-label="Cancel button">
                Cancel
              </button>
            </Close>
            <button
              aria-label="Confirm button"
              className="btn-primary ml-2"
              onClick={handleConfirm}
              disabled={loading}
            >
              Confirm
            </button>
          </div>
        </>
      }
      {...rest}
    />
  )
}
