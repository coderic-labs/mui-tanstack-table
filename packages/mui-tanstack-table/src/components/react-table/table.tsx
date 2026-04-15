import { Table as MuiTable, TableBody, TableCell, TableFooter, TableHead, TableProps as MuiTableProps, TableRow as MuiTableRow } from '@mui/material';
import { flexRender, Table as TanstackTable } from '@tanstack/react-table';
import { Fragment } from 'react';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { TableDetailRow, TableEmptyRow, TableRow } from './tableRow';
import { getCellStyle as getBaseCellStyle } from './styleUtils';
import type { GetCellStyle, RowDetailComponent } from './types';

export type TableProps<T> = MuiTableProps & {
	table: TanstackTable<T>;
	rowDetail?: RowDetailComponent<T>;
	getCellStyle?: GetCellStyle<T>;
	stickyFooter?: boolean;
};

export function Table<T>(props: TableProps<T>) {
	const { table, rowDetail, getCellStyle, stickyFooter, ...tableProps } = props;
	const showFooter = table.getAllColumns().some(c => c.getIsVisible() && c.columnDef.footer);

	return (
		<MuiTable {...getDataTestAttrs(dataTests.table.root)} {...tableProps} sx={{ borderCollapse: 'separate', ...tableProps.sx }}>
			<TableHead {...getDataTestAttrs(dataTests.table.head)}>
				{table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
					<MuiTableRow key={headerGroup.id} {...getDataTestAttrs(dataTests.table.headerRow, headerGroupIndex + 1)}>
						{headerGroup.headers.map((header) =>
							<TableCell
								key={header.id}
								colSpan={header.colSpan}
								{...getDataTestAttrs(dataTests.table.headerCell, header.column.id)}
								sx={getBaseCellStyle({
									column: header.column,
									area: 'header',
									sticky: tableProps.stickyHeader
								})}>
								{!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
							</TableCell>
						)}
					</MuiTableRow>
				))}
			</TableHead>
			<TableBody {...getDataTestAttrs(dataTests.table.body)}>
				{table.getRowModel().rows.map(row =>
					<Fragment key={row.id}>
						<TableRow row={row} getCellStyle={getCellStyle} />
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
							{footerGroup.headers.map((header) =>
								<TableCell
									key={header.id}
									colSpan={header.colSpan}
									{...getDataTestAttrs(dataTests.table.footerCell, header.column.id)}
									sx={getBaseCellStyle({
										column: header.column,
										area: 'footer',
										sticky: stickyFooter
									})}>
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
