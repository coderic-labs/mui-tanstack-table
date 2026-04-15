import type { StoryObj } from '@storybook/react';
import { RowSelectionDemo } from '../../../demoComponents/rowSelection';
import RowSelectionDemoRaw from '../../../demoComponents/rowSelection?raw';

const meta = {
	title: 'Demo/Row Selection',
	component: RowSelectionDemo,
	parameters: {
		layout: 'fullscreen',
		docs: {
			source: {
				code: RowSelectionDemoRaw,
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof RowSelectionDemo>;

export const Demo: Story = {};
