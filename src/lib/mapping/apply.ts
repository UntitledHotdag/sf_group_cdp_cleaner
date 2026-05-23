import type { SheetSchema } from '../../schemas/types'
import type { MappingState } from './types'
import { transformFieldValue } from './transforms'

export function createEmptyMapping(schema: SheetSchema): MappingState {
  return Object.fromEntries(schema.fields.map((f) => [f.key, null]))
}

export function applyMapping(
  rows: Record<string, string>[],
  mapping: MappingState,
  schema: SheetSchema,
): { headers: string[]; rows: Record<string, string>[] } {
  const headers = schema.fields.map((f) => f.key)

  const transformed = rows.map((row) => {
    const out: Record<string, string> = {}
    for (const field of schema.fields) {
      const sourceCol = mapping[field.key]
      const raw = sourceCol ? (row[sourceCol] ?? '') : ''
      const { value } = transformFieldValue(raw, field)
      out[field.key] = value
    }
    return out
  })

  return { headers, rows: transformed }
}

export function getUnmappedRequiredFields(
  mapping: MappingState,
  schema: SheetSchema,
): string[] {
  return schema.fields
    .filter((f) => f.required && !mapping[f.key])
    .map((f) => f.label)
}
