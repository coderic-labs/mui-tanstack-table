import { DatePickerProps, PickerValidDate } from '@mui/x-date-pickers';

export type DateRangeFilterValue<TDate extends PickerValidDate> = {
	from?: TDate,
	to?: TDate
}

export type DateRangeFilterProps<TDate extends PickerValidDate> = {
	fromProps?: DatePickerProps<TDate>;
	toProps?: DatePickerProps<TDate>;
}