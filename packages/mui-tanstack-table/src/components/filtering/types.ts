import { DatePickerProps } from '@mui/x-date-pickers';

export type DateRangeFilterValue<DT> = {
	from?: DT,
	to?: DT
}

export type DateRangeFilterProps<DT> = {
	fromProps?: DatePickerProps<DT>;
	toProps?: DatePickerProps<DT>;
}