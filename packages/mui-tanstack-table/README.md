# 🎯 MUI TanStack Table

> **A modular UI components library that provides pre-built Material-UI rendering for TanStack Table.** Compose powerful data tables with flexible, reusable components—use only what you need.
>
> ✨ **Render-only philosophy:** Configure TanStack Table, consume with MUI components.

## ⭐ Key Features

- **🔧 Modular Design** — Mix and match components. Use filtering without pagination, or pagination without sorting—it's up to you.
- **🔐 Zero Coupling** — **Complete isolation between table logic and UI.** Configure TanStack Table once with `useTable`, and let the UI components simply consume and render it.
- **📊 Render-Only Components** — All MUI components are pure presentational. They trigger state changes through the TanStack Table headless model
- **⚡ Built on TanStack Table** — Leverage the power of TanStack's headless table logic.
- **📘 Requires TanStack Table knowledge** — This library assumes you already understand `@tanstack/react-table` basics.
- **🎨 Material-UI Components** — Styled with MUI for consistency and accessibility.

## 📚 Documentation

This package is a UI rendering layer for TanStack Table. Be sure to review the TanStack Table docs at [https://tanstack.com/table/v8](https://tanstack.com/table/v8) before using this library.

See the [Storybook](https://coderic-labs.github.io/mui-tanstack-table) for interactive component examples and detailed API documentation.

## ⚠️ Alpha status

This library is currently in alpha. The public API is still evolving, and we are actively working on new table helpers, docs, and stability improvements. Use this package if you already have basic familiarity with `@tanstack/react-table` and expect the API to change.

## Quick Start

### Installation

```bash
npm install @coderic-labs/mui-tanstack-table
```

### Basic Usage

```tsx
import * as MTT from '@coderic-labs/mui-tanstack-table';
import { createColumnHelper, useTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import { Paper, Stack, TableContainer } from '@mui/material';

function MyTable() {

  // Step 1: Configure TanStack Table (all logic, no UI)
  const columnHelper = createColumnHelper();
  
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
      <MTT.TableToolbar>
        <MTT.TableToolbarInfo>
          <MTT.TableResultsLabel table={table} />
        </MTT.TableToolbarInfo>
        <MTT.TableToolbarActions>
          <MTT.TableColumnVisibilityToggle table={table} />
        </MTT.TableToolbarActions>
      </MTT.TableToolbar>
      
      <TableContainer component={Paper}>
        <MTT.Table table={table} />
      </TableContainer>
      
      <MTT.TablePaginationV2 table={table} />
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
| `TableHeader` | Standard column header with sorting and filtering |
| `TableHeaderV2` | Compact header with inline filter popover and sort order badges |
| `TableFilterOverview` | Filter summary chips with reset button |
| `TablePagination` | Standard pagination controls |
| `TablePaginationV2` | Pagination controls |
| `TableRowSelectionCell` / `TableRowSelectionHeader` | Row selection checkboxes |
| `TableRowExpansionCell` / `TableRowExpansionHeader` | Row expanding buttons |
| `TableResetHeader` | Resets filters, sorting, pagination, global filter, and expansion state |
| `TableBulkActionButton` | Bulk action button for selected rows |
| `predefinedColumnFilters` | Pre-built filters (TextFilter, DateRangeFilter, SelectFilter, BooleanFilter) |

## Features that are present

These are implemented or demonstrated in the current library:

- Sorting
- Filtering
- Pagination
- Row selection and bulk operations
- Row expansion with detail rows
- Column visibility toggle
- Sticky header support
- Filter overview chips
- Client-side and server-side usage
- Reset header to clear filters, sorting, pagination, global filter, and expansion

## Features missing

These common table capabilities are not yet provided by the UI layer:

- Column pinning UI — only manual pinning via TanStack Table state is implied, no built-in pin/unpin helper
- Column reorder — no drag-and-drop or `columnOrder` state helper
- Column resize — no resize handles or `columnSizing` support
- Virtualization — no row virtualization integration
- Grouping/aggregation — no grouping helpers or aggregation row/footer support
- Inline editing — no editable cell components
- Global filter input — no dedicated top-level search/global filter component

## ❤️ Support

If this project helps you, consider supporting its development.

👉 https://github.com/sponsors/ErikParso

Suggestions, feedback, and contributions are welcome!
