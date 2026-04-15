import type { StoryObj } from '@storybook/react';
import { CustomCellRendersDemo } from '../../../demoComponents/customCellRenders';
import CustomCellRendersDemoRaw from '../../../demoComponents/customCellRenders?raw';

const meta = {
    title: 'Demo/Custom Cell Renders',
    component: CustomCellRendersDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            codePanel: true,
            source: {
                code: CustomCellRendersDemoRaw,
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof CustomCellRendersDemo>;

export const CustomCellRenders: Story = {};
