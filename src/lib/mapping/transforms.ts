import type { CdpField, FieldType } from '../../schemas/types'

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function formatDateParts(y: number, mo: number, da: number, dateFormat: 'iso' | 'slash'): string {
  if (dateFormat === 'slash') {
    return `${y}/${pad2(mo)}/${pad2(da)}`
  }
  return `${y}-${pad2(mo)}-${pad2(da)}`
}

function parseDateParts(trimmed: string): { y: number; mo: number; da: number } | null {
  const slashFull = trimmed.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})/)
  if (slashFull) {
    return { y: +slashFull[1], mo: +slashFull[2], da: +slashFull[3] }
  }
  const iso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (iso) {
    return { y: +iso[1], mo: +iso[2], da: +iso[3] }
  }
  const us = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
  if (us) {
    return { y: +us[3], mo: +us[1], da: +us[2] }
  }
  const parsed = Date.parse(trimmed)
  if (!Number.isNaN(parsed)) {
    const d = new Date(parsed)
    return { y: d.getFullYear(), mo: d.getMonth() + 1, da: d.getDate() }
  }
  return null
}

export function transformValue(
  raw: string,
  type: FieldType,
  dateFormat: 'iso' | 'slash' = 'slash',
): { value: string; error?: string } {
  const trimmed = raw.trim()

  if (trimmed === '') {
    return { value: '' }
  }

  switch (type) {
    case 'string':
      return { value: trimmed }
    case 'email': {
      const value = trimmed.toLowerCase()
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return { value, error: 'Invalid email format' }
      }
      return { value }
    }
    case 'number': {
      const cleaned = trimmed.replace(/[$,]/g, '').trim()
      const num = Number(cleaned)
      if (Number.isNaN(num)) {
        return { value: trimmed, error: 'Invalid number' }
      }
      return { value: String(num) }
    }
    case 'boolean': {
      const lower = trimmed.toLowerCase()
      if (['true', '1', 'yes', 'y'].includes(lower)) return { value: 'true' }
      if (['false', '0', 'no', 'n'].includes(lower)) return { value: 'false' }
      return { value: trimmed, error: 'Invalid boolean (use true/false, yes/no, 1/0)' }
    }
    case 'date': {
      const parts = parseDateParts(trimmed)
      if (!parts) {
        return { value: trimmed, error: 'Invalid date format' }
      }
      return { value: formatDateParts(parts.y, parts.mo, parts.da, dateFormat) }
    }
    default:
      return { value: trimmed }
  }
}

export function transformFieldValue(raw: string, field: CdpField): { value: string; error?: string } {
  return transformValue(raw, field.type, field.dateFormat ?? 'slash')
}
