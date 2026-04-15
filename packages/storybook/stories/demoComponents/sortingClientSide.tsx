import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Paper, Stack, TableContainer } from '@mui/material';
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Developer, useItems } from '../common/_data';

const columnHelper = createColumnHelper<Developer>();

const columns = [
    columnHelper.accessor('id', {
        header: MTT.TableHeader,
        sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('name', {
        header: MTT.TableHeader,
        sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('hireDate', {
        header: MTT.TableHeader,
        cell: ({ getValue }) => getValue().toDate().toLocaleDateString(),
        sortingFn: 'datetime'
    }),
    columnHelper.accessor('employmentType', {
        header: MTT.TableHeader,
        sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('verified', {
        header: MTT.TableHeader,
        cell: MTT.TableBooleanCell,
        sortingFn: 'auto'
    }),
    columnHelper.accessor('city', {
        header: MTT.TableHeader,
        sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('mail', {
        header: MTT.TableHeader,
        sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('phone', {
        header: MTT.TableHeader,
        sortingFn: 'alphanumeric'
    }),
    columnHelper.accessor('technologies', {
        header: MTT.TableHeader,
        cell: ({ getValue }) => getValue().join(', '),
        sortingFn: 'auto'
    }),
    columnHelper.accessor('projects', {
        header: MTT.TableHeader,
        sortingFn: 'alphanumeric'
    })
];

export const SortingClientSideDemo = () => {
    const { data } = useItems();

    const table = useReactTable<Developer>({
        data,
        columns,
        enableMultiSort: true,
        maxMultiSortColCount: 3,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    return (
        <Stack sx={{ overflow: 'hidden', p: 2, boxSizing: 'border-box', maxHeight: '100vh' }}>
            <Stack component={Paper} overflow='auto'>
                <TableContainer>
                    <MTT.Table table={table} />
                </TableContainer>
            </Stack>
        </Stack>
    );
};
