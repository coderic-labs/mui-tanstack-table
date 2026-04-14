import { Stack, TableCell, TableRow as MuiTableRow, Typography } from '@mui/material';
import { flexRender, Row, Table } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { useTableIntl } from '../../context/tableIntl';
import { RowDetailComponent } from './table';
import { getPinnedColumnStyle } from './styleUtils';

export type TableRowProps<T> = {
	row: Row<T>,
	highlight: boolean
}

export const TableRow = <T, >(props: TableRowProps<T>) => {
	const { row, highlight } = props;
	return (
		<MuiTableRow {...getDataTestAttrs(dataTests.table.dataRow, row.index + 1)}>
			{row.getVisibleCells().map((cell) =>
				<TableCell
					key={cell.id}
					{...getDataTestAttrs(dataTests.table.dataCell, `${row.index + 1}.${cell.column.id}`)}
					{...cell.column.columnDef.tableCellProps}
					sx={getPinnedColumnStyle({ column: cell.column, highlight, even: row.index % 2 === 0 })}>
					{flexRender(
						cell.column.columnDef.cell,
						cell.getContext()
					)}
				</TableCell>
			)}
		</MuiTableRow>
	);
};

export type TableDetailRowProps<T> = {
	row: Row<T>,
	rowDetail: RowDetailComponent<T>;
}

export const TableDetailRow = <T, >(props: TableDetailRowProps<T>) => {
	const { row, rowDetail } = props;
	return (
		<MuiTableRow {...getDataTestAttrs(dataTests.table.detailRow, row.index + 1)}>
			<TableCell colSpan={row.getVisibleCells().length}>
				{rowDetail({ row })}
			</TableCell>
		</MuiTableRow>
	);
};

export type TableEmptyRowProps<T> = {
	table: Table<T>,
}

export const TableEmptyRow = <T, >(props: TableEmptyRowProps<T>) => {
	const { table } = props;
	const { formatMessage } = useTableIntl();
	
	return (
		<MuiTableRow {...getDataTestAttrs(dataTests.table.emptyRow)}>
			<TableCell colSpan={table.getVisibleLeafColumns().length}>
				<Stack width={'100%'} height={'100px'} alignItems={'center'} justifyContent={'center'} padding={2} {...getDataTestAttrs(dataTests.table.emptyState)}>
					<Typography variant='body2' fontStyle='italic'>
						{formatMessage({ id: 'components.reactTable.noResults' })}
					</Typography>
				</Stack>
			</TableCell>
		</MuiTableRow>
	);
};

