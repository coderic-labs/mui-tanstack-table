import type { StoryObj } from '@storybook/react';
import { PagingClientSideDemo } from '../../demoComponents/pagingClientSide';
import PagingClientSideDemoRaw from '../../demoComponents/pagingClientSide?raw';

const meta = {
    title: 'Demo/Paging Client Side',
    component: PagingClientSideDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            codePanel: true,
            source: {
                code: PagingClientSideDemoRaw,
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof PagingClientSideDemo>;

export const PagingClientSide: Story = {};

