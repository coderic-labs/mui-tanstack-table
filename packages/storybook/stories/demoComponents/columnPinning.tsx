import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Edit } from '@mui/icons-material';
import { IconButton, Paper, Stack, TableContainer } from '@mui/material';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Developer, useItems } from '../common/_data';

const columnHelper = createColumnHelper<Developer>();

const columns = [
    columnHelper.accessor('id', {
        header: MTT.TableHeader,
        title: 'Id',
    }),
    columnHelper.accessor('name', {
        header: MTT.TableHeader,
        title: 'Name',
    }),
    columnHelper.accessor('employmentType', {
        header: MTT.TableHeader,
        title: 'Employment Type',
    }),
    columnHelper.accessor('city', {
        header: MTT.TableHeader,
        title: 'City',
    }),
    columnHelper.accessor('verified', {
        header: MTT.TableHeader,
        title: 'Verified',
        cell: MTT.TableBooleanCell,
    }),
    columnHelper.display({
        id: 'actions',
        header: MTT.TableHeader,
        title: 'Actions',
        enableHiding: false,
        cell: ({ row }) => (
            <IconButton
                color='primary'
                onClick={() => alert(`Edit row ${row.original.id}`)}>
                <Edit />
            </IconButton>
        ),
    }),
];

export const ColumnPinningDemo = () => {
    const { data } = useItems();

    const table = useReactTable<Developer>({
        data,
        columns,
        enableColumnPinning: true,
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnPinning: {
                left: ['id', 'name'],
                right: ['verified', 'actions'],
            },
        },
    });

    return (
        <Stack sx={{ overflow: 'hidden', p: 2, boxSizing: 'border-box', maxHeight: '100vh' }}>
            <Stack component={Paper} overflow='hidden'>
                <TableContainer sx={{ maxHeight: 360 }}>
                    <MTT.Table table={table} stickyHeader />
                </TableContainer>
            </Stack>
        </Stack>
    );
};
