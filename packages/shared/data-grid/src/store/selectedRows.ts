import { create } from 'zustand'

type SelectedRowsStore = {
  selectedRows: string[]
  setSelectedRows: (selectedRows: string[]) => void
}

export const useSelectedRowsStore = create<SelectedRowsStore>((set) => ({
  selectedRows: [],
  setSelectedRows: (selectedRows: string[]) => set(() => ({ selectedRows })),
}))
