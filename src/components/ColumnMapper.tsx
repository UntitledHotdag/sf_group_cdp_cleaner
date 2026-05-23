import type { SheetSchema } from '../schemas/types'
import type { MappingState } from '../lib/mapping/types'

type Props = {
  schema: SheetSchema
  sourceHeaders: string[]
  mapping: MappingState
  onChange: (mapping: MappingState) => void
}

export function ColumnMapper({ schema, sourceHeaders, mapping, onChange }: Props) {
  const sortedFields = [...schema.fields].sort(
    (a, b) => Number(b.required) - Number(a.required),
  )

  const update = (key: string, sourceCol: string | null) => {
    onChange({ ...mapping, [key]: sourceCol === '' ? null : sourceCol })
  }

  return (
    <div className="space-y-3">
      {sortedFields.map((field) => (
        <div
          key={field.key}
          className={`flex flex-wrap items-center gap-4 rounded-lg border px-4 py-3 ${
            field.required ? 'border-indigo-200 bg-indigo-50/50' : 'border-slate-200 bg-white'
          }`}
        >
          <div className="min-w-[140px] flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-800">{field.label}</span>
              {field.required && (
                <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
                  Required
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {field.key} · {field.type}
              {field.description ? ` · ${field.description}` : ''}
            </p>
          </div>
          <select
            value={mapping[field.key] ?? ''}
            onChange={(e) => update(field.key, e.target.value || null)}
            className="min-w-[200px] rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">— none —</option>
            {sourceHeaders.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}
