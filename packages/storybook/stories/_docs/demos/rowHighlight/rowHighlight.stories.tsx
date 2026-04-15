import type { StoryObj } from '@storybook/react';
import { RowHighlightDemo } from '../../../demoComponents/rowHighlight';
import RowHighlightDemoRaw from '../../../demoComponents/rowHighlight?raw';

const meta = {
	title: 'Demo/Row Highlight',
	component: RowHighlightDemo,
	parameters: {
		layout: 'fullscreen',
		docs: {
			codePanel: true,
			source: {
				code: RowHighlightDemoRaw,
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof RowHighlightDemo>;

export const RowHighlight: Story = {};
