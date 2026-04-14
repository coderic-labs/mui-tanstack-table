---
applyTo: "packages/cypress-tests/cypress/component/**/*.cy.tsx,packages/cypress-tests/cypress/support/**/*.ts,packages/cypress-tests/cypress/support/**/*.tsx"
description: "Use when creating or editing Cypress component tests for table behavior, selectors, and reusable test helpers"
---

# Cypress Component Test Rules

## Mounting
- Mount components with Providers from packages/cypress-tests/cypress/support/providers.tsx.
- Keep mount wrappers minimal and consistent across specs.

## Selector Strategy
- Prefer getByDataTest and getByDataTestId from packages/cypress-tests/cypress/support/utils.ts.
- Prefer data-test/data-testid selectors over CSS classes whenever possible.
- Only use class selectors when there is no stable semantic selector.

## Assertions
- Verify user-observable outcomes first: visible rows, order, counts, empty states, active controls.
- Use shared helpers like assertRowsRenderedInOrder and assertColumnVisibility.
- Include clear/reset validation for filters or controls that mutate table state.

## Coverage Pattern
- If behavior applies to both table modes, run the same tests for ClientSideTableDemo and ServerSideTableDemo.
- Keep test names behavior-focused and explicit about expected outcomes.

## Stability
- Avoid fragile waits and timing assumptions.
- Use deterministic interactions and assertions based on rendered state.
