
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Preview } from "@storybook/react";

const preview: Preview = {
	decorators: [
		(Story) => (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Story />
			</LocalizationProvider>
		),
	]
};

export default preview;
