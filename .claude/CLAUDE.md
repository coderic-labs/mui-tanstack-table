# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Structure

Three npm workspaces:

- **packages/mui-tanstack-table** — the published library (builds to `dist/index.mjs` via Vite)
- **packages/storybook** — Storybook v8 demos and interactive docs
- **packages/cypress-tests** — Cypress 14 component tests

## CI

GitHub Actions (Windows runner) runs: `tsc` → `build` → `lint` → `cypress:run`.

## Architecture

### Render-only philosophy

MTT is a **pure render layer** on top of TanStack Table. It provides no state management — all table state (filtering, sorting, pagination, selection, column order, etc.) lives in the caller's `useReactTable` instance. Components accept a `table: Table<T>` prop and render from it.

### Key dependencies (all peer deps — not bundled)

- React 18+, MUI 6–8, TanStack Table 8
- @dnd-kit (column drag-and-drop ordering)
- react-intl (i18n — wrap app in `<IntlProvider>`)

### Type extensions

`table.extension.ts` augments TanStack Table's `ColumnMeta` interface to add library-specific metadata (filter type, sticky columns, etc.).
