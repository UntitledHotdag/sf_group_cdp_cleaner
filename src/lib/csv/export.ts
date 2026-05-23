import Papa from 'papaparse'

export function exportCsv(headers: string[], rows: Record<string, string>[]): Blob {
  const csv = Papa.unparse({ fields: headers, data: rows.map((r) => headers.map((h) => r[h] ?? '')) })
  return new Blob([csv], { type: 'text/csv;charset=utf-8;' })
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function buildExportFilename(sheetId: string): string {
  const date = new Date().toISOString().slice(0, 10)
  return `${sheetId}_clean_${date}.csv`
}
