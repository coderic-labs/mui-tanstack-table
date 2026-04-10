# 🎯 MUI TanStack Table

> **A modular UI components library that provides pre-built Material-UI rendering for TanStack Table.** Compose powerful data tables with flexible, reusable components—use only what you need.
>
> ✨ **Render-only philosophy:** Configure TanStack Table, consume with MUI components.

## ⭐ Key Features

- **Modular Design 🔧** — Mix and match components. Use filtering without pagination, or pagination without sorting—it's up to you.
- **Zero Coupling 🔐** — **Complete isolation between table logic and UI.** Configure TanStack Table once with `useTable`, and let the UI components simply consume and render it.
- **📊 Render-Only Components** — All MUI components are pure presentational. They trigger state changes through the TanStack Table headless model
- **⚡ Built on TanStack Table** — Leverage the power of TanStack's headless table logic.
- **🎨 Material-UI Components** — Styled with MUI for consistency and accessibility.

## 📚 Documentation

See the [Storybook](https://coderic-labs.github.io/mui-tanstack-table) for interactive component examples and detailed API documentation.

## Quick Start

### Installation

```bash
npm install @coderic-labs/mui-tanstack-table
```

### Basic Usage

```tsx
import {
  Table,
  TableToolbar,
  TableToolbarInfo,
  TableToolbarActions,
  TableResultsLabel,
  TableColumnVisibilityToggle,
  TablePaginationV2,
  TableHeader,
  RowSelectionCell,
  RowSelectionHeader,
  predefinedColumnFilters
} from '@coderic-labs/mui-tanstack-table';
import { createColumnHelper, useTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import { Paper, Stack, TableContainer } from '@mui/material';

function MyTable() {

  // Step 1: Configure TanStack Table (all logic, no UI)
  const columnHelper = createColumnHelper();
  
  const columns = [
    columnHelper.display({
      id: 'select',
      header: RowSelectionHeader,
      cell: RowSelectionCell,
    }),
    columnHelper.accessor('name', {
      header: TableHeader,
      filter: predefinedColumnFilters.TextFilter,
      filterFn: 'includesString',
    }),
    ...
  ];

  const table = useTable({
    data: myData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Step 2: Use MUI components for rendering
  return (
    <Stack gap={2}>
      <TableToolbar>
        <TableToolbarInfo>
          <TableResultsLabel table={table} />
        </TableToolbarInfo>
        <TableToolbarActions>
          <TableColumnVisibilityToggle table={table} />
        </TableToolbarActions>
      </TableToolbar>
      
      <TableContainer component={Paper}>
        <Table table={table} />
      </TableContainer>
      
      <TablePaginationV2 table={table} />
    </Stack>
  );
}
```

## 🏗️ Architecture: Clean Separation

> **⚠️ CRITICAL PRINCIPLE:** This library follows a **strict render-only philosophy.** Table logic and UI rendering are completely isolated.

### Responsibility Breakdown:

| Layer | Responsibility | Framework |
|-------|---|---|
| **Table Logic** | All filtering, sorting, pagination, state, row selection | TanStack Table (`useTable`) |
| **UI Rendering** | Pure presentation of configured data | MUI Components |

### What This Means:

✅ **Configure your table features ONCE** with `useTable` (all logic happens here)

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
| `Table` | Core table rendering |
| `TableToolbar` | Toolbar container for actions and info |
| `TableToolbarInfo` / `TableToolbarActions` | Toolbar sections |
| `TableResultsLabel` | Display row count |
| `TablePaginationV2` | Pagination controls |
| `TableColumnVisibilityToggle` | Toggle column visibility |
| `TableHeader` | Standard column header with sorting |
| `RowSelectionCell` / `RowSelectionHeader` | Row selection checkboxes |
| `RowExpansionCell` / `RowExpansionHeader` | Expandable rows |
| `TableBulkActionButton` | Bulk action button for selected rows |
| `predefinedColumnFilters` | Pre-built filters (TextFilter, DateRangeFilter, SelectFilter, BooleanFilter) |

## Internationalization

The library supports multiple languages via `react-intl`. Wrap your component with the localization provider:

```tsx
import { TableLocalizationProvider } from '@coderic-labs/mui-tanstack-table';

<TableLocalizationProvider locale="en_GB" messages={enMessages}>
  <MyTable />
</TableLocalizationProvider>
```

## 📄 License

**MIT License © 2026 Coderic Labs**

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for complete details.
