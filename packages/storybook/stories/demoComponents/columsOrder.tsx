import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Edit } from '@mui/icons-material';
import { Chip, IconButton, Paper, Stack, TableContainer } from '@mui/material';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Developer, useItems } from '../common/_data';

const columnHelper = createColumnHelper<Developer>();

const columns = [
    columnHelper.accessor('id', {
        enablePinning: false, // column pin state cannot be changed even with drag-and-drop
        header: MTT.TableHeader,
        footer: 'ID'
    }),
    columnHelper.accessor('name', {
        header: MTT.TableHeader,
    }),
    columnHelper.accessor('hireDate', {
        header: MTT.TableHeader,
        title: 'Hire date',
        cell: ({ getValue }) => getValue().toDate().toLocaleDateString(),
    }),
    columnHelper.accessor('employmentType', {
        header: MTT.TableHeader,
        title: 'Employment type',
    }),
    columnHelper.accessor('technologies', {
        header: MTT.TableHeader,
        cell: ({ getValue }) => <Stack direction='row' gap={1}>{getValue().map(x => <Chip size='small' key={x} label={x} />)}</Stack>,
    }),
    columnHelper.accessor('projects', {
        header: MTT.TableHeader,
        cell: ({ getValue }) => <Chip size='small' label={getValue()} />,
    }),
    columnHelper.accessor('verified', {
        header: MTT.TableHeader,
        cell: MTT.TableBooleanCell,
    }),
    columnHelper.display({
        id: 'actions',
        header: MTT.TableHeader,
        cell: ({ row }) => (
            <IconButton
                color="secondary"
                onClick={() => alert('edit: ' + JSON.stringify(row.original))}
            >
                <Edit />
            </IconButton>
        ),
    }),
];

const query = { pagination: { pageSize: 25, pageIndex: 0 } }

export const ColumnsOrderDemo = () => {
    const { data } = useItems(query);

    const table = useReactTable<Developer>({
        data,
        columns,
        enableColumnPinning: true,
        getCoreRowModel: getCoreRowModel(),
        initialState: {
            columnPinning: {
                left: ['id'],
                right: ['actions'],
            },
            // provide column order state
            // columns included in this state will have drag handle
            columnOrder: ['id', 'name', 'hireDate', 'employmentType', 'technologies', 'projects', 'verified', 'actions'],
        },
    });

    return (
        <Stack sx={{ overflow: 'hidden', p: 2, maxHeight: '100vh' }}>
            <Stack component={Paper} overflow='hidden'>
                <TableContainer>
                    <MTT.Table table={table} stickyHeader stickyFooter />
                </TableContainer>
            </Stack>
        </Stack>
    );
};
