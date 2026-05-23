import type { SheetSchema } from '../../schemas/types'
import type { MappingState } from './types'
import { createEmptyMapping } from './apply'

function normalizeHeader(h: string): string {
  return h
    .toLowerCase()
    .replace(/^\uFEFF/, '')
    .trim()
    .replace(/[\s-]+/g, '_')
}

export function autoMatchMapping(sourceHeaders: string[], schema: SheetSchema): MappingState {
  const mapping = createEmptyMapping(schema)
  const normalizedSources = new Map(
    sourceHeaders.map((h) => [normalizeHeader(h), h]),
  )

  for (const field of schema.fields) {
    const candidates = [
      field.key,
      field.label,
      ...(field.aliases ?? []),
    ].map(normalizeHeader)

    for (const candidate of candidates) {
      const source = normalizedSources.get(candidate)
      if (source) {
        mapping[field.key] = source
        break
      }
    }
  }

  return mapping
}
