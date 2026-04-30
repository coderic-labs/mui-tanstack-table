# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Structure

Three npm workspaces:
- **packages/mui-tanstack-table** — the published library (builds to `dist/index.mjs` via Vite)
- **packages/storybook** — Storybook v8 demos and interactive docs
- **packages/cypress-tests** — Cypress 14 component tests

## Commands

All commands run from the repo root unless noted.

```bash
# Development
npm run storybook          # Start Storybook at localhost:6006

# Build & Type Check
npm run build              # Build all workspaces
npm run tsc                # TypeScript check across all workspaces

# Linting
npm run lint               # ESLint on packages/
npm run lint-fix           # Auto-fix lint issues

# Testing (Cypress component tests)
npm run cypress:open       # Open Cypress UI (interactive)
npm run cypress:run        # Run Cypress headless (CI mode)

# Run a single test file
cd packages/cypress-tests
npx cypress run --component --spec "cypress/component/filtering.cy.tsx"

# Packaging
npm run pack               # Build + npm pack the library
```

CI (GitHub Actions, Windows runner) runs: `tsc` → `build` → `lint` → `cypress:run`.

## Architecture

### Render-only philosophy

MTT is a **pure render layer** on top of TanStack Table. It provides no state management — all table state (filtering, sorting, pagination, selection, column order, etc.) lives in the caller's `useReactTable` instance. Every component accepts a `table: Table<T>` prop and renders from it. This is the central design constraint: components should never own or duplicate table state.

### Source layout (`packages/mui-tanstack-table/src/`)

```
components/react-table/
  cells/          # Cell renderers (body, header, footer)
  rows/           # Row components (header, body, footer, detail, empty)
  context/        # React contexts for DnD, sortable items, column widths
  table.tsx       # Core <Table> component
  tableHeader.tsx # Column header with sort/filter/options
  tablePagination.tsx
  tableColumnVisibilityToggle.tsx
  tableRowSelection.tsx
  tableRowExpansion.tsx
  ...
components/filtering/  # TextFilter, BooleanFilter, DateFilter, SelectFilter, etc.
components/confirmDialog/
components/infoTooltip/
context/               # react-intl i18n context
utils/                 # Column pinning helpers, element width utilities
table.extension.ts     # TanStack Table type augmentations (columnMeta, etc.)
dataTests.ts           # data-testid/data-test string constants
index.ts               # Public API — everything exported from here
```

### Key dependencies (all peer deps — not bundled)
- React 18+, MUI 6–8, TanStack Table 8
- @dnd-kit (column drag-and-drop ordering)
- react-intl (i18n — wrap app in `<IntlProvider>`)

### Type extensions

`table.extension.ts` augments TanStack Table's `ColumnMeta` interface to add library-specific metadata (filter type, sticky columns, etc.). When adding new column-level config, extend `ColumnMeta` there.

### Data-testid conventions

All interactive elements use `data-test` and `data-testid` attributes. Constants live in `dataTests.ts`. Cypress tests reference these exclusively — never use CSS selectors or text-based queries in tests.

### Storybook story order

Stories follow a defined sort order in `.storybook/main.ts` (`storySort`). When adding a new story, place it in the correct alphabetical/categorical position in that array.
