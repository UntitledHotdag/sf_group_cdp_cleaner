type Row = {
  tag: string
  rule: string
  use: string
}

type Props = {
  caption?: string
  rows: Row[]
}

export function TagRuleTable({ caption, rows }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      {caption && (
        <p className="border-b border-slate-100 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
          {caption}
        </p>
      )}
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-slate-700">Tag</th>
            <th className="px-4 py-2 text-left font-medium text-slate-700">Example rule</th>
            <th className="px-4 py-2 text-left font-medium text-slate-700">Marketing use</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row) => (
            <tr key={row.tag}>
              <td className="px-4 py-2 font-mono text-xs text-indigo-700">{row.tag}</td>
              <td className="px-4 py-2 text-slate-700">{row.rule}</td>
              <td className="px-4 py-2 text-slate-600">{row.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
