import type { SheetId, SheetSchema } from './types'
import { memberListSchema } from './member_list'
import { ordersSchema } from './orders'
import { tagsSchema } from './tags'

export const schemas: Record<SheetId, SheetSchema> = {
  member_list: memberListSchema,
  orders: ordersSchema,
  tags: tagsSchema,
}

export function getSchema(id: SheetId): SheetSchema {
  return schemas[id]
}

export * from './types'
export { memberListSchema, ordersSchema, tagsSchema }
