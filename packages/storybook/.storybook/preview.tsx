
import { createMuiTheme, ScopedCssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Preview } from "@storybook/react";
import { themes } from 'storybook/internal/theming';

const theme = createMuiTheme({
	palette: {
		mode: 'light',
		primary: { main: '#1976D2' },
		secondary: { main: '#7B3FE4' },
	}
})

const preview: Preview = {
	parameters: {
		viewMode: 'docs',
		docs: { theme: themes.dark },
		options: {
			storySort: {
				order: [
					'Home',
					'About',
					'Roadmap',
					'Changelog',
					'Getting Started',
					'Apis', [
						'Features', ['Columns Definition', 'Filtering', 'Sorting', 'Paging', 'Sticky Header', 'Footer', 'Row Detail', 'Row Selection', 'Row Highlighting', 'Custom Cell Renders', 'Column Pinning'],
						'Components', [
							'Table',
							'TableLocalizationProvider',
							'TableToolbar',
							'TableToolbarActions',
							'TableToolbarInfo',
							'TableResultsLabel',
							'TableResetHeader',
							'TableBulkActionButton',
							'TableHeader',
							'TableHeaderV2',
							'TableFilterOverview',
							'predefinedColumnFilters',
							'TablePagination',
							'TablePaginationV2',
							'TableExpandRowButton',
							'TableRowExpansionHeader',
							'TableRowExpansionCell',
							'TableRowSelectionHeader',
							'TableRowSelectionCell',
							'TableBooleanCell',
							'TableColumnVisibilityToggle',
							'InfoTooltip',
						],
					],
				],
			},
		},
	},
	decorators: [
		(Story) => (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<ThemeProvider theme={theme}>
					<ScopedCssBaseline>
						<Story />
					</ScopedCssBaseline>
				</ThemeProvider>
			</LocalizationProvider>
		),
	]
};


export default preview;
