import type { StoryObj } from '@storybook/react';
import { RowActionsDemo } from '../../demoComponents/rowActions';
import RowActionsDemoRaw from '../../demoComponents/rowActions?raw';

const meta = {
    title: 'Demo/Row Actions',
    component: RowActionsDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            codePanel: true,
            source: {
                code: RowActionsDemoRaw,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof RowActionsDemo>;

export const RowActions: Story = {};

