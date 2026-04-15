import type { StoryObj } from '@storybook/react';
import { ColumnVisibilityDemo } from '../../demoComponents/columnVisibility';
import ColumnVisibilityDemoRaw from '../../demoComponents/columnVisibility?raw';

const meta = {
    title: 'Demo/Column Visibility',
    component: ColumnVisibilityDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            codePanel: true,
            source: {
                code: ColumnVisibilityDemoRaw,
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof ColumnVisibilityDemo>;

export const ColumnVisibility: Story = {};
