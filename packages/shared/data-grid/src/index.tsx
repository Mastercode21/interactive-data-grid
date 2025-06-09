import { Provider as TooltipProvider } from '@radix-ui/react-tooltip'

import ErrorBoundary from './components/ErrorBoundary'
import Table from './components/Table'

export default function DataGrid() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <TooltipProvider>
        <Table />
      </TooltipProvider>
    </ErrorBoundary>
  )
}

DataGrid.displayName = 'DataGrid'
