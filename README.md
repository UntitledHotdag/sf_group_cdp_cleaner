# Stockfeel CDP CSV Cleaner

A browser-only tool to map messy source CSV columns to the format accepted by the Stockfeel CDP SaaS.

| Sheet type | CDP example file | Route |
|------------|------------------|-------|
| 會員名單 (member list) | `csv_example/example_member_list.csv` | `/import/member_list` |
| 訂單紀錄 (orders) | `csv_example/example_orders.csv` | `/import/orders` |
| 標籤 (tags) | `csv_example/example_tags.csv` | `/import/tags` |

All parsing, mapping, validation, and export run locally in your browser. No data is sent to a server.

Product requirements and design decisions are documented in [docs/PDR.md](docs/PDR.md).

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Workflow

1. Choose a sheet type on the home page.
2. Upload a `.csv` file (vendor export or CDP-shaped file).
3. Map each CDP field to a source column (auto-match + `localStorage` presets).
4. Preview the transformed output and fix validation errors.
5. Download the cleaned CSV (`{sheetId}_clean_{date}.csv`).

## CDP column reference

Official layouts live in [`csv_example/`](csv_example/):

- **Member list:** `歸戶碼`, `手機`, `Email`, `會員名稱`, `性別`, `加入時間`, `生日`, `LINE UID`
- **Orders:** `訂單編號`, `訂單時間`, `訂單狀態`, `總計`, `歸戶碼`, … (17 columns — see example file)
- **Tags:** `歸戶碼`, `標籤` (comma-separated tags allowed in one cell)

Dates are exported as **YYYY/MM/DD** to match CDP examples.

## Test files

| File | Purpose |
|------|---------|
| `csv_example/example_*.csv` | Official CDP column layout (upload as-is to verify pass-through) |
| `csv_example/east_*.csv` | Real vendor-style exports for mapping practice |
| `fixtures/*_source.csv` | English-header vendor samples for auto-match testing |

### Manual test checklist

- [ ] **Member list:** Upload `fixtures/member_list_source.csv` → map → dates as `YYYY/MM/DD` → export
- [ ] **Orders:** Upload `fixtures/orders_source.csv` → map → export
- [ ] **Tags:** Upload `fixtures/tags_source.csv` or `csv_example/example_tags.csv` → export
- [ ] **Auto-match:** Re-upload same fixture — mappings restore from `localStorage`
- [ ] **CDP shape:** Upload `csv_example/example_member_list.csv` directly — columns auto-match 1:1

## Updating the CDP schema

If CDP columns change, edit:

1. [`src/schemas/member_list.ts`](src/schemas/member_list.ts), [`orders.ts`](src/schemas/orders.ts), [`tags.ts`](src/schemas/tags.ts)
2. [`src/lib/validation/validate.ts`](src/lib/validation/validate.ts) if new validation rules are needed
3. Bump `version` and update [`docs/PDR.md`](docs/PDR.md)

## Project structure

```
csv_example/     # Official CDP example CSVs
fixtures/        # Vendor-style test inputs
src/schemas/     # CDP target field definitions
src/lib/         # csv, mapping, validation, presets
src/components/  # UI
src/pages/       # Home, ImportWizard
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Tech stack

Vite, React, TypeScript, Tailwind CSS, React Router, Papa Parse, Zod
