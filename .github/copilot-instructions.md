# Copilot Instructions - mui-tanstack-table

## Project Intent
- This monorepo provides Material UI render components for TanStack Table.
- Keep strict render-only separation: TanStack owns table state and behavior, MUI components render and delegate interactions.
- Prefer small, additive changes over broad refactors unless explicitly requested.

## Architecture Rules
- Keep public exports centralized through packages/mui-tanstack-table/src/index.ts.
- Preserve TanStack module augmentation contract in packages/mui-tanstack-table/src/table.extension.ts.
- Do not move domain or business logic into UI rendering components.
- Reuse existing table patterns in packages/mui-tanstack-table/src/components/react-table.

## Data-Test Contract
- Treat keys in packages/mui-tanstack-table/src/dataTests.ts as stable test API.
- Use getDataTestAttrs for new table UI elements so Cypress selectors remain stable.
- If a data-test key must change, update Cypress tests in the same change.

## TypeScript and API Safety
- Preserve generic typing for table components and helpers.
- Avoid any and unsafe assertions unless no typed alternative exists.
- Keep backward compatibility for exported symbols unless the task explicitly requests breaking changes.

## Test Strategy
- For behavior changes, add or update Cypress component tests in packages/cypress-tests/cypress/component.
- Prefer selectors from helper utilities in packages/cypress-tests/cypress/support/utils.ts.
- Assert user-visible behavior first: row order, row count, active sort/filter state, empty state, reset flows.
- Cover both ClientSideTableDemo and ServerSideTableDemo when behavior should be shared.

## Storybook and Demos
- Reflect behavior and API changes in storybook demos when relevant.
- Keep client-side and server-side demo arguments aligned unless a difference is intentional.

## Monorepo Boundaries
- In Cypress tests, follow path aliases configured in packages/cypress-tests/vite.config.ts and packages/cypress-tests/tsconfig.json.
- Prefer source imports through existing aliases over build output imports.

## Session-Derived Focus
- Preserve and extend sorting coverage, especially multi-sort enabled vs disabled behavior.
- Keep generated guidance structured and action-oriented.

## Interaction Contract
- Before executing a request, check whether it conflicts with active workspace or file-scoped instructions.
- If a conflict is detected, pause and explain the conflict clearly.
- Ask for explicit user confirmation before proceeding with a conflicting action.
- If user instructions are ambiguous, missing context, or implementation direction is uncertain, ask clarifying questions before making changes.
- Wait for user clarification before implementation when additional context is required.
- After confirmation, either continue as requested or adjust the relevant instruction files, depending on the user's decision.
- Whenever the user asks to create or edit rules/instructions, run a consistency check across existing rule files first.
- Detect and call out duplicities (overlapping or repeated rules), structural gaps, and integrity issues before finalizing rule updates.
- Keep rule sets DRY: put global behavior in workspace instructions and keep file-scoped instructions narrowly focused on applyTo targets.
- Whenever changes are produced in files relevant to TypeScript or ESLint checks, run from repo root: `npm run tsc` then `npm run lint-fix`.
- Treat these as relevant by default: `*.ts`, `*.tsx`, `*.js`, `*.jsx`, `package.json`, `tsconfig*.json`, `.eslintrc*`, and eslint/ts-related config files.
- If either command is unavailable or fails for reasons unrelated to the requested change, report that clearly with the failure summary.
