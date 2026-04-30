# Component Authoring Rules

## Render-only constraint

Components must never own table state. All table logic lives in the caller's `useReactTable` instance. Components receive a `table: Table<T>` prop (from `@tanstack/react-table`) and read from it — they never call `useState` for anything TanStack Table already tracks (sort, filter, pagination, selection, column order, visibility, pinning).

## Accepted prop pattern

Components that render a column header receive a `HeaderContext<TData, TValue>` (spread from TanStack's render props). Components that render rows receive `Row<TData>`. Components that need table-wide access receive `Table<TData>`. Never invent parallel state for things the table instance already exposes.

## ColumnMeta extensions

To add new per-column config, augment `ColumnDefBase` in [packages/mui-tanstack-table/src/table.extension.ts](../../packages/mui-tanstack-table/src/table.extension.ts) — do not add ad-hoc props elsewhere. Current augmentations:
- `filter` — `ColumnDefTemplate<HeaderContext>` for the filter UI rendered in the column header
- `tooltip` — `ColumnDefTemplate<HeaderContext>` for an info tooltip
- `title` — `string` override for the column header label

## Context usage

Three internal contexts exist in `components/react-table/context/`:
- `tableColumnWidthsContext` — tracks DOM-measured column widths; use `useColumnWidths()`
- `tableDndContext` — wraps `@dnd-kit/core` DndContext for column reordering drag events
- `tableSortableContext` — wraps `@dnd-kit/sortable` SortableContext for column ordering strategy

Do not add new contexts without a clear shared-state need that cannot be passed as props.

## Externalized dependencies

These are **all peer deps** and must never be imported from `devDependencies` in library source: `react`, `react-dom`, `@mui/material`, `@mui/icons-material`, `@mui/x-date-pickers`, `@tanstack/react-table`, `@emotion/react`, `@emotion/styled`, `react-intl`. They are also listed as Vite externals — adding a new peer dep requires updating both `package.json` `peerDependencies` and the `rollupOptions.external` array in `vite.config.ts`.

## Localization

All user-visible strings must go through `useTableIntl()` from [packages/mui-tanstack-table/src/context/tableIntl.tsx](../../packages/mui-tanstack-table/src/context/tableIntl.tsx). Add new message keys to `src/localization/en_gb.json` and use `intl.formatMessage({ id: '...' })`. Never hardcode English strings in component JSX.

## Public API

Everything exported from [packages/mui-tanstack-table/src/index.ts](../../packages/mui-tanstack-table/src/index.ts) is public surface. Only add an export there when the item is intentionally public. Internal utilities stay unexported.
