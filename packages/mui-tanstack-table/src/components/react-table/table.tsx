import { Table as MuiTable, TableBody, TableCell, TableFooter, TableHead, TableProps as MuiTableProps, TableRow as MuiTableRow } from '@mui/material';
import { flexRender, Row, Table as TanstackTable } from '@tanstack/react-table';
import React, { Fragment } from 'react';
import { dataTests, getDataTestAttrs } from '../../dataTests';
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
		<MuiTable {...getDataTestAttrs(dataTests.table.root)} {...tableProps} sx={{ borderCollapse: 'separate', ...tableProps.sx }}>
			<TableHead {...getDataTestAttrs(dataTests.table.head)}>
				{table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
					<MuiTableRow key={headerGroup.id} {...getDataTestAttrs(dataTests.table.headerRow, headerGroupIndex + 1)}>
						{headerGroup.headers.map((header, headerIndex) =>
							<TableCell
								key={header.id}
								colSpan={header.colSpan}
								{...getDataTestAttrs(dataTests.table.headerCell, `${headerGroupIndex + 1}.${headerIndex + 1}`)}
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
			<TableBody {...getDataTestAttrs(dataTests.table.body)}>
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
				<TableFooter {...getDataTestAttrs(dataTests.table.footer)}>
					{table.getFooterGroups().map((footerGroup, footerGroupIndex) => (
						<MuiTableRow key={footerGroup.id} {...getDataTestAttrs(dataTests.table.footerRow, footerGroupIndex + 1)}>
							{footerGroup.headers.map((header, footerHeaderIndex) =>
								<TableCell
									key={header.id}
									colSpan={header.colSpan}
									{...getDataTestAttrs(dataTests.table.footerCell, `${footerGroupIndex + 1}.${footerHeaderIndex + 1}`)}
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
