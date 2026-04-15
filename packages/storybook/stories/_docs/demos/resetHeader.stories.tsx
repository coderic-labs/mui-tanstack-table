import type { StoryObj } from '@storybook/react';
import { ResetHeaderDemo } from '../../demoComponents/resetHeader';
import ResetHeaderDemoRaw from '../../demoComponents/resetHeader?raw';

const meta = {
    title: 'Demo/Reset Header',
    component: ResetHeaderDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            codePanel: true,
            source: {
                code: ResetHeaderDemoRaw,
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof ResetHeaderDemo>;

export const ResetHeader: Story = {};
