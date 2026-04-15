import * as MTT from '@coderic-labs/mui-tanstack-table';
import { Paper, Stack, TableContainer } from '@mui/material';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Developer, useItems } from '../common/_data';

const columnHelper = createColumnHelper<Developer>();

const columns = [
    columnHelper.accessor('id', {
        header: MTT.TableHeader,
        title: 'Id',
        enableHiding: false,
    }),
    columnHelper.accessor('name', {
        header: MTT.TableHeader,
        title: 'Name',
    }),
    columnHelper.accessor('employmentType', {
        header: MTT.TableHeader,
        title: 'Employment Type',
    }),
    columnHelper.accessor('verified', {
        header: MTT.TableHeader,
        title: 'Verified',
        cell: MTT.TableBooleanCell,
    }),
    columnHelper.accessor('city', {
        header: MTT.TableHeader,
        title: 'City',
    }),
    columnHelper.accessor('mail', {
        header: MTT.TableHeader,
        title: 'Email',
    }),
    columnHelper.accessor('phone', {
        header: MTT.TableHeader,
        title: 'Phone',
    }),
];

export const ColumnVisibilityDemo = () => {
    const { data } = useItems();

    const table = useReactTable<Developer>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Stack sx={{ overflow: 'hidden', p: 2, boxSizing: 'border-box', maxHeight: '100vh' }}>
            <MTT.TableToolbar mb={2}>
                <MTT.TableToolbarInfo>
                    <MTT.TableResultsLabel table={table} />
                </MTT.TableToolbarInfo>
                <MTT.TableToolbarActions>
                    <MTT.TableColumnVisibilityToggle table={table} />
                </MTT.TableToolbarActions>
            </MTT.TableToolbar>
            <Stack component={Paper} overflow="auto">
                <TableContainer>
                    <MTT.Table table={table} />
                </TableContainer>
            </Stack>
        </Stack>
    );
};
