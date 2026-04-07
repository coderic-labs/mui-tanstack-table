import { DatePickerProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

export type DateRangeFilterValue = {
	from?: string,
	to?: string
}

export type DateRangeFilterProps = {
	fromProps?: DatePickerProps<Dayjs>;
	toProps?: DatePickerProps<Dayjs>;
}