
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Preview } from "@storybook/react";
import { themes } from 'storybook/internal/theming';
import { themeDark } from './themes/dark';
import { themeLight } from './themes/light';

const preview: Preview = {
    globalTypes: {
        themeToggle: {
            name: 'Theme',
            description: 'Switch theme',
            defaultValue: 'dark',
            toolbar: {
                icon: 'mirror',
                items: [
                    { value: 'light', title: 'light' },
                    { value: 'dark', title: 'dark' },
                ],
                showName: true,
            },
        },
    },
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
                        'Features', ['Columns Definition', 'Filtering', 'Sorting', 'Paging', 'Sticky Header', 'Footer', 'Row Detail', 'Row Actions', 'Confirm Modal', 'Row Selection', 'Row Highlighting', 'Custom Cell Renders', 'Column Visibility', 'Reset Header', 'Column Pinning', 'Columns Order', 'Localization'],
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
        (Story, context) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={context.globals.themeToggle === 'light' ? themeLight : themeDark}>
                    <CssBaseline />
                    <Story />
                </ThemeProvider>
            </LocalizationProvider>
        ),
    ]
};


export default preview;
