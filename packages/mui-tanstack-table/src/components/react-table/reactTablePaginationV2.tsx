import { TablePagination, TablePaginationProps } from '@mui/material';
import { Table } from '@tanstack/react-table';
import { useComponentsIntl } from '../../context/componentsIntl';
import { ReactTableResultsLabel } from './reactTableResultsLabel';

const defaultOptions = [10, 25, 50, 100];

export type ReactTablePaginationV2Props<TData> = Omit<TablePaginationProps, 'count' | 'rowsPerPage' | 'page' | 'onPageChange' | 'onRowsPerPageChange'> & {
	table: Table<TData>;
}

export const ReactTablePaginationV2 = <TData, >(props: ReactTablePaginationV2Props<TData>) => {
	const { table, sx, ...rest } = props;
	const { pagination } = table.getState();
	const totalCount = table.options.rowCount ?? table.getFilteredRowModel().rows.length;
	const { formatMessage } = useComponentsIntl();

	return (
		<TablePagination
			component={'div'}
			sx={{ overflow: 'unset', ...sx }}
			labelDisplayedRows={(ctx) => formatMessage(
				{ id: 'components.tablePagination.displayedRows' }, { ...ctx, page: ctx.page + 1, pages: Math.ceil(ctx.count / pagination.pageSize) })}
			rowsPerPageOptions={defaultOptions}
			count={totalCount}
			rowsPerPage={pagination.pageSize}
			page={pagination.pageIndex}
			onPageChange={(_, v) => table.setPageIndex(v)}
			labelRowsPerPage={formatMessage({ id: 'components.tablePagination.rowPerPage' })}
			onRowsPerPageChange={(event) => table.setPagination({ pageIndex: 0, pageSize: parseInt(event.target.value, 10) })}
			slotProps={{ spacer: { children: <ReactTableResultsLabel table={table} /> } }}
			showFirstButton
			showLastButton
			{...rest}
		/>
	);
};
