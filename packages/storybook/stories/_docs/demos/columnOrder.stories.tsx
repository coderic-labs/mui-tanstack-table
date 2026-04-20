import type { StoryObj } from '@storybook/react';
import { ColumnsOrderDemo } from '../../demoComponents/columsOrder';
import ColumnsOrderDemoRaw from '../../demoComponents/columsOrder?raw';

const meta = {
    title: 'Demo/Columns Order',
    component: ColumnsOrderDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            codePanel: true,
            source: {
                code: ColumnsOrderDemoRaw,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ColumnsOrderDemo>;

export const ColumnsOrder: Story = {};
