import { IDEntry } from '../../types'

interface IDCellProps {
  currentValue: IDEntry['value']
}

export default function IDCell({ currentValue }: IDCellProps) {
  return (
    <div className="flex h-full items-center px-4">
      {/* Simulate link appearance. It can be replaced with a real link. */}
      <span className="text-color-text cursor-pointer underline hover:text-amber-50">
        {currentValue}
      </span>
    </div>
  )
}
