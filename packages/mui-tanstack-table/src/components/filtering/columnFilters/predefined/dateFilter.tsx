import { Stack } from '@mui/material';
import { DatePicker, DatePickerProps, PickerValidDate } from '@mui/x-date-pickers';
import { HeaderContext } from '@tanstack/react-table';
import { useCallback } from 'react';
import { dataTests, getDataTestAttrs } from '../../../../dataTests';
import { DateRangeFilterProps, DateRangeFilterValue } from '../../types';

export function DateFilter<TData, TDate extends PickerValidDate>(props: HeaderContext<TData, unknown> & { datePickerProps: DatePickerProps<TDate> }) {
	const { datePickerProps, ...headerContext } = props;
	const { column } = headerContext;
	const { setFilterValue, getFilterValue } = column;

	const value = getFilterValue() as PickerValidDate;

	return (
		<DatePicker
			{...getDataTestAttrs(dataTests.filters.date)}
			value={value}
			slotProps={{ textField: { variant: 'standard' } }}
			onChange={setFilterValue}
			{...datePickerProps}
		/>
	);
}

export function DateRangeFilter<TData, TDate extends PickerValidDate>(props: HeaderContext<TData, unknown> & DateRangeFilterProps<TDate>) {
	const { fromProps, toProps, ...headerContext } = props;
	const { column } = headerContext;

	const { from, to }: DateRangeFilterValue<TDate> = column.getFilterValue() ?? {};

	const handleChange = useCallback((newValue: TDate | null, which: 'from' | 'to') =>
		column.setFilterValue((prev: DateRangeFilterValue<TDate> = {}) => ({ ...prev, [which]: newValue })),
		[column]);

	return (
		<Stack direction='row' gap={1}>
			<DatePicker
				{...getDataTestAttrs(dataTests.filters.dateRangeFrom)}
				sx={{ minWidth: 150 }}
				value={from}
				slotProps={{ textField: { size: 'small', variant: 'standard' }, openPickerButton: { size: 'small', sx: { margin: -1 } } }}
				onChange={(value) => handleChange(value, 'from')}
				{...fromProps}
			/>
			<DatePicker
				{...getDataTestAttrs(dataTests.filters.dateRangeTo)}
				sx={{ minWidth: 150 }}
				value={to}
				slotProps={{ textField: { size: 'small', variant: 'standard' }, openPickerButton: { size: 'small', sx: { margin: -1 } } }}
				onChange={(value) => handleChange(value, 'to')}
				{...toProps}
			/>
		</Stack>
	);
}
