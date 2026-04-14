import { Checkbox } from '@mui/material';
import { CellContext, HeaderContext } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';

export function TableRowSelectionHeader<T>({ table }: HeaderContext<T, unknown>) {
	return (
		<Checkbox
			{...getDataTestAttrs(dataTests.rowSelection.headerCheckbox)}
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
			{...getDataTestAttrs(dataTests.rowSelection.rowCheckbox)}
			sx={{ padding: 1, margin: -1 }}
			checked={row.getIsSelected()}
			indeterminate={row.getIsSomeSelected()}
			onChange={row.getToggleSelectedHandler()}
		/>
	);
}