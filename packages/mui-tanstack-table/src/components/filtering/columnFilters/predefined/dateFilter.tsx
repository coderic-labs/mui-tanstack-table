import { Stack } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback } from 'react';
import { DateRangeFilterProps, DateRangeFilterValue } from '../../types';
import { HeaderContext } from '@tanstack/react-table';
import { dayJsToISOString } from '../../../../utils/dayJsToISOString';

export function DateFilter<T>(props: HeaderContext<T, string | Date> & { datePickerProps: DatePickerProps<Dayjs> }) {
	const { datePickerProps, ...headerContext } = props;
	const { column } = headerContext;
	const { setFilterValue, getFilterValue } = column;

	const value = getFilterValue() as string;
	const valueDayjs = value ? dayjs(value) : undefined;

	return (
		<DatePicker
			value={valueDayjs}
			slotProps={{ textField: { variant: 'standard' } }}
			onChange={(value: Dayjs | undefined | null) => setFilterValue(value?.toISOString())}
			{...datePickerProps}
		/>
	);
}

export function DateRangeFilter<T>(props: HeaderContext<T, string | Date> & DateRangeFilterProps) {
	const { fromProps, toProps, ...headerContext } = props;
	const { column } = headerContext;

	const { from, to }: DateRangeFilterValue = column.getFilterValue() ?? {};
	const valueFrom = from ? dayjs(from) : null;
	const valueTo = to ? dayjs(to) : null;

	const handleChange = useCallback((newValue: Dayjs | null, which: 'from' | 'to') =>
		column.setFilterValue((prev: DateRangeFilterValue = {}) => ({ ...prev, [which]: dayJsToISOString(newValue) })),
	[column]);

	return (
		<Stack direction='row' gap={1}>
			<DatePicker
				sx={{ minWidth: 150 }}
				value={valueFrom}
				slotProps={{ textField: { size: 'small', variant: 'standard' }, openPickerButton: { size: 'small', sx: { margin: -1 } } }}
				onChange={(value) => handleChange(value, 'from')}
				{...fromProps}
			/>
			<DatePicker
				sx={{ minWidth: 150 }}
				value={valueTo}
				slotProps={{ textField: { size: 'small', variant: 'standard' }, openPickerButton: { size: 'small', sx: { margin: -1 } } }}
				onChange={(value) => handleChange(value, 'to')}
				{...toProps}
			/>
		</Stack>
	);
}
