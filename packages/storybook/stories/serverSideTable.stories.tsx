import type { StoryObj } from '@storybook/react';
import { ServerSideTableDemo } from './demoComponents/table/serverSide';
import ServerSideTableDemoRaw from './demoComponents/table/serverSide?raw';

const meta = {
	title: 'Demo/Server Side Table',
	component: ServerSideTableDemo,
	parameters: {
		layout: 'fullscreen',
		docs: {
			source: {
				code: ServerSideTableDemoRaw,
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof ServerSideTableDemo>;

export const Demo: Story = {
	args: {
		enableMultiSort: true,
		maxMultiSortColCount: 3,
		size: 'medium',
		padding: 'normal',
		stickyHeader: true,
	},
};
