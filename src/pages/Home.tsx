import { Link } from 'react-router-dom'
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
        <Link
          to="/guide/tags"
          className="mb-8 flex items-start gap-4 rounded-xl border border-indigo-200 bg-indigo-50/60 p-5 transition hover:border-indigo-300 hover:bg-indigo-50"
        >
          <span className="text-2xl" aria-hidden>
            🏷️
          </span>
          <div>
            <h2 className="font-semibold text-indigo-900">How tagging works</h2>
            <p className="mt-1 text-sm text-indigo-800/90">
              Learn how to turn purchase records and member data into tags for segmented marketing
              — with examples for sports teams (tickets, merch, frequency, and more).
            </p>
            <span className="mt-2 inline-block text-sm font-medium text-indigo-600">
              Read the guide →
            </span>
          </div>
        </Link>

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
