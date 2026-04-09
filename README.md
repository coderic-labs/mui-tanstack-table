# 🎯 MUI TanStack Table

> **A modular UI components library that provides pre-built Material-UI rendering for TanStack Table.** Compose powerful data tables with flexible, reusable components—use only what you need.
>
> ✨ **Render-only philosophy:** Configure TanStack Table, consume with MUI components.

## ⭐ Key Features

- **🔧 Modular Design** — Mix and match components. Use filtering without pagination, or pagination without sorting—it's up to you.
- **🔐 Zero Coupling** — Configure TanStack Table once with `useReactTable`, and let the UI components simply consume and render it. **Complete isolation between table logic and UI.**
- **📊 Render-Only Components** — **All MUI components are pure presentational.** They trigger state changes through the TanStack Table headless model
- **⚡ Built on TanStack Table** — Leverage the power of TanStack's headless table logic.
- **🎨 Material-UI Components** — Styled with MUI for consistency and accessibility.
- **📦 Out-of-the-Box Capabilities**:
  - ✅ Column filtering (text, date range, custom)
  - ✅ Column visibility toggle
  - ✅ Row selection and bulk actions
  - ✅ Row expansion
  - ✅ Pagination (with multiple versions)
  - ✅ Sorting and filtering summary
  - ✅ Internationalization support

## Quick Start

### Installation

```bash
npm install @coderic-labs/mui-tanstack-table
```

### Basic Usage

```tsx
import {
  ReactTable,
  ReactTableToolbar,
  ReactTableToolbarInfo,
  ReactTableToolbarActions,
  ReactTableResultsLabel,
  ReactTableColumnVisibilityToggle,
  ReactTablePaginationV2,
  ReactTableHeader,
  RowSelectionCell,
  RowSelectionHeader,
  predefinedColumnFilters
} from '@coderic-labs/mui-tanstack-table';
import { createColumnHelper, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import { Paper, Stack, TableContainer } from '@mui/material';

const { TextFilter } = predefinedColumnFilters;

function MyTable() {
  // ═══════════════════════════════════════════════════════════════════════
  // Step 1: Configure TanStack Table (all logic, no UI)
  // ═══════════════════════════════════════════════════════════════════════
  const columnHelper = createColumnHelper();
  
  const columns = [
    columnHelper.display({
      id: 'select',
      header: RowSelectionHeader,
      cell: RowSelectionCell,
    }),
    columnHelper.accessor('name', {
      header: ReactTableHeader,
      filter: TextFilter,
      filterFn: 'includesString',
    }),
    columnHelper.accessor('email', {
      header: ReactTableHeader,
      filter: TextFilter,
      filterFn: 'includesString',
    }),
  ];

  const table = useReactTable({
    data: myData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // ═══════════════════════════════════════════════════════════════════════
  // Step 2: Use MUI components for rendering (pass configured table)
  // All components consume the table instance—no configuration needed here
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <Stack gap={2}>
      <ReactTableToolbar>
        <ReactTableToolbarInfo>
          <ReactTableResultsLabel table={table} />
        </ReactTableToolbarInfo>
        <ReactTableToolbarActions>
          <ReactTableColumnVisibilityToggle table={table} />
        </ReactTableToolbarActions>
      </ReactTableToolbar>
      
      <TableContainer component={Paper}>
        <ReactTable table={table} />
      </TableContainer>
      
      <ReactTablePaginationV2 table={table} />
    </Stack>
  );
}
```

## 🏗️ Architecture: Clean Separation

> **⚠️ CRITICAL PRINCIPLE:** This library follows a **strict render-only philosophy.** Table logic and UI rendering are completely isolated.

### Responsibility Breakdown:

| Layer | Responsibility | Framework |
|-------|---|---|
| **Table Logic** | All filtering, sorting, pagination, state, row selection | TanStack Table (`useReactTable`) |
| **UI Rendering** | Pure presentation of configured data | MUI Components |

### What This Means:

✅ **Configure your table features ONCE** with `useReactTable` (all logic happens here)

✅ **Pass the table instance to ANY COMBINATION of MUI components** (they just render)

✅ **All table logic is independent of UI** — Swap components without reconfiguration

✅ **Complete control:** Modify table state and features directly through TanStack Table's API

### Important: What Components Do NOT Do:

❌ Accept configuration for table behavior
❌ Directly modify table state
❌ Handle business logic
❌ Make decisions

### Important: What Components DO:

✅ Consume the configured table instance
✅ Render the UI based on table state
✅ Handle user interactions (delegated back to table)

## Modular Components

Pick only what you need:

| Component | Purpose |
|-----------|---------|
| `ReactTable` | Core table rendering |
| `ReactTableToolbar` | Toolbar container for actions and info |
| `ReactTableToolbarInfo` / `ReactTableToolbarActions` | Toolbar sections |
| `ReactTableResultsLabel` | Display row count |
| `ReactTablePaginationV2` | Pagination controls |
| `ReactTableColumnVisibilityToggle` | Toggle column visibility |
| `ReactTableHeader` | Standard column header with sorting |
| `RowSelectionCell` / `RowSelectionHeader` | Row selection checkboxes |
| `RowExpansionCell` / `RowExpansionHeader` | Expandable rows |
| `ReactTableBulkActionButton` | Bulk action button for selected rows |
| `predefinedColumnFilters` | Pre-built filters (TextFilter, DateRangeFilter, SelectFilter, BooleanFilter) |

## Internationalization

The library supports multiple languages via `react-intl`. Wrap your component with the localization provider:

```tsx
import { TableLocalizationProvider } from '@coderic-labs/mui-tanstack-table';

<TableLocalizationProvider locale="en_GB" messages={enMessages}>
  <MyTable />
</TableLocalizationProvider>
```

## 📚 Documentation

See the [Storybook](https://coderic-labs.github.io/mui-tanstack-table) for interactive component examples and detailed API documentation.

## 📄 License

**MIT License © 2026 Coderic Labs**

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for complete details.
