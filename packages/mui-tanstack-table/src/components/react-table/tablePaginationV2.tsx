import { TablePagination, TablePaginationProps } from '@mui/material';
import { Table } from '@tanstack/react-table';
import { dataTests, getDataTestAttrs } from '../../dataTests';
import { useTableIntl } from '../../context/tableIntl';
import { TableResultsLabel } from './tableResultsLabel';

const defaultOptions = [10, 25, 50, 100];

/**
 * Props for {@link TablePaginationV2}.
 * Pagination-state props (`count`, `page`, `rowsPerPage`, change handlers) are omitted — managed internally.
 */
export type TablePaginationV2Props<TData> = Omit<TablePaginationProps, 'count' | 'rowsPerPage' | 'page' | 'onPageChange' | 'onRowsPerPageChange'> & {
    table: Table<TData>;
}

/**
 * Pagination bar built on MUI's `TablePagination` component.
 * Includes a results label and first/last/prev/next navigation buttons.
 * Reads `rowCount` from `table.options` when provided (server-side pagination);
 * falls back to the filtered row count for client-side pagination.
 */
export const TablePaginationV2 = <TData, >(props: TablePaginationV2Props<TData>) => {
    const { table, sx, ...rest } = props;
    const { pagination } = table.getState();
    const totalCount = table.options.rowCount ?? table.getFilteredRowModel().rows.length;
    const { formatMessage } = useTableIntl();

    return (
        <TablePagination
            {...getDataTestAttrs(dataTests.paginationV2.root)}
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
            slotProps={{
                spacer: { children: <TableResultsLabel table={table} /> },
                select: { 'data-test': dataTests.paginationV2.pageSizeSelect } as any,
                menuItem: { 'data-test': dataTests.paginationV2.pageSizeOption } as any,
                actions: {
                    firstButton: { 'data-test': dataTests.paginationV2.firstButton } as any,
                    previousButton: { 'data-test': dataTests.paginationV2.prevButton } as any,
                    nextButton: { 'data-test': dataTests.paginationV2.nextButton } as any,
                    lastButton: { 'data-test': dataTests.paginationV2.lastButton } as any
                }
            }}
            showFirstButton
            showLastButton
            {...rest}
        />
    );
};
