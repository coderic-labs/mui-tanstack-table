# Cypress Testing Rules

## Test file location

All component tests live in [packages/cypress-tests/cypress/component/](../../packages/cypress-tests/cypress/component/). One file per feature area (e.g. `filtering.cy.tsx`, `columnOrder.cy.tsx`).

## Mount pattern

Always wrap mounts in `<Providers>`:
```tsx
cy.mount(
  <Providers>
    <ClientSideTableDemo />
  </Providers>
);
```

Both `ClientSideTableDemo` and `ServerSideTableDemo` are used to verify parity between client-side and server-side modes. When adding a test for a feature, test both unless the feature is mode-specific.

## Selecting elements

Use only `data-test` and `data-testid` attributes — never CSS selectors, class names, or visible text. All constants are in [packages/mui-tanstack-table/src/dataTests.ts](../../packages/mui-tanstack-table/src/dataTests.ts).

Helper utilities (defined in the cypress-tests support files):
- `getByDataTest(value)` — selects by `[data-test="value"]`
- `getByDataTestId(value)` — selects by `[data-testid="value"]`

For elements with an `id` suffix (e.g. a specific row's checkbox), use `getDataTestAttrs(value, id)` which produces both `data-test` and `data-testid="value.id"`.

## Assertion helpers

Prefer the project's assertion utilities over raw Cypress assertions where available:
- `assertColumnOrder(expectedOrder: string[])` — checks rendered column header order
- `assertResultsLabel(count: number)` — checks the results label text
- `assertRowsRenderedInOrder(rows: object[])` — checks table row data order

## Test structure

Group related assertions with `it()` blocks inside a `describe()`. When testing both client and server modes, use a `forEach` loop over `[ClientSideTableDemo, ServerSideTableDemo]` and mount/assert inside it:
```tsx
[ClientSideTableDemo, ServerSideTableDemo].forEach((Demo) => {
  it(`works in ${Demo.name}`, () => {
    cy.mount(<Providers><Demo /></Providers>);
    // assertions
  });
});
```

## Viewport

The Cypress config sets viewport to **1440×900**. Tests that depend on responsive layout or overflow behavior should account for this fixed size.
