import { TableRow as MuiTableRow, Stack, TableCell as MuiTableCell, Typography } from '@mui/material';
import { Cell, Row, Table } from '@tanstack/react-table';
import { useTableIntl } from '../../context/tableIntl';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { TableCell } from './tableCell';
import type { GetCellStyle, RowDetailComponent } from './types';

export type TableRowProps<T> = {
	row: Row<T>,
	getCellStyle?: GetCellStyle<T>;
}

export const TableRow = <T,>(props: TableRowProps<T>) => {
	const { row, getCellStyle } = props;
	return (
		<MuiTableRow {...getDataTestAttrs(dataTests.table.dataRow, row.id)}>
			{row.getVisibleCells().map((cell: Cell<T, unknown>) =>
				<TableCell
					key={cell.id}
					cell={cell}
					row={row}
					getCellStyle={getCellStyle}
				/>
			)}
		</MuiTableRow>
	);
};

export type TableDetailRowProps<T> = {
	row: Row<T>,
	rowDetail: RowDetailComponent<T>;
}

export const TableDetailRow = <T,>(props: TableDetailRowProps<T>) => {
	const { row, rowDetail } = props;
	return (
		<MuiTableRow {...getDataTestAttrs(dataTests.table.detailRow, row.id)}>
			<MuiTableCell colSpan={row.getVisibleCells().length}>
				{rowDetail({ row })}
			</MuiTableCell>
		</MuiTableRow>
	);
};

export type TableEmptyRowProps<T> = {
	table: Table<T>,
}

export const TableEmptyRow = <T,>(props: TableEmptyRowProps<T>) => {
	const { table } = props;
	const { formatMessage } = useTableIntl();

	return (
		<MuiTableRow {...getDataTestAttrs(dataTests.table.emptyRow)}>
			<MuiTableCell colSpan={table.getVisibleLeafColumns().length}>
				<Stack width={'100%'} height={'100px'} alignItems={'center'} justifyContent={'center'} padding={2} {...getDataTestAttrs(dataTests.table.emptyState)}>
					<Typography variant='body2' fontStyle='italic'>
						{formatMessage({ id: 'components.reactTable.noResults' })}
					</Typography>
				</Stack>
			</MuiTableCell>
		</MuiTableRow>
	);
};

