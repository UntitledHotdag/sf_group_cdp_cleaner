import { z } from 'zod'
import type { SheetSchema, CdpField } from '../../schemas/types'
import type { MappingState } from '../mapping/types'
import { transformFieldValue } from '../mapping/transforms'
import { getUnmappedRequiredFields } from '../mapping/apply'

export type RowError = {
  rowIndex: number
  field: string
  message: string
}

export type ValidationResult = {
  mappingErrors: string[]
  rowErrors: RowError[]
  valid: boolean
}

function zodForField(field: CdpField): z.ZodType<string, string> {
  switch (field.type) {
    case 'email':
      return field.required
        ? z.string().min(1, 'Required').email('Invalid email')
        : z.union([z.literal(''), z.string().email('Invalid email')])
    case 'number':
      return field.required
        ? z.string().min(1, 'Required').refine((v) => !Number.isNaN(Number(v)), 'Invalid number')
        : z.union([z.literal(''), z.string().refine((v) => !Number.isNaN(Number(v)), 'Invalid number')])
    case 'date': {
      const slash = /^\d{4}\/\d{1,2}\/\d{1,2}/
      const iso = /^\d{4}-\d{2}-\d{2}$/
      const pattern = field.dateFormat === 'iso' ? iso : slash
      const msg =
        field.dateFormat === 'iso'
          ? 'Invalid date (expected YYYY-MM-DD)'
          : 'Invalid date (expected YYYY/MM/DD)'
      return field.required
        ? z.string().min(1, 'Required').regex(pattern, msg)
        : z.union([z.literal(''), z.string().regex(pattern, msg)])
    }
    case 'boolean':
      return field.required
        ? z.enum(['true', 'false'], { message: 'Must be true or false' })
        : z.union([z.literal(''), z.enum(['true', 'false'])])
    default:
      return field.required ? z.string().min(1, 'Required') : z.string()
  }
}

export function validateRows(
  sourceRows: Record<string, string>[],
  mapping: MappingState,
  schema: SheetSchema,
): ValidationResult {
  const mappingErrors = getUnmappedRequiredFields(mapping, schema)
  const rowErrors: RowError[] = []

  if (mappingErrors.length > 0) {
    return {
      mappingErrors: mappingErrors.map((l) => `Required field not mapped: ${l}`),
      rowErrors: [],
      valid: false,
    }
  }

  for (let i = 0; i < sourceRows.length; i++) {
    const sourceRow = sourceRows[i]
    for (const field of schema.fields) {
      const sourceCol = mapping[field.key]
      const raw = sourceCol ? (sourceRow[sourceCol] ?? '') : ''
      const { value, error: transformError } = transformFieldValue(raw, field)

      if (transformError) {
        rowErrors.push({ rowIndex: i + 2, field: field.label, message: transformError })
        continue
      }

      if (field.required && value === '') {
        rowErrors.push({ rowIndex: i + 2, field: field.label, message: 'Required value is empty' })
        continue
      }

      if (value !== '') {
        const fieldSchema = zodForField(field)
        const result = fieldSchema.safeParse(value)
        if (!result.success) {
          const msg = result.error.issues[0]?.message ?? 'Validation failed'
          rowErrors.push({ rowIndex: i + 2, field: field.label, message: msg })
        }
      }
    }
  }

  return {
    mappingErrors: [],
    rowErrors,
    valid: rowErrors.length === 0,
  }
}
