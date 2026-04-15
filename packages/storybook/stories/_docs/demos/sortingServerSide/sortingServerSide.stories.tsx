import type { StoryObj } from '@storybook/react';
import { SortingServerSideDemo } from '../../../demoComponents/sortingServerSide';
import SortingServerSideDemoRaw from '../../../demoComponents/sortingServerSide?raw';

const meta = {
	title: 'Demo/Sorting Server Side',
	component: SortingServerSideDemo,
	parameters: {
		layout: 'fullscreen',
		docs: {
			source: {
				code: SortingServerSideDemoRaw,
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof SortingServerSideDemo>;

export const Demo: Story = {};
