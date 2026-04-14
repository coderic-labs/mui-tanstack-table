---
applyTo: "packages/mui-tanstack-table/README.md,packages/storybook/stories/_docs/**/*.mdx"
description: "Use when writing or updating user-facing documentation, guides, API docs, changelog entries, and README content"
---

# Documentation Rules

## Purpose
- Keep documentation aligned with the library's render-only architecture.
- Explain how TanStack Table owns state/behavior and MUI components render and delegate interactions.

## Accuracy Requirements
- Document only behavior that exists in source code or demos.
- If a documented feature changes, update docs in the same change.
- Do not describe unimplemented capabilities as available features.

## API Consistency
- Reference public APIs from packages/mui-tanstack-table/src/index.ts.
- Keep naming consistent with exported symbols and current component names.
- Avoid introducing undocumented aliases or alternate names in prose.

## Example Quality
- Prefer complete, runnable snippets over pseudo-code.
- Show a clear split between table configuration and UI rendering.
- Keep examples consistent with Storybook demo patterns and package usage.

## Client vs Server Guidance
- When documenting shared behavior, mention both client-side and server-side usage.
- Call out intentional differences explicitly instead of implying parity.

## Testing and Selectors in Docs
- When discussing tests or selectors, use stable data-test/data-testid patterns from dataTests.
- Do not recommend brittle CSS-class selectors as the default approach.

## Changelog Discipline
- Describe user-visible behavior and migration impact first.
- For breaking or potentially disruptive changes, include clear upgrade notes.
- Keep entries concise, factual, and version-scoped.

## Tone and Structure
- Use action-oriented headings and short sections.
- Favor concise bullets and practical guidance over marketing language.
- Keep architecture explanations explicit and consistent across README and MDX docs.
