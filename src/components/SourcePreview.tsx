type Props = {
  headers: string[]
  rows: Record<string, string>[]
  maxRows?: number
}

export function SourcePreview({ headers, rows, maxRows = 20 }: Props) {
  const preview = rows.slice(0, maxRows)

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-100">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 text-left font-medium text-slate-700 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
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
        <p className="px-3 py-2 text-xs text-slate-500 bg-slate-50 border-t">
          Showing {maxRows} of {rows.length} rows
        </p>
      )}
    </div>
  )
}
