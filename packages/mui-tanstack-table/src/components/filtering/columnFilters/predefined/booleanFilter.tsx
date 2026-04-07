import { Checkbox, FormControlLabel } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

export type BooleanFilterProps = {
	labels?: {
		undetermined: string;
		checked: string;
		unchecked: string;
	}
};

export function BooleanFilter<T>(props: HeaderContext<T, boolean> & BooleanFilterProps) {
	const { labels, ...headerContext } = props;
	const { column } = headerContext;
	const { setFilterValue, getFilterValue } = column;

	const filterValue = getFilterValue() as boolean | undefined;

	const handleChange = useCallback(() => setFilterValue((prev: boolean) => {
		if (prev === undefined) return true;
		if (prev === true) return false;
		return undefined;
	}), [setFilterValue]);

	const label = useMemo(() => {
		if (filterValue === undefined) return labels?.undetermined;
		if (filterValue) return labels?.checked;
		return labels?.unchecked;
	}, [filterValue, labels]);

	return (
		<FormControlLabel
			label={label}
			sx={{ height: 32.25, marginRight: 0 }}
			control={
				<Checkbox
					checked={filterValue ?? false}
					indeterminate={getFilterValue() === undefined}
					onChange={handleChange}
				/>
			}
		/>
	);
}
