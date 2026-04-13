
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Preview } from "@storybook/react";

const preview: Preview = {
	parameters: {
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
				<Story />
			</LocalizationProvider>
		),
	]
};

export default preview;
