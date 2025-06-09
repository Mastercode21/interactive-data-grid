import type { Column } from '@monorepo/data-grid'

import { defaultDataset, largeDataset } from './datasets'

let columnsMemory: Column[] = defaultDataset

export async function GET() {
  return new Response(JSON.stringify(columnsMemory), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function PUT(request: Request) {
  const body = await request.json()
  columnsMemory = body
  return new Response(JSON.stringify(columnsMemory), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  if (body.size === 'large') columnsMemory = largeDataset
  else columnsMemory = defaultDataset

  return new Response(JSON.stringify(columnsMemory), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
