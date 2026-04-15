import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton, Paper, Stack, TableContainer } from '@mui/material';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Developer, useItems } from '../common/_data';

const columnHelper = createColumnHelper<Developer>();

const columns = [
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
    columnHelper.display({
        id: 'actions',
        header: MTT.TableHeader,
        title: 'Actions',
        enableHiding: false,
        cell: ({ row }) => (
            <Stack direction='row' gap={1}>
                <IconButton
                    color='primary'
                    onClick={() => alert(`Edit row ${row.original.id}`)}>
                    <Edit />
                </IconButton>
                <IconButton
                    color='primary'
                    onClick={() => alert(`Delete row ${row.original.id}`)}>
                    <Delete />
                </IconButton>
            </Stack>
        ),
    }),
];

export const RowActionsDemo = () => {
    const { data } = useItems();

    const table = useReactTable<Developer>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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
