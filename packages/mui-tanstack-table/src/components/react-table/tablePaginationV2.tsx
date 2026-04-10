import { TablePagination, TablePaginationProps } from '@mui/material';
import { Table } from '@tanstack/react-table';
import { useTableIntl } from '../../context/tableIntl';
import { TableResultsLabel } from './tableResultsLabel';

const defaultOptions = [10, 25, 50, 100];

export type TablePaginationV2Props<TData> = Omit<TablePaginationProps, 'count' | 'rowsPerPage' | 'page' | 'onPageChange' | 'onRowsPerPageChange'> & {
	table: Table<TData>;
}

export const TablePaginationV2 = <TData, >(props: TablePaginationV2Props<TData>) => {
	const { table, sx, ...rest } = props;
	const { pagination } = table.getState();
	const totalCount = table.options.rowCount ?? table.getFilteredRowModel().rows.length;
	const { formatMessage } = useTableIntl();

	return (
		<TablePagination
			component={'div'}
			sx={{ overflow: 'unset', ...sx }}
			labelDisplayedRows={(ctx) => formatMessage(
				{ id: 'tablePagination.displayedRows' }, { ...ctx, page: ctx.page + 1, pages: Math.ceil(ctx.count / pagination.pageSize) })}
			rowsPerPageOptions={defaultOptions}
			count={totalCount}
			rowsPerPage={pagination.pageSize}
			page={pagination.pageIndex}
			onPageChange={(_, v) => table.setPageIndex(v)}
			labelRowsPerPage={formatMessage({ id: 'tablePagination.rowPerPage' })}
			onRowsPerPageChange={(event) => table.setPagination({ pageIndex: 0, pageSize: parseInt(event.target.value, 10) })}
			slotProps={{ spacer: { children: <TableResultsLabel table={table} /> } }}
			showFirstButton
			showLastButton
			{...rest}
		/>
	);
};
