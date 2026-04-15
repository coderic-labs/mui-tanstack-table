import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Paper, Stack, TableContainer } from '@mui/material';
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Developer, useItems } from '../common/_data';
import { employmentOptions } from '../common/_options';

const columnHelper = createColumnHelper<Developer>();
const { TextFilter, SelectFilter } = MTT.predefinedColumnFilters;

const columns = [
    columnHelper.display({
        id: 'reset',
        header: MTT.TableResetHeader,
        enableHiding: false,
    }),
    columnHelper.accessor('id', {
        header: MTT.TableHeader,
        title: 'Id',
    }),
    columnHelper.accessor('name', {
        header: MTT.TableHeader,
        title: 'Name',
        filter: TextFilter,
        filterFn: 'includesString',
        sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('employmentType', {
        header: MTT.TableHeader,
        title: 'Employment Type',
        filter: (ctx) => <SelectFilter {...ctx} options={employmentOptions} />,
        filterFn: 'equals',
        sortingFn: 'alphanumeric',
    }),
    columnHelper.accessor('verified', {
        header: MTT.TableHeader,
        title: 'Verified',
        cell: MTT.TableBooleanCell,
        sortingFn: 'basic',
    }),
    columnHelper.accessor('city', {
        header: MTT.TableHeader,
        title: 'City',
        filter: TextFilter,
        filterFn: 'includesString',
        sortingFn: 'alphanumeric',
    }),
];

export const ResetHeaderDemo = () => {
    const { data } = useItems();

    const table = useReactTable<Developer>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageSize: 10 },
        },
    });

    return (
        <Stack sx={{ overflow: 'hidden', p: 2, boxSizing: 'border-box', maxHeight: '100vh' }}>
            <MTT.TableToolbar mb={2}>
                <MTT.TableToolbarInfo>
                    <MTT.TableResultsLabel table={table} />
                </MTT.TableToolbarInfo>
            </MTT.TableToolbar>
            <Stack component={Paper} overflow="auto">
                <TableContainer>
                    <MTT.Table table={table} />
                </TableContainer>
            </Stack>
            <MTT.TablePaginationV2 table={table} sx={{ mt: 1 }} />
        </Stack>
    );
};
