import type { StoryFn } from '@storybook/react';
import { ClientSideTableDemo } from './demoComponents/table/clientSide';
import { ServerSideTableDemo } from './demoComponents/table/serverSide';

const meta = {
	title: 'Demos',
	parameters: {
		layout: 'fullscreen'
	}
};

export default meta;

const TemplateServerSideTable: StoryFn<typeof ServerSideTableDemo> = (args) =>
	<ServerSideTableDemo {...args} />;

export const ServerSideTable = TemplateServerSideTable.bind({});
ServerSideTable.args = {
	enableMultiSort: true,
	maxMultiSortColCount: 3,
	size: 'medium',
	padding: 'normal',
	stickyHeader: true
};

const TemplateClientSideTable: StoryFn<typeof ClientSideTableDemo> = (args) =>
	<ClientSideTableDemo {...args} />;

export const ClientSideTable = TemplateClientSideTable.bind({});
ClientSideTable.args = {
	enableMultiSort: true,
	maxMultiSortColCount: 3,
	size: 'medium',
	padding: 'normal',
	stickyHeader: true
};
