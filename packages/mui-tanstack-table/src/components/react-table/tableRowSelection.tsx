import { Checkbox } from '@mui/material';
import { CellContext, HeaderContext } from '@tanstack/react-table';

export function TableRowSelectionHeader<T>({ table }: HeaderContext<T, unknown>) {
	return (
		<Checkbox
			sx={{ padding: 1, margin: -1 }}
			checked={table.getIsAllPageRowsSelected()}
			indeterminate={table.getIsSomePageRowsSelected()}
			onChange={table.getToggleAllPageRowsSelectedHandler()}
		/>
	);
}

export function TableRowSelectionCell<T>({ row }: CellContext<T, unknown>) {
	return (
		<Checkbox
			sx={{ padding: 1, margin: -1 }}
			checked={row.getIsSelected()}
			indeterminate={row.getIsSomeSelected()}
			onChange={row.getToggleSelectedHandler()}
		/>
	);
}