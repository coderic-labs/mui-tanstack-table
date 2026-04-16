import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Chip, IconButton, Paper, Stack, TableContainer } from '@mui/material';
import type { ColumnFiltersState, OnChangeFn, PaginationState, SortingState } from '@tanstack/react-table';
import { createColumnHelper, getCoreRowModel, getExpandedRowModel, RowSelectionState, useReactTable } from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { ConfirmDeleteDialog } from '../common/_confirmDeleteDialog';
import { Developer, useItems } from '../common/_data';
import { employmentOptions, techOptions, verifiedLabels } from '../common/_options';
import { RowDetail } from '../common/_rowDetail';
import { DemoTableProps } from '../common/_types';


type TableMeta = {
    showConfirmDialog: (ids: string[]) => void;
}

const { BooleanFilter, DateRangeFilter, SelectFilter, TextFilter } = MTT.predefinedColumnFilters;

const columnHelper = createColumnHelper<Developer>();

const columns = [
    columnHelper.display({
        id: 'select',
        enableHiding: false, // this column visibility state cannot be changed
        enablePinning: false, // this column pinned state cannot be changed
        header: (context) =>
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
                <MTT.TableRowExpansionHeader {...context} />
                <MTT.TableRowSelectionHeader {...context} />
            </Stack>,
        cell: (context) =>
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
                <MTT.TableRowExpansionCell {...context} />
                <MTT.TableRowSelectionCell {...context} />
            </Stack>
    }),
    columnHelper.accessor('id', {
        // render same content in header and footer
        header: MTT.TableHeader,
        footer: MTT.TableHeader
    }),
    columnHelper.accessor('name', {
        header: MTT.TableHeader,
        filter: TextFilter
    }),
    columnHelper.accessor('hireDate', {
        title: 'hire date',
        header: MTT.TableHeader,
        filter: DateRangeFilter,
        cell: ({ getValue }) => getValue().toDate().toLocaleDateString()
    }),
    columnHelper.accessor('employmentType', {
        title: 'employment type',
        header: MTT.TableHeader,
        filter: (context) => <SelectFilter {...context} options={employmentOptions} />
    }),
    columnHelper.accessor('technologies', {
        header: MTT.TableHeader,
        filter: (context) => <SelectFilter {...context} options={techOptions} selectProps={{ multiple: true }} />,
        cell: ({ getValue }) => <Stack direction='row' gap={1}>{getValue().map(x => <Chip size='small' key={x} label={x} />)}</Stack>,
        tooltip: 'Last updated 1.1.2025'
    }),
    columnHelper.accessor('projects', {
        header: MTT.TableHeader,
        filter: TextFilter,
        cell: ({ getValue }) => <Chip size='small' label={getValue()} />
    }),
    columnHelper.accessor('verified', {
        header: MTT.TableHeader,
        footer: ({ table }) => {
            const verifiedCount = table.getRowModel().rows.filter((row) => row.getValue('verified')).length;
            return `verified:${verifiedCount}`;
        },
        filter: (context) => <BooleanFilter {...context} labels={verifiedLabels} />,
        cell: MTT.TableBooleanCell
    }),
    columnHelper.display({
        id: 'actions',
        header: MTT.TableHeader,
        enableHiding: false, // this column visibility state cannot be changed
        cell: (cellContext) => {
            const { row, table } = cellContext;
            return (
                <Stack direction='row' gap={1}>
                    <IconButton
                        color='primary'
                        onClick={() => alert('edit: ' + JSON.stringify(row.original))}>
                        <Edit />
                    </IconButton>
                    <IconButton
                        color='primary'
                        onClick={() => MTT.getTableMeta<TableMeta>(table).showConfirmDialog([row.original.id])}>
                        <Delete />
                    </IconButton>
                </Stack>
            );
        }
    })
];

export const ServerSideTableDemo = (props: DemoTableProps) => {
    const { enableMultiSort, maxMultiSortColCount, highlightRow, ...baseTableProps } = props;

    // table state
    const {
        pagination, sorting, columnFilters,
        onColumnFiltersChange, onSortingChange, onPaginationChange
    } = useTableState();

    // data fetching
    const { data, totalCount, deleteItems } = useItems({ columnFilters, sorting, pagination });

    // confirm delete dialog
    const { showConfirmDialog, confirmDialog } = MTT.useConfirmDialog({
        Component: ConfirmDeleteDialog,
        onConfirm: (items) => { deleteItems(items); table.resetRowSelection(); }
    });

    const table = useReactTable<Developer>({
        columns,
        data,
        rowCount: totalCount,
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        enableRowSelection: true,
        enableColumnPinning: true,
        enableMultiSort,
        maxMultiSortColCount,
        enableExpanding: true,
        getRowCanExpand: () => true,
        getRowId: (row) => row.id.toString(),
        onPaginationChange,
        onColumnFiltersChange,
        onSortingChange,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        meta: MTT.makeMeta<TableMeta>({ showConfirmDialog }),
        initialState: {
            columnPinning: { left: ['select'], right: ['actions'] }
        },
        state: {
            pagination,
            columnFilters,
            sorting,
        }
    });

    const getCellStyle: MTT.GetCellStyle<Developer> = (cell) => {
        if (cell.row.original.id === highlightRow)
            return (theme) => ({ backgroundColor: theme.palette.warning.light });
    };

    return (
        <Stack sx={{ overflow: 'hidden', p: 2, boxSizing: 'border-box', maxHeight: '100vh' }}>
            <MTT.TableToolbar mb={2}>
                <MTT.TableToolbarInfo>
                    <MTT.TableResultsLabel table={table} />
                </MTT.TableToolbarInfo>
                <MTT.TableToolbarActions>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={() => alert('Add something')}>
                        Add
                    </Button>
                    <MTT.TableBulkActionButton
                        table={table}
                        color='error'
                        variant='contained'
                        onClick={showConfirmDialog}>
                        Remove selected
                    </MTT.TableBulkActionButton>
                    <MTT.TableColumnVisibilityToggle
                        color='primary'
                        table={table} />
                </MTT.TableToolbarActions>
            </MTT.TableToolbar>
            <Stack component={Paper} overflow='auto'>
                <TableContainer>
                    <MTT.Table
                        table={table}
                        rowDetail={RowDetail}
                        getCellStyle={getCellStyle}
                        stickyHeader
                        stickyFooter
                        {...baseTableProps}
                    />
                </TableContainer>
                <MTT.TablePaginationV2 table={table} />
            </Stack>
            {confirmDialog}
        </Stack>
    );
};

/**
 * Provides state and update handlers for server side tanstack table demo.
 * Your implementation may vary depending on how you fetch data and handle state in your app.
 * @returns table state and update handlers
 */
const useTableState = () => {
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    // table pagination update handler
    const onPaginationChange: OnChangeFn<PaginationState> = useCallback(updater => setPagination(updater), [setPagination]);

    // table sorting update handler, also resets pagination on sorting change
    const onSortingChange: OnChangeFn<SortingState> = useCallback(updater => {
        setSorting(updater);
        setPagination(prev => ({ ...prev, pageIndex: 0 }));
    }, [setSorting, setPagination]);

    // table column filters update handler, also resets pagination on filter change
    const onColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(updater => {
        setColumnFilters(updater);
        setPagination(prev => ({ ...prev, pageIndex: 0 }));
    }, [setColumnFilters, setPagination]);

    // table row selection update handler
    const onRowSelectionChange: OnChangeFn<RowSelectionState> = useCallback(updater => setRowSelection(updater), [setRowSelection]);

    return {
        pagination, sorting, columnFilters, rowSelection,
        onPaginationChange, onSortingChange, onColumnFiltersChange, onRowSelectionChange
    };
}
