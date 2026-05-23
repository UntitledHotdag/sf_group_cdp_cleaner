type Props = {
  headers: string[]
  rows: Record<string, string>[]
  maxRows?: number
}

export function MappedPreview({ headers, rows, maxRows = 20 }: Props) {
  const preview = rows.slice(0, maxRows)

  return (
    <div className="overflow-x-auto rounded-lg border border-emerald-200">
      <table className="min-w-full divide-y divide-emerald-100 text-sm">
        <thead className="bg-emerald-50">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 text-left font-medium text-emerald-900 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-emerald-50 bg-white">
          {preview.map((row, i) => (
            <tr key={i}>
              {headers.map((h) => (
                <td key={h} className="px-3 py-2 text-slate-600 whitespace-nowrap max-w-[200px] truncate">
                  {row[h] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length > maxRows && (
        <p className="px-3 py-2 text-xs text-slate-500 bg-emerald-50/50 border-t border-emerald-100">
          Showing {maxRows} of {rows.length} mapped rows
        </p>
      )}
    </div>
  )
}
