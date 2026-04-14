---
applyTo: "packages/storybook/stories/**/*.tsx"
description: "Use when editing Storybook stories for table demos and API behavior"
---

# Storybook Rules

## Story Structure
- Keep stories aligned with actual package API from packages/mui-tanstack-table/src/index.ts.
- Keep demo args explicit and stable so behavior is reproducible.
- Preserve side-by-side parity between client-side and server-side demos unless differences are intentional.

## Documentation Alignment
- When behavior changes, update story docs and examples in the same change.
- Prefer examples that reinforce render-only architecture and TanStack-driven state.

## Quality
- Keep stories focused on behavior and composability of table UI components.
- Avoid introducing story-only logic that diverges from production usage patterns.
