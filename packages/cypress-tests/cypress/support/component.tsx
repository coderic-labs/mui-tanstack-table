import { ScopedCssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { mount } from 'cypress/react';
import { createMuiTheme } from '@mui/material';
import './commands';

const theme = createMuiTheme({
	palette: {
		mode: 'light',
		primary: { main: '#1976D2' },
		secondary: { main: '#7B3FE4' },
	},
});

const mountWithProviders: typeof mount = (component, options) => {
	return mount(
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<ThemeProvider theme={theme}>
				<ScopedCssBaseline>
					{component}
				</ScopedCssBaseline>
			</ThemeProvider>
		</LocalizationProvider>,
		options
	);
};

Cypress.Commands.add('mount', mountWithProviders);

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
		}
	}
}
