import type { StoryObj } from '@storybook/react';
import ServerSideTableDemoRaw from '../../../demoComponents/serverSide?raw';
import { ServerSideTableDemo } from '../../../demoComponents/serverSide';

const meta = {
	title: 'Demo/Server Side Table',
	component: ServerSideTableDemo,
	parameters: {
		layout: 'fullscreen',
		docs: {
			codePanel: true,
			source: {
				code: ServerSideTableDemoRaw,
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof ServerSideTableDemo>;

export const ServerSideTable: Story = {
	args: {
		enableMultiSort: true,
		maxMultiSortColCount: 3,
		size: 'medium',
		padding: 'normal',
		stickyHeader: true,
	},
};
