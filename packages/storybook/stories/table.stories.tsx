import { Table } from '@coderic-labs/mui-tanstack-table';
import type { Meta, StoryFn } from '@storybook/react';
import { ServerSideTableDemo } from './demoComponents/table/serverSide';
import { ClientSideTableDemo } from './demoComponents/table/clientSide';

const meta = {
	title: 'Table',
	component: Table,
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta<typeof Table>;

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
