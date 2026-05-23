export type FieldType = 'string' | 'email' | 'number' | 'date' | 'boolean'

export type SheetId = 'member_list' | 'orders' | 'tags'

export type DateFormat = 'iso' | 'slash'

export type CdpField = {
  /** Target column header in CDP export (exact match) */
  key: string
  label: string
  required: boolean
  type: FieldType
  description?: string
  /** Extra source header names for auto-match (e.g. vendor exports) */
  aliases?: string[]
  /** Date output format; CDP uses YYYY/MM/DD (slash) */
  dateFormat?: DateFormat
}

export type SheetSchema = {
  id: SheetId
  title: string
  description: string
  version: string
  /** Reference file in csv_example/ */
  exampleFile: string
  fields: CdpField[]
}
