
import { createMuiTheme, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Preview } from "@storybook/react";

const theme = createMuiTheme({
	palette: {
		primary: { main: '#1976D2' },
		secondary: { main: '#7B3FE4' },
	}
})

const preview: Preview = {
	parameters: {
		viewMode: 'docs',
		options: {
			storySort: {
				order: [
					'Home',
					'About',
					'Roadmap',
					'Changelog',
					'Getting Started',
				],
			},
		},
	},
	decorators: [
		(Story) => (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<ThemeProvider theme={theme}>
					<Story />
				</ThemeProvider>
			</LocalizationProvider>
		),
	]
};


export default preview;
