import { Table, TableBody, TableCell, TableFooter, TableHead, TableProps, TableRow } from '@mui/material';
import { flexRender, Row, Table as TanstackTable } from '@tanstack/react-table';
import React, { Fragment } from 'react';
import { ReactTableDetailRow, ReactTableEmptyRow, ReactTableRow } from './reactTableRow';
import { getPinnedColumnStyle, getStickyHeaderStyle } from './styleUtils';

export type RowDetailComponent<T> = (props: { row: Row<T> }) => React.ReactElement

export type ReactTableProps<T> = TableProps & {
	table: TanstackTable<T>;
	rowDetail?: RowDetailComponent<T>;
	highlightRow?: string;
};

export function ReactTable<T>(props: ReactTableProps<T>) {
	const { table, rowDetail, highlightRow, ...tableProps } = props;
	const showFooter = table.getAllColumns().some(c => c.getIsVisible() && c.columnDef.footer);

	return (
		<Table {...tableProps} sx={{ borderCollapse: 'separate', ...tableProps.sx }}>
			<TableHead>
				{table.getHeaderGroups().map(headerGroup => (
					<TableRow key={headerGroup.id}>
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
					</TableRow>
				))}
			</TableHead>
			<TableBody>
				{table.getRowModel().rows.map(row =>
					<Fragment key={row.id}>
						<ReactTableRow row={row} highlight={highlightRow === row.id} />
						{row.getIsExpanded() && rowDetail && <ReactTableDetailRow row={row} rowDetail={rowDetail} />}
					</Fragment>
				)}
				{!table.getRowModel().rows.length &&
					<ReactTableEmptyRow table={table} />}
			</TableBody>
			{showFooter &&
				<TableFooter>
					{table.getFooterGroups().map(footerGroup => (
						<TableRow key={footerGroup.id}>
							{footerGroup.headers.map(header =>
								<TableCell
									key={header.id}
									colSpan={header.colSpan}
									{...header.column.columnDef.tableCellProps}
									sx={getPinnedColumnStyle({ column: header.column })}>
									{flexRender(header.column.columnDef.footer, header.getContext())}
								</TableCell>
							)}
						</TableRow>
					))}
				</TableFooter>
			}
		</Table>
	);
}
