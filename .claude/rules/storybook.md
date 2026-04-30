# Storybook Rules

## Story location

Stories live in [packages/storybook/stories/](../../packages/storybook/stories/). Demo component implementations (used by stories and by Cypress tests) live in `packages/storybook/demoComponents/`.

## Story file pattern

```tsx
import type { StoryObj } from '@storybook/react';
import { MyFeatureDemo } from '../../demoComponents/myFeature';
import MyFeatureDemoRaw from '../../demoComponents/myFeature?raw';

const meta = {
    title: 'Category/Story Name',
    component: MyFeatureDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            codePanel: true,
            source: { code: MyFeatureDemoRaw },
        },
    },
};

export default meta;
type Story = StoryObj<typeof MyFeatureDemo>;

export const MyFeature: Story = {
    args: { /* props */ },
};
```

Key points:
- Always import the demo component source with `?raw` suffix so the Docs panel shows the actual source code
- Use `layout: 'fullscreen'` for table demos
- Set `docs.codePanel: true` with the raw source passed as `source.code`

## Demo components

Demo components (`demoComponents/`) are shared between Storybook stories and Cypress component tests. When adding a new feature story, implement the demo component so it can also be mounted in Cypress tests. Keep demo components self-contained (own `useReactTable` setup, mock data, state wiring).

## Storybook alias

The Storybook Vite config aliases `@coderic-labs/mui-tanstack-table` → `packages/mui-tanstack-table/src` so stories and demo components always run against the local source, not a published build. Import from `@coderic-labs/mui-tanstack-table` in all demo components.

## Story sort order

Stories are sorted via `storySort` in [packages/storybook/.storybook/main.ts](../../packages/storybook/.storybook/main.ts). When adding a new story, add it to the sort array in the correct alphabetical/categorical position — unsorted stories appear last and out of order in the sidebar.
