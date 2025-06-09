import { DataGrid } from '@monorepo/data-grid'

export default function Home() {
  return (
    <div className="grid min-h-screen w-screen grid-cols-1 grid-rows-[1fr_auto]">
      <main className="flex w-full max-w-7xl flex-col gap-12 justify-self-center px-10 py-16">
        <h1 className="text-6xl font-semibold">
          Interactive Data Grid Component
        </h1>

        <DataGrid />
      </main>
      <footer className="row-start-2 flex items-center justify-center px-4 py-2 text-center text-base">
        Interactive Data Grid Component - Leandro Pedroso
      </footer>
    </div>
  )
}
