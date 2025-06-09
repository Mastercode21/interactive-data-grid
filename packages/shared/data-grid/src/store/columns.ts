import { create } from 'zustand'

import { Column } from '../types'

type ColumnStore = {
  columns: Column[]
  setColumns: (columns: Column[]) => void
}

export const useColumnStore = create<ColumnStore>((set) => ({
  columns: [],
  setColumns: (columns: Column[]) => set(() => ({ columns })),
}))
