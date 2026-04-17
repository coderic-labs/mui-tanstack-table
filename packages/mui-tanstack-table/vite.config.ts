import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [react(), dts()],
    build: {
        minify: false,
        lib: {
            entry: 'src/index.ts',
            fileName: 'index',
            formats: ['es']
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'react/jsx-dev-runtime',
                '@mui/material',
                '@mui/icons-material',
                '@mui/x-date-pickers',
                '@tanstack/react-table',
                '@emotion/react',
                '@emotion/styled',
                'react-intl'
            ]
        }
    }
});
