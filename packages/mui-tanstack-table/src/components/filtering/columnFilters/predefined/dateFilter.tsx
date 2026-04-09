import { Stack } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { HeaderContext } from '@tanstack/react-table';
import { useCallback } from 'react';
import { DateRangeFilterProps, DateRangeFilterValue } from '../../types';

export function DateFilter<T, DT>(props: HeaderContext<T, DT> & { datePickerProps: DatePickerProps<DT> }) {
	const { datePickerProps, ...headerContext } = props;
	const { column } = headerContext;
	const { setFilterValue, getFilterValue } = column;

	const value = getFilterValue() as DT;

	return (
		<DatePicker
			value={value}
			slotProps={{ textField: { variant: 'standard' } }}
			onChange={setFilterValue}
			{...datePickerProps}
		/>
	);
}

export function DateRangeFilter<T, DT>(props: HeaderContext<T, DT> & DateRangeFilterProps<DT>) {
	const { fromProps, toProps, ...headerContext } = props;
	const { column } = headerContext;

	const { from, to }: DateRangeFilterValue<DT> = column.getFilterValue() ?? {};

	const handleChange = useCallback((newValue: DT | null, which: 'from' | 'to') =>
		column.setFilterValue((prev: DateRangeFilterValue<DT> = {}) => ({ ...prev, [which]: newValue })),
		[column]);

	return (
		<Stack direction='row' gap={1}>
			<DatePicker
				sx={{ minWidth: 150 }}
				value={from}
				slotProps={{ textField: { size: 'small', variant: 'standard' }, openPickerButton: { size: 'small', sx: { margin: -1 } } }}
				onChange={(value) => handleChange(value, 'from')}
				{...fromProps}
			/>
			<DatePicker
				sx={{ minWidth: 150 }}
				value={to}
				slotProps={{ textField: { size: 'small', variant: 'standard' }, openPickerButton: { size: 'small', sx: { margin: -1 } } }}
				onChange={(value) => handleChange(value, 'to')}
				{...toProps}
			/>
		</Stack>
	);
}
