import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-docs",
		'@storybook/addon-controls'
	],
	framework: {
		name: "@storybook/react-vite",
		options: {}
	},
	docs: {
		autodocs: "tag",
	},
	async viteFinal(config) {
		const { mergeConfig } = await import('vite');
		return mergeConfig(config, {
			resolve: {
				alias: {
					"@coderic-labs/mui-tanstack-table": resolve(__dirname, "../../mui-tanstack-table/src"),
				}
			},
			build: {
				rollupOptions: {
					onwarn(warning: any, warn: any) {
						if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
						warn(warning);
					}
				}
			}
		});
	}
};

export default config;
