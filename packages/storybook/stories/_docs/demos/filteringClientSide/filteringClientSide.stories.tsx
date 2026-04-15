import type { StoryObj } from '@storybook/react';
import { FilteringClientSideDemo } from '../../../demoComponents/filteringClientSide';
import FilteringClientSideDemoRaw from '../../../demoComponents/filteringClientSide?raw';

const meta = {
	title: 'Demo/Filtering Client Side',
	component: FilteringClientSideDemo,
	parameters: {
		layout: 'fullscreen',
		docs: {
			codePanel: true,
			source: {
				code: FilteringClientSideDemoRaw,
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof FilteringClientSideDemo>;

export const FilteringClientSide: Story = {};
