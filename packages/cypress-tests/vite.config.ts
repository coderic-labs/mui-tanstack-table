import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@demo-components": resolve(__dirname, "../storybook/stories/demoComponents/table"),
			"@coderic-labs/mui-tanstack-table": resolve(__dirname, "../mui-tanstack-table/src"),
		},
	},
});
