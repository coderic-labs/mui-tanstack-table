import type { StoryObj } from '@storybook/react';
import { FooterDemo } from '../../../demoComponents/footer';
import FooterDemoRaw from '../../../demoComponents/footer?raw';

const meta = {
	title: 'Demo/Footer',
	component: FooterDemo,
	parameters: {
		layout: 'fullscreen',
		docs: {
			source: {
				code: FooterDemoRaw,
			}
		}
	}
};

export default meta;

type Story = StoryObj<typeof FooterDemo>;

export const Demo: Story = {};
