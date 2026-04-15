import type { StoryObj } from '@storybook/react';
import { ConfirmModalDemo } from '../../demoComponents/confirmModal';
import ConfirmModalDemoRaw from '../../demoComponents/confirmModal?raw';

const meta = {
    title: 'Demo/Confirm Modal',
    component: ConfirmModalDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            codePanel: true,
            source: {
                code: ConfirmModalDemoRaw,
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof ConfirmModalDemo>;

export const ConfirmModal: Story = {};

