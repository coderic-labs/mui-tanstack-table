# Claude Instructions — mui-tanstack-table

## Project Architecture

- **Render-only separation:** TanStack Table owns all state and behavior. MUI components render and delegate interactions. Never put business or domain logic in UI components.
- **Public exports:** All public API must flow through `packages/mui-tanstack-table/src/index.ts`. No direct internal imports by consumers.
- **Module augmentation:** Preserve the `ColumnDefBase` extension in `packages/mui-tanstack-table/src/table.extension.ts` (`filter`, `tooltip`, `title`). This is a stable consumer contract — do not break it.

## Pre-commit Checks (always run both after any TS/TSX/JS/config change)

```sh
npm run tsc
npm run lint-fix
```

Run from the repo root. If either fails for reasons unrelated to your change, report it clearly.

## React Component Source Rules

- Always declare component arguments as `props: PropsType` and destructure in the first line of the function body — never destructure in the function signature.
- Extract a component into its own file when it has named props, conditional rendering paths, event handling, or enough JSX to merit a standalone unit.
- Keep small inline render helpers only when private, used once, and extraction adds no value.
- Colocate related component files in the same feature folder (e.g. `cells/`, `rows/`).
- Keep hooks, pure helpers, and constants out of component files unless tightly scoped to that single component.
- Component files render UI and delegate table state and behavior to TanStack inputs and existing helpers — never own state.
- If a component becomes part of the public API, route its export through `src/index.ts`.

## Data-Test Contract

- Keys in `packages/mui-tanstack-table/src/dataTests.ts` are **stable Cypress test API**. Never rename or remove them without explicit instruction.
- Use `getDataTestAttrs()` for all new table UI elements.
- If a data-test key must change, update Cypress tests in the same commit.

## TypeScript Safety

- Preserve generic typing on all components (`<TData, TValue>`). Avoid `any` and unsafe assertions unless no typed alternative exists.
- Maintain backward compatibility for exported symbols unless explicitly asked to break them.

## Storybook Rules

- Keep stories aligned with the actual package API from `src/index.ts`.
- Keep demo args explicit and stable so behavior is reproducible.
- Preserve client-side and server-side demo parity unless the difference is intentional and documented.
- When behavior changes, update story docs and examples in the same change.
- Prefer examples that reinforce the render-only architecture and TanStack-driven state.
- Keep stories focused on behavior and composability of table UI components.
- Avoid introducing story-only logic that diverges from production usage patterns.

## Documentation Rules

- Document only behavior that exists in source code or demos. Do not describe unimplemented capabilities as available features.
- If a documented feature changes, update docs in the same change.
- Reference only public APIs from `src/index.ts`. Keep naming consistent with exported symbols. Avoid introducing undocumented aliases or alternate names in prose.
- Prefer complete, runnable snippets over pseudo-code. Show a clear split between TanStack configuration and MUI rendering. Keep examples consistent with Storybook demo patterns.
- When documenting shared behavior, mention both client-side and server-side usage. Call out intentional differences explicitly instead of implying parity.
- When discussing tests or selectors, use stable `data-test`/`data-testid` patterns from `dataTests`. Do not recommend brittle CSS-class selectors as the default approach.
- Keep architecture explanations explicit and consistent across README and MDX docs.
- **When adding or renaming any MDX docs page:** update the `storySort` order in `packages/storybook/.storybook/preview.tsx`. Read the current order first and insert where it best fits the relevancy hierarchy (core concepts first, advanced/optional later).

### Changelog Discipline

- Describe user-visible behavior and migration impact first.
- For breaking or potentially disruptive changes, include clear upgrade notes.
- Keep entries concise, factual, and version-scoped.

## Cypress Test Rules

- Mount components with `Providers` from `packages/cypress-tests/cypress/support/providers.tsx`. Keep mount wrappers minimal and consistent across specs.
- Prefer `getByDataTest` / `getByDataTestId` from `packages/cypress-tests/cypress/support/utils.ts` over CSS class selectors. Only use class selectors when no stable semantic selector exists.
- Assert user-observable outcomes first: row order, row count, active sort/filter state, empty state, reset flows.
- Use shared helpers like `assertRowsRenderedInOrder` and `assertColumnVisibility`.
- Include clear/reset validation for filters or controls that mutate table state.
- If behavior applies to both modes, run the same tests for both `ClientSideTableDemo` and `ServerSideTableDemo`. Keep test names behavior-focused and explicit about expected outcomes.
- No fragile waits or timing assumptions. Use deterministic interactions and assertions based on rendered state.

## Monorepo Boundaries

- In Cypress tests, follow path aliases in `packages/cypress-tests/vite.config.ts` and `packages/cypress-tests/tsconfig.json`.
- Prefer source imports through existing aliases over build output imports.

## Interaction Contract

- Before implementing, check for conflicts with these rules. If a conflict is found, pause and explain it — do not proceed silently.
- When a request is ambiguous or missing context, ask clarifying questions before making changes.
- When editing rule or instruction files, run a consistency check across all rule files first — call out duplicities, gaps, or integrity issues.
