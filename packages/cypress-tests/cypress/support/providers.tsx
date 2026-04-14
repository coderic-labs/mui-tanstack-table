import { ScopedCssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createMuiTheme } from '@mui/material';
import { ReactNode } from 'react';

const theme = createMuiTheme({
	palette: {
		mode: 'light',
		primary: { main: '#1976D2' },
		secondary: { main: '#7B3FE4' },
	},
});

export const Providers = ({ children }: { children: ReactNode }) => (
	<LocalizationProvider dateAdapter={AdapterDayjs}>
		<ThemeProvider theme={theme}>
			<ScopedCssBaseline>
				{children}
			</ScopedCssBaseline>
		</ThemeProvider>
	</LocalizationProvider>
);
