import { schemas } from '../schemas'
import { SheetTypeCard } from '../components/SheetTypeCard'

export function Home() {
  const sheetList = [schemas.member_list, schemas.orders, schemas.tags]

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <h1 className="text-2xl font-bold text-slate-900">Stockfeel CDP CSV Cleaner</h1>
          <p className="mt-2 text-slate-600">
            Map messy source CSV columns to the format your CDP accepts. All processing runs in your browser — data never leaves your device.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Choose a sheet type
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {sheetList.map((schema) => (
            <SheetTypeCard key={schema.id} schema={schema} />
          ))}
        </div>

        <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
          <h3 className="font-semibold text-slate-800">How it works</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>Upload a CSV for 會員名單, 訂單紀錄, or 標籤</li>
            <li>Link each source column to the matching CDP field</li>
            <li>Preview and fix validation errors</li>
            <li>Download a cleaned CSV ready for CDP import</li>
          </ol>
          <p className="mt-4">
            Official CDP column layouts are in{' '}
            <code className="rounded bg-slate-100 px-1">csv_example/</code>
            (e.g. <code className="rounded bg-slate-100 px-1">example_member_list.csv</code>
            ). Vendor-style test files are in{' '}
            <code className="rounded bg-slate-100 px-1">fixtures/</code>.
          </p>
        </section>
      </main>
    </div>
  )
}
