import { KeyboardArrowDown, KeyboardArrowUp, KeyboardArrowRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { CellContext, HeaderContext } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';

export function TableRowExpansionCell<T>({ row }: CellContext<T, unknown>) {
	if (!row.getCanExpand())
		return null;

	return (
		<IconButton
			{...getDataTestAttrs(dataTests.rowExpansion.rowToggleButton)}
			size='small'
			onClick={row.getToggleExpandedHandler()}>
			{row.getIsExpanded() ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
		</IconButton>
	);
}

export function TableRowExpansionHeader<T>({ table }: HeaderContext<T, unknown>) {
	return (
		<IconButton
			{...getDataTestAttrs(dataTests.rowExpansion.resetButton)}
			size='small'
			disabled={!table.getIsSomeRowsExpanded()}
			onClick={() => table.resetExpanded(false)}>
			<KeyboardArrowUp />
		</IconButton>
	);
}

export const TableExpandRowButton = TableRowExpansionCell;
