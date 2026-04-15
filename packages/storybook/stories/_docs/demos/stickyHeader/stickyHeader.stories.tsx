import type { StoryObj } from '@storybook/react';
import { StickyHeaderDemo } from '../../../demoComponents/stickyHeader';
import StickyHeaderDemoRaw from '../../../demoComponents/stickyHeader?raw';

const meta = {
	title: 'Demo/Sticky Header',
	component: StickyHeaderDemo,
	parameters: {
		layout: 'fullscreen',
		docs: {
			codePanel: true,
			source: {
				code: StickyHeaderDemoRaw,
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof StickyHeaderDemo>;

export const StickyHeader: Story = {};
