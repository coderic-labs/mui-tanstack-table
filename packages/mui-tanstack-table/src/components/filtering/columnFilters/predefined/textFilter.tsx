import { Search } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps, Zoom } from '@mui/material';
import { HeaderContext } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

export function TextFilter<T>(props: HeaderContext<T, string | number> & { textFieldProps?: TextFieldProps }) {
	const { textFieldProps, ...headerContext } = props;
	const { column } = headerContext;

	const value = column.getFilterValue() as string | number;
	const setValue = column.setFilterValue as (value: string | number) => void;

	const [localValue, setLocalValue] = useState(value);
	const [focused, setFocused] = useState(false);
	const [ref, setRef] = useState<HTMLInputElement>();

	useEffect(() => {
		setLocalValue(value);
	}, [value, setLocalValue]);

	// blur field on enter key
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			console.log('blur on enter', e.currentTarget);
			ref?.blur();
		}
	};

	const adornmentApplyFilter = useMemo(() =>
		<InputAdornment position="end">
			<Zoom in>
				<IconButton
					size="small"
					sx={{ marginRight: -1.5 }}
					onClick={ref?.blur}>
					<Search />
				</IconButton>
			</Zoom>
		</InputAdornment>,
	[ref]
	);

	return (
		<TextField
			size="small"
			inputRef={setRef}
			value={localValue ?? ''}
			variant='standard'
			onChange={e => setLocalValue(e.target.value)}
			onFocus={() => setFocused(true)}
			onBlur={() => { setValue(localValue); setFocused(false); }}
			slotProps={{ input: { endAdornment: focused ? adornmentApplyFilter : undefined } }}
			onKeyDown={handleKeyDown}
			sx={{ minWidth: 150 }}
			{...textFieldProps}
		/>
	);
}