import type { StoryObj } from '@storybook/react';
import { SortingClientSideDemo } from '../../demoComponents/sortingClientSide';
import SortingClientSideDemoRaw from '../../demoComponents/sortingClientSide?raw';

const meta = {
    title: 'Demo/Sorting Client Side',
    component: SortingClientSideDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            codePanel: true,
            source: {
                code: SortingClientSideDemoRaw,
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof SortingClientSideDemo>;

export const SortingClientSide: Story = {};

