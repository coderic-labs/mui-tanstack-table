import { Table as MuiTable, TableBody, TableCell, TableFooter, TableHead, TableProps as MuiTableProps, TableRow as MuiTableRow } from '@mui/material';
import { flexRender, Row, Table as TanstackTable } from '@tanstack/react-table';
import React, { Fragment } from 'react';
import { TableDetailRow, TableEmptyRow, TableRow } from './tableRow';
import { getPinnedColumnStyle, getStickyHeaderStyle } from './styleUtils';

export type RowDetailComponent<T> = (props: { row: Row<T> }) => React.ReactElement

export type TableProps<T> = MuiTableProps & {
	table: TanstackTable<T>;
	rowDetail?: RowDetailComponent<T>;
	highlightRow?: string;
};

export function Table<T>(props: TableProps<T>) {
	const { table, rowDetail, highlightRow, ...tableProps } = props;
	const showFooter = table.getAllColumns().some(c => c.getIsVisible() && c.columnDef.footer);

	return (
		<MuiTable {...tableProps} sx={{ borderCollapse: 'separate', ...tableProps.sx }}>
			<TableHead>
				{table.getHeaderGroups().map(headerGroup => (
					<MuiTableRow key={headerGroup.id}>
						{headerGroup.headers.map(header =>
							<TableCell
								key={header.id}
								colSpan={header.colSpan}
								{...header.column.columnDef.tableCellProps}
								sx={{
									...getPinnedColumnStyle({ column: header.column, isHeading: true }),
									...getStickyHeaderStyle(tableProps.stickyHeader)
								}}>
								{!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
							</TableCell>
						)}
					</MuiTableRow>
				))}
			</TableHead>
			<TableBody>
				{table.getRowModel().rows.map(row =>
					<Fragment key={row.id}>
						<TableRow row={row} highlight={highlightRow === row.id} />
						{row.getIsExpanded() && rowDetail && <TableDetailRow row={row} rowDetail={rowDetail} />}
					</Fragment>
				)}
				{!table.getRowModel().rows.length &&
					<TableEmptyRow table={table} />}
			</TableBody>
			{showFooter &&
				<TableFooter>
					{table.getFooterGroups().map(footerGroup => (
						<MuiTableRow key={footerGroup.id}>
							{footerGroup.headers.map(header =>
								<TableCell
									key={header.id}
									colSpan={header.colSpan}
									{...header.column.columnDef.tableCellProps}
									sx={getPinnedColumnStyle({ column: header.column })}>
									{flexRender(header.column.columnDef.footer, header.getContext())}
								</TableCell>
							)}
						</MuiTableRow>
					))}
				</TableFooter>
			}
		</MuiTable>
	);
}
