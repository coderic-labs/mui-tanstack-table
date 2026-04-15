import type { StoryObj } from '@storybook/react';
import { RowDetailDemo } from '../../demoComponents/rowDetail';
import RowDetailDemoRaw from '../../demoComponents/rowDetail?raw';

const meta = {
    title: 'Demo/Row Detail',
    component: RowDetailDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            codePanel: true,
            source: {
                code: RowDetailDemoRaw,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof RowDetailDemo>;

export const RowDetail: Story = {};

