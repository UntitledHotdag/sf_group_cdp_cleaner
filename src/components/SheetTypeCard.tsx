import { Link } from 'react-router-dom'
import type { SheetSchema } from '../schemas/types'

type Props = {
  schema: SheetSchema
}

const icons: Record<string, string> = {
  member_list: '👤',
  orders: '🛒',
  tags: '🏷️',
}

export function SheetTypeCard({ schema }: Props) {
  return (
    <Link
      to={`/import/${schema.id}`}
      className="block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
    >
      <span className="text-3xl">{icons[schema.id] ?? '📄'}</span>
      <h2 className="mt-3 text-lg font-semibold text-slate-900">{schema.title}</h2>
      <p className="mt-1 text-sm text-slate-600">{schema.description}</p>
      <p className="mt-3 text-xs text-slate-400">
        {schema.fields.filter((f) => f.required).length} required · {schema.fields.length} fields · v{schema.version}
      </p>
      <p className="mt-1 text-xs text-slate-400">Example: {schema.exampleFile}</p>
    </Link>
  )
}
