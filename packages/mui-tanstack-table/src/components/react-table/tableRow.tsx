import { TableRow as MuiTableRow, Stack, TableCell as MuiTableCell, Typography } from '@mui/material';
import { Cell, flexRender, Row, Table } from '@tanstack/react-table';
import { useTableIntl } from '../../context/tableIntl';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { getPinnedColumnStyle } from './styleUtils';
import type { GetCellStyle, GetRowStyle, RowDetailComponent } from './types';

type TableCellProps<T> = {
	cell: Cell<T, unknown>;
	row: Row<T>;
	getRowStyle?: GetRowStyle<T>;
	getCellStyle?: GetCellStyle<T>;
}

const TableCell = <T,>(props: TableCellProps<T>) => {
	const { cell, row, getRowStyle, getCellStyle } = props;
	const baseStyle = getPinnedColumnStyle({ column: cell.column, even: row.index % 2 === 0 });
	const rowStyle = getRowStyle?.(row);
	const tableCellStyle = getCellStyle?.(cell);

	return (
		<MuiTableCell
			{...getDataTestAttrs(dataTests.table.dataCell, `${row.id}.${cell.column.id}`)}
			sx={[baseStyle, rowStyle ?? {}, tableCellStyle ?? {}]}>
			{flexRender(cell.column.columnDef.cell, cell.getContext())}
		</MuiTableCell>
	);
};

export type TableRowProps<T> = {
	row: Row<T>,
	getRowStyle?: GetRowStyle<T>;
	getCellStyle?: GetCellStyle<T>;
}

export const TableRow = <T,>(props: TableRowProps<T>) => {
	const { row, getRowStyle, getCellStyle } = props;
	return (
		<MuiTableRow {...getDataTestAttrs(dataTests.table.dataRow, row.id)}>
			{row.getVisibleCells().map((cell: Cell<T, unknown>) =>
				<TableCell
					key={cell.id}
					cell={cell}
					row={row}
					getRowStyle={getRowStyle}
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

