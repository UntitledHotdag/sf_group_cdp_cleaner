import type { SheetSchema } from './types'

/** Stockfeel CDP member list — see csv_example/example_member_list.csv */
export const memberListSchema: SheetSchema = {
  id: 'member_list',
  title: '會員名單',
  description: 'Member list (user profiles) for CDP import',
  version: '1.0.0',
  exampleFile: 'example_member_list.csv',
  fields: [
    {
      key: '歸戶碼',
      label: '歸戶碼',
      required: true,
      type: 'string',
      description: 'Unique household / member identifier',
      aliases: ['member_id', 'user_id', 'id_num', 'customer_id', 'cust_id'],
    },
    {
      key: '手機',
      label: '手機',
      required: true,
      type: 'string',
      aliases: ['phone', 'mobile', 'phone_number', '手機號碼'],
    },
    {
      key: 'Email',
      label: 'Email',
      required: true,
      type: 'email',
      aliases: ['email', 'member_email', 'email_address'],
    },
    {
      key: '會員名稱',
      label: '會員名稱',
      required: false,
      type: 'string',
      aliases: ['user_name', 'member_name', 'name', 'full_name'],
    },
    {
      key: '性別',
      label: '性別',
      required: false,
      type: 'string',
      aliases: ['gender', 'sex'],
    },
    {
      key: '加入時間',
      label: '加入時間',
      required: false,
      type: 'date',
      dateFormat: 'slash',
      aliases: ['member_since', 'signup_date', 'created_at', 'join_date'],
    },
    {
      key: '生日',
      label: '生日',
      required: false,
      type: 'date',
      dateFormat: 'slash',
      aliases: ['birthday', 'b-day', 'birth_date', 'dob'],
    },
    {
      key: 'LINE UID',
      label: 'LINE UID',
      required: false,
      type: 'string',
      aliases: ['line_uid', 'line_id'],
    },
  ],
}
