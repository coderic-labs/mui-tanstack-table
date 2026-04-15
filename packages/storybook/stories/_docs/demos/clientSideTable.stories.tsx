import type { StoryObj } from '@storybook/react';
import { ClientSideTableDemo } from '../../demoComponents/clientSide';
import ClientSideTableDemoRaw from '../../demoComponents/clientSide?raw';

const meta = {
    title: 'Demo/Client Side Table',
    component: ClientSideTableDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            codePanel: true,
            source: {
                code: ClientSideTableDemoRaw,
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof ClientSideTableDemo>;

export const ClientSideTable: Story = {
    args: {
        enableMultiSort: true,
        maxMultiSortColCount: 3,
        size: 'medium',
        padding: 'normal',
        stickyHeader: true,
    },
};

