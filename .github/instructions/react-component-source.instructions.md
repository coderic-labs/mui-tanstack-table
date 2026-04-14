---
applyTo: "packages/mui-tanstack-table/src/**/*.tsx,packages/storybook/stories/demoComponents/**/*.tsx"
description: "Use when editing React component source files or deciding whether JSX should stay inline or move into a separate component file"
---

# React Component Source Rules

## File Organization
- Keep React components in their own designated file when they have named props, reusable behavior, or enough JSX structure to merit a standalone unit.
- Allow small inline render helpers only when they are private, used once, and extracting them would add indirection without improving reuse or readability.
- When an inline JSX block starts carrying its own props, conditional rendering paths, or event handling, extract it into a named colocated component file.

## Boundaries
- Keep hooks, pure helpers, and constants out of component files unless they are tightly scoped to that single component.
- Preserve the render-only architecture: component files should render UI and delegate table state and behavior to TanStack inputs and existing helpers.

## Placement
- Colocate related component files within the same feature folder instead of introducing broad shared buckets.
- If a component becomes part of the public package API, route its export through packages/mui-tanstack-table/src/index.ts.