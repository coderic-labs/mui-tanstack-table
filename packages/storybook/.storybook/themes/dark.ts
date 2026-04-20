import { createMuiTheme } from "@mui/material";

export const themeDark = createMuiTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#1976D2' },
        secondary: { main: '#7B3FE4' },
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                'html, body, #storybook-root, #root, .sb-show-main, .MuiPaper-root, .MuiTableContainer-root': {
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#444 #181818',
                },
                'html::-webkit-scrollbar, body::-webkit-scrollbar, #storybook-root::-webkit-scrollbar, #root::-webkit-scrollbar, .sb-show-main::-webkit-scrollbar, .MuiPaper-root::-webkit-scrollbar, .MuiTableContainer-root::-webkit-scrollbar': {
                    width: '8px',
                    background: '#181818',
                },
                'html::-webkit-scrollbar-thumb, body::-webkit-scrollbar-thumb, #storybook-root::-webkit-scrollbar-thumb, #root::-webkit-scrollbar-thumb, .sb-show-main::-webkit-scrollbar-thumb, .MuiPaper-root::-webkit-scrollbar-thumb, .MuiTableContainer-root::-webkit-scrollbar-thumb': {
                    background: '#444',
                    borderRadius: '8px',
                },
                'html::-webkit-scrollbar-thumb:hover, body::-webkit-scrollbar-thumb:hover, #storybook-root::-webkit-scrollbar-thumb:hover, #root::-webkit-scrollbar-thumb:hover, .sb-show-main::-webkit-scrollbar-thumb:hover, .MuiPaper-root::-webkit-scrollbar-thumb:hover, .MuiTableContainer-root::-webkit-scrollbar-thumb:hover': {
                    background: '#666',
                },
            },
        },
    },
});
