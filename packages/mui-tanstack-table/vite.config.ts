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
				'react', 'react-dom',
				'@mui/material', 'emotion/react', '@emotion/styled',
				'@material-table/core', '@mui/x-date-pickers'
			]
		}
	}
});
