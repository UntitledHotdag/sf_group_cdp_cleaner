import type { SheetSchema } from './types'

/** Stockfeel CDP tags — see csv_example/example_tags.csv */
export const tagsSchema: SheetSchema = {
  id: 'tags',
  title: '標籤',
  description: 'Member tags for segmentation (comma-separated tags allowed in 標籤 cell)',
  version: '1.0.0',
  exampleFile: 'example_tags.csv',
  fields: [
    {
      key: '歸戶碼',
      label: '歸戶碼',
      required: true,
      type: 'string',
      aliases: ['member_id', 'user_id', 'customer_id', 'cust_id'],
    },
    {
      key: '標籤',
      label: '標籤',
      required: true,
      type: 'string',
      description: 'One or more tags; multiple tags may be comma-separated in one cell',
      aliases: ['tag', 'tags', 'segment', 'segment_label', 'label'],
    },
  ],
}
