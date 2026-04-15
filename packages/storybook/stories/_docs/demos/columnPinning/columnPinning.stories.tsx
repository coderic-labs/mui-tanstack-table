import type { StoryObj } from '@storybook/react';
import { ColumnPinningDemo } from '../../../demoComponents/columnPinning';
import ColumnPinningDemoRaw from '../../../demoComponents/columnPinning?raw';

const meta = {
	title: 'Demo/Column Pinning',
	component: ColumnPinningDemo,
	parameters: {
		layout: 'fullscreen',
		docs: {
			source: {
				code: ColumnPinningDemoRaw,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof ColumnPinningDemo>;

export const Demo: Story = {};
