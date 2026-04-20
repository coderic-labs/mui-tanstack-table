import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Chip, IconButton, Paper, Stack, TableContainer } from '@mui/material';
import type { FilterFnOption } from '@tanstack/react-table';
import { createColumnHelper, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Dayjs } from 'dayjs';
import { Developer, useItems } from '../common/_data';
import { ConfirmDeleteDialog } from '../common/_confirmDeleteDialog';
import { employmentOptions, techOptions, verifiedLabels } from '../common/_options';
import { RowDetail } from '../common/_rowDetail';
import { DemoTableProps } from '../common/_types';

type TableMeta = {
    showConfirmDialog: (ids: string[]) => void;
}

const { BooleanFilter, DateRangeFilter, SelectFilter, TextFilter } = MTT.predefinedColumnFilters;

const columnHelper = createColumnHelper<Developer>();

const filterHireDate: FilterFnOption<Developer> = (row, id, filter) => {
    const hireDate = row.getValue(id) as Dayjs;
    const isInRange =
        (!filter?.from || hireDate.isAfter(filter.from)) &&
        (!filter?.to || hireDate.isBefore(filter.to));
    return isInRange;
};

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
        header: MTT.TableHeader,
    }),
    columnHelper.accessor('name', {
        header: MTT.TableHeader,
        filter: TextFilter,
        filterFn: 'includesString',
        sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('hireDate', {
        header: MTT.TableHeader,
        title: 'Hire date',
        cell: ({ getValue }) => getValue().toDate().toLocaleDateString(),
        filter: DateRangeFilter,
        filterFn: filterHireDate,
        sortingFn: 'datetime',
    }),
    columnHelper.accessor('employmentType', {
        header: MTT.TableHeader,
        title: 'Employment type',
        filter: (context) => <SelectFilter {...context} options={employmentOptions} />,
        filterFn: 'equals',
        sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('technologies', {
        header: MTT.TableHeader,
        filter: (context) => <SelectFilter {...context} options={techOptions} selectProps={{ multiple: true }} />,
        cell: ({ getValue }) => <Stack direction='row' gap={1}>{getValue().map(x => <Chip size='small' key={x} label={x} />)}</Stack>,
        tooltip: 'Last updated 1.1.2025',
        filterFn: 'arrIncludesAll',
        sortingFn: 'auto',
    }),
    columnHelper.accessor('projects', {
        header: MTT.TableHeader,
        filter: TextFilter,
        cell: ({ getValue }) => <Chip size='small' label={getValue()} />,
        filterFn: 'weakEquals',
        sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('verified', {
        header: MTT.TableHeader,
        footer: ctx => 'verified:' + ctx.table.getFilteredRowModel().rows.filter(r => r.getValue('verified')).length,
        filter: (context) => <BooleanFilter {...context} labels={verifiedLabels} />,
        cell: MTT.TableBooleanCell,
        filterFn: 'equals',
        sortingFn: 'auto',
    }),
    columnHelper.display({
        id: 'actions',
        header: MTT.TableHeader,
        enableHiding: false,
        cell: ({ row, table }) => {
            return (
                <Stack direction='row' gap={1}>
                    <IconButton
                        color="secondary"
                        onClick={() => alert('edit: ' + JSON.stringify(row.original))}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        color="secondary"
                        onClick={() => MTT.getTableMeta<TableMeta>(table).showConfirmDialog([row.original.id])}
                    >
                        <Delete />
                    </IconButton>
                </Stack>
            );
        }
    })
];

export const ClientSideTableDemo = (props: DemoTableProps) => {
    const { enableMultiSort, maxMultiSortColCount, highlightRow, ...baseTableProps } = props;

    const { data, deleteItems } = useItems();

    const { confirmDialog, showConfirmDialog } = MTT.useConfirmDialog({
        Component: ConfirmDeleteDialog,
        onConfirm: (items) => { deleteItems(items); table.resetRowSelection(); }
    });

    const table = useReactTable<Developer>({
        columns,
        data,
        enableRowSelection: true,
        enableMultiSort,
        maxMultiSortColCount,
        enableColumnPinning: true,
        enableExpanding: true,
        getRowCanExpand: () => true,
        getRowId: (row) => row.id.toString(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        meta: MTT.makeMeta<TableMeta>({ showConfirmDialog }),
        initialState: {
            columnPinning: { left: ['select'], right: ['actions'] },
            columnOrder: ['select', 'id', 'name', 'hireDate', 'employmentType', 'technologies', 'projects', 'verified', 'actions']
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
                        color='secondary'
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
                        color='secondary'
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
