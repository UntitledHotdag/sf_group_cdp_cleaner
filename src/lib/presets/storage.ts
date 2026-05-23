import type { SheetId } from '../../schemas/types'
import type { MappingState } from '../mapping/types'

const STORAGE_PREFIX = 'cdp-mapping-preset:'

function headersHash(headers: string[]): string {
  return headers
    .map((h) => h.toLowerCase().trim())
    .sort()
    .join('|')
}

function storageKey(sheetId: SheetId, headers: string[]): string {
  return `${STORAGE_PREFIX}${sheetId}:${headersHash(headers)}`
}

export function loadMappingPreset(sheetId: SheetId, headers: string[]): MappingState | null {
  try {
    const raw = localStorage.getItem(storageKey(sheetId, headers))
    if (!raw) return null
    return JSON.parse(raw) as MappingState
  } catch {
    return null
  }
}

export function saveMappingPreset(
  sheetId: SheetId,
  headers: string[],
  mapping: MappingState,
): void {
  try {
    localStorage.setItem(storageKey(sheetId, headers), JSON.stringify(mapping))
  } catch {
    // quota exceeded or private mode — ignore
  }
}
