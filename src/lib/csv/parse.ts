import Papa from 'papaparse'

export const PREVIEW_ROW_LIMIT = 500

export type ParsedCsv = {
  headers: string[]
  rows: Record<string, string>[]
  meta: Papa.ParseMeta
  truncated: boolean
}

export type ParseError = {
  message: string
}

export function parseCsvFile(file: File): Promise<ParsedCsv | ParseError> {
  return new Promise((resolve) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.replace(/^\uFEFF/, '').trim(),
      complete: (results) => {
        if (results.errors.length > 0) {
          const first = results.errors[0]
          resolve({
            message: `CSV parse error at row ${first.row ?? '?'}: ${first.message}`,
          })
          return
        }

        const headers = results.meta.fields ?? []
        if (headers.length === 0) {
          resolve({ message: 'No header row found. Ensure the first row contains column names.' })
          return
        }

        const allRows = results.data
        if (allRows.length === 0) {
          resolve({ message: 'The file has headers but no data rows.' })
          return
        }

        const truncated = allRows.length > PREVIEW_ROW_LIMIT
        const rows = truncated ? allRows.slice(0, PREVIEW_ROW_LIMIT) : allRows

        resolve({
          headers,
          rows,
          meta: results.meta,
          truncated,
        })
      },
      error: (err) => {
        resolve({ message: err.message })
      },
    })
  })
}

export function findDuplicateHeaders(headers: string[]): string[] {
  const seen = new Map<string, number>()
  const duplicates: string[] = []
  for (const h of headers) {
    const key = h.toLowerCase()
    const count = (seen.get(key) ?? 0) + 1
    seen.set(key, count)
    if (count === 2) duplicates.push(h)
  }
  return duplicates
}
