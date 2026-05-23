import type { ValidationResult } from '../lib/validation'

type Props = {
  result: ValidationResult
  onExport: () => void
  onExportAnyway?: () => void
}

export function ValidationPanel({ result, onExport, onExportAnyway }: Props) {
  const { mappingErrors, rowErrors, valid } = result
  const displayErrors = rowErrors.slice(0, 50)
  const hiddenCount = rowErrors.length - displayErrors.length

  return (
    <div className="space-y-4">
      {valid ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
          All rows passed validation. Ready to export.
        </div>
      ) : (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
          {mappingErrors.length > 0
            ? 'Fix column mappings before exporting.'
            : `${rowErrors.length} row${rowErrors.length === 1 ? '' : 's'} with validation errors.`}
        </div>
      )}

      {mappingErrors.length > 0 && (
        <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
          {mappingErrors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}

      {displayErrors.length > 0 && (
        <div className="max-h-48 overflow-y-auto rounded-lg border border-slate-200 text-sm">
          <table className="min-w-full">
            <thead className="bg-slate-100 sticky top-0">
              <tr>
                <th className="px-3 py-2 text-left">Row</th>
                <th className="px-3 py-2 text-left">Field</th>
                <th className="px-3 py-2 text-left">Error</th>
              </tr>
            </thead>
            <tbody>
              {displayErrors.map((e, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-3 py-1.5">{e.rowIndex}</td>
                  <td className="px-3 py-1.5">{e.field}</td>
                  <td className="px-3 py-1.5 text-red-600">{e.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {hiddenCount > 0 && (
            <p className="px-3 py-2 text-xs text-slate-500 border-t">
              + {hiddenCount} more errors
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onExport}
          disabled={!valid}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Download cleaned CSV
        </button>
        {!valid && onExportAnyway && (
          <button
            type="button"
            onClick={onExportAnyway}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Export anyway
          </button>
        )}
      </div>
    </div>
  )
}
