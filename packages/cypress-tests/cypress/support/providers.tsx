import { ScopedCssBaseline, ThemeProvider, createMuiTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ReactNode } from 'react';

const createTheme = (mode: 'light' | 'dark') => createMuiTheme({
    palette: {
        mode,
        primary: { main: '#1976D2' },
        secondary: { main: '#7B3FE4' },
    },
});

export const Providers = ({ children, mode = 'light' }: { children: ReactNode; mode?: 'light' | 'dark' }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={createTheme(mode)}>
            <ScopedCssBaseline>
                {children}
            </ScopedCssBaseline>
        </ThemeProvider>
    </LocalizationProvider>
);
