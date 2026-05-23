import { useCallback, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { SheetId } from '../schemas/types'
import { getSchema } from '../schemas'
import { parseCsvFile, findDuplicateHeaders, type ParsedCsv } from '../lib/csv'
import { applyMapping, autoMatchMapping, type MappingState } from '../lib/mapping'
import { validateRows } from '../lib/validation'
import { loadMappingPreset, saveMappingPreset } from '../lib/presets/storage'
import { exportCsv, downloadBlob, buildExportFilename } from '../lib/csv'
import { StepProgress, type Step } from '../components/StepProgress'
import { FileDropzone } from '../components/FileDropzone'
import { SourcePreview } from '../components/SourcePreview'
import { ColumnMapper } from '../components/ColumnMapper'
import { MappedPreview } from '../components/MappedPreview'
import { ValidationPanel } from '../components/ValidationPanel'

const SHEET_IDS: SheetId[] = ['member_list', 'orders', 'tags']

function isSheetId(id: string | undefined): id is SheetId {
  return SHEET_IDS.includes(id as SheetId)
}

export function ImportWizard() {
  const { sheetId } = useParams<{ sheetId: string }>()

  if (!isSheetId(sheetId)) {
    return (
      <div className="p-8 text-center">
        <p>Unknown sheet type.</p>
        <Link to="/" className="text-indigo-600 hover:underline">
          Back to home
        </Link>
      </div>
    )
  }

  return <ImportWizardInner sheetId={sheetId} />
}

function ImportWizardInner({ sheetId }: { sheetId: SheetId }) {
  const schema = getSchema(sheetId)
  const [step, setStep] = useState<Step>('upload')
  const [fileName, setFileName] = useState<string | null>(null)
  const [parsed, setParsed] = useState<ParsedCsv | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)
  const [mapping, setMapping] = useState<MappingState | null>(null)
  const [duplicateHeaders, setDuplicateHeaders] = useState<string[]>([])

  const handleFile = useCallback(
    async (file: File) => {
      setParseError(null)
      const result = await parseCsvFile(file)
      if ('message' in result) {
        setParseError(result.message)
        setParsed(null)
        return
      }

      setFileName(file.name)
      setParsed(result)
      setDuplicateHeaders(findDuplicateHeaders(result.headers))

      const preset = loadMappingPreset(sheetId, result.headers)
      const initial = preset ?? autoMatchMapping(result.headers, schema)
      setMapping(initial)
      setStep('map')
    },
    [sheetId, schema],
  )

  const handleMappingChange = useCallback(
    (next: MappingState) => {
      setMapping(next)
      if (parsed) {
        saveMappingPreset(sheetId, parsed.headers, next)
      }
    },
    [sheetId, parsed],
  )

  const mapped = useMemo(() => {
    if (!parsed || !mapping) return null
    return applyMapping(parsed.rows, mapping, schema)
  }, [parsed, mapping, schema])

  const validation = useMemo(() => {
    if (!parsed || !mapping) return null
    return validateRows(parsed.rows, mapping, schema)
  }, [parsed, mapping, schema])

  const reset = () => {
    setStep('upload')
    setFileName(null)
    setParsed(null)
    setParseError(null)
    setMapping(null)
    setDuplicateHeaders([])
  }

  const handleExport = () => {
    if (!mapped) return
    const blob = exportCsv(mapped.headers, mapped.rows)
    downloadBlob(blob, buildExportFilename(sheetId))
    setStep('export')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link to="/" className="text-sm text-indigo-600 hover:underline">
            ← All sheet types
          </Link>
          <h1 className="mt-2 text-xl font-bold text-slate-900">{schema.title}</h1>
          <p className="text-sm text-slate-600">{schema.description}</p>
          <div className="mt-4">
            <StepProgress current={step} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8 space-y-8">
        {step === 'upload' && (
          <section>
            <h2 className="text-lg font-semibold text-slate-800">Upload CSV</h2>
            <p className="mt-1 text-sm text-slate-600">
              Select a source file with columns that may differ from the CDP format.
            </p>
            <div className="mt-4">
              <FileDropzone onFile={handleFile} />
            </div>
            {parseError && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {parseError}
              </p>
            )}
          </section>
        )}

        {parsed && mapping && step !== 'upload' && (
          <>
            <section className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
              <span>
                File: <strong className="text-slate-800">{fileName}</strong> · {parsed.rows.length} rows
                {parsed.truncated && ' (preview limited to 500 rows)'}
              </span>
              <button
                type="button"
                onClick={reset}
                className="text-indigo-600 hover:underline"
              >
                Start over
              </button>
            </section>

            {duplicateHeaders.length > 0 && (
              <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Warning: duplicate column names detected: {duplicateHeaders.join(', ')}
              </p>
            )}

            {(step === 'map' || step === 'preview' || step === 'export') && (
              <section>
                <h2 className="text-lg font-semibold text-slate-800">Map columns</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Link each CDP field to a column in your source file.
                </p>
                <div className="mt-4">
                  <ColumnMapper
                    schema={schema}
                    sourceHeaders={parsed.headers}
                    mapping={mapping}
                    onChange={handleMappingChange}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep('preview')}
                  className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Continue to preview
                </button>
              </section>
            )}

            {step === 'map' && (
              <section>
                <h3 className="text-sm font-semibold text-slate-700">Source preview</h3>
                <div className="mt-2">
                  <SourcePreview headers={parsed.headers} rows={parsed.rows} />
                </div>
              </section>
            )}

            {(step === 'preview' || step === 'export') && mapped && validation && (
              <>
                <section>
                  <h2 className="text-lg font-semibold text-slate-800">Mapped preview</h2>
                  <p className="mt-1 text-sm text-slate-600">Output in CDP column order.</p>
                  <div className="mt-4">
                    <MappedPreview headers={mapped.headers} rows={mapped.rows} />
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-slate-800">Validation</h2>
                  <div className="mt-4">
                    <ValidationPanel
                      result={validation}
                      onExport={handleExport}
                      onExportAnyway={handleExport}
                    />
                  </div>
                </section>

                {step === 'export' && (
                  <p className="text-sm text-emerald-700">
                    Export started. Check your downloads folder.
                  </p>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}
