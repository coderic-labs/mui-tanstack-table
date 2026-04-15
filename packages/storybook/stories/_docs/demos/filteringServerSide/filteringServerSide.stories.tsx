import type { StoryObj } from '@storybook/react';
import { FilteringServerSideDemo } from '../../../demoComponents/filteringServerSide';
import FilteringServerSideDemoRaw from '../../../demoComponents/filteringServerSide?raw';

const meta = {
    title: 'Demo/Filtering Server Side',
    component: FilteringServerSideDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            codePanel: true,
            source: {
                code: FilteringServerSideDemoRaw,
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof FilteringServerSideDemo>;

export const FilteringServerSide: Story = {};
