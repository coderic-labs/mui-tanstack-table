# 📋 MUI TanStack Table

> **A modular UI components library that provides pre-built Material-UI rendering for TanStack Table.**
> **Render-only philosophy:** Configure TanStack Table, render with MUI components.

## 📚 Documentation

See the [Documentation](https://coderic-labs.github.io/mui-tanstack-table) for examples and detailed API documentation.

This package is a UI rendering layer for TanStack Table. Be sure to review the TanStack Table docs at [https://tanstack.com/table/v8](https://tanstack.com/table/v8)

## ⭐ Key Features

- **🔧 Modular Design** - Mix and match components. Use filtering without pagination, or pagination without sorting—it's up to you.
- **🔐 Zero Coupling** - Complete isolation between table logic and UI. Configure TanStack Table once with `useReactTable`, and let the UI components simply consume and render it.
- **📊 Render-Only Components** - All MUI components are pure presentational. They trigger state changes through the TanStack Table headless model
- **⚡ Built on TanStack Table** - Leverage the power of TanStack's headless table logic.
- **🧩 Maximum flexibility and composability** - Ideal for advanced users and teams wanting to own all table logic and have full control.
- **🔎 No hidden state or logic** - Everything is explicit and transparent; you control all table behavior.
- **📘 Requires TanStack Table knowledge** - This library assumes you already understand `@tanstack/react-table` basics.
- **🎨 Material-UI Components** - Styled with MUI for consistency and accessibility.

## 🚀 Quick Start

Install package and peer dependencies.

```bash
npm install @coderic-labs/mui-tanstack-table @mui/material @mui/x-date-pickers @tanstack/react-table react react-dom @mui/icons-material @emotion/react @emotion/styled react-intl
```

Define columns.

```tsx
import * as MTT from '@coderic-labs/mui-tanstack-table';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<Developer>();

const columns = [
  columnHelper.display({
    id: 'select',
    header: MTT.TableRowSelectionHeader,
    cell: MTT.TableRowSelectionCell,
  }),
  columnHelper.accessor('name', {
    header: MTT.TableHeader,
    filter: MTT.predefinedColumnFilters.TextFilter,
    filterFn: 'includesString',
  })
];
```

Create a TanStack table.

```tsx
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
});
```

Render table.

```tsx
import * as MTT from '@coderic-labs/mui-tanstack-table';

<Stack>
  <MTT.TableToolbar>
    <MTT.TableResultsLabel table={table} />
    <MTT.TableColumnVisibilityToggle table={table} />
  </MTT.TableToolbar>
  <TableContainer component={Paper}>
    <MTT.Table table={table} />
  </TableContainer>
  <MTT.TablePaginationV2 table={table} />
</Stack>
```

## 🏗️ Architecture: Clean Separation

> **⚠️ CRITICAL PRINCIPLE:** This library follows a **strict render-only philosophy.** Table logic and UI rendering are completely isolated.

### Responsibility Breakdown

| Layer | Responsibility | Framework |
| --- | --- | --- |
| **Table Logic** | All filtering, sorting, pagination, state | TanStack Table (`useReactTable`) |
| **Table Render** | Table UI | MTT Components |

## ✅ Features that are present

These are implemented or demonstrated in the current library:

- Sorting
- Filtering
- Pagination
- Row selection and bulk operations
- Row expansion with detail rows
- Row highlighting
- Column visibility
- Column pinning
- Column ordering
- Columns resizing
- Sticky header/footer
- Client-side and server-side usage
- Ready-to-use filters and table controls.

## ❌ Features missing

These common table capabilities are not yet provided by the UI layer:

- Virtualization - no row virtualization integration
- Grouping/aggregation - no grouping or aggregation of rows and columns
- Inline editing - not tested for editable cell components
- Global filter input - not tested for top-level search/global filter component

## ❤️ Support

If this project helps you, consider supporting its development.

👉 <https://github.com/sponsors/ErikParso>

Suggestions, feedback, and contributions are welcome!
