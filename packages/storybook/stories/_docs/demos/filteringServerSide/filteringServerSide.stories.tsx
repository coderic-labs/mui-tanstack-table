import type { StoryObj } from '@storybook/react';
import { FilteringServerSideDemo } from '../../../demoComponents/filteringServerSide';
import FilteringServerSideDemoRaw from '../../../demoComponents/filteringServerSide?raw';

const meta = {
	title: 'Demo/Filtering Server Side',
	component: FilteringServerSideDemo,
	parameters: {
		layout: 'fullscreen',
		docs: {
			source: {
				code: FilteringServerSideDemoRaw,
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof FilteringServerSideDemo>;

export const Demo: Story = {};
