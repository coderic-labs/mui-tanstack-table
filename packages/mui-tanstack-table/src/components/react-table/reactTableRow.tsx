import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import { flexRender, Row, Table } from '@tanstack/react-table';
import { useTableIntl } from '../../context/tableIntl';
import { RowDetailComponent } from './reactTable';
import { getPinnedColumnStyle } from './styleUtils';

export type ReactTableRowProps<T> = {
	row: Row<T>,
	highlight: boolean
}

export const ReactTableRow = <T, >(props: ReactTableRowProps<T>) => {
	const { row, highlight } = props;
	return (
		<TableRow>
			{row.getVisibleCells().map(cell =>
				<TableCell
					key={cell.id}
					{...cell.column.columnDef.tableCellProps}
					sx={getPinnedColumnStyle({ column: cell.column, highlight, even: row.index % 2 === 0 })}>
					{flexRender(
						cell.column.columnDef.cell,
						cell.getContext()
					)}
				</TableCell>
			)}
		</TableRow>
	);
};

export type ReactTableDetailRowProps<T> = {
	row: Row<T>,
	rowDetail: RowDetailComponent<T>;
}

export const ReactTableDetailRow = <T, >(props: ReactTableDetailRowProps<T>) => {
	const { row, rowDetail } = props;
	return (
		<TableRow>
			<TableCell colSpan={row.getVisibleCells().length}>
				{rowDetail({ row })}
			</TableCell>
		</TableRow>
	);
};

export type ReactTableEmptyRowProps<T> = {
	table: Table<T>,
}

export const ReactTableEmptyRow = <T, >(props: ReactTableEmptyRowProps<T>) => {
	const { table } = props;
	const { formatMessage } = useTableIntl();
	
	return (
		<TableRow>
			<TableCell colSpan={table.getVisibleLeafColumns().length}>
				<Stack width={'100%'} height={'100px'} alignItems={'center'} justifyContent={'center'} padding={2}>
					<Typography variant='body2' fontStyle='italic'>
						{formatMessage({ id: 'components.reactTable.noResults' })}
					</Typography>
				</Stack>
			</TableCell>
		</TableRow>
	);
};

