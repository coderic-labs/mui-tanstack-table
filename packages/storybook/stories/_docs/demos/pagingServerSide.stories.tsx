import type { StoryObj } from '@storybook/react';
import { PagingServerSideDemo } from '../../demoComponents/pagingServerSide';
import PagingServerSideDemoRaw from '../../demoComponents/pagingServerSide?raw';

const meta = {
    title: 'Demo/Paging Server Side',
    component: PagingServerSideDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            codePanel: true,
            source: {
                code: PagingServerSideDemoRaw,
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof PagingServerSideDemo>;

export const PagingServerSide: Story = {};

